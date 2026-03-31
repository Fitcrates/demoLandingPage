export default {
  name: 'footer',
  title: 'Footer Section',
  type: 'document',
  fields: [
    {
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform (e.g. Facebook, Instagram)', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ]
        }
      ]
    },
    {
      name: 'serviceLinks',
      title: 'Service Links Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Link Label', type: 'string' },
            { name: 'url', title: 'URL', type: 'string' },
          ]
        }
      ]
    }
  ],
}
