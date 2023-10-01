import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

const MatchScreen = () => {

    const navigation = useNavigation();
    const { params } = useRoute();
    const { profileLoggedIn, userSwiped } = params;

    return (
        <View className="h-full bg-blue-400 pt-20 opacity-90">
            <View className="justify-center px-10 pt-20">
                <Text className="text-white text-center mt-5 text-5xl font-medium">
                    Congrats!
                </Text>
            </View>
            <Text className="text-white text-center text-xl mt-5 ">
                You and {userSwiped.displayName} can start chating.
            </Text>
            <View className="flex-row justify-evenly mt-10">
                <Image
                className="h-32 w-32 rounded-full"
                source={{
                    uri: profileLoggedIn.photoURL,
                }}
                />
                <Image
                    className="h-32 w-32 rounded-full"
                    source={{
                        uri: userSwiped.photoURL,
                    }}
                />
            </View>
            <TouchableOpacity
                className="bg-white mx-20 my-5 py-3 rounded-full mt-32 shadow-xl"
                onPress={() => {
                    navigation.goBack();
                    navigation.navigate("Chat");
                }}
            >
                <Text className="text-center text-xl font-light">Start Chating! 💬</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="bg-white mx-20 py-3 rounded-full mb-10 shadow-xl"
                onPress={() => {
                    navigation.goBack();
                    navigation.navigate("Profile");
                }}
            >
                <Text className="text-center text-xl font-light">Go to the profile! 👀</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MatchScreen
