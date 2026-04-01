export default {
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  fields: [
    {
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      description: 'Brand name displayed in the navbar (e.g. "Glow & Serenity")',
    },
    {
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      description: 'Menu links displayed in the navbar (hidden on mobile)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'Link (e.g. /#about)', type: 'string' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Text on the call-to-action button (e.g. "Umów wizytę")',
    },
    {
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'Where the CTA button navigates to (e.g. /#contact)',
    },
  ],
}
