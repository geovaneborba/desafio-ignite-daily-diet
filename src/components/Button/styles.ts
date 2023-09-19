import { Text, TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

export type ButtonStyleProps = 'primary' | 'secondary'

type ButtonProps = {
  variant: ButtonStyleProps
}

export const Container = styled(TouchableOpacity)<ButtonProps>`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 12px;
  padding: 16px 0;
  border-radius: 6px;

  ${(props) =>
    props.variant === 'primary'
      ? css`
          background-color: ${props.theme.colors['gray-1']};
        `
      : css`
          background-color: ${props.theme.colors['gray-7']};
          border: 1px solid ${props.theme.colors['gray-1']};
        `}
`

export const Title = styled(Text)<ButtonProps>`
  font-family: ${(props) => props.theme.fontFamily.bold};
  font-size: ${(props) => props.theme.fontSize.md};

  ${(props) =>
    props.variant === 'primary'
      ? css`
          color: ${(props) => props.theme.colors.white};
        `
      : css`
          color: ${(props) => props.theme.colors['gray-1']};
        `}
`
