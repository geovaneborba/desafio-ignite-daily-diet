import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { ScreenHeader } from '@components/ScreenHeader'
import {
  Container,
  Content,
  DateAndHourSubtitle,
  DateAndHourTitle,
  IconDelete,
  IconEdit,
  ModalButton,
  ModalButtonText,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalWrapperButton,
  Subtitle,
  Tag,
  TagStatusIcon,
  TagText,
  Title,
  Wrapper,
} from './styles'

import { Button } from '@components/Button'
import { useCallback, useState } from 'react'

import { formatDateToString } from '@utils/format-date-to-string'
import { formatTimeToString } from '@utils/format-time-to-string'
import { Modal } from 'react-native'
import { getMealById, removeMealById } from '@storage/meal'
import { MealDTO } from '@dtos/MealDTO'
import { NavigationHandler } from '@routes/app.routes'

type RouteParamsProps = {
  mealId: string
}

export function Meal() {
  const [meal, setMeal] = useState<MealDTO>()
  const [isOpenModal, setIsOpenModal] = useState(false)

  const navigation = useNavigation()
  const route = useRoute()
  const { mealId } = route.params as RouteParamsProps

  const handleNavigate: NavigationHandler = (screenName, params?) => {
    navigation.navigate(screenName, params)
  }

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state)
  }

  const handleRemoveMeal = async (mealId: string) => {
    try {
      await removeMealById(mealId)

      handleNavigate('home')
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          const meal = await getMealById(mealId)

          setMeal(meal)
        } catch (error) {
          console.log(error)
        }
      }

      fetchData()
    }, [mealId])
  )

  return (
    <Container variant={meal?.diet === 'inside' ? 'primary' : 'secondary'}>
      <ScreenHeader
        title="Refeição"
        onNavigate={() => handleNavigate('home')}
        variant={meal?.diet === 'inside' ? 'primary' : 'secondary'}
      />

      <Content>
        <Title>{meal?.name}</Title>
        <Subtitle>{meal?.description}</Subtitle>

        <DateAndHourTitle>Data e hora</DateAndHourTitle>
        <DateAndHourSubtitle>
          {formatDateToString(new Date(meal?.date))} ás {''}
          {formatTimeToString(new Date(meal?.hour))}
        </DateAndHourSubtitle>

        <Tag>
          <TagStatusIcon
            variant={meal?.diet === 'inside' ? 'primary' : 'secondary'}
          />
          <TagText>
            {meal?.diet === 'inside' ? 'dentro da dieta' : 'fora da dieta'}
          </TagText>
        </Tag>

        <Wrapper>
          <Button
            title="Editar refeição"
            variant="primary"
            onPress={() => handleNavigate('updateMeal', { mealId: mealId })}
          >
            <IconEdit />
          </Button>

          <Button
            title="Excluir refeição"
            variant="secondary"
            onPress={handleToggleModal}
          >
            <IconDelete />
          </Button>
        </Wrapper>
      </Content>

      <Modal
        animationType="fade"
        visible={isOpenModal}
        transparent
        onRequestClose={handleToggleModal}
      >
        <ModalContainer onPress={handleToggleModal}>
          <ModalContent>
            <ModalTitle>
              Deseja realmente excluir o registro da refeição?
            </ModalTitle>

            <ModalWrapperButton>
              <ModalButton variant="primary" onPress={handleToggleModal}>
                <ModalButtonText variant="primary">Cancelar</ModalButtonText>
              </ModalButton>

              <ModalButton
                variant="secondary"
                onPress={() => handleRemoveMeal(mealId)}
              >
                <ModalButtonText variant="secondary">
                  Sim, excluir
                </ModalButtonText>
              </ModalButton>
            </ModalWrapperButton>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
  )
}
