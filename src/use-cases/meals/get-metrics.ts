import { knex } from '../../database'

export async function getMetrics(userId: string) {
  const meals = await knex('meals').where({
    user_id: userId,
  })

  const totalMealsInDiet = meals.filter((meal) => meal.is_in_diet).length
  const totalMealsOutDiet = meals.filter((meal) => !meal.is_in_diet).length
  const { bestOnDietSequenceTotal } = meals.reduce(
    (acc, meal) => {
      if (meal.is_in_diet) {
        acc.currentSequence += 1
      } else {
        acc.currentSequence = 0
      }

      if (acc.currentSequence > acc.bestOnDietSequenceTotal) {
        acc.bestOnDietSequenceTotal = acc.currentSequence
      }

      return acc
    },
    { bestOnDietSequenceTotal: 0, currentSequence: 0 },
  )

  return {
    totalMeals: meals.length,
    totalMealsInDiet,
    totalMealsOutDiet,
    bestOnDietSequenceTotal,
  }
}
