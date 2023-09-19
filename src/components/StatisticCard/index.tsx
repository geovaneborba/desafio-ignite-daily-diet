import { Container, StatisticCardStyleProps, Subtitle, Title } from './styles'

type StatisticCardProps = StatisticCardStyleProps & {
  title: string
  subtitle: string
}

export function StatisticCard({
  title,
  subtitle,
  size,
  type,
}: StatisticCardProps) {
  return (
    <Container size={size} type={type}>
      <Title>{title}</Title>
      <Subtitle size={size}>{subtitle}</Subtitle>
    </Container>
  )
}
