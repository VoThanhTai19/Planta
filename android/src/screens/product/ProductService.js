import axiosInstance from '../../utills/axios'
export const getProductForHomePage = async () => {
    const res = axiosInstance.get('api/products/get-for-home-page')
    return res
}

export const getProductDetail = async (id) => {
    const res = axiosInstance.get(`api/products/${id}/view`)
    return res
}

export const saveCart = async (data) => {
    const res = await axiosInstance.post('/api/carts', data)
    return res
}