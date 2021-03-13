import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Modal, ScrollView, KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import db from "../config"
import firebase from "firebase"
import MyHeader from "../components/MyHeader"

export default class BookRequestScreen extends React.Component{
    constructor(){
        super()
        this.state={
            bookName:"",
            reasonToRequest:"",
            userId:firebase.auth().currentUser.email
        }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }

    addRequest=(bookName,reasonToRequest)=>{
        var userId=this.state.userId
        var randomRequestId=this.createUniqueId()
        db.collection("requested_books").add({
            user_Id:userId,
            book_Name:bookName,
            reason_To_Request:reasonToRequest,
            request_Id:randomRequestId
        })
         this.setState({
             bookName:"",
             reasonToRequest:""
            
         })
         return Alert.alert("Book Succesfully Requested")  
    }

    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader
                title="Please Request A Book" navigation={this.props.navigation}
                />
                <KeyboardAvoidingView style={styles.keyboardStyle}>

                <TextInput 
              style={styles.formTextInput}
              placeholder="Enter The Book Name"
              onChangeText={text=>this.setState({bookName:text})}
              value={this.state.bookName}
              />

              <TextInput 
              style={[styles.formTextInput,{height:300}]}
              placeholder="Why Do You Need The Book"
              onChangeText={text=>this.setState({reasonToRequest:text})}
              value={this.state.reasonToRequest}
              />
              <TouchableOpacity style={styles.button} onPress={()=>{
                  this.addRequest(this.state.bookName,this.state.reasonToRequest)
              }}>
                  <Text>
                  Request
                  </Text>
              </TouchableOpacity>

                </KeyboardAvoidingView>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    keyboardStyle:{
     flex:1,
     alignItems: 'center',
     justifyContent: 'center'
   },
   formTextInput:{
     width:"75%",
     height:35,
     alignSelf:'center',
     borderColor:'#ffab91',
     borderRadius:10,
     borderWidth:1,
     marginTop:20,
     padding:10
   },
   cancelButton:{
     width:200,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     marginTop:5,
   },
  
   button:{
     width:"75%",
     height:50,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:10,
     backgroundColor:"#ff9800",
     shadowColor: "#000",
     shadowOffset: {
        width: 0,
        height: 8,
     },
     shadowOpacity: 0.30,
     shadowRadius: 10.32,
     elevation: 16,
     padding: 10
   },
   buttonText:{
     color:'#ffff',
     fontWeight:'200',
     fontSize:20
   }
  });
  