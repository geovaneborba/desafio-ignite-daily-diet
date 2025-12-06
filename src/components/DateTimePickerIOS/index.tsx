import { Modal, Platform, Pressable } from 'react-native'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'

import {
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalButtonText,
} from './styles'

interface DateTimePickerIOSProps {
  showPicker: boolean
  onClose: () => void
  value: Date
  mode: 'date' | 'time'
  onChange: (event: DateTimePickerEvent, selectedDate?: Date) => void
}

export function DateTimePickerIOS({
  showPicker,
  onClose,
  value,
  mode,
  onChange,
}: DateTimePickerIOSProps) {
  if (Platform.OS !== 'ios') {
    return null
  }

  return (
    <Modal visible={showPicker} transparent animationType="fade">
      <ModalOverlay onPress={onClose}>
        <ModalContent>
          <DateTimePicker
            value={value}
            mode={mode}
            display="spinner"
            onChange={onChange}
            is24Hour
          />
          <ModalFooter>
            <Pressable onPress={onClose}>
              <ModalButtonText>Confirmar</ModalButtonText>
            </Pressable>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}
