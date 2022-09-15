import { StyleSheet, Text, View, Image, Pressable, ToastAndroid } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import PagerView from 'react-native-pager-view';
import { ProductContext } from '../ProductContext'
const PartialView = (props) => {
  const { product } = props;

  const { price, size, madein, quantity, _id } = product

  const { updateCart, cart } = useContext(ProductContext)

  const getQuantity = () => {
    if(cart.length == 0) {
      return 0
    }
    let item = cart.filter(i =>i.product._id == _id)
    if(item.length > 0) {
      return item[0].quantity
    }
    return 0
  }

  const [number, setNumber] = useState(getQuantity());

  const onNumberChange = (isAdd) => {
    if(isAdd == true) {   
      setNumber(number + 1)
    }else if(isAdd == false && number >= 1) {
      setNumber(number - 1)
    }
  }
  
  const onUpdateCart = () => {
    updateCart(product, number, price, false)
    ToastAndroid.show('Cập nhật giỏ hàng thành công', ToastAndroid.BOTTOM)
  }

  return (
    <>
      <View style={styles.productInfoContainer}>
        <View style={styles.productPriceContainer}>
          <Text style={styles.productPrice}>{price}đ</Text>
        </View>
        <View style={styles.productTitleContainer}>
          <Text style={styles.productTitle}>Chi tiết sản phẩm</Text>
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.productSize}>Kích cỡ</Text>
          <Text style={styles.productSize}>{size}</Text>
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.productMadeIn}>Xuất xứ</Text>
          <Text style={styles.productMadeIn}>{madein}</Text>
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.productQuantity}>Tính trạng</Text>
          <Text style={styles.productQuantity} style={{color: '#007537'}}>Còn {quantity} sp</Text>
        </View>
      </View>
      <View style={styles.addCartProcessContainer}>
        <View style={styles.addCartProcess}>
          <View style={styles.processQuantity}>
            <Text style={styles.quantityText}>Đã chọn {number} sản phẩm</Text>
            <View style={styles.quantityAction}>
              <Text onPress={() => onNumberChange(false)} style={styles.removeAction}>-</Text>
              <Text style={styles.quantity}>{number}</Text>
              <Text onPress={() => onNumberChange(true)} style={styles.addAction}>+</Text>
            </View>
          </View>
          <View style={styles.processTotalPrice}>
            <Text style={styles.totalText}>Tạm tính</Text>
            <Text style={styles.totalPrice}>{number * price}đ</Text>
          </View>
        </View>
        <View style={styles.addCartButtonContainer}>
          <Pressable onPress={onUpdateCart} style={[styles.addCartButton, number > 0 ? styles.checkButtonColor : null]}>
            <Text style={styles.addCartButtonText}>Chọn mua</Text>
          </Pressable>
        </View>
      </View>
    </>
  )
}

export const Detail = (props) => {
  const { navigation, route: {params: { id } } } = props

  const { onGetProductDetail, updateCart, cart } = useContext(ProductContext)

  const [product, setProduct] = useState(null);
  
  useEffect( async () => {
    const res = await onGetProductDetail(id);
    setProduct(res)
    return () => {
      res
    };
  }, []);

  if(!product) return(<></>)

  const { _id, name, images, price, size, madein, quantity } = product
  

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.productNameContainer}>
          <Text style={styles.productName}>{name}</Text>
        </View>
      </View>
      <View style={styles.productImagesContainer}>
        <PagerView style={styles.productImagePager} initialPage={0} orientation="horizontal">
          {
            images.map(image =>
              <Image key={Math.random()} source={{uri: image}} style={styles.productImage} resizeMode='cover'></Image>
            )
          }
        </PagerView>
      </View>
      <PartialView product={product}></PartialView>
    </View>
  );
};

const styles = StyleSheet.create({
  checkButtonColor: {
    backgroundColor: '#007537'
  },

  processTotalPrice: {
    width: 200,
    height: 57,
    alignItems: 'flex-end'
  },

  totalText: {
    fontSize: 14,
    fontWeight: '400'
  },

  totalPrice: {
    fontSize: 24,
    fontWeight: '500',
  },

  addCartButtonContainer: {
    width: '100%',
    height: 50,
  },

  addCartButton: {
    backgroundColor: '#ABABAB',
    borderRadius: 8,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addCartButtonText: {
    fontSize:16,
    fontWeight: '500',
    color: 'white',
    textTransform: 'uppercase',
  },

  addCartProcessContainer: {
    paddingHorizontal: 24,
    marginTop: 8,
  },

  addCartProcess: {
    width: '100%',
    height: 82,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  processQuantity: {
    width: 132,
    height: 51,
  },

  quantityText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000'

  },

  quantityAction: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },

  quantity: {
    fontSize: 16,
    fontWeight: '400',
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
  },

  productInfoContainer: {
    paddingHorizontal:48,
    width: '100%',
    marginTop:15
  },
  productPriceContainer: {
    width: '100%',
    height: 34,
    marginVertical:17
  },
  productPrice: {
    lineHeight: 34,
    fontSize: 24,
    fontWeight: '500',
    color: '#007537'
  },
  productTitleContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#221F1F',
    width: '100%',  
    height: 26
  },
  productTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  productDetails: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.55,
    borderBottomColor: '#ABABAB',
    width: '100%'
  },
  productSize: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  productMadeIn: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  productQuantity: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  headerContainer: {
    height: 55,
    width: '100%',
    marginTop: 52
  },

  productNameContainer: {
    alignItems: 'center',
  },

  productName: {
    fontWeight: '500',
    fontSize: 16,
    fontStyle: 'normal',
    color: '#221F1F',
    lineHeight: 55
  },

  productImagesContainer: {
    width: '100%',
    height: 268.31,
  },

  productImagePager: {
    flex: 1,
  },

  productImage: {
    width: '100%',
    height: '100%',
    marginVertical: 19,
  },

    container: {
      width: '100%',
      height: '100%',
      padding: 0,
      margin:0,
      backgroundColor: 'white'
    }
});

