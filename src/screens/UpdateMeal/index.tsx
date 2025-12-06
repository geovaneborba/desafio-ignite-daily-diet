import { useNavigation, useRoute } from '@react-navigation/native'

import {
  Container,
  Form,
  FormGroupPicker,
  FormWrapper,
  Label,
  ScrollableView,
} from './styles'

import { useEffect, useState } from 'react'
import { Button } from '../../components/Button'

import { ScreenHeader } from '../../components/ScreenHeader'
import { MealDTO } from '@dtos/MealDTO'
import { getMealById, updateMealById } from '@storage/meal'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Loading } from '@components/Loading'
import { ControlledInput } from '@components/ControlledInput'
import { ControlledDateTimePicker } from '@components/ControlledDateTimePicker'
import { ControlledDietSelector } from '@components/ControlledDietSelector'

const updateMealSchema = yup.object({
  id: yup.string().uuid(),
  name: yup.string().required('Informe o nome da refeição'),
  description: yup.string(),
  date: yup.date().required('Informe uma data'),
  hour: yup.date().required('Informe um horário'),
  diet: yup
    .string()
    .required('Escolha uma opção')
    .oneOf(['inside', 'outside'], 'Escolha uma opção'),
})

type UpdateMealFormData = yup.InferType<typeof updateMealSchema>

type RouteParamsProps = {
  mealId: string
}

export function UpdateMeal() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<UpdateMealFormData>({
    resolver: yupResolver(updateMealSchema),
  })

  const route = useRoute()
  const { mealId } = route.params as RouteParamsProps

  const navigation = useNavigation()

  const handleUpdate = async (data: Partial<MealDTO>) => {
    try {
      const updateMeal: Partial<MealDTO> = {
        ...data,
      }

      await updateMealById(updateMeal)

      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const meal = await getMealById(mealId)

      if (meal) {
        setValue('id', meal.id)
        setValue('name', meal.name)
        setValue('description', meal.description)
        setValue('date', meal.date)
        setValue('hour', meal.hour)
        setValue('diet', meal.diet)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ScrollableView showsVerticalScrollIndicator={false}>
      <Container>
        <ScreenHeader
          onNavigate={() => navigation.navigate('home')}
          title="Editar Refeição"
          variant="base"
        />

        {isLoading ? (
          <Loading />
        ) : (
          <Form>
            <ControlledInput
              control={control}
              name="name"
              label="Nome"
              error={errors.name}
            />

            <ControlledInput
              control={control}
              name="description"
              label="Descrição"
              error={errors.description}
              placeholder="opcional"
            />

            <FormWrapper>
              <FormGroupPicker>
                <Label>Data</Label>
                <ControlledDateTimePicker
                  control={control}
                  name="date"
                  mode="date"
                  error={errors.date}
                />
              </FormGroupPicker>

              <FormGroupPicker>
                <Label>Hora</Label>
                <ControlledDateTimePicker
                  control={control}
                  name="hour"
                  mode="time"
                  error={errors.hour}
                />
              </FormGroupPicker>
            </FormWrapper>

            <ControlledDietSelector
              control={control}
              name="diet"
              label="Está dentro da dieta?"
              error={errors.diet}
            />

            <Button
              title="Salvar alterações"
              variant="primary"
              onPress={handleSubmit(handleUpdate)}
              style={{ marginTop: 'auto', marginBottom: 8 }}
            />
          </Form>
        )}
      </Container>
    </ScrollableView>
  )
}
