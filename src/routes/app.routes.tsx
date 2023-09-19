import { Home } from '@screens/Home'
import { Statistic } from '@screens/Statistic'
import { RegisterMeal } from '@screens/RegisterMeal'
import { Success } from '@screens/Success'
import { Meal } from '@screens/Meal'
import { UpdateMeal } from '@screens/UpdateMeal'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

type RootStackParamList = {
  home: undefined
  statistic: undefined
  registerMeal: undefined
  success: { isInsideDiet: boolean }
  meal: { mealId: string }
  updateMeal: { mealId: string }
}

export interface NavigationHandler {
  <T extends keyof RootStackParamList>(
    screenName: T,
    params?: RootStackParamList[T]
  ): void
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="statistic" component={Statistic} />
      <Screen name="registerMeal" component={RegisterMeal} />
      <Screen name="success" component={Success} />
      <Screen name="meal" component={Meal} />
      <Screen name="updateMeal" component={UpdateMeal} />
    </Navigator>
  )
}
