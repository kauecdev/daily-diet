import { z } from 'zod'

export const createUserBodySchema = z.object({
  name: z.string().min(3),
  email: z.string(),
})
