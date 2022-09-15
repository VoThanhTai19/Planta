import React, {useState, useContext, useEffect} from 'react'
import { StyleSheet, Text, View, Image, Pressable, FlatList, Dimensions, Modal, ToastAndroid } from 'react-native'
import { Feather, FontAwesome, SimpleLineIcons, MaterialIcons  } from '@expo/vector-icons';
import { ProductContext } from '../ProductContext'
const CheckoutModal = (props) => {
    const { isShowModal, setIsShowModal } = props
    const { onSaveCart } = useContext(ProductContext)

    const onCheckOut =async () => {
        await onSaveCart()
        ToastAndroid.show('Thanh toán thành công', ToastAndroid.BOTTOM)
        setIsShowModal(false)
    }
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShowModal}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Xác nhận thanh toán</Text>
                    <Pressable style={styles.modalButton} onPress={onCheckOut}>
                        <Text style={styles.modalButtonText}>Đồng ý</Text>
                    </Pressable>
                    <Text style={styles.modalCannel} onPress={() => setIsShowModal(false)}>Hủy bỏ</Text>
                </View>
            </View>
        </Modal>
    )
}

const CartItem = (props) => {
    
    const { cart, updateCart } = props

    const renderItem = ({ item }) => {
        const { product, quantity, price, checked} = item
        
        return(
            <View style={styles.cartItemContainer}>
                <View style={styles.checkedContainer}>
                    {
                        checked == true ?
                        <FontAwesome name="check-square" size={24} color="black" />
                        : <Feather name="square" size={20} color="black" />   
                    }
                    
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} resizeMode='cover' source={{uri: product.images[1]}}></Image>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoName} numberOfLines={1} >{product.name}</Text>
                    <Text style={styles.infoPrice}>{product.price}đ</Text>
                    <View style={styles.quantityAction}>
                        <Text onPress={() => updateCart(product, quantity - 1, price, true)} style={styles.removeAction}>-</Text>
                        <Text style={styles.quantity}>{quantity}</Text>
                        <Text onPress={() => updateCart(product, quantity + 1, price, true)}style={styles.addAction}>+</Text>
                        {/* <Text style={styles.deleteAction}>Xóa</Text> */}
                    </View>
                </View>
            </View>
        )
    }

    return (
        <FlatList 
            data={cart} 
            renderItem={renderItem} 
            keyExtractor={item => Math.random()} 
            style={styles.flatlistContainer}
            showsVerticalScrollIndicator={false} >

        </FlatList>
        
    )
}

export const Cart = (props) => {

    const { navigation } = props
    const { updateCart, cart } = useContext(ProductContext)

    // useEffect(() => {
    //     setData([])
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         const res = getCart()
    //         setData([...res])
    //     })
    //   return unsubscribe
    // }, [navigation])
    

    const [isShowModal, setIsShowModal] = useState(false);


    const isShowCheckout = () => {
        const items = cart.filter(item => item.checked == true) || []
        let total = 0
        for (let i = 0; i < items.length; i++) {
            const element = items[i]
            total += element.quantity * element.price
        }
        return {isShow: items.length > 0, total: total}
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleCartContainer}>
                <Text style={styles.titleCart}>Giỏ hàng</Text>
                {/* <Feather name="trash-2" size={24} color="black" style={styles.trash}/> */}
            </View>
            <View style={styles.context}>
                {
                    cart.length == 0 ?
                    <View style={styles.noCartContainer}>
                        <Text style={styles.noCart}>Giỏ hàng của bạn hiện đang trống</Text>
                    </View> :
                    <CartItem cart={cart} updateCart={updateCart}></CartItem>
                }
            </View>
            <View style={styles.checkoutContainer}>
                {
                    isShowCheckout().isShow == true ?
                    <>
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalText}>Tạm tính</Text>
                            <Text style={styles.totalPrice}>{isShowCheckout().total}đ</Text>
                        </View>
                        <Pressable onPress={() => setIsShowModal(true)} style={styles.checkoutButton}>
                            <Text style={styles.checkoutButtonText}>Tiến hành thanh toán</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={28} color="white"/>
                        </Pressable>
                    </> : null
                }
                
            </View>
            <CheckoutModal isShowModal={isShowModal} setIsShowModal={setIsShowModal}/>
        </View>
    )
}


const styles = StyleSheet.create({
    modalText: {
        height: 55,
        lineHeight: 55,
        fontSize: 16,
        color: '#252A31'
    },

    modalButton: {
        height: 50,
        backgroundColor: '#007537',
        width: '100%',
        marginTop: 16,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    modalButtonText: {
        fontSize: 16,
        color: 'white'
    },

    modalCannel: {
        height: 30,
        marginTop: 12,
        borderBottomWidth: 1,
        lineHeight: 30,
        fontSize: 16,
        color: '#221F1F'
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    modalView: {
        paddingHorizontal: 24,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        height: 200 
    },
    flatlistContainer: {
        maxHeight: Dimensions.get('window').height - 250
    },

    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 43,
        alignItems: 'center',
    },

    totalText: {
        fontSize: 14,
        fontWeight: '400',
        opacity: 0.6
    },

    totalPrice: {
        fontSize: 16,
        fontWeight: '500'
    },

    checkoutContainer: {
        // justifyContent:'flex-end',
        paddingHorizontal: 24,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },

    checkoutButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#007537',
        paddingHorizontal: 34,
        borderRadius: 8,
        height: 50,
        alignItems: 'center',
    },

    checkoutButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white'
    },

    deleteAction: {
        fontSize: 16,
        fontWeight: '500',
        borderBottomWidth: 1
    },

    removeAction: {
        fontSize: 14,
        borderWidth: 1.5,
        borderColor: '#7D7B7B',
        padding: 6,
        width: 22,
        height: 22,
        lineHeight:12,
        textAlign: 'center',
        marginRight:21
    },
    
      quantity: {
        fontSize: 16,
        fontWeight: '400',
        marginRight:21
    },
    
      addAction: {
        fontSize: 14,
        borderWidth: 1.5,
        borderColor: '#7D7B7B',
        padding: 6,
        width: 22,
        height: 22,
        lineHeight:12,
        textAlign: 'center',
        marginRight:41
    },
    quantityAction: {
        marginTop: 13,
        flexDirection: 'row',
        height: 20
    },
    infoName: {
        fontSize: 14,
        fontWeight: '400',
        height: 22
    },

    infoPrice: {
        fontSize: 16,
        fontWeight: '500',
        color: '#007537',
        height: 22
    },

    cartItemContainer: {
        flexDirection: 'row',
        height: 107,
        width: '100%',
        alignItems: 'center',
    },

    checkedContainer: {
        width: 68,
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageContainer: {
        width: 77,
        height: 77,
        borderRadius:8,
        backgroundColor: '#F6F6F6',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: '100%',
        height: '100%',
    },

    infoContainer: {
        marginLeft: 15,
        marginRight: 24,
        height: 77
    },

    noCartContainer: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    noCart: {
        fontSize: 14,
        fontWeight: '400'
    },

    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding: 0,
        margin: 0,
        position: 'relative'
    },

    trash: {
        position: 'absolute',
        right: 24,
    },

    titleCartContainer: {
        width: '100%',
        height: 55,
        marginTop: 52,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },

    titleCart: {
        fontSize: 16,
        fontWeight: '500',
        textTransform: 'uppercase',
    },

})

