import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import Post from "../screens/Post";

function HomeMenu(){
    const Tab = createBottomTabNavigator();
    return(
            <Tab.Navigator>       
                <Tab.Screen name="Profile" component={Profile}/>
                <Tab.Screen name="Post" component={Post}/>
            </Tab.Navigator>
    )
}

export default HomeMenu;