import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Projetos',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Cozinha', value: 'cozinha' },
          { title: 'Banheiro', value: 'banheiro' },
          { title: 'Sala', value: 'sala' },
          { title: 'Escritório', value: 'escritorio' },
          { title: 'Outro', value: 'outro' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'cover',
      title: 'Foto Principal',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' })],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' })],
        },
      ],
    }),
    defineField({ name: 'description', title: 'Descrição', type: 'text', rows: 3 }),
    defineField({ name: 'featured', title: 'Destaque (aparece no Hero)', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Ordem', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Ordem', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
