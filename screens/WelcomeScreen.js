import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Modal, ScrollView, KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import db from "../config"
import firebase from "firebase"

export default class WelcomeScreen extends React.Component{
constructor(){
    super()
    this.state={
        firstName:"",
        lastName:"",
        contact:"",
        address:"",
        emailId:"",
        password:"",
        confirmPassword:"",
        isModalVisible:false,
        
    }
}

userLogin=(emailId,password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId,password)
    .then(()=>{
        this.props.navigation.navigate("DonateBooks")
    })
    .catch((error)=>{
     var errorCode=error.code
     var errorMessage=error.message
     return Alert.alert(errorMessage)
    })
}

userSignUp=(emailId,password,confirmPassword)=>{
    if(password!==confirmPassword){
     return Alert.alert("PassWord And The Confirm Password Did Not Match")

    }

     else{
    firebase.auth().createUserWithEmailAndPassword(emailId,password)
    .then(()=>{
        db.collection("users").add({
         FirstName:this.state.firstName,
         LastName:this.state.lastName,
         Contact:this.state.contact,
         Address:this.state.address,
         EmailId:this.state.emailId   
        })
        return Alert.alert("Succesfully Signed Up",
        '',
        [
            {text:"Ok",onPress:()=>{
                this.setState({isModalVisible:false})
            }}
        ])
    })
    .catch((error)=>{
     var errorCode=error.code
     var errorMessage=error.message
     return Alert.alert(errorMessage)
    })


}
}

showModal=()=>{
return(
    <Modal
    animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}
    >
    <View style={styles.modalContainer}>
        <ScrollView style={{width:"100%"}}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
            <Text style={styles.modalTitle}>
             Registration
            </Text>

            <TextInput 
              style={styles.formTextInput}
              placeholder="Enter Your First Name"
              maxLength={10}
              onChangeText={text=>this.setState({firstName:text})}
              />

<TextInput 
              style={styles.formTextInput}
              placeholder="Enter Your Last Name"
              maxLength={10}
              onChangeText={text=>this.setState({lastName:text})}
              />

<TextInput 
              style={styles.formTextInput}
              placeholder="Enter Your contact"
              keyboardType="numeric"
              onChangeText={text=>this.setState({contact:text})}
              />

<TextInput 
              style={styles.formTextInput}
              placeholder="Enter Your Address"
              multiline={true}
              onChangeText={text=>this.setState({address:text})}
              />

<TextInput 
              style={styles.formTextInput}
              placeholder="Enter Your Email Id , Ex-abc@gmail.com"
              keyboardType="email-address"
              onChangeText={text=>this.setState({emailId:text})}
              />

<TextInput 
              style={styles.formTextInput}
              placeholder="Create Your Password"
              secureTextEntry={true}
              onChangeText={text=>this.setState({password:text})}
              />

<TextInput 
              style={styles.formTextInput}
              placeholder="Enter Your PassWord Again To Confirm"
              secureTextEntry={true}
              onChangeText={text=>this.setState({confirmPassword:text})}
              />

              <TouchableOpacity style={styles.registerButton}
              onPress={()=>{
                this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
              }}
              >
                  <Text styles={styles.registerButtonText}>
                    Register
                  </Text>

              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton}
              onPress={()=>{
               this.setState({isModalVisible:false})
              }}
              >
                  <Text>
                     Cancel
                  </Text>

              </TouchableOpacity>

            </KeyboardAvoidingView>


        </ScrollView>
        </View>       
    </Modal>
)
}

    render(){
        return(
            <View style={styles.container}>
            
            <Text style={styles.title}>
            BookSanta
            </Text>
            {
              this.showModal()
            }
            <TextInput 
              style={styles.loginBox}
              placeholder="Enter Your Email Id , Ex-abc@gmail.com"
              keyboardType="email-address"
              onChangeText={text=>this.setState({emailId:text})}
              />

     
             <TextInput 
              style={styles.loginBox}
              placeholder="Enter Your PassWord"
              secureTextEntry={true}
              onChangeText={text=>this.setState({password:text})}
              />
              <TouchableOpacity style={{height:30,width:90,marginTop:20,padding:5,borderRadius:10}}
              onPress={()=>{
                this.userLogin(this.state.emailId,this.state.password)
              }}
              >
                  <Text>
                     Login
                  </Text>

              </TouchableOpacity>

              <TouchableOpacity style={{height:30,width:90,marginTop:20,padding:5,borderRadius:10}}
              onPress={()=>{
               this.setState({isModalVisible:true})
              }}
              >
                  <Text>
                     Sign Up
                  </Text>

              </TouchableOpacity>
              
               

            </View>
        )
    }
}



const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#F8BE85',
     alignItems: 'center',
     justifyContent: 'center'
   },
   profileContainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
   },
   title :{
     fontSize:65,
     fontWeight:'300',
     paddingBottom:30,
     color : '#ff3d00'
   },
   loginBox:{
     width: 300,
     height: 40,
     borderBottomWidth: 1.5,
     borderColor : '#ff8a65',
     fontSize: 20,
     margin:10,
     paddingLeft:10
   },
   KeyboardAvoidingView:{
     flex:1,
     justifyContent:'center',
     alignItems:'center'
   },
   modalTitle :{
     justifyContent:'center',
     alignSelf:'center',
     fontSize:30,
     color:'#ff5722',
     margin:50
   },
   modalContainer:{
     flex:1,
     borderRadius:20,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#ffff",
     marginRight:30,
     marginLeft : 30,
     marginTop:80,
     marginBottom:80,
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
   registerButton:{
     width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:30
   },
   registerButtonText:{
     color:'#ff5722',
     fontSize:15,
     fontWeight:'bold'
   },
   cancelButton:{
     width:200,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     marginTop:5,
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
   buttonText:{
     color:'#ffff',
     fontWeight:'200',
     fontSize:20
   }
  });
  