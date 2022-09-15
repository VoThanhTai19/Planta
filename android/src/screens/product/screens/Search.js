import React from 'react'
import { StyleSheet, Text, View, Image, TextInput, FlatList, Pressable } from 'react-native'

export const Search = (props) => {
    const { navigation } = props
    const renderItem = ({item}) => {
        const {images, name, price, quantity, _id} = item
        return (
            <Pressable onPress={() => navigation.navigate('Detail', {id: _id})}style={styles.product}>
                <View style={styles.productImageContainer}>
                    <Image style={styles.productImage} source={{uri: images[0]}}></Image>
                </View>
                <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={1}>{name}</Text>
                    <Text style={styles.productPrice}>{price}</Text>
                    <Text style={styles.productQuantity}>Còn {quantity} sản phẩm</Text>
                </View>
            </Pressable>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.textSearchContainer}>
                <Text style={styles.textSearch}>Tìm kiếm</Text>
            </View>
            <View style={styles.textInputContainer}>
                <TextInput style={styles.textInput} placeholder="Tìm kiếm"></TextInput>
                <View style={styles.searchImageContainer}>
                    <Image source={require('../../../assets/images/search.png')} style={styles.searchImage}></Image>
                </View>
            </View>
            <FlatList 
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}>
            </FlatList>
        </View>
    )
}


const styles = StyleSheet.create({
    productName:{
        fontSize:16,
        fontWeight:'500',
    },
    productPrice:{
        fontSize:16,
        fontWeight:'500',
    },
    productQuantity:{
        fontSize:14,
        fontWeight:'400'
    },
    productInfo: {
        lineHeight:22,
        justifyContent: 'center',
    },
    productImage: {
        width: 77,
        height:77,
    },
    productImageContainer: {
        marginRight: 15,
        width: '33%',
        borderRadius:8,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    product: {
        flexDirection:'row',
        paddingHorizontal:48,
        width: '100%',
        paddingVertical:15,
        height:107,
    },
    searchImage :{
        width:22,
        height:22,
    },
    searchImageContainer: {
        position: 'absolute',
        marginTop:6,
        right:48
    },
    textInput: {
        width: '100%',
        lineHeight:22,
        borderBottomWidth: 1.5,
        borderBottomColor:'#221F1F',
        paddingVertical:5.5,
        fontSize: 16,
        fontWeight: '500',
        paddingRight: 24
    },
    textInputContainer: {
        position: 'relative',
        width:'100%',
        paddingHorizontal:47,
        alignItems: 'center',
        height:33,
        marginBottom:44
    },  
    textSearch: {
        fontSize:16,
        fontWeight: '500',
        textTransform:'uppercase'

    },
    textSearchContainer: {
        marginTop: 48,
        justifyContent: 'center',
        alignItems: 'center',
        height:55
    },
    container: {
        width: '100%',
        height: '100%',
        flexGrow: 1,
        padding: 0,
        margin: 0,
        backgroundColor: 'white'

    }
})

var data = [
    {
        "sold": 73,
        "images": [
            "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
            "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
        ],
        "_id": "61d12d14555401c8610cfa3a",
        "name": "Lygeum Loefl. ex L.",
        "price": 3,
        "madein": "Mexico",
        "quantity": 3781040078,
        "category": "61d11bf386511f0016f490c9",
        "size": "2XL",
        "createdAt": "2021-11-18T02:13:41.000Z",
        "updatedAt": "2021-12-21T06:00:50.000Z"
    },
    
]
