import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Post from './src/screens/Post';
import MenuHome from "./src/screens/MenuHome"
import Profile from './src/screens/Profile';
import HomeMenu from './src/components/HomeMenu';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="HomeMenu" component={HomeMenu}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
}