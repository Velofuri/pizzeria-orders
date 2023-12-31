import { createStackNavigator } from '@react-navigation/stack'
import Signin from '../pages/Signin'

const Stack = createStackNavigator()

function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Signin' component={Signin} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default AuthRoutes
