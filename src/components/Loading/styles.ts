import { styled } from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors['gray-7']};
`

export const LoadingIndicator = styled.ActivityIndicator.attrs((props) => ({
  color: props.theme.colors['gray-1'],
  size: 24,
}))``
