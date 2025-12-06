import { View } from 'react-native'
import styled from 'styled-components/native'

export const FormGroup = styled(View)`
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

export const FormWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  position: relative;
`
