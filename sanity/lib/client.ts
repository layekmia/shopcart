import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const realtimeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Get fresh data immediately
})