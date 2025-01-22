import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, tokenApi  } from '../env'

export const client = createClient({
  projectId,
  tokenApi,
  dataset,
  apiVersion,
  
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
