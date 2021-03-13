import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Header,Icon,Badge} from "react-native-elements";
const MyHeader = props =>{
    return(
        <Header
        centerComponent={{text:props.title,style:{color:"black",fontSize:20,fontWeight:"bold"}}}
        leftComponent={
            <Icon
            name = "bars" type="font-awesome" color ="black" onPress={()=>{
                props.navigation.toggleDrawer()
            }}
            />
        }
        backgroundColor="green"
        />
    )
}

export default MyHeader 