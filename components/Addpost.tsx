import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Mycontext } from '../App';
import { savePost } from '../service/PostService';

export default function Addpost() {
    const { user, isLogin, setIsLogin, setUser, postData, setPostData, drawer } = useContext(Mycontext)
    const [newPostData, setNewPostData] = useState({
        creator: "",
        title: "",
        tags: "",
        message: "",
        imageFile: null
    })

    async function pickImage() {
        const result = await launchImageLibrary({ mediaType: 'photo' }, response => {
            console.log(response.assets[0].uri)
            setNewPostData({ ...newPostData, imageFile: response.assets[0].uri })
        })
    }



    const handleSubmit = async () => {


        const formData = new FormData();
        formData.append('creator', user.user.name);
        formData.append('creatorId', user.user.id);
        formData.append('title', newPostData.title);
        formData.append('tags', newPostData.tags);
        formData.append('message', newPostData.message);
        formData.append('selectedFile', newPostData.imageFile);
       
        await savePost(formData)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }


    return (
        <ScrollView style={{ flex: 1, }}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 5, padding: 10 }}>

                <TextInput placeholder='Creator' value={user.user.name} onChangeText={(nativeEvent) => setNewPostData({ ...newPostData, creator: nativeEvent })} style={{ width: '100%', padding: 2, borderWidth: 1 }}></TextInput>
                <TextInput placeholder='Title' onChangeText={(nativeEvent) => setNewPostData({ ...newPostData, title: nativeEvent })} style={{ width: '100%', padding: 2, borderWidth: 1 }}></TextInput>
                <TextInput placeholder='Tags' onChangeText={(nativeEvent) => setNewPostData({ ...newPostData, tags: nativeEvent })} style={{ width: '100%', padding: 2, borderWidth: 1 }}></TextInput>
                <TextInput placeholder='Message' onChangeText={(nativeEvent) => setNewPostData({ ...newPostData, message: nativeEvent })} style={{ width: '100%', padding: 2, borderWidth: 1 }}></TextInput>
                <TouchableOpacity onPress={pickImage} style={{ borderWidth: 2, padding: 2 }}>
                    <Text>Pick Image</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit} style={{ borderWidth: 2, padding: 2 }}>
                    <Text>Add Post</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})