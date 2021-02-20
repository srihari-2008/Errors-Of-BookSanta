import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Modal, ScrollView, KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import db from "../config"
import firebase from "firebase"
import { FlatList } from 'react-native-gesture-handler';

export default class BookDonateScreen extends React.Component{
    constructor(){
        super()
        this.state={
            requestedBookList:[]
        }
        this.requestRef=null
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
            <TouchableOpacity style={styles.button}>

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
                {
                    this.state.requestedBookList.length===0?(
                        <View style={styles.subContainer}>
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