import {
  ButtonTitle,
  Container,
  OptionsStyleType,
  Status,
  StatusStyleType,
} from './styles'
import { PressableProps } from 'react-native/Libraries/Components/Pressable/Pressable'

type ButtonDietProps = PressableProps & {
  options: OptionsStyleType
  type: StatusStyleType
  title: string
}

export function ButtonDiet({ options, title, type, ...rest }: ButtonDietProps) {
  return (
    <Container options={options} {...rest}>
      <Status type={type} />
      <ButtonTitle>{title}</ButtonTitle>
    </Container>
  )
}
