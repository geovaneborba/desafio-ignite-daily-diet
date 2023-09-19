import { ReactNode } from 'react'
import { Text } from './styles'

type InputErrorTextProps = {
  children: ReactNode
}

export function InputErrorText({ children }: InputErrorTextProps) {
  return <Text>{children}</Text>
}
