import { knex } from '../../database'

export async function getMealById(id: string, userId: string) {
  return await knex('meals')
    .select()
    .where({
      id,
      user_id: userId,
    })
    .first()
}
