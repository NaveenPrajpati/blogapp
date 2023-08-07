import { FlatList, Image, StyleSheet, Text, View,Button } from 'react-native'
import React, { useEffect,useState,useContext, useRef } from 'react'
import { getPosts } from '../service/PostService'
import Post from '../components/Post'
import { Mycontext } from '../App'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DrawerLayoutAndroid } from 'react-native'
import Navbar from '../components/Navbar'
import { TouchableOpacity } from 'react-native'

export default function Home({navigation}) {
    const {user,isLogin,setIsLogin,setUser,postData,setPostData,drawer} = useContext(Mycontext)


  async function getAllData(){
      await getPosts()
      .then(res=>{
      //  console.log(res.data)
       setPostData(res.data)
      })
      .catch(err=>{
       console.log(err)
      })
     }


    useEffect(()=>{

      if(!isLogin){
        const getData = async () => {
             await AsyncStorage.getItem('user').then(res=>{
              setUser(JSON.parse(res!))
              setIsLogin(res!=null)
              // navigation.navigate('Home')
             })
             .catch(err=>{

              console.log('error occur ',err)
             })
              
          
          };
         
          getData()
      }
      getAllData()
      },[])

      function logout() {
        setUser({})
        setIsLogin(false)
        AsyncStorage.clear()
      }

  return (
    <DrawerLayoutAndroid
    ref={drawer}
    drawerWidth={200}
    drawerPosition='left'
    
    renderNavigationView={()=>(
      <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',gap:5,flex:1}}>
            
      <Button
        title="Close drawer"
        onPress={() => drawer.current?.closeDrawer()}
      />
   {isLogin?<View>
    <TouchableOpacity onPress={() => navigation.navigate('Addpost')} style={{borderWidth:1,padding:2}}>
            <Text>Add Post</Text>
          </TouchableOpacity>
    <TouchableOpacity onPress={logout} style={{borderWidth:1,padding:2}}>
            <Text>Signout</Text>
          </TouchableOpacity></View>: 
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{borderWidth:1,padding:2}}>
          <Text>Login</Text>
        </TouchableOpacity>}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{borderWidth:2,padding:2}}>
          <Text>Signup</Text>
        </TouchableOpacity>
        


      </View>
    )}
    >

    <View>
    <Navbar/>

      <FlatList
      data={postData}
      renderItem={({item,index})=>(
        <Post 
        
        key={index}
        creator={item.creator}
         CreatedAt={item.createdAt}
         image={item.imageFile}
         tags={item.tags}
         title={item.title}
         desc={item.message}
         likes={item.likes}
         comments={item.comments}
         creatorId={item.creatorId}
         _id={item._id}
         
         />
        )}
        />
    </View>
    </DrawerLayoutAndroid>

  )
}

const styles = StyleSheet.create({})