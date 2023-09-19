import { css, styled } from 'styled-components/native'

export type StatisticCardStyleProps = {
  size?: 'sm'
  type?: 'primary' | 'secondary'
}

type StatisticCardProps = StatisticCardStyleProps

export const Container = styled.View<StatisticCardProps>`
  background-color: ${(props) => props.theme.colors['gray-6']};
  padding: 16px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  row-gap: 8px;

  ${(props) =>
    props.size === 'sm' &&
    css`
      flex: 1;
    `}

  ${(props) =>
    props.type === 'primary' &&
    css`
      background-color: ${(props) => props.theme.colors['green-light']};
    `}

    ${(props) =>
    props.type === 'secondary' &&
    css`
      background-color: ${(props) => props.theme.colors['red-light']};
    `}
`

export const Title = styled.Text`
  color: ${(props) => props.theme.colors['gray-1']};
  font-family: ${(props) => props.theme.fontFamily.bold};
  font-size: ${(props) => props.theme.fontSize.xl};
`

export const Subtitle = styled.Text<StatisticCardProps>`
  color: ${(props) => props.theme.colors['gray-2']};
  font-family: ${(props) => props.theme.fontFamily.regular};
  font-size: ${(props) => props.theme.fontSize.sm};
  text-align: center;

  ${(props) =>
    props.size === 'sm' &&
    css`
      max-width: 115px;
    `}
`

export const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  gap: 12px;
`
