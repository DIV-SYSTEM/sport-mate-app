import React from 'react'
import { View, Text, Image } from 'react-native'

const SenderMessage = ( {message} ) => {
    return (
        <View className="bg-purple-600 rounded-tr-none rounded-lg px-5 py-3 mx-3 my-2 self-start ml-auto">
            <Image
                source={{ uri: message.photoURL }}
                className="h-12 w-12 rounded-full absolute top-0 -left-14"
            />
            <Text className="text-white">{message.message}</Text>
        </View>
    )
}

export default SenderMessage
