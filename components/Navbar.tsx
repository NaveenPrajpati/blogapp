import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import { Mycontext } from '../App';
import { useNavigation } from '@react-navigation/native';
import Login from '../pages/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Navbar() {
    const {user,isLogin,setUser,setIsLogin} = useContext(Mycontext)
    const navigation=useNavigation()
    function logout(){
setUser({})
setIsLogin(false)
AsyncStorage.clear()
navigation.navigate('Home')
    }
  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <Icon name="menu" size={30} color="white" />
      <Text>Navbar</Text>
        </View>
        {isLogin?
        <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
            <Text>{user.user.name}</Text>
            <TouchableOpacity onPress={logout}>
            <Text>Signout</Text>
            </TouchableOpacity>
        </View>
        :<TouchableOpacity onPress={()=>navigation.navigate('Login')}>
            <Text>Login</Text>
            </TouchableOpacity>}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:3,
        borderRadius:5,
        backgroundColor:'gray',
        color:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }
})