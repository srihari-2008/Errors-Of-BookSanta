import React from 'react';
import { StyleSheet, Text, View,Dimensions,Animated,TouchableHighlight } from 'react-native';
import {ListItem,Icon} from "react-native-elements"
import {SwipeListView} from "react-native-swipe-list-view"
import db from "../config"
import firebase from "firebase"


export default class SwipeableFlatlist extends React.Component{
    constructor(props){
        super(props)
        this.state={
         allNotifications:this.props.allNotifications
        }
    }

    UpdateMarkAsRead=(notification)=>{
    db.collection("all_notifications").doc(notification.doc_id).update({
        NotificationStatus:"Read"
    }) 

    }

    onSwipeValueChange=(SwipeData)=>{
    var allNotifications=this.state.allNotifications
    const {key,value}=SwipeData
    if(value<-Dimensions.get("window").width){
    const newData=[...allNotifications]
    this.UpdateMarkAsRead(allNotifications[key])
    newData.splice(key,1)
    this.setState({allNotifications:newData})
    }
    }
    
    renderItem=(data)=>{
     <Animated.view>
         <ListItem
         leftElement={<Icon name="book" type="font-awesome" color="blue"/>}
         title={data.item.Book_Name}
         titleStyle={{color:"black",fontWeight:"bold"}}
         subtitle={data.item.message}
         bottomDivider
         />


         
     </Animated.view>
    }

    renderHiddenItem=()=>(
        <View style={styles.rowback}>
            <View style={[styles.backWriteButton,styles.WriteButton]}>
                <Text style={styles.backTextWrite}>
                    Mark As Read
                </Text>
            </View>
        </View>
    )

    render(){
        return(
            <View style={styles.container}>
                <SwipeListView
                disableRightSwipe
                data={this.state.allNotifications}
                renderItem={
                    this.renderItem
                }
                renderHiddenItem={
                    this.renderHiddenItem
                }
                rightOpenValue={-Dimensions.get("window").width}
                previewRowkey={"0"}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onSwipeValueChange={this.onSwipeValueChange}
                keyExtractor={(item,index)=>index.toString()}
                />
            </View>
        )
    }

}



const styles=StyleSheet.create({
  container:{
      backgroundColor:"white",
      flex:1, 
  },
  
  rowback:{
      alignItems:"center",
      backgroundColor:"grey",
      flex:1,
      flexDirection:"row",
      justifyContent:"space-between",
      paddingLeft:15,
      
  },
  backWriteButton:{
    alignItems:"center",
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    bottom:0,
    position:"absolute",
    top:0,
    width:100
  },
  WriteButton:{
      backgroundColor:"grey",
      right:0
  },
  backTextWrite:{
      alignItems:"center",
      color:"red",
      fontWeight:"bold",
      fontSize:15,
      textAlign:"center",
      alignSelf:"flex-start"
  }
})
