import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


import Login from './src/screens/Login';
import Register from './src/screens/Register';

import MenuHome from "./src/screens/MenuHome"



export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="MenuHome" component={MenuHome}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
}