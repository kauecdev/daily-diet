import { randomUUID } from 'node:crypto'
import { knex } from '../../database'
import { SaveMealBodySchema } from '../../types/save-meal-body-schema'

export async function createMeal(body: SaveMealBodySchema, userId: string) {
  await knex('meals').insert({
    id: randomUUID(),
    user_id: userId,
    name: body.name,
    description: body.description,
    date_time: body.dateTime,
    is_in_diet: body.isInDiet,
  })
}
