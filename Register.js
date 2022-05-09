import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native';
import React from 'react'
import { Button } from 'react-native';
import FirebaseClass from './FirebaseClass';



const Register = ({navigation}) => {
    const [pass,setP] = React.useState("")
    const [email,setE] = React.useState("")
    const [userName,setUserName] = React.useState("")
    
    const passText = React.createRef()
    const emailText = React.createRef()
    const nameText = React.createRef()

    const register = async() => {
        const fire = new FirebaseClass()
        const uid = await fire.registerUser(email,pass,userName)
        console.log(uid)
        await fire.addUserDoc(email,userName,uid)
        alert("Succesfully registered!")
        navigation.navigate("Home")

    }


    return (
        <View style={styles.stil}>
            <View style={styles.textContainer}>
            <TextInput ref={nameText} style={styles.textInput}  placeholder='user name' onChangeText={(n)=> setUserName(n)}></TextInput> 
                <TextInput ref={emailText} style={styles.textInput}  placeholder='email' onChangeText={(e)=> setE(e)}></TextInput> 
                <TextInput ref={passText} style={styles.textInput}  placeholder='password' secureTextEntry={true} onChangeText={(p)=> setP(p)}></TextInput>
                </View>
            
            <Button title='register' onPress={register}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    stil : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttons: {
        flex: 0.25,
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    textContainer: {
        width: "100%",
        paddingHorizontal: 10
    },
    textInput: {
        padding: 5,
        fontSize: 24,
        backgroundColor: "lightgrey",
        marginBottom: 3
    }
})

export default Register