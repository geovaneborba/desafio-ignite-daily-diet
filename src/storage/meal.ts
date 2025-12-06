import AsyncStorage from '@react-native-async-storage/async-storage'
import { MealDTO } from '@dtos/MealDTO'

import { MEALS_COLLECTION } from './storageConfig'

export async function createNewMeal(newMeal: MealDTO) {
  try {
    const meals = await getAllMeals()

    await AsyncStorage.setItem(
      MEALS_COLLECTION,
      JSON.stringify([...meals, newMeal])
    )
  } catch (error) {
    console.log('create new meal error:', error)
    throw error
  }
}

export async function getAllMeals() {
  try {
    const storageMeals = await AsyncStorage.getItem(MEALS_COLLECTION)

    if (!storageMeals) {
      return []
    }

    return JSON.parse(storageMeals) as MealDTO[]
  } catch (error) {
    throw error
  }
}

export async function getMealById(id: string) {
  try {
    const meals: MealDTO[] = await getAllMeals()

    const foundMeal = meals.find((meal) => meal.id === id)

    if (!foundMeal) {
      throw new Error('Meal not found')
    }

    return foundMeal
  } catch (error) {
    throw error
  }
}

export async function removeMealById(id: string) {
  try {
    const meals = await getAllMeals()

    const mealExists = meals.some((meal) => meal.id === id)

    if (!mealExists) {
      throw new Error('Meal not found')
    }

    const updatedMeals = meals.filter((meal: MealDTO) => meal.id !== id)

    await AsyncStorage.setItem(MEALS_COLLECTION, JSON.stringify(updatedMeals))
  } catch (error) {
    throw error
  }
}

export async function updateMealById(updateMeal: Partial<MealDTO>) {
  try {
    const meals = await getAllMeals()

    if (!meals.length) {
      throw new Error('No meals to update')
    }

    if (!updateMeal.id) {
      throw new Error('Meal ID is required for update')
    }

    const updatedMeals = meals.map((meal: MealDTO) => {
      const updatedMeal = { ...meal, ...updateMeal, id: meal.id }

      return meal.id === updateMeal.id ? updatedMeal : meal
    })

    await AsyncStorage.setItem(MEALS_COLLECTION, JSON.stringify(updatedMeals))
  } catch (error) {
    throw error
  }
}
