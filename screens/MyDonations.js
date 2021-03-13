import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Modal, ScrollView, KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import db from "../config"
import firebase from "firebase"
import { FlatList } from 'react-native-gesture-handler';
import MyHeader from "../components/MyHeader"
import {ListItem} from "react-native-elements"

export default class MyDonations extends React.Component{
    constructor(){
        super()
        this.state={
            donorId:firebase.auth().currentUser.email,
            donorName:"",
            requestedBookList:[]
        }
        this.requestRef=null
    }

    static navigationOptions={header:null}
    getDonorDetails=(donorId)=>{
        db.collection("users").where("EmailId","==",donorId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                   donorName:doc.data().FirstName+" "+doc.data().LastName
        
            
                })
            })
             })
    }



    getRequestedBookList=()=>{
     this.requestRef=db.collection("requested_books")
     .onSnapshot((snapshot)=>{
      var bookRequested=snapshot.docs.map(docs=>docs.data())
      this.setState({
          requestedBookList:bookRequested
      })
     })
    }

    componentDidMount(){
        this.getRequestedBookList()
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
            item.book_Name
            
        }
        subtitle={item.reason_To_Request}
        titleStyle={{color:"black",fontWeight:"bold"}}
        rightElement={
            <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate("RecieverDetails",{"details":item})
            }}>

            <Text style={{color:"red"}}>
                view
            </Text>

            </TouchableOpacity>
        }
        />
    )
    }


    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader
                title="Please Donate A Book" navigation={this.props.navigation}
                />
                {
                    this.state.requestedBookList.length===0?(
                        <View>
                            <Text>
                                There Are No Book Requests
                            </Text>
                            </View>
                    ):(
                        <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.requestedBookList}
                        renderItem={this.renderItem}
                        />
                    )
                     
                }
            </View>
        )
    }
}