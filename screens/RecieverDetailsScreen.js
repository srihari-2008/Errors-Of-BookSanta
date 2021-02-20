import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Modal, ScrollView, KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import db from "../config"
import firebase from "firebase"
import myHeader from "../components/myHeader"
import {Card,Icon} from 'react-native-elements'

export default class RecieverDetailsScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            userId:firebase.auth().currentUser.email,
            recieverId:this.props.navigation.getParam("details")["user_Id"],
            requestId:this.props.navigation.getParam("details")["request_Id"],
            BookName:this.props.navigation.getParam("details")["book_Name"],
            reasonToRequest:this.props.navigation.getParam("details")["reason_To_Request"],
            recieverName:"",
            recieverContact:"",
            recieverAddress:"",
            recieverRequestDocId:""
        }
    }

getRecieverDetails(){
 db.collection("users").where("EmailId","==",this.state.recieverId).get()
 .then(snapshot=>{
snapshot.forEach(doc=>{
    this.setState({
        recieverName:doc.data().FirstName,
        recieverContact:doc.data().Contact,
        recieverAddress:doc.data().Address,

    })
})
 })

db.collection("requested_books").where("request_Id","==", this.state.requestId).get()
.then(snapshot=>{
    snapshot.forEach(doc=>{
        this.setState({
           recieverRequestDocId:doc.id

    
        })
    })
     })
}


UpdateBookStatus=()=>{
    db.collection("all_donations").add({
        BookName:this.state.BookName,
        request_Id:this.state.request_Id,
        RequestedBy:this.state.recieverName,
        donor_Id:this.state.userId,
        request_status:"donorInterested"
    })

}

componentDidMount(){
    this.getRecieverDetails()
}


}