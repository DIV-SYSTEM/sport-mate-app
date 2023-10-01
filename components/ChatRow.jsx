import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native'
import getMatchedUserInfo from "../lib/getMatchedUserInfo";

const ChatRow = ({ matchDetails }) => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
    }, [matchDetails, user]);
    

    return (
        <TouchableOpacity 
            className="flex-row items-center py-3 px-5 bg-white mx-2 my-1 rounded-lg shadow-xl"
            onPress={() => navigation.navigate("Message", {
                matchDetails,
            })}
        >
            <Image 
                className="rounded-full h-16 w-16 mr-4 shadow-xl"
                source={{ uri: matchedUserInfo?.photoURL}}
            />

            <View>
                <Text className="text-lg font-semibold">
                    {matchedUserInfo?.displayName}
                </Text>
                <Text>Say Hi! 👋</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatRow
