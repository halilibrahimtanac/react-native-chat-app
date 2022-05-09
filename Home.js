import { StyleSheet,Pressable, Text,TextInput, View,Image, LogBox, ToastAndroid } from 'react-native';
import React from 'react'
import FirebaseClass from "./FirebaseClass"


const Home = ({navigation}) => {
    LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"])

    const [email,setEmail] = React.useState("")
    const [pass,setP] = React.useState("")

    const emailRef = React.useRef()
    const passRef = React.useRef()

    const checkU = async () => {
        const fire = new FirebaseClass()
        const cu = await fire.getCurrentUser()
        if(cu){
            const cU = {email: cu.email,uid: cu.uid}
            navigation.navigate("ChatList",{currentUser: cU})
        }
    }

    checkU()

    const signin = async () => {
        const fire = new FirebaseClass()
        const isSign = await fire.signInUser(email,pass)
        console.log(isSign)
        emailRef.current.clear()
        passRef.current.clear()

        setEmail("")
        setP("")

        if (isSign){
            const currentUser = await fire.getCurrentUser()
            const cU = {email: currentUser.email,uid: currentUser.uid}
            navigation.navigate("ChatList",{currentUser: cU})
        }else {
            alert("Couldn't sign in","Incorrect email or password")
        }
        
    }


    return (
        <View style={styles.stil}>
            <Image style={{ width: 200,height: 200}} source={require('C:/Users/Halil/Desktop/react/native/FirstProject/user2.png')}></Image>
            <View style={styles.textContainer}>
               <TextInput ref={emailRef} style={styles.textInput} placeholder='username' editable onChangeText={(text)=> setEmail(text)}></TextInput>
               <TextInput ref={passRef} style={styles.textInput} placeholder='password' secureTextEntry={true} onChangeText={(text)=> setP(text)}></TextInput>
            </View>
            <View style={styles.buttons}>
               <Pressable style={styles.button} onPress={signin}><Text style={{ color: "white", fontSize: 20, fontWeight: 'bold'}}>Log In</Text></Pressable>
               <Pressable style={{width: "50%",height: 30,borderRadius: 20,alignItems: "center",backgroundColor: "white",justifyContent: "center", borderColor: "black", borderWidth: 2}} onPress={()=> navigation.navigate("Register")}><Text style={{ color: "black", fontSize: 20, fontWeight: 'bold'}}>Register</Text></Pressable>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    stil : {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column",
    },
    button : {
        width: "50%",
        height: 30,
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: "black",
        justifyContent: "center",
        marginBottom: 5
    },
    buttons: {
        flex: 0.20,
        width: "100%",
        flexDirection: "column",
        alignItems: "center"
    },
    textContainer: {
        width: "100%",
        paddingHorizontal: 10
    },
    textInput: {
        width: "100%",
        padding: 8,
        fontSize: 18,
        backgroundColor: "white",
        borderColor: "lightgrey",
        borderWidth: 1,
        marginBottom: 10
    }
})

export default Home