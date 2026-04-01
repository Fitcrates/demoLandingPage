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
    stega: {
      enabled: true,
      studioUrl: typeof location === 'undefined' ? 'http://localhost:3000/studio' : `${location.origin}/studio`,
    },
  })
}

export const client = buildClient()
