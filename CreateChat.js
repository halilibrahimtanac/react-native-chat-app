import { StyleSheet,Pressable, Text,TextInput, View, BackHandler } from 'react-native';
import React from 'react'
import FirebaseClass from './FirebaseClass';

const CreateChat = ({route,navigation}) => {

    const [userE,setUserE] = React.useState("")

    

    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: ()=>(
                <Text>{route.params.currentE}</Text>
            )
        })
    },[navigation])

    const createChat = async () => {
        const fire = new FirebaseClass()
        const allUsers = await fire.getAllUser()
        let a = 0
        await allUsers.forEach((doc) => {
            if(doc.data().email === userE){
              a = a + 1
              fire.createChat(route.params.currentE,userE)
              alert("success","created")
              navigation.navigate("ChatList",{currentUser: route.params.currentE}) 
              
            }
        })
        if(a === 0){
            alert("There is no such user")
        }
        
        
    
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputCon}>
               <TextInput onChangeText={(t)=> setUserE(t)} style={styles.textInput} editable placeholder='user email'></TextInput>
               <Pressable onPress={createChat} style={styles.createBtn}><Text style={{ color: "white",fontWeight: "bold",fontSize: 20}}>create chat</Text></Pressable> 
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    inputCon: {
        width: "100%",
        height: "25%",
        paddingHorizontal: 15,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    textInput: {
        width: "100%",
        padding: 8,
        fontSize: 18,
        backgroundColor: "white",
        borderColor: "lightgrey",
        borderWidth: 1,
        marginBottom: 10
    },
    createBtn: {
        width: "50%",
        height: 35,
        alignItems: "center",
        backgroundColor: "black",
        justifyContent: "center"
    }
})

export default CreateChat