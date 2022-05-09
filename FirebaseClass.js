import { initializeApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,updateProfile } from 'firebase/auth';
import { addDoc,collection, doc, setDoc,query,where,getDocs,getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore"
import { ToastAndroid } from 'react-native'


class FirebaseClass{

    firebaseConfig = {
        
      };
    
    app;

    constructor(){
        this.app = initializeApp(this.firebaseConfig)
    }

    async registerUser(email,pass){
        const auth = await getAuth()
        let uid
        await createUserWithEmailAndPassword(auth,email,pass)
        .then(userCre => {
             console.log("uid:  " + userCre.user.uid)
             uid = userCre.user.uid
        })
        return uid
    }

    async addUserDoc(email,userName,uid){
        const db = getFirestore(this.app)
        const docRef = await addDoc(collection(db,"users"),{
            email: email,
            userID: uid,
            userName: userName
        })
        console.log("doc added: " + docRef.id)
    }

    async signInUser(email,pass){
        const auth = getAuth()
        let isSign
        await signInWithEmailAndPassword(auth,email,pass)
        .then(userCre => {
            ToastAndroid.show("Signed in: " + userCre.user.email,ToastAndroid.SHORT)
            isSign = true
        }).catch(err => {
            isSign = false
        })
        return isSign
    }

    async signOut(){
        const auth = await getAuth()
        signOut(auth).then(()=> {
            console.log("signed out")
        })
    }

    async getCurrentUser(){
        const auth = await getAuth()
        return auth.currentUser
    }


    async createChat(currentEmail,userEmail){
        const db = await getFirestore()
        const response = await doc(collection(db,"chats"))
        const q = await query(collection(db,"users"),where("email","==",userEmail))
        const snapshot = await getDocs(q)
        snapshot.forEach(async element => {
            if(element.exists()){
                await setDoc(response,{users: [currentEmail,userEmail]})
                console.log("success")
            }
        });
    }

    async getChats(email){
        const db = await getFirestore()
        const chatRef = await collection(db,"chats")
        const q = await query(chatRef,where("users","array-contains",email))
        const snapShot = await getDocs(q)
        return snapShot.docs

    }

    async getMessages(chatID){
        const db = await getFirestore()
        const docRef = await doc(db, "chats/" + chatID)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()){
            return docSnap.data().messages ? docSnap.data().messages : []
        }else {
            console.log("there is no document")
            return null
        }
    }

    async senMessage(chatID,messages){
        const db = await getFirestore()
        const docRef = await doc(db,"chats/" + chatID)
        await setDoc(docRef, { messages: messages},{merge: true})
        console.log("message sended")
    }

    async getAllUser(){
        const db = await getFirestore()
        const snapShot = await getDocs(collection(db,"users"))
        return snapShot
    }

    async updateProf(username,photoUrl){
        const auth = getAuth()
        updateProfile(auth.currentUser,{
            displayName: username,
            photoURL: photoUrl
        }).then(()=>{
            console.log("profile updated")
        }).catch(err => {
            console.log(err)
        })
    }

}

export default FirebaseClass