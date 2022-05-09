import { StyleSheet,Pressable, Text, View, Button } from 'react-native';
import React from 'react'
import FirebaseClass from './FirebaseClass';


const ChatList = ({route,navigation}) => {

    const [user,setUser] = React.useState(route.params.currentUser)
    const [allU,setAllU] = React.useState([])

    

    const signout = async () => {
        const fire = new FirebaseClass()
        await fire.signOut()
        navigation.navigate("Home")
    }

    const getUser = async () => {
        return route.params.currentUser
    }
    
    React.useEffect(()=>{
        let isSub = true
        getU().then(data=>{
            if(isSub){
              setAllU(data)  
            }
            
        })
        return () => { isSub = false}
    },[allU])

    React.useEffect(()=>{
        let isSub = true
        getUser().then(data => {
            if(isSub){
              setUser(data)  
            }     
        })
        return () => { isSub = false}
    },[user])

    const getU = async ()=>{
        const fire = new FirebaseClass()
        const allusers = await fire.getChats(user.email)
        return allusers
    }

    React.useLayoutEffect(()=> {
        navigation.setOptions({
        headerRight: () => (
            <View style={{ flexDirection: "row"}}>     
            <Pressable onPress={signout}><Text>signout</Text></Pressable>
            </View> 
        ),
        headerTitle: route.params.currentUser.email
      })
    },[navigation])
    
    return (
        <View style={styles.container}>
            <Pressable style={{ backgroundColor: "white", borderColor: "black", borderWidth: 3, width: "50%", marginLeft: "25%", alignItems: 'center',padding: 5}} onPress={() => navigation.navigate("CreateChat",{currentE: user.email})}><Text style={{ fontSize: 16}}>create chat</Text></Pressable>
            {
                allU.map((a)=>(
                    a.data().users.map((u)=>(
                        u != user.email ? <Pressable onPress={()=> navigation.navigate("Chat",{chatID: a.id,email: u})} key={a.id} style={{ borderColor: "grey",borderWidth: 4, margin: 10, padding: 10}}>
                            <Text>{u}</Text>
                            </Pressable>: null
                    ))
                ))
            }
                 </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default ChatList