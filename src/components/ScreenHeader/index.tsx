import { ReactNode } from 'react'
import {
  Container,
  BackButton,
  ArrowLeftIcon,
  Title,
  VariantType,
  Text,
  Subtitle,
  Content,
  ButtonWrapper,
} from './styles'
import { formatTotalMealsDiet } from '@utils/format-total-meals-diet'
import { MealStatisticDTO } from '@dtos/MealStatisticDTO'

type HeaderProps = {
  onNavigate: () => void
  title?: string
  variant?: VariantType
  mealStatistic?: MealStatisticDTO
}

export function ScreenHeader({
  title,
  variant = 'primary',
  onNavigate,
  mealStatistic,
}: HeaderProps) {
  return (
    <Container variant={variant}>
      <ButtonWrapper>
        <BackButton onPress={() => onNavigate()}>
          <ArrowLeftIcon />
        </BackButton>
        <Title>{title}</Title>
      </ButtonWrapper>

      {mealStatistic && (
        <Content>
          <Text>{formatTotalMealsDiet(mealStatistic)}%</Text>
          <Subtitle>das refeições dentro da dieta</Subtitle>
        </Content>
      )}
    </Container>
  )
}
