import { it, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { app } from '../src/app'

describe('Meals  routes', () => {
  const userId = randomUUID()
  const cookies = [`userId=${userId};Max-Age=84000;Path=/`]

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new meal', async () => {
    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Test meal',
        description: 'Test description',
        dateTime: new Date().toISOString(),
        isInDiet: true,
      })
      .expect(201)
  })

  it('should be able to list all meals', async () => {
    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Test meal',
        description: 'Test description',
        dateTime: new Date().toISOString(),
        isInDiet: true,
      })
      .expect(201)

    const listMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    expect(listMealsResponse.body.meals).toEqual([
      expect.objectContaining({
        name: 'Test meal',
        description: 'Test description',
      }),
    ])
  })

  it('should be able to get a specific meals', async () => {
    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Test meal',
        description: 'Test description',
        dateTime: new Date().toISOString(),
        isInDiet: true,
      })
      .expect(201)

    const listMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    const mealId = listMealsResponse.body.meals[0].id

    const getMealByIdResponse = await request(app.server)
      .get(`/meals/${mealId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getMealByIdResponse.body).toEqual(
      expect.objectContaining({
        name: 'Test meal',
        description: 'Test description',
      }),
    )
  })

  it('should be able to get metrics', async () => {
    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Test meal',
        description: 'Test description',
        dateTime: new Date().toISOString(),
        isInDiet: true,
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Test meal not in diet',
        description: 'Test description not in diet',
        dateTime: new Date().toISOString(),
        isInDiet: false,
      })
      .expect(201)

    const mealsMetricsResponse = await request(app.server)
      .get('/meals/metrics')
      .set('Cookie', cookies)
      .expect(200)

    console.log(mealsMetricsResponse)

    expect(mealsMetricsResponse.body).toEqual({
      totalMeals: 2,
      totalMealsInDiet: 1,
      totalMealsOutDiet: 1,
      bestOnDietSequenceTotal: 1,
    })
  })
})
