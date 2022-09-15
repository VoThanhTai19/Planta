import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
export const EditProfile = (props) => {
  const { navigation } = props
  const {_id, name, address, phone, avatar, dob, email} = data

  const [fullName, setFullName] = useState(name)
  const [location, setLocation] = useState(address)
  const [numberPhone, setNumberPhone] = useState(phone)
  const [birthday, setBirthday] = useState(dob)

  const [showDataTimePicker, setShowDataTimePicker] = useState(false)

  const displayTime = (time) => {
    time = new Date(time)
    return time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear()
  }

  const onChangeDateTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDataTimePicker(false);
    setBirthday(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉnh sửa thông tin</Text>
      <View style={styles.editProfileContainer}> 
        <Text style={styles.textNote}>Thông tin sẽ được lưu cho lần mua kế tiếp.
              Bấm vào thông tin chi tiết để chỉnh sửa.
        </Text>
        <View>
          <TextInput style={[styles.textInput, {marginTop: 38}]} value={fullName} onChangeText={setFullName}></TextInput>
          <TextInput style={styles.textInput} value={location} onChangeText={setLocation}></TextInput>
          <TextInput style={styles.textInput} value={numberPhone} onChangeText={setNumberPhone}></TextInput>
          <TextInput style={styles.textInput} value={displayTime(birthday)} onPressIn={() => setShowDataTimePicker(true)}></TextInput>
        </View>
      </View>
      <View style={styles.buttonSaveContainer}>
        <Pressable style={styles.buttonSave}>
          <Text style={styles.save}>Lưu thông tin</Text>
        </Pressable>

        {showDataTimePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(birthday)}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChangeDateTime}
        />
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editProfileContainer: {
    paddingHorizontal: 48,
    marginTop: 15
  },

  textNote: {
    fontSize: 14,
    color: '#221F1F',
    height: 40
  },

  textInput: {
    marginTop: 15,
    color: '#7D7B7B',
    fontSize: 14,
    borderBottomWidth: 0.55,
    borderBottomColor: '#ABABAB',
    lineHeight: 24,
    height: 24,
  },

  buttonSaveContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    paddingHorizontal: 24,
    justifyContent: 'center'
  },

  buttonSave: {
    backgroundColor: '#7D7B7B',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  save: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '500',
    color: 'white'
  },

  title: {
    textTransform: 'uppercase',
    fontSize: 16,
    height: 55,
    lineHeight: 55,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 52,
    position: 'relative',
  },
});

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
