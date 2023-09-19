import styled, { css } from 'styled-components/native'

export type StatusStyleType = 'primary' | 'secondary'

type StatusProps = {
  type: StatusStyleType
}

export const Container = styled.Pressable`
  padding: 14px 12px;
  border: 1px solid ${(props) => props.theme.colors['gray-5']};
  flex-direction: row;
  align-items: center;
  border-radius: 6px;
  gap: 12px;
  margin-bottom: 8px;
`

export const Divider = styled.View`
  width: 1px;
  height: 14px;
  background-color: ${(props) => props.theme.colors['gray-4']};
`

export const Title = styled.Text`
  font-size: ${(props) => props.theme.fontSize.base};
  font-family: ${(props) => props.theme.fontFamily.regular};
  color: ${(props) => props.theme.colors['gray-2']};
  flex: 1;
`

export const Hour = styled.Text`
  font-size: ${(props) => props.theme.fontSize.sm};
  font-family: ${(props) => props.theme.fontFamily.bold};
  color: ${(props) => props.theme.colors['gray-1']};
`

export const Status = styled.View<StatusProps>`
  height: 14px;
  width: 14px;
  border-radius: 1000px;

  ${(props) =>
    props.type === 'primary'
      ? css`
          background-color: ${(props) => props.theme.colors['green-mid']};
        `
      : css`
          background-color: ${(props) => props.theme.colors['red-mid']};
        `}
`

export const MealCardHeader = styled.Text`
  font-size: ${(props) => props.theme.fontSize.lg};
  color: ${(props) => props.theme.colors['gray-1']};
  font-family: ${(props) => props.theme.fontFamily.bold};
  margin-top: 32px;
  margin-bottom: 8px;
`
