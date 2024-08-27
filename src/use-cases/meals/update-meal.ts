import { knex } from '../../database'
import { SaveMealBodySchema } from '../../types/save-meal-body-schema'

export async function updateMeal(
  body: SaveMealBodySchema,
  id: string,
  userId: string,
) {
  await knex('meals').where({ id, user_id: userId }).update({
    id,
    user_id: userId,
    name: body.name,
    description: body.description,
    date_time: body.dateTime,
    is_in_diet: body.isInDiet,
  })
}
