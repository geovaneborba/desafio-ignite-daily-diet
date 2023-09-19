import { PencilSimpleLine, Trash } from 'phosphor-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { css, styled } from 'styled-components/native'

export type VariantType = 'primary' | 'secondary' | 'base'

type StatusIconStyleProps = {
  variant: 'primary' | 'secondary'
}

type ContainerProps = {
  variant: VariantType
}

export type ModalButtonStyleProps = 'primary' | 'secondary'

type ModalButtonProps = {
  variant: ModalButtonStyleProps
}

type ModalButtonTextProps = {
  variant: ModalButtonStyleProps
}

export const Container = styled.View<ContainerProps>`
  flex: 1;

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
        {
          return css`
            background-color: ${(props) => props.theme.colors['gray-5']};
          `
        }
      }
      default: {
        {
          return css`
            background-color: ${(props) => props.theme.colors['gray-5']};
          `
        }
      }
    }
  }}
`

export const Content = styled.View`
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  flex: 1;
  padding: 40px 24px;
  background-color: ${(props) => props.theme.colors['gray-7']};
`

export const Title = styled.Text`
  color: ${(props) => props.theme.colors['gray-1']};
  font-size: ${(props) => props.theme.fontSize.xl};
  font-family: ${(props) => props.theme.fontFamily.bold};
  margin-bottom: 8px;
`
export const Subtitle = styled.Text`
  color: ${(props) => props.theme.colors['gray-2']};
  font-size: ${(props) => props.theme.fontSize.base};
  font-family: ${(props) => props.theme.fontFamily.regular};
  margin-bottom: 24px;
`
export const DateAndHourTitle = styled.Text`
  color: ${(props) => props.theme.colors['gray-1']};
  font-size: ${(props) => props.theme.fontSize.md};
  font-family: ${(props) => props.theme.fontFamily.bold};
  margin-bottom: 8px;
`
export const DateAndHourSubtitle = styled.Text`
  color: ${(props) => props.theme.colors['gray-2']};
  font-size: ${(props) => props.theme.fontSize.base};
  font-family: ${(props) => props.theme.fontFamily.regular};
`

export const Tag = styled.View`
  margin-top: 24px;
  flex-direction: row;
  gap: 8px;
  background-color: ${(props) => props.theme.colors['gray-6']};
  border-radius: 999px;
  padding: 8px 16px;
  align-items: center;
  align-self: flex-start;
`

export const TagStatusIcon = styled.View<StatusIconStyleProps>`
  width: 8px;
  height: 8px;
  background-color: ${(props) => props.theme.colors['green-dark']};
  border-radius: 999px;

  ${(props) =>
    props.variant === 'primary'
      ? css`
          background-color: ${(props) => props.theme.colors['green-dark']};
        `
      : css`
          background-color: ${(props) => props.theme.colors['red-dark']};
        `}
`
export const TagText = styled.Text`
  color: ${(props) => props.theme.colors['gray-1']};
  font-size: ${(props) => props.theme.fontSize.md};
  font-family: ${(props) => props.theme.fontFamily.regular};
`

export const Wrapper = styled.View`
  margin-top: auto;
  row-gap: 8px;
`

export const IconEdit = styled(PencilSimpleLine).attrs((props) => ({
  size: 18,
  color: props.theme.colors.white,
}))``

export const IconDelete = styled(Trash).attrs((props) => ({
  size: 18,
  color: props.theme.colors['gray-1'],
}))``

export const ModalContainer = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.25);
  justify-content: center;
  padding: 0 24px;
`

export const ModalContent = styled.View`
  padding: 40px 24px 24px;
  color: ${(props) => props.theme.colors['gray-7']};
  background-color: ${(props) => props.theme.colors['gray-7']};
  border-radius: 8px;
`

export const ModalTitle = styled.Text`
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.lg};
  font-family: ${(props) => props.theme.fontFamily.bold};
  color: ${(props) => props.theme.colors['gray-2']};
`

export const ModalWrapperButton = styled.View`
  flex-direction: row;
  justify-content: space-between;
  column-gap: 12px;
  margin-top: 32px;
`

export const ModalButton = styled.TouchableOpacity<ModalButtonProps>`
  padding: 16px 24px;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 6px;
  flex: 1;

  ${(props) =>
    props.variant === 'primary'
      ? css`
          border: 1px solid ${(props) => props.theme.colors['gray-1']};
        `
      : css`
          background-color: ${(props) => props.theme.colors['gray-2']};
        `}
`

export const ModalButtonText = styled.Text<ModalButtonTextProps>`
  font-size: ${(props) => props.theme.fontSize.md};
  color: ${(props) => props.theme.colors['gray-1']};
  font-family: ${(props) => props.theme.fontFamily.bold};

  ${(props) =>
    props.variant === 'primary'
      ? css`
          color: ${(props) => props.theme.colors['gray-1']};
        `
      : css`
          color: ${(props) => props.theme.colors['gray-7']};
        `}
`
