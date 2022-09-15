import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

export const CartHistory = (props) => {

  const displayDay = (day) => {
    switch (day) {
      case 0: return 'Chủ nhật'
      case 1: return 'Thứ hai'
      case 2: return 'Thứ ba'
      case 3: return 'Thứ tư'
      case 4: return 'Thứ năm'
      case 5: return 'Thứ sáu'
      case 6: return 'Thứ bảy'
      
      default:
        break;
    }
  }
  
  const displayTime = (time) => {
    time = new Date(time);
    const day = displayDay(time.getDay())
    const date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate() 
    const month = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1) 
    const year = time.getFullYear()
    return `${day}, ${date}/${month}/${year}`
  }

  const renderItem = ({ item }) => {
    const { createdAt, total, products, status } = item
    return(
      <View style={styles.cartItemContainer}>
          <Text style={styles.date}>{displayTime(createdAt)}</Text>
          <View style={styles.infoCart}>
            <Text style={styles.status}>Trạng thái: {status}</Text>
            <Text style={styles.products}>Tổng sản phẩm: {products.length} sản phẩm</Text>
            <Text style={styles.total}>Tổng tiên: {total}đ</Text>
          </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch sử giao dịch</Text>
      <FlatList
        data={data}
        keyExtractor={item=> Math.random()}
        renderItem={renderItem}>

      </FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    paddingHorizontal: 48,
    height: 145,
    justifyContent: 'center',
  },

  date: {
    borderBottomWidth:0.5,
    borderBottomColor: '#7D7B7B',
    height: 26,
    lineHeight: 22,
    fontSize: 16
  },

  infoCart: {
    marginTop: 8,
    height: 74,
    justifyContent: 'center'
  },

  status: {
    fontSize: 16,
    color: '#007537',
  },

  products: {
    fontSize: 16,
    marginTop: 2
  },

  total: {
    fontSize: 16,
    marginTop: 2
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
});

var data = [
    {
        "_id": "6206fc74a15e450016621e1c",
        "user": "61dfa65f48d96c0016e6968b",
        "status": "Đang xử lý",
        "total": 13,
        "products": [
            {
                "_id": "6206fc74a15e450016621e1d",
                "product": "61d12f0c555401c8610fb8d1",
                "quantity": 2,
                "price": 1
            },
            {
                "_id": "6206fc74a15e450016621e1e",
                "product": "61d12f0c555401c8610fb8d2",
                "quantity": 2,
                "price": 1
            },
            {
                "_id": "6206fc74a15e450016621e1f",
                "product": "61d12f0c555401c8610fb8d3",
                "quantity": 3,
                "price": 3
            }
        ],
        "createdAt": "2022-02-12T00:16:52.454Z",
        "updatedAt": "2022-02-12T00:16:52.454Z"
    },
    {
      "_id": "6206fc74a15e450016721e1c",
      "user": "61dfa65f48d96c0016e6968b",
      "status": "Đã giao hàng",
      "total": 22,
      "products": [
          {
              "_id": "6206fc74a15e450016621e1d",
              "product": "61d12f0c555401c8610fb8d1",
              "quantity": 2,
              "price": 1
          },
          {
              "_id": "6206fc74a15e450016621e1e",
              "product": "61d12f0c555401c8610fb8d2",
              "quantity": 2,
              "price": 1
          },
          {
              "_id": "6206fc74a15e450016621e1f",
              "product": "61d12f0c555401c8610fb8d3",
              "quantity": 3,
              "price": 3
          }
      ],
      "createdAt": "2022-08-24T00:16:52.454Z",
      "updatedAt": "2022-02-12T00:16:52.454Z"
  }
]