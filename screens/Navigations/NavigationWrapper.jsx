import { NavigationContainer } from '@react-navigation/native'
import AuthStack from "./AuthStack"

const NavigationWrapper = () => {
  return (
    <NavigationContainer>
      <AuthStack/>
    </NavigationContainer>
  )
}

export default NavigationWrapper
