import React from 'react'
import { View, Text, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './screens/HomeStack'
import { Cart } from './screens/Cart'
import SearchStack from './screens/SearchStack'
import ProfileStack from './screens/ProfileStack'
const Tab = createBottomTabNavigator();
export default function ProductNavigation() {
    return (
        <Tab.Navigator screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                if(route.name == "HomeStack") {
                    return <Image source = {require('../../assets/images/home.png')}></Image>
                } 
                else if(route.name == "SearchStack") {
                    return <Image source = {require('../../assets/images/search.png')}></Image>
                }
                else if(route.name == "Cart") {
                    return <Image source = {require('../../assets/images/cart.png')}></Image>
                }
                else if(route.name == "ProfileStack") {
                    return <Image source = {require('../../assets/images/profile.png')}></Image>
                }
            },
            tabBarLabel: ({focused}) => {
                if(route.name == "HomeStack") {
                    if(focused) {
                        return <Image source = {require('../../assets/images/dot.png')}></Image>
                    }
                    return null
                } 
                else if(route.name == "SearchStack") {
                    if(focused) {
                        return <Image source = {require('../../assets/images/dot.png')}></Image>
                    }
                    return null
                }
                else if(route.name == "Cart") {
                    if(focused) {
                        return <Image source = {require('../../assets/images/dot.png')}></Image>
                    }
                    return null
                }
                else if(route.name == "ProfileStack") {
                    if(focused) {
                        return <Image source = {require('../../assets/images/dot.png')}></Image>
                    }
                    return null
                }
            },
            headerShown: false
        })}>
            <Tab.Screen name="HomeStack" component={HomeStack}/>
            <Tab.Screen name="SearchStack" component={SearchStack}/>
            <Tab.Screen name="Cart" component={Cart}/>
            <Tab.Screen name="ProfileStack" component={ProfileStack}/>
        </Tab.Navigator>
    )
}
