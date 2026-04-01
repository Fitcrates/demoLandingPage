// src/sanity/schema.ts
import { type SchemaTypeDefinition } from 'sanity'

import navbar from './schemas/navbar'
import hero from './schemas/hero'
import about from './schemas/about'
import services from './schemas/services'
import whyus from './schemas/whyus'
import reviews from './schemas/reviews'
import cta from './schemas/cta'
import contact from './schemas/contact'
import footer from './schemas/footer'
import servicePage from './schemas/servicePage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [navbar, hero, about, services, whyus, reviews, cta, contact, footer, servicePage],
}
