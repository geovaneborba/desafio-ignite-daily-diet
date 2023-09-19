import AsyncStorage from '@react-native-async-storage/async-storage'
import { MealDTO } from '@dtos/MealDTO'

import { MEALS_COLLECTION } from './storageConfig'

export async function createNewMeal(meal: MealDTO) {
  try {
    const meals = await getAllMeals()

    await AsyncStorage.setItem(
      MEALS_COLLECTION,
      JSON.stringify([...meals, meal])
    )
  } catch (error) {
    throw error
  }
}

export async function getAllMeals() {
  try {
    const storageMeals = await AsyncStorage.getItem(MEALS_COLLECTION)

    const meals = storageMeals ? JSON.parse(storageMeals) : []

    return meals
  } catch (error) {
    throw error
  }
}

export async function getMealById(id: string) {
  try {
    const meals: MealDTO[] = await getAllMeals()

    const foundMeal = meals.find((meal) => meal.id === id)

    if (foundMeal) {
      return foundMeal
    }
  } catch (error) {
    throw error
  }
}

export async function removeMealById(id: string) {
  try {
    const meals = await getAllMeals()

    const storage = meals.filter((meal: MealDTO) => meal.id !== id)

    await AsyncStorage.setItem(MEALS_COLLECTION, JSON.stringify(storage))
  } catch (error) {
    throw error
  }
}

export async function updateMealById(updateMeal: MealDTO) {
  try {
    const meals = await getAllMeals()

    const updateMeals = meals.map((meal: MealDTO) => {
      if (meal.id === updateMeal.id) {
        return {
          ...updateMeal,
          id: meal.id,
        }
      } else {
        return meal
      }
    })

    await AsyncStorage.setItem(MEALS_COLLECTION, JSON.stringify(updateMeals))
  } catch (error) {
    throw error
  }
}
