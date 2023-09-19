import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Image, Pressable, SectionList, View, Text } from 'react-native'
import { useTheme } from 'styled-components/native'
import * as ImagePicker from 'expo-image-picker'
import { TouchableOpacity } from 'react-native'
import { Camera } from 'phosphor-react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import {
  ArrowUpRightIcon,
  Container,
  DietStatistics,
  DietStatisticsSubtitle,
  DietStatisticsTitle,
  EmptyMeals,
  EmptyText,
  Header,
  Icon,
  Meals,
  MealsTitle,
} from './styles'

import { Button } from '@components/Button'
import { MealCard } from '@components/MealCard'
import { MealCardHeader } from '@components/MealCard/styles'
import { Loading } from '@components/Loading'

import dailyDietLogo from '@assets/logo.png'

import { formatDateToString } from '@utils/format-date-to-string'
import { formatTotalMealsDiet } from '@utils/format-total-meals-diet'
import { getAllMeals } from '@storage/meal'
import { MealDTO } from '@dtos/MealDTO'

import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MEALS_COLLECTION, USER_COLLECTION } from '@storage/storageConfig'
import { createNewUserAvatar, getUserAvatar } from '@storage/userAvatar'
import { NavigationHandler, RootStackParamList } from '@routes/app.routes'

type MealsData = {
  [key: string]: {
    title: string
    data: MealDTO[]
  }
}

type StatisticsData = {
  mealsOutsideDiet: number
  totalMeals: number
}

async function removeStorage() {
  await AsyncStorage.removeItem(MEALS_COLLECTION)
}

export function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [meals, setMeals] = useState<MealsData[]>([])
  const [image, setImage] = useState('')
  const [statistics, setStatistics] = useState<StatisticsData>(
    {} as StatisticsData
  )

  const { colors } = useTheme()
  const navigation = useNavigation()

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (!result.canceled) {
        setImage(result.assets[0].uri)
        await createNewUserAvatar(result.assets[0].uri)
      }
    } catch (error) {
      if (error instanceof AppError) {
        console.log('Ocorreu um ao salvar avatar no storage')
      }
    }
  }

  const handleNavigate: NavigationHandler = (screenName, params?) => {
    navigation.navigate(screenName, params)
  }

  const fetchData = async () => {
    const storageMeals = await getAllMeals()

    const groupedMeals = storageMeals.reduce(
      (acc: MealsData, meal: MealDTO) => {
        const title = formatDateToString(new Date(meal.created_at))

        if (!acc[title]) {
          acc[title] = { title, data: [] }
        }

        acc[title].data.push(meal)

        return acc
      },
      {}
    )

    setMeals(Object.values(groupedMeals))
  }

  const fetchStatistics = async () => {
    const storageMeals = await getAllMeals()

    const statisticData: StatisticsData = storageMeals.reduce(
      (acc: StatisticsData, meal: MealDTO) => {
        // total de refeições
        acc.totalMeals += 1

        if (meal.diet === 'outside') {
          acc.mealsOutsideDiet += 1
        }

        return acc
      },

      {
        totalMeals: 0,
        mealsOutsideDiet: 0,
      } as StatisticsData
    )

    setStatistics(statisticData)
  }

  const fetchUserAvatar = async () => {
    const storedAvatar = await getUserAvatar()

    if (storedAvatar) {
      setImage(storedAvatar)
    }
  }

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true)
      try {
        fetchData()
        fetchStatistics()
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Não foi possível carregar as refeições',
        })
      } finally {
        setIsLoading(false)
      }
    }, [])
  )

  useEffect(() => {
    setIsLoading(true)
    try {
      fetchUserAvatar()
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Não foi possível carregar o avatar',
      })
    } finally {
      setIsLoading(false)
    }
    fetchUserAvatar()
  }, [])

  return (
    <Container>
      <Header>
        <Image
          source={dailyDietLogo}
          alt="Imagem do logo da aplicação escrito Daily Diet"
        />

        {!image && (
          <TouchableOpacity onPress={() => handlePickImage()}>
            <Camera size={24} />
          </TouchableOpacity>
        )}

        {image && (
          <Pressable onPress={() => handlePickImage()}>
            <Image
              source={{
                uri: image,
              }}
              style={{
                borderWidth: 2,
                borderColor: colors['gray-2'],
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
              }}
            />
          </Pressable>
        )}
      </Header>

      <DietStatistics
        onPress={() => handleNavigate('statistic')}
        variant={
          Number(formatTotalMealsDiet(statistics)) >= 50
            ? 'primary'
            : 'secondary'
        }
      >
        <ArrowUpRightIcon
          color={
            Number(formatTotalMealsDiet(statistics)) >= 50
              ? colors['green-dark']
              : colors['red-dark']
          }
        />
        <DietStatisticsTitle>
          {formatTotalMealsDiet(statistics)}%
        </DietStatisticsTitle>
        <DietStatisticsSubtitle>
          das refeições dentro da dieta
        </DietStatisticsSubtitle>
      </DietStatistics>

      <Meals>
        <MealsTitle>Refeições</MealsTitle>
        <Button
          variant="primary"
          title="Nova refeição"
          onPress={() => handleNavigate('registerMeal')}
        >
          <Icon />
        </Button>

        {isLoading ? (
          <Loading />
        ) : (
          <SectionList
            sections={meals.reverse()}
            keyExtractor={(item) => item.id as string}
            renderItem={({ item }) => (
              <MealCard
                data={item}
                onPress={() => {
                  handleNavigate('meal', { mealId: item.id })
                }}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <MealCardHeader>{title as unknown as string}</MealCardHeader>
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <EmptyMeals>
                <EmptyText>
                  Que tal começar a registrar sua primeira refeição? Clique no
                  botão "Nova refeição" para começar.
                </EmptyText>
              </EmptyMeals>
            )}
          />
        )}
      </Meals>
    </Container>
  )
}
