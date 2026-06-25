import { defineField, defineType } from 'sanity';

export const siteConfig = defineType({
  name: 'siteConfig',
  title: 'Configurações do Site',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nome da Empresa', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'whatsappNumber', title: 'WhatsApp (com DDI, sem +)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'whatsappMessage', title: 'Mensagem padrão do WhatsApp', type: 'text', rows: 2 }),
    defineField({ name: 'instagram', title: 'Instagram (@handle ou URL)', type: 'string' }),
    defineField({ name: 'city', title: 'Cidade de Atuação', type: 'string' }),
    defineField({
      name: 'hero',
      title: 'Hero (Topo da Página)',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'eyebrow', title: 'Texto superior', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'titleHighlight', title: 'Título — destaque dourado', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Subtítulo (parágrafo — desktop / seção seguinte no mobile)', type: 'text', rows: 3 }),
        defineField({
          name: 'supportLine',
          title: 'Linha de apoio (mobile, ≤ 8 palavras)',
          type: 'string',
          validation: (r) => r.max(60),
        }),
        defineField({ name: 'primaryCtaLabel', title: 'Botão primário (WhatsApp)', type: 'string' }),
        defineField({ name: 'secondaryCtaLabel', title: 'Botão secundário', type: 'string' }),
      ],
    }),
    defineField({ name: 'metaTitle', title: 'Título SEO', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Descrição SEO', type: 'text', rows: 2 }),
    defineField({ name: 'ogImage', title: 'Imagem OG (Redes Sociais)', type: 'image' }),
  ],
});
