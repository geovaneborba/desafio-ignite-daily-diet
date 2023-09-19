import styled from 'styled-components/native'
import { ArrowLeft } from 'phosphor-react-native'
import Constants from 'expo-constants'

export const Container = styled.View`
  background-color: ${(props) => props.theme.colors['green-light']};
  position: relative;
`

export const Header = styled.View`
  align-items: center;
  background-color: ${(props) => props.theme.colors['green-light']};
  border-radius: 8px;
  padding: 24px;
`

export const BackButton = styled.TouchableOpacity`
  align-self: flex-start;
`

export const ArrowLeftIcon = styled(ArrowLeft).attrs((props) => ({
  size: 24,
  color: props.theme.colors['green-dark'],
}))``

export const HeaderTitle = styled.Text`
  color: ${(props) => props.theme.colors['gray-1']};
  font-size: ${(props) => props.theme.fontSize['2xl']};
  font-family: ${(props) => props.theme.fontFamily.bold};
`
export const HeaderSubtitle = styled.Text`
  color: ${(props) => props.theme.colors['gray-2']};
  font-size: ${(props) => props.theme.fontSize['md']};
  font-family: ${(props) => props.theme.fontFamily.regular};
`

export const Statistics = styled.View`
  background-color: ${(props) => props.theme.colors['gray-7']};
  height: 100%;
  width: 100%;
  padding: 32px 24px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`

export const StatisticsTitle = styled.Text`
  font-size: ${(props) => props.theme.fontSize.md};
  font-family: ${(props) => props.theme.fontFamily.bold};
  color: ${(props) => props.theme.colors['gray-1']};
  text-align: center;
  margin-bottom: 24px;
`

export const StatisticsContainer = styled.View`
  flex: 1;
  width: 100%;
  row-gap: 12px;
`
