import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Serviços',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nome', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Descrição', type: 'text', rows: 3 }),
    defineField({ name: 'icon', title: 'Ícone (nome do Lucide)', type: 'string', description: 'Ex: Ruler, Wrench, Star' }),
    defineField({ name: 'order', title: 'Ordem', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Ordem', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
