import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Modal, ScrollView, KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import db from "../config"
import firebase from "firebase"
import MyHeader from "../components/MyHeader"

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
      Alert.alert("Profile Updated Succesfully")
  }

  componentDidMount(){
      this.getUserDetails()
  }

  render(){
      return(
          <View style={{flex:1}}>
              <MyHeader
              title="Setting Screen" navigation={this.props.navigation}
              />
              
              <TextInput 
              style={styles.formTextInput}
              placeholder="Enter Your First Name"
              maxLength={10}
              onChangeText={text=>this.setState({firstName:text})}
              value={this.state.firstName}
              />

<TextInput 
              style={styles.formTextInput}
              placeholder="Enter Your Last Name"
              maxLength={10}
              onChangeText={text=>this.setState({lastName:text})}
              value={this.state.lastName}
              />

<TextInput 
              style={styles.formTextInput}
              placeholder="Enter Your contact"
              keyboardType="numeric"
              onChangeText={text=>this.setState({contact:text})}
              value={this.state.contact}
              />

<TextInput 
              style={styles.formTextInput}
              placeholder="Enter Your Address"
              multiline={true}
              onChangeText={text=>this.setState({address:text})}
              value={this.state.address}
              />

              <TouchableOpacity style={styles.button} onPress={()=>{
                  this.updateUserDetails()

              }}>
                  <Text>
                  Update
                  </Text>

              </TouchableOpacity>

          </View>
      )
  }

}



const styles = StyleSheet.create({
   
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
   button:{
     width:300,
     height:50,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:25,
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
  });
  