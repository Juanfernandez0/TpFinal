import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import Post from "../screens/Post";
import Users from "../screens/Users";
function HomeMenu(){
    const Tab = createBottomTabNavigator();
    return(
            <Tab.Navigator>       
                <Tab.Screen name="Mi Perfil" component={Profile}/>
                <Tab.Screen name="Nuevo Post" component={Post}/>
                <Tab.Screen name="Lista De Usuarios" component={Users}/>

            </Tab.Navigator>
    )
}

export default HomeMenu;