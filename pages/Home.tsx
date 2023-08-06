import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect,useState,useContext } from 'react'
import { getPosts } from '../service/PostService'
import Post from '../components/Post'
import { Mycontext } from '../App'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home() {
    const [postData,setPostData]=useState()
    const {user,isLogin,setIsLogin} = useContext(Mycontext)


    useEffect(()=>{

        async function getAllData(){
         await getPosts()
         .then(res=>{
          console.log(res.data)
          setPostData(res.data)
         })
         .then(err=>{
          console.log(err)
         })
        }

    

      getAllData()
      if(!isLogin){
        const getData = async () => {
            try {
              const jsonValue = await AsyncStorage.getItem('user');
               jsonValue != null ? JSON.parse(jsonValue) : null
               console.log(jsonValue != null ? JSON.parse(jsonValue) : null)
            } catch (e) {
              // error reading value
            }
          };
         
          console.log( getData())
      }
      },[])

  return (
    <View>

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
  )
}

const styles = StyleSheet.create({})