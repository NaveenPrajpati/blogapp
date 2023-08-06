import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect,createContext,useState } from 'react'
import axios from 'axios'
import { getPosts } from './service/PostService'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
const Stack = createNativeStackNavigator();
export const Mycontext=createContext()

export default function App():JSX.Element {
const[user,setUser]=useState()
const [isLogin, setIsLogin] = useState(false)
const [loading, setLoading] = useState(false)


  const value={
    user,setUser,isLogin,setIsLogin,loading,setLoading
  }

  
  return (
    <NavigationContainer>
      <Mycontext.Provider value={value}> 

      <Navbar/>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
    </Stack.Navigator>
      </Mycontext.Provider>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({})