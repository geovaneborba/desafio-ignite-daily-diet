import { TextInputProps } from 'react-native'
import {
  Control,
  Controller,
  Path,
  FieldError,
  FieldValues,
} from 'react-hook-form'

import { FormGroup, Label, Input } from './styles'
import { InputErrorText } from '@components/InputErrorText'

type ControlledInputProps<TFieldValues extends FieldValues> = TextInputProps & {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  label: string
  error?: FieldError
}

export function ControlledInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  error,
  ...rest
}: ControlledInputProps<TFieldValues>) {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur } }) => (
          <>
            <Input
              value={value ? String(value) : ''}
              onChangeText={onChange}
              onBlur={onBlur}
              {...rest}
            />
            {error && <InputErrorText>{error.message}</InputErrorText>}
          </>
        )}
      />
    </FormGroup>
  )
}
