import React from 'react';
import {createDrawerNavigator} from "react-navigation-drawer"
import {AppTabNavigator} from "./AppTabNavigator"
import CustomSideBarMenu from "./CustomSidebarMenu"
import settingScreen from "../screens/settingScreen"
import NotificationScreen from "../screens/NotificationScreen"
 
export const AppDrawerNavigator= createDrawerNavigator({
    Home:{
        screen:AppTabNavigator

    },
    Setting:{
        screen:settingScreen
    },
     
     Notification:{
         screen:NotificationScreen
     }

},
      {
    contentComponent:CustomSideBarMenu,
      },
{
initialRouteName:"Home"
})