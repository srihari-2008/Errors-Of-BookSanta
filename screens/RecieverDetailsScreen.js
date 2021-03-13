import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Modal, ScrollView, KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import db from "../config"
import firebase from "firebase"
import {Card,Icon,Header} from 'react-native-elements'


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
            recieverRequestDocId:"",
            userName:""
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

getUserDetails=(userId)=>{
    db.collection("users").where("EmailId","==",userId).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            this.setState({
               userName:doc.data().FirstName+" "+doc.data().LastName
    
        
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
    this.getUserDetails(this.state.userId)
    
    
}

AddNotification=()=>{
    var message=this.state.userName+"Has Shown Interest In Donating The Book"
    db.collection("all_notifications").add({
        Targeted_User_Id:this.state.recieverId,
        donor_Id:this.state.userId,
        request_id:this.state.requestId,
        Book_Name:this.state.BookName,
        NotificationStatus:"UnRead",
        message:message
    })
}


render(){
    return(
    <View>
        <Header
        leftComponent={<Icon
        name="arrow-left" type ="feather" color="blue" onPress={()=>{
            this.props.navigation.goBack()
        }}
        />}
        centerComponent={{text:"donateBooks",style:{color:"black",fontSize:20,fontWeight:"bold"}}}
         backgroundColor="green"
        />
        <Card title={"BookInformation"}
        titleStyle={{fontSize:20}}
        >
            <Card>
                <Text style={{fontWeight:"bold"}}>
                name:{this.state.BookName}    
                </Text>
            </Card>

            <Card>
                <Text style={{fontWeight:"bold"}}>
                reason:{this.state.reasonToRequest}    
                </Text>
            </Card>

            
        </Card>

        <Card title={"RecieverInformation"}
        titleStyle={{fontSize:20}}
        >
            <Card>
                <Text style={{fontWeight:"bold"}}>
                name:{this.state.recieverName}    
                </Text>
            </Card>

            <Card>
                <Text style={{fontWeight:"bold"}}>
                contact:{this.state.recieverContact}    
                </Text>
            </Card>

            <Card>
                <Text style={{fontWeight:"bold"}}>
                address:{this.state.recieverAddress}    
                </Text>
            </Card>

            
        </Card>
        {
            this.state.recieverId!==this.state.userId?(
                <TouchableOpacity style={styles.button} onPress={()=>{
                    this.UpdateBookStatus()
                    this.AddNotification()
                    this.props.navigation.navigate("MyDonations")
                }}>
                <Text>
                    I want to Donate
                </Text>
                </TouchableOpacity>
            ):null

        }
        
    </View>
    )


}

}

const styles=StyleSheet.create({
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
})