import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Modal, ScrollView, KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import db from "../config"
import firebase from "firebase"
import { FlatList } from 'react-native-gesture-handler';
import MyHeader from "../components/MyHeader"
import {ListItem,Icon} from "react-native-elements"
import SwipeableFlatlist from "../components/SwipeableFlatlist"

export default class NotificationScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            allNotifications:[],
            userId:firebase.auth().currentUser.email
        }
        this.requestRef=null
    }

    getNotifications=()=>{
     this.requestRef=db.collection("all_notifications").where("NotificationStatus","==","UnRead").where("Targeted_User_Id","==",this.state.userId)
     .onSnapshot((snapshot)=>{
         var allNotifications=[]
      snapshot.docs.map(docs=>{
          var notification=docs.data()
          notification["doc_id"]=docs.id
          allNotifications.push(notification)
      })
      this.setState({
          allNotifications:allNotifications
      })
     })
    }

    componentDidMount(){
        this.getNotifications()
        
    }

    componentWillUnmount(){
        this.requestRef()
    }
    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,index})=>{
    return(
        <ListItem
        key={index}
        title={
            item.Book_Name
            
        }
        subtitle={item.message}
        titleStyle={{color:"black",fontWeight:"bold"}}
        leftElement={<Icon name="book" type="font-awesome" color="blue"/>}
        bottomDivider
        />
    )
    }


    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader
                title="Notifications" navigation={this.props.navigation}
                />
                {
                    this.state.allNotifications.length===0?(
                        <View>
                            <Text>
                                There Are No Notifications
                            </Text>
                            </View>
                    ):(
                      <SwipeableFlatlist
                      allNotifications={this.state.allNotifications}
                      />
                    )
                     
                }
            </View>
        )
    }
}