import { knex } from '../../database'

export async function deleteMealById(id: string, userId: string) {
  return await knex('meals')
    .where({
      id,
      user_id: userId,
    })
    .del()
}
