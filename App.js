
import { StyleSheet,StatusBar } from 'react-native';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import ChatList from './ChatList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './Register';
import CreateChat from './CreateChat';
import Chat from "./Chat"


const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{title: "Log In", headerTitleAlign: "center"}}></Stack.Screen> 
        <Stack.Screen name='Register' component={Register} options={{title: "Register" , headerTitleAlign: "center"}}></Stack.Screen>
        <Stack.Screen name="ChatList" component={ChatList} options={{ headerBackVisible: false}}></Stack.Screen>
        <Stack.Screen name='CreateChat' component={CreateChat} options={{ headerBackVisible: false}}></Stack.Screen>
        <Stack.Screen name='Chat' component={Chat}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"

  },
  inputs: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "70%"
  }
});
export default App