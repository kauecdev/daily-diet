import { z } from 'zod'
import { saveMealBodySchema } from '../schemas/save-meal-body-schema'

export type SaveMealBodySchema = z.infer<typeof saveMealBodySchema>
