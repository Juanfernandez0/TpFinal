import { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import Post from "../screens/Post";
import MenuHome from "../screens/MenuHome";
import Users from "../screens/Users"
import { auth } from "../firebase/config";
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

class HomeMenu extends Component {
constructor(props) {
    super(props)
}

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (!user) {
            this.props.navigation.navigate("Login");
          }
        })
      }

    render() {
    
        return(
          <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={MenuHome}
            options={{
              tabBarIcon: () => <AntDesign name="home" size={24} color="black" />
            }}
          />
          <Tab.Screen
            name="Post"
            component={Post}
            options={{
              tabBarIcon: () => <Entypo name="new-message" size={24} color="black" />
            }}
          />
          <Tab.Screen
            name="Users"
            component={Users}
            options={{
              tabBarIcon: () => <AntDesign name="search1" size={24} color="black" />
            }}
          />
          
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: () => <Ionicons name="person" size={24} color="black" />
            }}
          />
        </Tab.Navigator>
    )}
}


export default HomeMenu;