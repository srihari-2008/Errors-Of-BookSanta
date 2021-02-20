import React from 'react';
import {createDrawerNavigator} from "react-navigation-drawer"
import {AppTabNavigator} from "./AppTabNavigator"
import CustomSideBarMenu from "./CustomSidebarMenu"
import settingScreen from "../screens/settingScreen"
 
export const AppDrawerNavigator= createDrawerNavigator({
    Home:{
        screen:AppTabNavigator

    },
    Setting:{
        screen:settingScreen
    }
},
      {
    contentComponent:CustomSideBarMenu,
      },
{
initialRouteName:"Home"
})