import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'

import {
  Container,
  Content,
  Form,
  FormGroup,
  FormGroupPicker,
  FormWrapper,
  Input,
  Label,
  ScrollableView,
} from './styles'

import DateTimePicker from '@react-native-community/datetimepicker'
import { useCallback, useEffect, useState } from 'react'
import { Alert, Pressable, ScrollView } from 'react-native'
import { Button } from '../../components/Button'
import { ButtonDiet } from '../../components/ButtonDiet'

import { ScreenHeader } from '../../components/ScreenHeader'
import { MealDTO } from '@dtos/MealDTO'
import { getMealById, updateMealById } from '@storage/meal'

import { formatDateToString } from '@utils/format-date-to-string'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { formatTimeToString } from '@utils/format-time-to-string'
import { Controller, useForm } from 'react-hook-form'
import { Loading } from '@components/Loading'
import { InputErrorText } from '@components/InputErrorText'
import { NavigationHandler, RootStackParamList } from '@routes/app.routes'

type UpdateMealForm = yup.InferType<typeof updateMealSchema>

const updateMealSchema = yup.object({
  name: yup.string().required('Informe o nome da refeição'),
  description: yup.string(),
  date: yup.date().required('Informe uma data'),
  hour: yup.date().required('Informe um horário'),
  diet: yup.string().required('Escolha uma opção').oneOf(['inside', 'outside']),
})

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
  } = useForm<UpdateMealForm>({
    resolver: yupResolver(updateMealSchema),
  })

  const route = useRoute()
  const { mealId } = route.params as RouteParamsProps

  const navigation = useNavigation()

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [date, setDate] = useState(new Date())

  const [showTimePicker, setShowTimePicker] = useState(false)
  const [time, setTime] = useState(new Date())

  const handleTogglePicker = (type: 'datepicker' | 'timepicker') => {
    return type === 'datepicker'
      ? setShowDatePicker((state) => !state)
      : setShowTimePicker((state) => !state)
  }

  const handleNavigate: NavigationHandler = (screenName, params?) => {
    navigation.navigate(screenName, params)
  }

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date

      setShowDatePicker(false)
      setDate(currentDate)
      setValue('date', currentDate)
    } else {
      setShowDatePicker(false)
    }
  }

  const handleTimeChange = (event, selectedTime) => {
    if (event.type === 'set') {
      const currentTime = selectedTime || time

      setShowTimePicker(false)
      setTime(currentTime)
      setValue('hour', currentTime)
    } else {
      setShowTimePicker(false)
    }
  }

  const handleUpdate = async (data: MealDTO) => {
    try {
      const updateMeal: MealDTO = {
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
        for (const [key, value] of Object.entries(meal)) {
          setValue(key, value)
        }
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
          onNavigate={() => handleNavigate('home')}
          title="Editar Refeição"
          variant="base"
        />

        {isLoading ? (
          <Loading />
        ) : (
          <Form>
            <FormGroup>
              <Label>Nome</Label>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <>
                    <Input value={value} onChangeText={onChange} />
                    {errors.name && (
                      <InputErrorText>{errors.name.message}</InputErrorText>
                    )}
                  </>
                )}
              />
            </FormGroup>

            <FormGroup>
              <Label>Descrição</Label>
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    multiline={true}
                    numberOfLines={4}
                  />
                )}
              />
            </FormGroup>

            <FormWrapper>
              <FormGroupPicker>
                <Label>Data</Label>

                {showDatePicker && (
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={handleDateChange}
                  />
                )}
                <Pressable onPress={() => handleTogglePicker('datepicker')}>
                  <Controller
                    control={control}
                    name="date"
                    render={({ field: { value } }) => (
                      <Input
                        editable={false}
                        value={formatDateToString(new Date(value))}
                      />
                    )}
                  />
                </Pressable>
              </FormGroupPicker>

              <FormGroupPicker>
                <Label>Hora</Label>

                {showTimePicker && (
                  <DateTimePicker
                    mode="time"
                    display="spinner"
                    value={time}
                    onChange={handleTimeChange}
                  />
                )}

                <Pressable onPress={() => handleTogglePicker('timepicker')}>
                  <Controller
                    control={control}
                    name="hour"
                    render={({ field: { value } }) => (
                      <Input
                        editable={false}
                        value={formatTimeToString(new Date(value))}
                      />
                    )}
                  />
                </Pressable>
              </FormGroupPicker>
            </FormWrapper>

            <FormGroup>
              <Label>Está dentro da dieta?</Label>

              <FormWrapper style={{ gap: 8 }}>
                <Controller
                  control={control}
                  name="diet"
                  render={({ field: { value } }) => (
                    <ButtonDiet
                      type="primary"
                      title="Sim"
                      onPress={() => {
                        setValue('diet', 'inside')
                        clearErrors('diet')
                      }}
                      options={value === 'inside' ? 'inside' : null}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="diet"
                  render={({ field: { value } }) => (
                    <ButtonDiet
                      type="secondary"
                      title="Não"
                      onPress={() => {
                        setValue('diet', 'outside')
                        clearErrors('diet')
                      }}
                      options={value === 'outside' ? 'outside' : null}
                    />
                  )}
                />
              </FormWrapper>
            </FormGroup>

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
