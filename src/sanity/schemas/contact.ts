export default {
  name: 'contact',
  title: 'Contact Section',
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
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'days', title: 'Days (e.g., Pon-Pt)', type: 'string' },
            { name: 'hours', title: 'Hours (e.g., 9:00 - 20:00)', type: 'string' },
          ]
        }
      ]
    },
    {
      name: 'formTitle',
      title: 'Form Title',
      type: 'string',
    },
    {
      name: 'mapUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
    }
  ],
}
