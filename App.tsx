import { ThemeProvider } from 'styled-components/native'
import { useFonts } from 'expo-font'
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito'
import { MPLUSRounded1c_800ExtraBold } from '@expo-google-fonts/m-plus-rounded-1c'
import { Loading } from '@components/Loading'
import { StatusBar } from 'expo-status-bar'
import { theme } from '@theme/default'
import { Routes } from '@routes/index'

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    MPLUSRounded1c_800ExtraBold,
  })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      {fontsLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  )
}
