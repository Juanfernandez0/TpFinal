import { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import Post from "../screens/Post";
import MenuHome from "../screens/MenuHome";
import Users from "../screens/Users"
import { auth } from "../firebase/config";

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
                <Tab.Screen name="Home" component={MenuHome}/>    
                <Tab.Screen name="Profile" component={Profile}/>
                <Tab.Screen name="Post" component={Post}/>
                <Tab.Screen name="Users" component={Users}/>

            </Tab.Navigator>
    )}
}

export default HomeMenu;