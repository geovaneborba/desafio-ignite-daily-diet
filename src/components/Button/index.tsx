import { TouchableOpacityProps } from 'react-native'
import { Container, Title, ButtonStyleProps } from './styles'
import { ReactNode } from 'react'

type ButtonProps = TouchableOpacityProps & {
  title: string
  children?: ReactNode
  variant: ButtonStyleProps
}

export function Button({ children, variant, title, ...rest }: ButtonProps) {
  return (
    <Container variant={variant} {...rest}>
      {children}

      <Title variant={variant}>{title}</Title>
    </Container>
  )
}
