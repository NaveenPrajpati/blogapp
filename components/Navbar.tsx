import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import { Mycontext } from '../App';
import { useNavigation } from '@react-navigation/native';
import Login from '../pages/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Navbar() {
  const { user, isLogin, setUser, setIsLogin,drawer } = useContext(Mycontext)

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="menu" size={30} color="white" onPress={() => drawer.current?.openDrawer()}/>
        <Text style={styles.textStyle}>Stories</Text>
      </View>
      {isLogin ?
  
          <Text style={styles.textStyle}>{user?.user?.name}</Text>
      
        : 
          <Text style={styles.textStyle}>Login to create stories</Text>
       }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: 'gray',
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:'100%',

  },
  textStyle:{
    color:'white',
    fontWeight:'500'
  }
})