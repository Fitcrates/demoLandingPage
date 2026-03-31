export default {
  name: 'servicePage',
  title: 'Strona Usługi',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tytuł usługi',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Podtytuł (pod tytułem hero)',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroImage',
      title: 'Zdjęcie w tle (hero)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'description',
      title: 'Pełny opis',
      type: 'text',
    },
    {
      name: 'benefits',
      title: 'Kluczowe korzyści (lista)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'priceList',
      title: 'Cennik',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'priceItem',
          title: 'Pozycja cennika',
          fields: [
            { name: 'name', title: 'Nazwa zabiegu', type: 'string' },
            { name: 'duration', title: 'Czas trwania (np. 60 min)', type: 'string' },
            { name: 'price', title: 'Cena (np. 150 zł)', type: 'string' },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
}
