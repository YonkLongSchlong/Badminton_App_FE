import { NavigationContainer } from '@react-navigation/native'
import AuthStack from "./AuthStack"
import AppStack from "./AppStack"

const NavigationWrapper = () => {
  return (
    <NavigationContainer>
      <AuthStack/>
      {/* <AppStack/> */}
    </NavigationContainer>
  )
}

export default NavigationWrapper
