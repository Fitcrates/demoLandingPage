import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn, token } from '../env'

// If projectId is not configured, we create a dummy client
// whose .fetch() always resolves to null — components fall back
// to their hardcoded dummy data.
function buildClient() {
  if (!projectId) {
    return {
      fetch: () => Promise.resolve(null),
      listen: () => ({ subscribe: () => ({ unsubscribe: () => {} }) })
    } as any
  }

  return createClient({
    apiVersion,
    dataset,
    projectId,
    useCdn,
    token,
    perspective: 'published',
    // Stega is conditionally enabled for visual editing
    // Only active when inside Sanity Studio's Presentation tool iframe
    stega: {
      enabled: false, // Will be overridden by client.withConfig() when needed
      studioUrl: '/studio',
    },
  })
}

export const client = buildClient()
