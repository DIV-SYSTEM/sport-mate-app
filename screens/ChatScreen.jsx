import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { ChatHeader, ChatList } from '../components';


const ChatScreen = () => {
    return (
        <SafeAreaView>
            <ChatHeader title="Chat" />
            <ChatList />
        </SafeAreaView>
    )
}

export default ChatScreen
