export default {
  name: 'reviews',
  title: 'Reviews Section',
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
      name: 'reviewList',
      title: 'Reviews',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Client Name',
              type: 'string',
            },
            {
              name: 'role',
              title: 'Role/Title',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Review Content',
              type: 'text',
            },
            {
              name: 'rating',
              title: 'Rating (1-5)',
              type: 'number',
            },
            {
              name: 'image',
              title: 'Client Image (optional)',
              type: 'image',
            },
          ],
        },
      ],
    },
  ],
}
