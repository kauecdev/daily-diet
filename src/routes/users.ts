import { FastifyInstance } from 'fastify'
import { createUserBodySchema } from '../schemas/create-user-body-schema'
import { createUser } from '../use-cases/users/create-user'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const body = createUserBodySchema.parse(request.body)

    const newUserId = await createUser(body)

    reply.setCookie('userId', newUserId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return reply.status(201).send()
  })
}
