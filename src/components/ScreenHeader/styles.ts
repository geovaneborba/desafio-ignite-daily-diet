import { ArrowLeft } from 'phosphor-react-native'
import styled, { css } from 'styled-components/native'
import Constants from 'expo-constants'

export type VariantType = 'primary' | 'secondary' | 'base'

type ContainerProps = {
  variant: VariantType
}

export const Container = styled.View<ContainerProps>`
  padding: ${Constants.statusBarHeight + 24}px 24px 24px;

  ${(props) => {
    switch (props.variant) {
      case 'primary': {
        return css`
          background-color: ${(props) => props.theme.colors['green-light']};
        `
      }

      case 'secondary': {
        return css`
          background-color: ${(props) => props.theme.colors['red-light']};
        `
      }

      case 'base': {
        return css`
          background-color: ${(props) => props.theme.colors['gray-5']};
        `
      }

      default: {
        break
      }
    }
  }};
`

export const ButtonWrapper = styled.View`
  flex-direction: row;
`

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
`

export const ArrowLeftIcon = styled(ArrowLeft).attrs((props) => ({
  size: 24,
  color: props.theme.colors['gray-2'],
}))``

export const Title = styled.Text`
  margin: 0 auto;
  color: ${(props) => props.theme.colors['gray-1']};
  font-size: ${(props) => props.theme.fontSize.lg};
  font-family: ${(props) => props.theme.fontFamily.bold};
`

export const Content = styled.View`
  align-items: center;
`

export const Text = styled.Text`
  color: ${(props) => props.theme.colors['gray-1']};
  font-size: ${(props) => props.theme.fontSize['2xl']};
  font-family: ${(props) => props.theme.fontFamily.bold};
`
export const Subtitle = styled.Text`
  color: ${(props) => props.theme.colors['gray-2']};
  font-size: ${(props) => props.theme.fontSize['md']};
  font-family: ${(props) => props.theme.fontFamily.regular};
`
