import { useState } from 'react'
import { Pressable } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import {
  Container,
  Content,
  Form,
  FormGroup,
  FormGroupPicker,
  FormWrapper,
  Label,
  Input,
  ScrollView,
  ScrollableView,
} from './styles'

import { Button } from '@components/Button'
import { ButtonDiet } from '@components/ButtonDiet'
import { createNewMeal } from '@storage/meal'
import { ScreenHeader } from '@components/ScreenHeader'
import { yupResolver } from '@hookform/resolvers/yup'
import uuid from 'react-native-uuid'

type RegisterMealForm = yup.InferType<typeof registerMealSchema>

const registerMealSchema = yup.object({
  name: yup.string().required('Informe o nome da refeição'),
  description: yup.string(),
  date: yup.date().required('Informe uma data'),
  hour: yup.date().required('Informe um horário'),
  diet: yup
    .string()
    .required('Escolha uma opção')
    .oneOf(['inside', 'outside'], 'Escolha uma opção'),
})
import { InputErrorText } from '@components/InputErrorText'
import { MealDTO } from 'src/dtos/MealDTO'
import { formatDateToString } from '@utils/format-date-to-string'
import { formatTimeToString } from '@utils/format-time-to-string'
import { NavigationHandler, RootStackParamList } from '@routes/app.routes'

export function RegisterMeal() {
  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterMealForm>({
    resolver: yupResolver(registerMealSchema),
    defaultValues: {
      name: '',
      description: '',
      date: undefined,
      hour: undefined,
      diet: '',
    },
  })

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [date, setDate] = useState(new Date())

  const [showTimePicker, setShowTimePicker] = useState(false)
  const [time, setTime] = useState(new Date())

  const navigation = useNavigation()

  const togglePicker = (type: 'datepicker' | 'timepicker') => {
    return type === 'datepicker'
      ? setShowDatePicker((state) => !state)
      : setShowTimePicker((state) => !state)
  }

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate: Date = selectedDate || date

      setShowDatePicker(false)
      setDate(currentDate)
      setValue('date', currentDate)
      clearErrors('date')
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
      clearErrors('hour')
    } else {
      setShowTimePicker(false)
    }
  }

  const handleNavigate: NavigationHandler = (screenName, params?) => {
    navigation.navigate(screenName, params)
  }

  const onSubmit = async (data: RegisterMealForm) => {
    try {
      const meal: MealDTO = {
        ...data,
        id: uuid.v4() as string,
        created_at: new Date(),
      }

      await createNewMeal(meal)

      navigation.navigate('success', {
        diet: data.diet === 'inside' ? 'inside' : 'outside',
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollableView showsVerticalScrollIndicator={false}>
      <Container>
        <ScreenHeader
          onNavigate={() => handleNavigate('home')}
          title="Nova refeição"
          variant="base"
        />

        <Form>
          <FormGroup>
            <Label>Nome</Label>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
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
              render={({ field: { value, onChange } }) => (
                <>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="opcional"
                  />
                  {errors.description && (
                    <InputErrorText>
                      {errors.description.message}
                    </InputErrorText>
                  )}
                </>
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
              <Pressable onPress={() => togglePicker('datepicker')}>
                <Controller
                  control={control}
                  name="date"
                  render={({ field: { value } }) => (
                    <>
                      <Input
                        editable={false}
                        value={value ? formatDateToString(value) : ''}
                      />
                      {errors.date && (
                        <InputErrorText>{errors.date.message}</InputErrorText>
                      )}
                    </>
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

              <Pressable onPress={() => togglePicker('timepicker')}>
                <Controller
                  control={control}
                  name="hour"
                  render={({ field: { value } }) => (
                    <>
                      <Input
                        editable={false}
                        value={value ? formatTimeToString(value) : ''}
                      />
                      {errors.hour && (
                        <InputErrorText>{errors.hour.message}</InputErrorText>
                      )}
                    </>
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
            {errors.diet && (
              <InputErrorText>{errors.diet.message}</InputErrorText>
            )}
          </FormGroup>

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
