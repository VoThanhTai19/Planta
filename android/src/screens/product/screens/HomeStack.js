import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './Home';
import { Detail } from './Detail';
const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
    )
}

