import { PressableProps } from 'react-native'

import { formatTimeToString } from '../../utils/format-time-to-string'
import { Container, Divider, Hour, Status, Title } from './styles'
import { MealDTO } from '@dtos/MealDTO'

type MealCardProps = PressableProps & {
  data: MealDTO
}

export function MealCard({ data, ...rest }: MealCardProps) {
  return (
    <Container {...rest}>
      <Hour>{formatTimeToString(new Date(data.hour))}</Hour>
      <Divider />
      <Title>{data.name}</Title>
      <Status type={data.diet === 'inside' ? 'primary' : 'secondary'} />
    </Container>
  )
}
