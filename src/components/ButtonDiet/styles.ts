import styled, { css } from 'styled-components/native'
import { Pressable } from 'react-native'

export type OptionsStyleType = 'inside' | 'outside' | null
export type StatusStyleType = 'primary' | 'secondary'

type ButtonProps = {
  options: OptionsStyleType
}

type StatusProps = {
  type: StatusStyleType
}

export const Container = styled(Pressable)<ButtonProps>`
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  flex: 1;
  padding: 16px 0;
  border: 1px solid transparent;
  background-color: ${(props) => props.theme.colors['gray-6']};

  ${({ options }) =>
    options === 'inside' &&
    css`
      border: 1px solid ${(props) => props.theme.colors['green-dark']};
      background-color: ${(props) => props.theme.colors['green-light']};
    `}

  ${({ options }) =>
    options === 'outside' &&
    css`
      border: 1px solid ${(props) => props.theme.colors['red-dark']};
      background-color: ${(props) => props.theme.colors['red-light']};
    `}
`

export const Status = styled.View<StatusProps>`
  height: 8px;
  width: 8px;
  border-radius: 1000px;

  ${({ type }) =>
    type === 'primary'
      ? css`
          background-color: ${(props) => props.theme.colors['green-dark']};
        `
      : css`
          background-color: ${(props) => props.theme.colors['red-dark']};
        `}
`

export const ButtonTitle = styled.Text`
  font-size: ${(props) => props.theme.fontSize.md};
  font-family: ${(props) => props.theme.fontFamily.bold};
  color: ${(props) => props.theme.colors['gray-1']};
`
