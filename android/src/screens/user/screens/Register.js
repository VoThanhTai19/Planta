import React, {useState, useContext} from 'react'
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, Pressable, ToastAndroid } from 'react-native'
import { UserContext } from '../UserContext';
export const Register = (props) => {
    const { navigation } = props;
    const { onRegister } = useContext(UserContext);
    const [email, setEmail] = useState('thanhtai123@gmail.com');
    const [password, setPassword] = useState('12345')
    const [confirmPassword, setConfirmPassword] = useState('12345');
    const register = async () => {
        if(confirmPassword.trim() ==  password.trim()) {
            const res = await onRegister(email, password)
            if(res === false) {
                ToastAndroid.show('Đăng kí không thành công', ToastAndroid.BOTTOM)
            }else {
                ToastAndroid.show('Đăng kí thành công', ToastAndroid.BOTTOM)
                navigation.goBack()
            }
        }
    }
    return (
        // <KeyboardAvoidingView>
            <ScrollView showsHorizontalScrollIndicator = {false} contentContainerStyle= {{flexGrow: 1}}>
                <View style={styles.container}>
        
                    <View style={styles.containerContext}> 
                        <View style={styles.plantaContainer}>
                            <Text style={styles.plantaText}>Planta</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textContext}>
                                Mua sắm và trải nghiệm sản phẩm cây trồng cùng phụ kiện độc đáo duy nhất tại Việt Nam
                            </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputText} placeholder="Email" onChangeText={setEmail} value={email}></TextInput>
                            <TextInput style={styles.inputText} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry={true}></TextInput>
                            <TextInput style={styles.inputText} placeholder="Confirm" onChangeText={setConfirmPassword} value={confirmPassword} secureTextEntry={true}></TextInput>
                        </View>
                        <View style={styles.loginButtonContainer}>
                            <Pressable style={styles.loginButton} onPress={register}>
                                <Text style={styles.loginButtonText}>Đăng ký</Text>
                            </Pressable>
                        </View>
                        <View style={styles.registerContainer}>
                            <Text style={styles.registerText} onPress={() => navigation.goBack()}>
                                Đăng nhập
                            </Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        // </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    
    registerText: {
        color:'#000000',
        fontWeight: '500',
        fontSize: 16,
        lineHeight:20,  
        borderBottomColor:'#000000',
        borderBottomWidth: 1,
    },
    registerContainer: {
        marginTop: 11,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        fontWeight:'500',
        fontSize:16,
        lineHeight:22,
        textAlign: 'center',
        color: 'white',
        lineHeight:50
    },
    loginButton: {
        borderRadius:8,
        width: '100%',
        height: '100%',
        backgroundColor: '#221F1F'
    }, 
    loginButtonContainer: {
        marginTop:24,
        width: '100%',
        height: 50
    },
    inputText: {
        marginVertical:4,
        lineHeight:20,
        fontWeight:'400',
        fontSize:16,
        paddingHorizontal:2,
        borderBottomWidth:1.5,
        borderBottomColor:'#ABABAB'
    },
    inputContainer: {
        marginVertical:8
    },
    textContext: {
        paddingVertical:15,
        fontWeight:'400',
        fontStyle:'normal',
        fontSize:14,
        lineHeight:26,
        textAlign: 'center',
    },   
    textContainer: {
        width: '100%',
        height:82
    },
    plantaText: {
        color: '#007537',
        fontSize:42,
        fontWeight:'700'
    },
    plantaContainer: {
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:92,
    },
    containerContext: {
        width: '100%',
        height: '100%',
        paddingHorizontal:48
        
    },
    container: {
        marginTop: 56,
        padding:0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    }
})

