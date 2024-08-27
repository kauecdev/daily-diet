import { z } from 'zod'

export const saveMealBodySchema = z.object({
  name: z.string().min(3),
  description: z.string(),
  dateTime: z.string(),
  isInDiet: z.boolean(),
})
