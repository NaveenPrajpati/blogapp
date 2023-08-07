import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { ScrollView } from 'react-native'
import { loginUser } from '../service/UserService'
import { Mycontext } from '../App'

export default function Signup({navigation}) {
  const {setUser,setIsLogin}=useContext(Mycontext)

  const[otpbtn,setOtpbtn]=useState(false)
  const [signupData,setSignupData]=useState({
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confpass:"",
      userType:"public",
      otp:""
  })

  async function handle() {
    await loginUser(signupData)
       .then(res => {
        console.log(res.data)
         setUser(res.data)
         setIsLogin(true)
 
         
        
         navigation.navigate('Login')
       })
       .catch((error) => {
         console.log("request mai error aara hai")
         console.log(error)
 
       })
   }

  return (
    <ScrollView style={{flex:1,}}>
      <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',gap:5,padding:10}}>

  <TextInput  placeholder='First Name'   onChangeText={(nativeEvent)=>setSignupData({...signupData,firstName:nativeEvent})} style={{width:'100%',padding:2,borderWidth:1}}></TextInput>
  <TextInput placeholder='Last Name'   onChangeText={(nativeEvent)=>setSignupData({...signupData,lastName:nativeEvent})} style={{width:'100%',padding:2,borderWidth:1}}></TextInput>
  <TextInput placeholder='email'   onChangeText={(nativeEvent)=>setSignupData({...signupData,email:nativeEvent})} style={{width:'100%',padding:2,borderWidth:1}}></TextInput>
  <TextInput placeholder='password'   onChangeText={(nativeEvent)=>setSignupData({...signupData,password:nativeEvent})} style={{width:'100%',padding:2,borderWidth:1}}></TextInput>
  <TouchableOpacity onPress={handle} style={{borderWidth:2,padding:2}}>
    <Text>Signup</Text>
  </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})