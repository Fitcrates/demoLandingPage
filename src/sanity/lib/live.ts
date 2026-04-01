import { defineLive } from 'next-sanity/live'
import { client } from './client'
import { token } from '../env'

// defineLive creates two things:
// 1) sanityFetch — a server-side fetch function for React Server Components
// 2) SanityLive — a component that auto-revalidates content in real time
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
})
