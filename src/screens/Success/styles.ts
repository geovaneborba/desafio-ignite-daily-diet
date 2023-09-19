import { SafeAreaView } from 'react-native-safe-area-context'
import { styled } from 'styled-components/native'
import { Image } from 'react-native'

export const Container = styled(SafeAreaView)`
  background-color: ${(props) => props.theme.colors['gray-7']};
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  color: ${(props) => props.theme.colors['green-dark']};
  font-size: ${(props) => props.theme.fontSize.xl};
  font-family: ${(props) => props.theme.fontFamily.bold};
  margin-bottom: 8px;
`

export const Subtitle = styled.Text`
  color: ${(props) => props.theme.colors['gray-1']};
  font-size: ${(props) => props.theme.fontSize.base};
  font-family: ${(props) => props.theme.fontFamily.regular};
`

export const TextBold = styled.Text`
  color: ${(props) => props.theme.colors['gray-1']};
  font-size: ${(props) => props.theme.fontSize.base};
  font-family: ${(props) => props.theme.fontFamily.bold};
`

export const HappyImage = styled(Image)`
  margin-top: 40px;
  margin-bottom: 32px;
`
