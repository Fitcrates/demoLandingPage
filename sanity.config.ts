import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool, defineDocuments, defineLocations } from 'sanity/presentation'
import { schema } from './src/sanity/schema'

// Helper: all singleton section types point to the homepage
const homepageLocation = defineLocations({
  select: { title: 'title' },
  resolve: () => ({
    locations: [{ title: 'Strona Główna', href: '/' }],
  }),
})

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tyz4rkzm',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: typeof location === 'undefined' ? 'http://localhost:3000' : location.origin,
        previewMode: {
          enable: '/api/draft',
        },
      },
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/',
            filter: '_type in ["navbar", "hero", "about", "services", "whyus", "reviews", "cta", "contact", "footer"]',
          },
          {
            route: '/uslugi/:slug',
            filter: '_type == "servicePage" && slug.current == $slug',
          },
        ]),
        locations: {
          navbar: homepageLocation,
          hero: homepageLocation,
          about: homepageLocation,
          services: homepageLocation,
          whyus: homepageLocation,
          reviews: homepageLocation,
          cta: homepageLocation,
          contact: homepageLocation,
          footer: homepageLocation,
          servicePage: defineLocations({
            select: { title: 'title', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: [
                { title: doc?.title || 'Strona Usługi', href: `/uslugi/${doc?.slug}` },
              ],
            }),
          }),
        },
      },
    }),
  ],

  schema: schema,
})
