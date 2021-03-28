import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {DrawerItems} from "react-navigation-drawer"
import firebase from "firebase"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import db from "../config"
 
export default class CustomSideBarMenu extends React.Component{
    constructor(){
        super()
        this.state={
           userId:firebase.auth().currentUser.email,
           image:"#",
           name:"",
           docId:""
        }
    }

    selectPicture=async()=>{
    const {cancelled,uri}=await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.All,
        allowsEditing:true,
        aspect:[4,3],
        quality:1
    })
    if(!cancelled){
        this.uploadImage(url,this.state.userId)
    }
    }

    uploadImage=async(url,UserName)=>{
     var response=await fetch(url)
     var blob=await response.blob()
     var ref=firebase.storage().ref().child("user_profiles/"+UserName)
     return ref.put(blob).then((response)=>{
     this.fetchImage(UserName)
     })
    }

    fetchImage=(UserName)=>{
     var storage=firebase.storage().ref().child("user_profiles/"+UserName)
     storage.getDownloadURL().then((url)=>{
         this.setState({
             image:url
         })
     })
     .catch((error)=>{
     this.setState({
         image:"#"
     })
     })
    }

    getUserDetails=()=>{
        db.collection("users").where("EmailId","==",this.state.userId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                   name:doc.data().FirstName+" "+doc.data().LastName,
                   docId:doc.id,
                   image:doc.data().image


        
            
                })
            })
             })
    }

    componentDidMount(){
     this.fetchImage(this.state.userId)
     this.getUserDetails()

    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:0.5,alignItems:"center",backgroundColor:"gray"}}>
                 <Avatar
                 rounded
                 source={{uri:this.state.image}}
                 size="medium"
                 onPress={()=>{
                     this.selectPicture()

                 }}
                 containerStyle={styles.imageContainer}
                 showEditButton
                 />
                 <Text>
                  {this.state.name}
                 </Text>
                </View>
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

const styles=StyleSheet.create({
    imageContainer:{
        flex:0.5,
        width:"40%",
        height:"20%",
        marginLeft:20,
        marginTop:30,
        borderRadius:40
    }

})