import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Header,Icon,Badge} from "react-native-elements";
import db from "../config"

export default class MyHeader extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value:""
        }
    }
    getNumberOfUnReadNotifications(){
    db.collection("all_notifications").where("NotificationStatus","==","UnRead")
    .onSnapshot((snapshot)=>{
    var UnReadNotifications=snapshot.docs.map((doc)=>{
    doc.data()
    })
    this.setState({value:UnReadNotifications.length})
    })
    }

componentDidMount(){
    this.getNumberOfUnReadNotifications()
}

bellIcon=()=>{
    return(
        <View>
            <Icon
            name="bell" type="font_awesome " color="blue" size={25}
            onPress={()=>{
                this.props.navigation.navigate("Notification")
            }}
            />
            <Badge
            value={this.state.value}
            containerStyle={{position:'absolute',top:-4,right:-4}}
            />
        </View>
    )
}
render(){
    return(                                           
        <Header
        centerComponent={{text:this.props.title,style:{color:"black",fontSize:20,fontWeight:"bold"}}}
        leftComponent={
            <Icon
            name = "bars" type="font-awesome" color ="black" onPress={()=>{
                this.props.navigation.toggleDrawer()
            }}
            />
        }
        rightComponent={<this.bellIcon {...this.props}/>}
        backgroundColor="green"
        />
    )
}
    }



