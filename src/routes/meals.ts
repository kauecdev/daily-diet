import { FastifyInstance } from 'fastify'
import { createMeal } from '../use-cases/meals/create-meal'
import { checkUserIdExistsInCookies } from '../middlewares/check-user-id-exists-in-cookies'
import { getAllMeals } from '../use-cases/meals/get-all-meals'
import { Cookies } from '../interfaces/cookies'
import { getMealIdParamSchema } from '../schemas/get-meal-id-param-schema'
import { getMealById } from '../use-cases/meals/get-meal-by-id'
import { saveMealBodySchema } from '../schemas/save-meal-body-schema'
import { updateMeal } from '../use-cases/meals/update-meal'
import { deleteMealById } from '../use-cases/meals/delete-meal-by-id'
import { getMetrics } from '../use-cases/meals/get-metrics'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', checkUserIdExistsInCookies)

  app.get('/', async (request, reply) => {
    const { userId } = request.cookies as Cookies

    const meals = await getAllMeals(userId)

    return reply.status(200).send({
      meals,
    })
  })

  app.get('/:id', async (request, reply) => {
    const { userId } = request.cookies as Cookies
    const { id } = getMealIdParamSchema.parse(request.params)

    const meal = await getMealById(id, userId)

    return reply.status(200).send(meal)
  })

  app.get('/metrics', async (request, reply) => {
    const { userId } = request.cookies as Cookies

    const metrics = await getMetrics(userId)

    return reply.status(200).send(metrics)
  })

  app.post('/', async (request, reply) => {
    const { userId } = request.cookies as Cookies

    const body = saveMealBodySchema.parse(request.body)

    await createMeal(body, userId)

    return reply.status(201).send()
  })

  app.put('/:id', async (request, reply) => {
    const { userId } = request.cookies as Cookies
    const { id } = getMealIdParamSchema.parse(request.params)

    const body = saveMealBodySchema.parse(request.body)

    await updateMeal(body, id, userId)

    return reply.status(201).send()
  })

  app.delete('/:id', async (request, reply) => {
    const { userId } = request.cookies as Cookies
    const { id } = getMealIdParamSchema.parse(request.params)

    await deleteMealById(id, userId)

    return reply.status(200).send()
  })
}
