import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { createUserBodySchema } from '../../schemas/create-user-body-schema'
import { knex } from '../../database'

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

export async function createUser(body: CreateUserBodySchema) {
  const newUserId = randomUUID()

  await knex('users').insert({
    id: newUserId,
    name: body.name,
    email: body.email,
  })

  return newUserId
}
