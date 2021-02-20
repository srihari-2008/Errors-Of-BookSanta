import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Modal, ScrollView, KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import db from "../config"
import firebase from "firebase"
import myHeader from "../components/myHeader"

export default class settingScreen extends React.Component{
    constructor(){
        super()
        this.state={
            firstName:"",
            lastName:"",
            contact:"",
            address:"",
            emailId:"",
            docId:""
            
            
        }

    }

  getUserDetails=()=>{
      var email=firebase.auth().currentUser.email
      db.collection("users").where("EmailId","==",email).get()
      .then(snapshot=>{
          snapshot.forEach(doc=>{
              var data=doc.data()
              this.setState({
                  firstName:data.FirstName,
                  lastName:data.LastName,
                  contact:data.Contact,
                  address:data.Address,
                  emailId:data.EmailId,
                  docId:doc.id


              })
          })
      })
  }

  updateUserDetails=()=>{
      db.collection("users").doc(this.state.docId).update({

      FirstName:this.state.firstName,
      LastName:this.state.lastName,
      Contact:this.state.contact,
      Address:this.state.address,
      })
  }

}