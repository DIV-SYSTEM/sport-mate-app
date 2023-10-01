import { useRoute } from '@react-navigation/native';
import { addDoc, collection, onSnapshot, orderBy, serverTimestamp, query } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TextInput, Button, KeyboardAvoidingView, Keyboard, Platform, TouchableWithoutFeedback, FlatList } from 'react-native'
import { ChatHeader, SenderMessage, ReceiverMessage } from '../components'
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import getMatchedUserInfo from "../lib/getMatchedUserInfo";

const MessageScreen = () => {
    
    const { user } = useAuth();
    const { params } = useRoute();
    const { matchDetails } = params;
    const [input, setInput] = useState("")
    const color = "#84BDFF"
    const [messages, setMessagges] = useState([])

    useEffect(() => {
        onSnapshot(
            query(
                collection(db, "matches", matchDetails.id, "messages"), 
                orderBy("timestamp", "desc")
            ), snapshot => setMessagges(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        )
    }, [matchDetails, db]);

    const sendMessage = () => {
        addDoc(collection(db, 'matches', matchDetails.id, 'messages'),{
            timestamp: serverTimestamp(),
            userId: user.uid, //usuario con el que has logeado
            displayName: user.displayName, //usuario con el que has logeado
            photoURL: matchDetails.users[user.uid].photoURL,
            message: input,
        });

        setInput("")
    };

    return (
        <SafeAreaView className="flex-1">
            <ChatHeader 
                title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
                callEnabled
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
                keyboardVerticalOffset={10}
            >

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    
                    {/* Lista de mensajes que se han enviado */}
                    {/* Mensaje puede ser enviado o recibido */}
                    <FlatList 
                        data={messages}
                        inverted={-1}
                        className="pl-4"
                        keyExtractor={item => item.id}
                        renderItem={({ item: message }) => 
                            message.userId === user.uid ? (
                                <SenderMessage 
                                    key={message.id}
                                    message={message} 
                                />
                            ) : (
                                <ReceiverMessage 
                                    key={message.id}
                                    message={message} 
                                />
                            )
                        }
                    />

                </TouchableWithoutFeedback>

                <View
                    className="flex-row justify-between bg-white items-center border-t border-gray-200 px-5 py-2 mt-2"
                >
                    {/* Stuck to the bottom screen */ }
                    <TextInput 
                        className="h-10 text-lg"
                        placeholder="Send Message..."
                        onChangeText={setInput}
                        onSubmitEditing={sendMessage}
                        value={input}
                    />
                    <Button onPress={sendMessage} title="Send" color={color} />
                </View>

            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default MessageScreen
