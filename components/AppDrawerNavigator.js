import React from 'react';
import {createDrawerNavigator} from "react-navigation-drawer"
import {AppTabNavigator} from "./AppTabNavigator"
import CustomSideBarMenu from "./CustomSidebarMenu"
import settingScreen from "../screens/settingScreen"
import NotificationScreen from "../screens/NotificationScreen"
import MyDonations from "../screens/MyDonations"

 
export const AppDrawerNavigator= createDrawerNavigator({
    Home:{
        screen:AppTabNavigator

    },
    Setting:{
        screen:settingScreen
    },
     
     Notification:{
         screen:NotificationScreen
     },

     MyDonations:{
         screen:MyDonations
     }

},
      {
    contentComponent:CustomSideBarMenu,
      },
{
initialRouteName:"Home"
})