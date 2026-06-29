// Consolida os documentos `about` órfãos num único singleton `_id: 'about'`.
//
// Contexto: o Studio trata `about` como singleton apontando para
// documentId('about'), mas o dataset tinha 2+ docs `about` com ids
// aleatórios (UUID) — o que faz o Studio exibir "documento excluído".
//
// Este script escolhe o doc mais completo como fonte, recria-o como
// `_id: 'about'` e remove todos os outros docs `about` (published + drafts).
//
// Uso:
//   node scripts/consolidate-about.mjs            (dry-run: só mostra o plano)
//   node scripts/consolidate-about.mjs --apply    (executa as mutações)
//
// Requer um token de ESCRITA do Sanity em SANITY_API_WRITE_TOKEN.
// Crie em https://sanity.io/manage → API → Tokens (permissão Editor/Write).

import { readFileSync } from 'node:fs';

// Campos de nível raiz a ignorar: qualquer chave `_*` (id, rev, datas, _system).
// `_type` é reintroduzido explicitamente no payload.
const isContentField = (k) => !k.startsWith('_');

const loadEnv = () => {
  for (const file of ['.env.local', '.env']) {
    try {
      const raw = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
      for (const line of raw.split('\n')) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
        if (m && !process.env[m[1]]) {
          process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
        }
      }
    } catch {
      // arquivo ausente, segue
    }
  }
};

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01';
const token = process.env.SANITY_API_WRITE_TOKEN;
const apply = process.argv.includes('--apply');

if (!projectId) {
  console.error('✗ NEXT_PUBLIC_SANITY_PROJECT_ID ausente.');
  process.exit(1);
}

const v = apiVersion.startsWith('v') ? apiVersion : `v${apiVersion}`;
const base = `https://${projectId}.api.sanity.io/${v}/data`;
// Leitura: usa a CDN pública quando não há token; com token usa a API "fresh".
const readBase = token ? base : `https://${projectId}.apicdn.sanity.io/${v}/data`;

const completeness = (doc) =>
  Object.keys(doc).filter((k) => isContentField(k) && doc[k] != null).length;

const query = async (groq) => {
  const res = await fetch(`${readBase}/query/${dataset}?query=${encodeURIComponent(groq)}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const json = await res.json();
  if (json.error) throw new Error(JSON.stringify(json.error));
  return json.result;
};

const mutate = async (mutations) => {
  const res = await fetch(`${base}/mutate/${dataset}?returnIds=true`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ mutations }),
  });
  const json = await res.json();
  if (json.error) throw new Error(JSON.stringify(json.error));
  return json;
};

const run = async () => {
  const docs = await query('*[_type == "about"]');
  const orphans = docs.filter((d) => d._id !== 'about');

  if (docs.length === 0) {
    console.log('Nenhum documento `about` encontrado. Nada a fazer.');
    return;
  }

  if (orphans.length === 0) {
    console.log('Já existe apenas o singleton `about` canônico. Nada a fazer.');
    return;
  }

  const source = [...docs].sort(
    (a, b) =>
      completeness(b) - completeness(a) ||
      new Date(b._updatedAt) - new Date(a._updatedAt),
  )[0];

  const payload = { _id: 'about', _type: 'about' };
  for (const [k, val] of Object.entries(source)) {
    if (isContentField(k)) payload[k] = val;
  }

  const deletions = new Set();
  for (const d of orphans) {
    const publishedId = d._id.startsWith('drafts.') ? d._id.slice('drafts.'.length) : d._id;
    deletions.add(publishedId);
    deletions.add(`drafts.${publishedId}`);
  }
  deletions.add('drafts.about');

  console.log(`projectId=${projectId} dataset=${dataset} apiVersion=${apiVersion}\n`);
  console.log(`Documentos \`about\` encontrados: ${docs.length}`);
  docs.forEach((d) =>
    console.log(`  - ${d._id}  (campos: ${completeness(d)}, atualizado: ${d._updatedAt})`),
  );
  console.log(`\nFonte escolhida (mais completa): ${source._id}`);
  console.log('Conteúdo que virará _id="about":');
  console.log(JSON.stringify(payload, null, 2));
  console.log(`\nSerão removidos: ${[...deletions].join(', ')}`);

  if (!apply) {
    console.log('\n● DRY-RUN. Nada foi alterado. Rode com --apply para executar.');
    return;
  }

  if (!token) {
    console.error('\n✗ SANITY_API_WRITE_TOKEN ausente — necessário para --apply.');
    process.exit(1);
  }

  const mutations = [
    { createOrReplace: payload },
    ...[...deletions].map((id) => ({ delete: { id } })),
  ];

  const result = await mutate(mutations);
  console.log('\n✓ Consolidado com sucesso.');
  console.log(`  Transação: ${result.transactionId}`);
  console.log('  Recarregue o Studio (hard refresh) — o singleton "Sobre" deve abrir normalmente.');
};

run().catch((err) => {
  console.error('\n✗ Falhou:', err.message);
  process.exit(1);
});
