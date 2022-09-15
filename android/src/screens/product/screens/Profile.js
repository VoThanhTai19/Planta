import React from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
export const Profile = (props) => {
    const { navigation } = props
    const {_id, name, address, phone, avatar, email} = data
    return (
        <View style={styles.container}>
            
            <Text style={styles.title}>Profile</Text>
            <View style={styles.profileContainer}>
                <View style={styles.infoContainer}>
                    <View style={styles.avatarContainer}>
                        {
                            avatar.trim().length == 0 ?
                            <FontAwesome5 name="user-circle" size={28} color="black" /> :
                            <Image source={{uri: avatar}} resizeMode='cover' style={styles.avatar}></Image>
                        }
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name} numberOfLines={1}>{name}</Text>
                        <Text style={styles.email} numberOfLines={1}>{email}</Text>
                    </View>
                </View>
                <View style={styles.actionProfileContainer}>
                    <Text style={styles.actionTitle}>Chung</Text>
                    <Text style={styles.action} onPress={() => navigation.navigate('EditProfile')}>Chỉnh sửa thông tin</Text>
                    <Text style={styles.action} onPress={() => navigation.navigate('CartHistory')}>Lịch sử giao dịch</Text>
                    <Text style={styles.actionTitle}>Ứng dụng</Text>
                    <Text style={[styles.action, {color: '#FF0000'}]}>Đăng xuất</Text>
                </View>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
   
    actionProfileContainer: {
        marginTop: 10,
    },

    actionTitle: {
        height: 42,
        borderBottomColor: '#ABABAB',
        borderBottomWidth:1,
        lineHeight:48,
        fontSize:16,
        color:'#7F7F7F'
    },

    action: {
        marginTop: 15,
        height: 24,
        lineHeight: 24,
        fontSize:16,
    },

    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 52,
    },

    title: {
        textTransform: 'uppercase',
        fontSize: 16,
        height: 55,
        lineHeight: 55,
        textAlign: 'center',
    },

    profileContainer: {
        paddingHorizontal:48
    },

    infoContainer: {
        height: 72,
        flexDirection: 'row',
        alignItems: 'center',

    },

    avatarContainer: {
        marginRight: 18,
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center'
    },

    avatar: {
        width: '100%',
        height: '100%',
        borderRadius:20
    },

    nameContainer: {
        height: 42,
        justifyContent: 'center',
    },

    name: {
        fontSize: 16,
        fontWeight: '500',
    },

    email: {
        fontSize: 14,
        color: '#7F7F7F',
        fontWeight: '400',
    },

})

var data = {
    "_id": "6201ddd2586f3d001696d5c1",
    "name": "Võ Thanh Tài",
    "address": "A9/24 Ấp 1, xã Bính Chánh",
    "phone": "0787 807 208",
    "avatar": "",
    "dob": "2022-02-08T03:04:50.038Z",
    "email": "thanhtai@gmail.com",
    "createdAt": "2022-02-08T03:04:50.041Z",
    "updatedAt": "2022-02-08T03:04:50.041Z",
    "__v": 0
}
