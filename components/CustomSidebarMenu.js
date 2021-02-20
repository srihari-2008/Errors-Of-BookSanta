import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {DrawerItems} from "react-navigation-drawer"
import firebase from "firebase"
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
               <DrawerItems
               {...this.props}
               />
               <TouchableOpacity onPress={()=>{
                   this.props.navigation.navigate("WelcomeScreen")
                   firebase.auth().signOut()
               }}>
               
               <Text>
                   Logout
               </Text>

               </TouchableOpacity>
            </View>
        )
    }
}