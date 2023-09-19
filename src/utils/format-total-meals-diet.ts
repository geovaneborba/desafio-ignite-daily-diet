import { MealStatisticDTO } from '@dtos/MealStatisticDTO'

export function formatTotalMealsDiet(mealStatistic: MealStatisticDTO) {
  const { totalMeals, mealsOutsideDiet } = mealStatistic

  return totalMeals === 0
    ? '0'
    : String(
        (((totalMeals - mealsOutsideDiet) / totalMeals) * 100).toFixed(2)
      ).padEnd(2, '0')
}
