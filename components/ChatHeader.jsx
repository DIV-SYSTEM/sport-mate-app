import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons, Foundation } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const ChatHeader = ({ title, callEnabled }) => {

    const navigation = useNavigation();

    return (
        <View className="p-2 flex-row items-center justify-between">
            <View className="flex flex-row items-center">
                <TouchableOpacity 
                    onPress={() => navigation.goBack()} 
                    className="p-2"
                >
                    <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold pl-2">{title}</Text>
            </View>

            {callEnabled && (
                <TouchableOpacity
                    className="bg-red-200 rounded-full mr-2 px-2 py-1"
                    onPress={() => {}}
                >
                    <Foundation name="telephone" size={25} color="red" />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default ChatHeader
