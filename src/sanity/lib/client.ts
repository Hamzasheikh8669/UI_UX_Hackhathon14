import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token  } from '../env'

export const client = createClient({
  projectId,
  token,
  dataset,
  apiVersion,
  
  useCdn: true,
})
