export default {
  name: 'services',
  title: 'Sekcja: Usługi',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tytuł sekcji',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Podtytuł sekcji',
      type: 'text',
    },
    {
      name: 'serviceList',
      title: 'Lista usług',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'serviceItem',
          title: 'Usługa',
          fields: [
            {
              name: 'title',
              title: 'Nazwa usługi',
              type: 'string',
            },
            {
              name: 'slug',
              title: 'Slug (URL do strony usługi)',
              description: 'Musi odpowiadać slugowi w "Strona Usługi". Np. zabiegi-na-twarz',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Krótki opis (na karcie)',
              type: 'text',
            },
            {
              name: 'iconName',
              title: 'Ikona (Sparkles | Flower2 | Droplets | Gem)',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Zdjęcie karty',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'slug' },
          },
        },
      ],
    },
  ],
}

