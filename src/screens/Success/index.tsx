import { Container, HappyImage, Subtitle, TextBold, Title } from './styles'
import { Button } from '../../components/Button'
import { useNavigation, useRoute } from '@react-navigation/native'

import successLogo from '../../assets/success.png'
import failedLogo from '../../assets/failed-logo.png'
import { useTheme } from 'styled-components/native'

type RouteParamsType = {
  isInsideDiet: boolean
}

export function Success() {
  const { colors } = useTheme()

  const navigation = useNavigation()
  const route = useRoute()
  const { isInsideDiet } = route.params as RouteParamsType

  return (
    <Container>
      <Title style={!isInsideDiet && { color: colors['red-dark'] }}>
        {isInsideDiet ? 'Continue assim!' : 'Que pena!'}{' '}
      </Title>
      <Subtitle style={!isInsideDiet && { textAlign: 'center' }}>
        {isInsideDiet ? (
          <>
            Você continua <TextBold>dentro da dieta</TextBold>. Muito bem!
          </>
        ) : (
          <>
            Você <TextBold>saiu da dieta</TextBold> dessa vez, mas continue se
            esforçando e não desista!
          </>
        )}
      </Subtitle>

      <HappyImage source={isInsideDiet ? successLogo : failedLogo} />
      <Button
        variant="primary"
        title="Ir para página inicial"
        style={{ paddingLeft: 24, paddingRight: 24 }}
        onPress={() => navigation.navigate('home')}
      />
    </Container>
  )
}
