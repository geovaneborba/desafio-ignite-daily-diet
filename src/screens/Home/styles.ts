import { ArrowUpRight, Plus } from 'phosphor-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled, { css } from 'styled-components/native'

type DietStatisticsProps = {
  variant: 'primary' | 'secondary'
}

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors['gray-7']};
  padding: 24px;
`
export const Header = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const DietStatistics = styled.TouchableOpacity<DietStatisticsProps>`
  padding: 20px;
  margin-top: 32px;
  margin-bottom: 40px;
  align-items: center;

  border-radius: 8px;
  position: relative;

  ${(props) =>
    props.variant === 'primary'
      ? css`
          background-color: ${(props) => props.theme.colors['green-light']};
        `
      : css`
          background-color: ${(props) => props.theme.colors['red-light']};
        `}
`

export const ArrowUpRightIcon = styled(ArrowUpRight).attrs(() => ({
  size: 24,
}))`
  position: absolute;
  right: 8px;
  top: 8px;
`

export const DietStatisticsTitle = styled.Text`
  color: ${(props) => props.theme.colors['gray-1']};
  font-size: ${(props) => props.theme.fontSize['2xl']};
  font-family: ${(props) => props.theme.fontFamily.bold};
`
export const DietStatisticsSubtitle = styled.Text`
  color: ${(props) => props.theme.colors['gray-2']};
  font-size: ${(props) => props.theme.fontSize['md']};
  font-family: ${(props) => props.theme.fontFamily.regular};
`

export const Meals = styled.View`
  flex: 1;
`
export const MealsTitle = styled.Text`
  margin-bottom: 8px;
`

export const Icon = styled(Plus).attrs((props) => ({
  size: 18,
  color: props.theme.colors.white,
}))``

export const EmptyMeals = styled.View`
  margin-top: 24px;
`
export const EmptyText = styled.Text`
  color: ${(props) => props.theme.colors['gray-3']};
  font-size: ${(props) => props.theme.fontSize['base']};
  font-family: ${(props) => props.theme.fontFamily.bold};
`
