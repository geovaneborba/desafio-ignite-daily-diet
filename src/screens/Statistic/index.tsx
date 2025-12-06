import { View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'

import { StatisticCard } from '@components/StatisticCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { Wrapper } from '@components/StatisticCard/styles'

import { getAllMeals } from '@storage/meal'
import { MealDTO } from '@dtos/MealDTO'
import { MealStatisticDTO } from '@dtos/MealStatisticDTO'
import { formatTotalMealsDiet } from '@utils/format-total-meals-diet'

import {
  Container,
  Statistics,
  StatisticsContainer,
  StatisticsTitle,
} from './styles'

export function Statistic() {
  const [statistics, setStatistics] = useState<MealStatisticDTO>(
    {} as MealStatisticDTO
  )
  const navigation = useNavigation()

  const calculateStatistics = (meals: MealDTO[]): MealStatisticDTO => {
    return meals.reduce(
      (accumulator: MealStatisticDTO, meal: MealDTO) => {
        const isInsideDiet = meal.diet === 'inside'

        if (isInsideDiet) {
          accumulator.mealsInsideDiet += 1
          accumulator.currentSequence += 1
          accumulator.bestSequence = Math.max(
            accumulator.bestSequence,
            accumulator.currentSequence
          )
        } else {
          accumulator.mealsOutsideDiet += 1
          accumulator.bestSequence = Math.max(
            accumulator.bestSequence,
            accumulator.currentSequence
          )
          accumulator.currentSequence = 0
        }

        accumulator.totalMeals += 1

        return accumulator
      },
      {
        mealsOutsideDiet: 0,
        mealsInsideDiet: 0,
        totalMeals: 0,
        currentSequence: 0,
        bestSequence: 0,
      } as MealStatisticDTO
    )
  }

  const fetchStatistics = useCallback(async () => {
    const meals = await getAllMeals()
    const calculatedStatistics = calculateStatistics(meals)
    setStatistics(calculatedStatistics)
  }, [])

  const getHeaderVariant = () => {
    const dietPercentage = Number(formatTotalMealsDiet(statistics))
    return dietPercentage >= 50 ? 'primary' : 'secondary'
  }

  useFocusEffect(
    useCallback(() => {
      fetchStatistics()
    }, [fetchStatistics])
  )

  return (
    <Container>
      <ScreenHeader
        mealStatistic={statistics}
        onNavigate={() => navigation.navigate('home')}
        variant={getHeaderVariant()}
      />

      <Statistics>
        <StatisticsTitle>Estatísticas gerais</StatisticsTitle>

        <StatisticsContainer>
          <StatisticCard
            title={String(statistics.bestSequence)}
            subtitle="melhor sequência de pratos dentro da dieta"
          />

          <StatisticCard
            title={String(statistics.totalMeals)}
            subtitle="refeições registradas"
          />

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Wrapper>
              <StatisticCard
                title={String(statistics.mealsInsideDiet)}
                subtitle="refeições dentro da dieta"
                size="sm"
                type="primary"
              />

              <StatisticCard
                title={String(statistics.mealsOutsideDiet)}
                subtitle="refeições fora da dieta"
                size="sm"
                type="secondary"
              />
            </Wrapper>
          </View>
        </StatisticsContainer>
      </Statistics>
    </Container>
  )
}
