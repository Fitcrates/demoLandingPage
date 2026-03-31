export default {
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description1',
      title: 'First Paragraph',
      type: 'text',
    },
    {
      name: 'description2',
      title: 'Second Paragraph',
      type: 'text',
    },
    {
      name: 'values',
      title: 'Values List',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'string',
    },
    {
      name: 'yearsLabel',
      title: 'Years Label',
      type: 'string',
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    },
  ],
}
