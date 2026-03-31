import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from '../env'

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
    // Stega is DISABLED globally. It was causing:
    // 1) "Open in Studio" hover overlays on the regular site
    // 2) Infinite re-render loops (Maximum update depth) with GSAP animations
    // The Presentation tool sidebar uses resolve.locations instead.
    // Live preview uses client.listen() in each component.
  })
}

export const client = buildClient()
