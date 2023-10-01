import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen, ChatScreen, LoginScreen, ModalScreen, MatchScreen, ProfileScreen, MessageScreen } from './screens'
import useAuth from './hooks/useAuth'

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { user } = useAuth();
    
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            >
            {user ? (
                <>
                    <Stack.Group>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Chat" component={ChatScreen} />
                        <Stack.Screen name="Profile" component={ProfileScreen} />
                        <Stack.Screen name="Message" component={MessageScreen} />
                    </Stack.Group>
                    
                    <Stack.Group screenOptions={{ presentation: 'modal' }}>
                        <Stack.Screen name="Modal" component={ModalScreen} />
                    </Stack.Group>

                    <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
                        <Stack.Screen name="Match" component={MatchScreen} />
                    </Stack.Group>
                </>
            ) : (
                <Stack.Screen name="Login" component={LoginScreen} />
            )}
            </Stack.Navigator>
    )
}

export default StackNavigator
