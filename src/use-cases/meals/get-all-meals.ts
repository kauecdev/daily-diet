import { knex } from '../../database'

export async function getAllMeals(userId: string) {
  return await knex('meals').select().where({
    user_id: userId,
  })
}
