import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import useAuth from '../hooks/useAuth';
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
    const navigation = useNavigation();
    const { user, logout } = useAuth();
    const pictureTrue = user.photoURL;
    const color = "#84BDFF"

    return (
        <View className="flex-row items-center justify-between px-5">
            {/* Profile image */}
            <TouchableOpacity onPress={logout}>
                {pictureTrue 
                    ? <Image 
                        className="h-10 w-10 rounded-full"
                        source={{ uri: pictureTrue }}
                    />
                    : <Image 
                        className="h-10 w-10 rounded-full"
                        source={require("../assets/profile-pic.png")}
                    />                   
                }
            </TouchableOpacity>

            {/* Logo image */}
            <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
                <Image 
                    className="h-14 w-14" 
                    source={require("../assets/app-logo.png")} 
                />
            </TouchableOpacity>

            {/* Chat Logo */}
            <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                <Ionicons
                    name="chatbubbles-sharp" 
                    size={30}
                    color={color}
                    className="h-14 w-14" 
                    source={require("../assets/app-logo.png")} 
                />
            </TouchableOpacity>
        </View>
    )
}

export default Header
