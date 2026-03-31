export default {
  name: 'whyus',
  title: 'Why Us Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'text',
            },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
}
