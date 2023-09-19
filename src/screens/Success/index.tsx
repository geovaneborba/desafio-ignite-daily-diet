import { Container, HappyImage, Subtitle, TextBold, Title } from './styles'
import { Button } from '../../components/Button'
import { useNavigation, useRoute } from '@react-navigation/native'

import successLogo from '../../assets/success.png'
import failedLogo from '../../assets/failed-logo.png'
import { useTheme } from 'styled-components/native'
import { NavigationHandler, RootStackParamList } from '@routes/app.routes'

type RouteParamsType = {
  diet: 'inside' | 'outside' | null
}

export function Success() {
  const { colors } = useTheme()

  const navigation = useNavigation()
  const route = useRoute()

  const { diet } = route.params as RouteParamsType

  const handleNavigate: NavigationHandler = (screenName, params?) => {
    navigation.navigate(screenName, params)
  }

  return (
    <Container>
      <Title style={diet === 'outside' && { color: colors['red-dark'] }}>
        {diet === 'inside' ? 'Continue assim!' : 'Que pena!'}{' '}
      </Title>
      <Subtitle style={diet === 'outside' && { textAlign: 'center' }}>
        {diet === 'inside' ? (
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

      <HappyImage source={diet === 'inside' ? successLogo : failedLogo} />
      <Button
        variant="primary"
        title="Ir para página inicial"
        style={{ paddingLeft: 24, paddingRight: 24 }}
        onPress={() => handleNavigate('home')}
      />
    </Container>
  )
}
