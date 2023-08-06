import { Image, StyleSheet, Text, View } from 'react-native'
import React,{useContext} from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import { Mycontext } from '../App'
import moment from 'moment'
import { TouchableOpacity } from 'react-native'
import { updatePostLike } from '../service/PostService'

export default function Post({creator,CreatedAt,image,tags,title,desc,likes,comments,creatorId,_id}:any) {
    const {user,isLogin,setUser,setIsLogin} = useContext(Mycontext)

  return (
    <View style={styles.container}>
        <View style={{position:'absolute',zIndex:5,paddingHorizontal:5,flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
            <View >
            <Text style={{color:'white',fontWeight:'500'}}>{creator}</Text>
            <Text style={{color:'white',fontWeight:'500'}}>{moment(CreatedAt).fromNow()}</Text>
            </View>
            <View>

           {creatorId===user?.user?.id &&  <Icon2 name='dots-three-vertical' size={20} color={'white'}/>}
            </View>
        </View>
        <Image source={{uri:image}} alt='no' width={300} height={200} style={{width:'100%',borderTopRightRadius:10,borderTopLeftRadius:10}} />
        <View style={{padding:4}}>
            <Text>{tags}</Text>
            <View style={{marginVertical:5}}>
            <Text style={{fontWeight:'600'}}>{title}</Text>
            <Text>{desc}</Text>
            </View>

            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={()=>updatePostLike(_id)}>

                    {likes.includes(user?.user?.id)?<Icon name='like1' size={20} color={'blue'}/>:
                <Icon name='like2' size={20} color={'blue'}/>}
                <Text style={{fontSize:18}}>{likes.length}</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row'}}>

                {comments.length>0?<Icon3 name='comment' size={20} color={'blue'}/>
                :<Icon3 name='comment-o' size={20} color={'blue'}/>}
                <Text style={{fontSize:18}}>{comments.length}</Text>
                </View>
            </View>
            
        </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        borderRadius:10,
        margin:5,
        position:'relative',
        elevation:1

    }
})