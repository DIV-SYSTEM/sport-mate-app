import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import useAuth from '../hooks/useAuth'
import { db } from "../firebase";
import { serverTimestamp, setDoc, doc } from "@firebase/firestore"

const ModalScreen = () => {

    const { user } = useAuth();
    //console.log(user);
    const navigation = useNavigation();
    const [name, setName] = useState(null)
    const [image, setImage] = useState(null)
    const [job, setJob] = useState(null)
    const [age, setAge] = useState(null)
    const color = "#84BDFF"

    const incompleteForm = !name || !image || !job || !age;  
    
    /* La funcion crea un nuevo usuario en la colección "USERS" con los siguientes atributos */
    const updateUserProfile = () => {
        setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            displayName: name,
            photoURL: image,
            job: job,
            age: age,
            timestamp: serverTimestamp(),
        }).then(() => {
            navigation.navigate("Home")
        }).catch((error) => {
            console.log(error)
            alert(error.message);
        });
    };

    return (
        <View className="flex-1 items-center pt-1">
            <Image 
                className="h-20 w-full"
                resizeMode="contain"
                source={require("../assets/app-logo.png")}
            />

            <Text className="text-xl text-gray-500 p-2 font-bold">
                Welcome {user.email}
            </Text>

            {/* Introducir datos ... */}
            <Text className="text-center p-4 font-bold text-blue-400">
                Step 1: Your Name
            </Text>
            <TextInput
                value={name}
                onChangeText={setName}
                className="text-center text-xl pb-2"
                placeholder="Enter your Name"
            />

            <Text className="text-center p-4 font-bold text-blue-400">
                Step 2: The Profile Pic
            </Text>
            <TextInput
                value={image}
                onChangeText={setImage}
                className="text-center text-xl pb-2"
                placeholder="Enter a Profile Pic Url"
            />

            <Text className="text-center p-4 font-bold text-blue-400">
                Step 3: The Job
            </Text>
            <TextInput 
                value={job}
                onChangeText={setJob}
                className="text-center text-xl pb-2"
                placeholder="Enter your occupation"
            />

            <Text className="text-center p-4 font-bold text-blue-400">
                Step 4: The Age
            </Text>
            <TextInput 
                value={age}
                keyboardType="numeric"
                maxLength={2}
                onChangeText={setAge}
                className="text-center text-xl pb-2"
                placeholder="Enter your Age"
            />

            {/* Button */}
            {/* Si no se ha introducido todos los datos sale gris y no deja clickar */}
            {!incompleteForm ?
                <TouchableOpacity 
                    disabled={incompleteForm}
                    className="w-64 p-3 rounded-xl absolute bottom-10 bg-blue-400"
                    onPress={updateUserProfile}
                >
                    <Text className="text-center text-white text-xl ">Update Profile</Text>
                </TouchableOpacity>
            : (
                <TouchableOpacity 
                    disabled={incompleteForm}
                    className="w-64 p-3 rounded-xl absolute bottom-10 bg-gray-400"
                >
                    <Text className="text-center text-white text-xl ">Update Profile</Text>
                </TouchableOpacity>
            )}

        </View>
    )
}

export default ModalScreen
