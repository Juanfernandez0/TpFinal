import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MenuHome from "../screens/MenuHome";
import Profile from "../screens/Profile";
import Users from "../screens/Users";
import Post from "../screens/Post";

function HomeMenu(){
    const Tab = createBottomTabNavigator();
    return(
            <Tab.Navigator>
                <Tab.Screen name="Home" component={MenuHome}/>
                <Tab.Screen name="Profile" component={Profile}/>
                <Tab.Screen name="Usuarios" component={Users}/>
                <Tab.Screen name="NewPost" component={Post}/>
            </Tab.Navigator>
    )
}

export default HomeMenu;