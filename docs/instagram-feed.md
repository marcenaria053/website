# Feed do Instagram — planejamento (em aberto)

Status: **planejado, não implementado.** Decidido integrar o feed real do
Instagram via Behold.so usando a **JSON API headless** (não o widget `<script>`).

## Por que Behold headless (e não o widget script nem a Graph API)

- **Widget script do Behold:** renderiza uma caixa genérica, injeta JS de
  terceiro no carregamento e cookies. Descartado.
- **Graph API oficial (Meta):** feed automático sem custo de SaaS, mas
  burocrático (app review, conta Business vinculada a página do Facebook,
  tokens que expiram). Overkill para o caso.
- **Behold headless (escolhido):** o endpoint `https://feeds.behold.so/{feedId}`
  devolve JSON com os posts; renderizamos com nossos próprios componentes
  (dark + dourado, igual ao resto do site). Sem script de terceiro no client,
  quase nenhum cookie de terceiro no load (só as imagens via CDN), feed real
  sincronizado automaticamente.

Decisão sobre LGPD/banner: o cliente está ok em prosseguir sem banner de
consentimento. Com a abordagem headless o impacto de cookies é mínimo de
qualquer forma.

## Pendências (do cliente — exigem login do Instagram da 053)

1. Criar conta grátis em https://behold.so
2. Conectar o Instagram da 053 (precisa ser conta **Business** ou **Creator**)
3. Criar um feed no painel do Behold
4. Fornecer o **Feed ID** (vai em `BEHOLD_FEED_ID`)

## A implementar (quando houver o Feed ID)

- `components/sections/InstagramFeed.tsx` — server component; `fetch` de
  `https://feeds.behold.so/{BEHOLD_FEED_ID}` com `revalidate` ~3600s.
- Grid responsivo de 6–8 fotos linkando para o `permalink` de cada post +
  botão "Seguir no Instagram" (usa `siteConfig.instagram`).
- Estado vazio/silencioso se o Feed ID estiver ausente ou o fetch falhar
  (mesmo padrão de guard das demais seções).
- Posição: **antes do `CtaFinal`** (prova social visual fechando a página).
- `next.config` → `images.remotePatterns` para o domínio das imagens do
  Behold/Instagram (otimização do `next/image`).
- `BEHOLD_FEED_ID` em `.env` (o endpoint é público, não é segredo).

## Referência

- Behold docs: https://behold.so/docs/
- Endpoint JSON: `https://feeds.behold.so/{feedId}`
