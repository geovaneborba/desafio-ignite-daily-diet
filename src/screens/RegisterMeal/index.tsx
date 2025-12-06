import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import {
  Container,
  Form,
  FormGroupPicker,
  FormWrapper,
  Label,
  ScrollableView,
} from './styles'

import { Button } from '@components/Button'
import { createNewMeal } from '@storage/meal'
import { ScreenHeader } from '@components/ScreenHeader'

import uuid from 'react-native-uuid'

const registerMealSchema = yup.object({
  id: yup.string().uuid(),
  name: yup.string().required('Informe o nome da refeição'),
  description: yup.string(),
  date: yup.date().required('Informe uma data'),
  hour: yup.date().required('Informe um horário'),
  diet: yup
    .string()
    .required('Escolha uma opção')
    .oneOf(['inside', 'outside'], 'Escolha uma opção'),
  createdAt: yup.date().required(),
})

export type RegisterMealFormData = yup.InferType<typeof registerMealSchema>

import { MealDTO } from '@dtos/MealDTO'

import { ControlledInput } from '@components/ControlledInput'
import { ControlledDietSelector } from '@components/ControlledDietSelector'
import { ControlledDateTimePicker } from '@components/ControlledDateTimePicker'

export function RegisterMeal() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterMealFormData>({
    resolver: yupResolver(registerMealSchema),
    defaultValues: {
      id: uuid.v4().toString(),
      name: '',
      description: '',
      date: new Date(),
      hour: new Date(),
      diet: '',
      createdAt: new Date(),
    },
  })

  const navigation = useNavigation()

  const onSubmit = async (data: MealDTO) => {
    try {
      await createNewMeal(data)

      navigation.navigate('success', {
        isInsideDiet: data.diet === 'inside' ? true : false,
      })
    } catch (error) {
      console.log('register meal error:', error)
    }
  }

  return (
    <ScrollableView showsVerticalScrollIndicator={false}>
      <Container>
        <ScreenHeader
          onNavigate={() => navigation.navigate('home')}
          title="Nova refeição"
          variant="base"
        />

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
            variant="primary"
            onPress={handleSubmit(onSubmit)}
            title="Cadastrar refeição"
            style={{ marginTop: 'auto', marginBottom: 8 }}
          />
        </Form>
      </Container>
    </ScrollableView>
  )
}
