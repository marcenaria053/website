import { defineField, defineType } from 'sanity';

export const about = defineType({
  name: 'about',
  title: 'Sobre',
  type: 'document',
  fields: [
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' })],
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({ name: 'yearsOfExperience', title: 'Anos de Experiência', type: 'number' }),
    defineField({ name: 'projectsDelivered', title: 'Projetos Entregues', type: 'number' }),
    defineField({
      name: 'highlights',
      title: 'Diferenciais',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
