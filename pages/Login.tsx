import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useContext} from 'react'
import { ScrollView } from 'react-native'
import { Image } from 'react-native'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Alert } from 'react-native'
import { createNewPassword, loginUser } from '../service/UserService'
import { Mycontext } from '../App'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {

    const [resetOpt, setResetOpt] = useState(false)
    const {setUser,setIsLogin}=useContext(Mycontext)




    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const [resetData, setResetData] = useState({
      otp: "",
      newPassword: "",
      confNewPassword: ""
    })
  
    
  
  
  
    // function handleChangePass(event) {
    //   setResetData({ ...resetData, [event.target.name]: event.target.value });
  
    // }
  
  
  
  
    async function handleNewPassword() {
    
     await createNewPassword(resetData)
        .then(res => 
          { console.log(res.data)
        setResetOpt(false)
        })
        .catch(error => {
          console.log("request mai error aara hai")
          console.log(error)
        })
    }
  
  
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
  
        await AsyncStorage.setItem('user', jsonValue);
       
      } catch (e) {
        // saving error
      }
    };

    async function handle() {
     await loginUser({email:email,password:password})
        .then(res => {
         console.log(res.data)
          setUser(res.data)
          setIsLogin(true)
            storeData(res.data)
          
         
          navigation.navigate('Home')
        })
        .catch((error) => {
          console.log("request mai error aara hai")
          console.log(error)
  
        })
    }
  
    function handlePass() {
      
    }
  
  
    const [isActive, setIsActive] = useState(true);
  
    const toggleButton = () => {
      setIsActive(!isActive);
  
    };
  



  return (
    <ScrollView style={{flex:1,}}>
      <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',gap:5,padding:10}}>

  <TextInput placeholder='email'   onChangeText={(nativeEvent)=>setEmail(nativeEvent)} style={{width:'100%',padding:2,borderWidth:1}}></TextInput>
  <TextInput placeholder='password'   onChangeText={(nativeEvent)=>setPassword(nativeEvent)} style={{width:'100%',padding:2,borderWidth:1}}></TextInput>
  <TouchableOpacity onPress={handle} style={{borderWidth:2,padding:2}}>
    <Text>login</Text>
  </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})

