import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


import Login from './src/screens/Login';
import Register from './src/screens/Register';




export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={Register}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}