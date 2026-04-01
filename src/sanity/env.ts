// src/sanity/env.ts
// We use soft fallbacks so the app doesn't throw at build time
// when NEXT_PUBLIC_SANITY_* env vars are not yet configured.
// The Sanity client will simply return null for all fetches,
// and each component will fall back to its hardcoded dummy data.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-30'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

export const token =
  process.env.SANITY_API_TOKEN || ''

export const useCdn = false
