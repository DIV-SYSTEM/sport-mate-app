import React from 'react'
import { SafeAreaView } from 'react-native'
import { Header, Card } from '../components';

const HomeScreen = () => {
    return (
        <SafeAreaView className="flex-1">
            <Header />
            <Card />
        </SafeAreaView>
    )
}

export default HomeScreen
