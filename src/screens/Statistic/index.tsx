import { View } from 'react-native'
import { StatisticCard } from '../../components/StatisticCard'
import {
  Container,
  Statistics,
  StatisticsContainer,
  StatisticsTitle,
} from './styles'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Wrapper } from '../../components/StatisticCard/styles'
import { useCallback, useState } from 'react'
import { getAllMeals } from '@storage/meal'
import { MealDTO } from '@dtos/MealDTO'
import { ScreenHeader } from '@components/ScreenHeader'
import { MealStatisticDTO } from '@dtos/MealStatisticDTO'
import { formatTotalMealsDiet } from '@utils/format-total-meals-diet'
import { NavigationHandler, RootStackParamList } from '@routes/app.routes'

export function Statistic() {
  const [statistics, setStatistics] = useState<MealStatisticDTO>(
    {} as MealStatisticDTO
  )

  const navigation = useNavigation()

  const handleNavigate: NavigationHandler = (screenName, params?) => {
    navigation.navigate(screenName, params)
  }

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const meals = await getAllMeals()

        const result = meals.reduce(
          (acc: MealStatisticDTO, meal: MealDTO) => {
            if (meal.diet === 'inside') {
              acc.mealsInsideDiet += 1
              acc.currentSequence += 1
              acc.bestSequence = Math.max(acc.bestSequence, acc.currentSequence)
            } else {
              acc.mealsOutsideDiet += 1
              acc.bestSequence = Math.max(acc.bestSequence, acc.currentSequence)
              acc.currentSequence = 0
            }

            acc.totalMeals += 1

            return acc
          },
          {
            mealsOutsideDiet: 0,
            mealsInsideDiet: 0,
            totalMeals: 0,
            currentSequence: 0,
            bestSequence: 0,
          } as MealStatisticDTO
        )

        setStatistics(result)
      }

      fetchData()
    }, [])
  )

  return (
    <Container>
      <ScreenHeader
        mealStatistic={statistics}
        onNavigate={() => handleNavigate('home')}
        variant={
          Number(formatTotalMealsDiet(statistics)) >= 50
            ? 'primary'
            : 'secondary'
        }
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
