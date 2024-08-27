import { z } from 'zod'

export const getMealIdParamSchema = z.object({
  id: z.string().uuid(),
})
