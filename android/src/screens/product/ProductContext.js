import React, {useState, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getProductForHomePage, getProductDetail, saveCart } from './ProductService'


export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
    const { children } = props;
    const [cart, setCart] = useState([]);

    const onGetProductForHomePage = async () => {
        try {
            const res = await getProductForHomePage();
            if(res.error == false) {
                return res.data
            }
        } catch (error) {
            console.error(error);
        }
        return [];
    }

    const onGetProductDetail = async (id) => {
        try {
            const res = await getProductDetail(id);
            if(res.error == false) {
                return res.data
            }
        } catch (error) {
            console.error(error)
        }
        return null;
    }

    const updateCart = (product, quantity, price, checked = true) => {
        let _cart = cart
        if(_cart.length == 0) {
            //không có
            _cart.push({product, quantity, price, checked})
        }else {
            let items = _cart.filter(item => item.product._id == product._id)
            if(items.length == 0) {
                _cart.push({product, quantity, price, checked})
            }else {
                // có sản phẩm này trong giỏ hàng
                if (quantity <= 0) {
                    // xóa sản phẩm khỏi giỏ hàng
                    _cart = _cart.filter(item => item.product._id != product._id)
                } else {
                    // cập nhật số lượng
                    _cart = _cart.map(item => {
                        if(item.product._id === product._id) {
                            item.quantity = quantity > 3 ? 3 : quantity
                            item.checked = checked
                        }
                        return item
                    })
                }
            }
        }
        setCart([..._cart])
    }

    const onSaveCart = async () => {
        try {
            let total = 0
            let products = []
            for (let i = 0; i < cart.length; i++) {
                const element = cart[i]
                total += element.quantity * element.price
                products.push({
                    product: element.product._id,
                    price: element.product.price,
                    quantity: element.product.quantity,
                })
            }
            await saveCart({total, products})
            setCart([...[]])
        } catch (error) {
            console.log('onSaveCart error', error)

        }
    }

    return (
        <ProductContext.Provider value={{cart, onGetProductForHomePage, onGetProductDetail, updateCart, onSaveCart}}>
            {children}
        </ProductContext.Provider>
    );
};

