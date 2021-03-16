import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Modal, ScrollView, KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import db from "../config"
import firebase from "firebase"
import { FlatList } from 'react-native-gesture-handler';
import MyHeader from "../components/MyHeader"
import {Icon, ListItem} from "react-native-elements"

export default class MyDonations extends React.Component{
    constructor(){
        super()
        this.state={
            donorId:firebase.auth().currentUser.email,
            donorName:"",
            allDonations:[]
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
    getAllDonations=()=>{
     this.requestRef=db.collection("all_donations").where("donor_Id","==",this.state.donorId)  
     .onSnapshot((snapshot)=>{
         var allDonations=[]
         snapshot.docs.map((doc)=>{
             var donation=doc.data()
             donation["doc_id"]=doc.id
             allDonations.push(donation)
         }) 
         this.setState({
             allDonations:allDonations
         })

     }) 
    }

    componentDidMount(){
        this.getAllDonations()
        this.getDonorDetails(this.state.donorId)
    }

    sendBook=(bookDetails)=>{
     if(bookDetails.request_status==="Book Sent"){
         var requestStatus="Donor Sent Your Book"
         db.collection("all_donations").doc(bookDetails.doc_id).update({
             request_status:requestStatus
         })
     this.sendNotification(bookDetails,requestStatus)
     }

     else{
     var requestStatus = "Book Sent"
     db.collection("all_donations").doc(bookDetails.doc_id).update({
        request_status:requestStatus
    })
     this.sendNotification(bookDetails,requestStatus)
     }


    }

    sendNotification=(bookDetails,requestStatus)=>{
    var requestId=bookDetails.request_Id
    var donorId=bookDetails.donor_Id
    db.collection("all_notifications").where("request_id","==",requestId).where("donor_Id","==",donorId).get()
    .then((docs)=>{
        docs.forEach((doc)=>{
            var message=""
            if(requestStatus=="Book Sent"){
                message=this.state.donorName+"Sent Your Book"
            }
            else{
                message=this.state.donorName+"Sent Your Book"
            }
            db.collection("all_notifications").doc(doc.id).update({
                message:message,
                NotificationStatus:"UnRead",
               date:firebase.firestore.FieldValue.serverTimestamp()
            })
        })
    })
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
            item.BookName
            
        }
        subtitle={"Requested By "+item.RequestedBy+"\nstatus"+item.request_status}
        titleStyle={{color:"black",fontWeight:"bold"}}
        leftElement={<Icon name="book" type="font-awesome" color="blue"/>}
        rightElement={
            <TouchableOpacity styles={[styles.button,{background:item.request_status==="Book Sent"?"green":"red"}]} onPress={()=>{
               this.sendBook(item)
            }}>

            <Text style={{color:"red"}}>
                {
                    item.request_status==="Book Sent"?"Book Sent":"Send Book"
                }
            </Text>

            </TouchableOpacity>
        }
        bottomDivider
        />
    )
    }


    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader
                title="My Donations" navigation={this.props.navigation}
                />
                {
                    this.state.allDonations.length===0?(
                        <View>
                            <Text>
                                There Are No Donations
                            </Text>
                            </View>
                    ):(
                        <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.allDonations}
                        renderItem={this.renderItem}
                        />
                    )
                     
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