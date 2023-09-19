import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, View } from 'react-native'

export const ScrollableView = styled(ScrollView).attrs((props) => ({
  contentContainerStyle: { flexGrow: 1 },
}))``

export const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors['gray-5']};
`

export const Form = styled(View)`
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  flex: 1;
  padding: 40px 24px;
  row-gap: 24px;
  background-color: ${(props) => props.theme.colors['gray-7']};
`

export const FormGroup = styled.View`
  row-gap: 4px;
`

export const Label = styled.Text`
  font-size: ${(props) => props.theme.fontSize.md};
  font-family: ${(props) => props.theme.fontFamily.bold};
  color: ${(props) => props.theme.colors['gray-2']};
`

export const Input = styled.TextInput.attrs(() => ({
  textAlignVertical: 'top',
}))`
  font-size: ${(props) => props.theme.fontSize.lg};
  font-family: ${(props) => props.theme.fontFamily.regular};
  color: ${(props) => props.theme.colors['gray-1']};
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors['gray-5']};
  padding: 12px;
`

export const FormWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
`

export const FormGroupPicker = styled.View`
  row-gap: 4px;
  flex: 1;
`
