import { View } from 'react-native';
import React, { useEffect } from 'react'
import FirebaseClass from './FirebaseClass';
import { GiftedChat } from 'react-native-gifted-chat';


const Chat = ({route,navigation}) => {

    const [messages,setMessages] = React.useState([])
    const [userID, setUserID] = React.useState({})


    useEffect(()=>{
        let isSub = true
        getFunc().then(data => {
            if(isSub){
            setMessages(data.message)
            setUserID(data.cUser)  
            }
            
        })
        return () => { isSub = false }
    },[messages])
 

    const getFunc = async ()=> {
        const fire = new FirebaseClass()
        const message = await fire.getMessages(route.params.chatID)
        const cUser = await fire.getCurrentUser()
        return {message,cUser}
    }

    

    const onSend = (m = []) => {
        const fire = new FirebaseClass()
        fire.senMessage(route.params.chatID,GiftedChat.append(messages,m))
    }

    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: route.params.email
        })
    },[navigation])

    return (
        <View style={{ flex: 1, backgroundColor: "white"}}>
             <GiftedChat
            messages={messages.map((x) => ({
                ...x,
                createdAt: x.createdAt?.toDate(),
              }))}
              onSend={(messages)=> onSend(messages)}
              user={{
                _id: userID.uid,
                name: userID.email,
              }}></GiftedChat>
        </View>
    )
}

export default Chat