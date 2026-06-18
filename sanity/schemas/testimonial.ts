import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Depoimentos',
  type: 'document',
  fields: [
    defineField({ name: 'clientName', title: 'Nome do Cliente', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'city', title: 'Cidade', type: 'string' }),
    defineField({ name: 'quote', title: 'Depoimento', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({
      name: 'avatar',
      title: 'Foto (opcional)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
