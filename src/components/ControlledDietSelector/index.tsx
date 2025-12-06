import { TextInputProps } from 'react-native'
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'
import { FormGroup, FormWrapper, Label } from './styles'
import { ButtonDiet } from '@components/ButtonDiet'
import { InputErrorText } from '@components/InputErrorText'

type ControlledDietSelectorProps<TFieldValues extends FieldValues> =
  TextInputProps & {
    control: Control<TFieldValues>
    name: Path<TFieldValues>
    label: string
    error?: FieldError
  }

export function ControlledDietSelector<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  error,
  ...rest
}: ControlledDietSelectorProps<TFieldValues>) {
  return (
    <FormGroup>
      <Label>{label}</Label>

      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <FormWrapper style={{ gap: 8 }}>
            <ButtonDiet
              type="primary"
              title="Sim"
              onPress={() => onChange('inside')}
              options={value === 'inside' ? 'inside' : null}
            />

            <ButtonDiet
              type="secondary"
              title="Não"
              onPress={() => onChange('outside')}
              options={value === 'outside' ? 'outside' : null}
            />
          </FormWrapper>
        )}
      />

      {error && <InputErrorText>{error.message}</InputErrorText>}
    </FormGroup>
  )
}
