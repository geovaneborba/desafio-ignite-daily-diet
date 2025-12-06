import { useState } from 'react'
import { Platform, Pressable } from 'react-native'
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'

import { Input } from './styles'
import { formatDateToString } from '@utils/format-date-to-string'
import { formatTimeToString } from '@utils/format-time-to-string'
import { DateTimePickerIOS } from '@components/DateTimePickerIOS'
import { InputErrorText } from '@components/InputErrorText'

type Props<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  error?: FieldError
  mode: 'date' | 'time'
}

export function ControlledDateTimePicker<TFieldValues extends FieldValues>({
  control,
  name,
  error,
  mode,
}: Props<TFieldValues>) {
  const [isPickerVisible, setIsPickerVisible] = useState(false)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const currentDate =
          (value as unknown) instanceof Date ? value : new Date()

        const handleValueChange = (
          event: DateTimePickerEvent,
          selectedDate: Date | undefined
        ) => {
          if (Platform.OS === 'android') {
            setIsPickerVisible(false)
          }

          if (event.type === 'set' && selectedDate) {
            onChange(selectedDate)
          }
        }

        const formattedValue =
          mode === 'date'
            ? formatDateToString(currentDate)
            : formatTimeToString(currentDate)

        return (
          <>
            <Pressable onPress={() => setIsPickerVisible(true)}>
              <Input
                editable={false}
                value={formattedValue}
                onPressIn={() =>
                  Platform.OS === 'ios' ? setIsPickerVisible(true) : null
                }
              />
            </Pressable>

            {error && <InputErrorText>{error.message}</InputErrorText>}

            {/* Android Picker */}
            {Platform.OS === 'android' && isPickerVisible && (
              <DateTimePicker
                mode={mode}
                display="spinner"
                value={currentDate}
                onChange={handleValueChange}
                is24Hour
              />
            )}

            {/* IOS Picker Modal */}
            <DateTimePickerIOS
              showPicker={isPickerVisible}
              onClose={() => setIsPickerVisible(false)}
              mode={mode}
              value={currentDate}
              onChange={handleValueChange}
            />
          </>
        )
      }}
    />
  )
}
