import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import useAuth from '../hooks/useAuth'
import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { ChatRow } from '../components'

/*
 * WID ¿What is doing?
 * snapshot.docs.map((doc) => ({
 *      id: doc.id,
 *      ...doc.data(),
 * }))
 * 
 * nos devuelve un objeto ({}) con un id igual al doc.id
 * y ...doc.data() ???
*/

const ChatList = () => {

    const [matches, setMatches] = useState([])
    const { user } = useAuth();

    useEffect(
        () => {
            onSnapshot(
                query(
                    collection(db,"matches"), 
                    where('usersMatched', 'array-contains', user.uid)
                ), 
                (snapshot) => 
                    setMatches( 
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
            )
        }, 
    [user]);

    console.log(matches);

    return (
        matches.length > 0 ? (
            <FlatList 
                className="h-full"
                data={matches}
                keyExtractor={(item) => item.id}
                renderItem={
                    ({item}) => 
                        <ChatRow matchDetails={item} />
                }
            />
        ) : (
            <View className="p-5">
                <Text className="text-center text-lg">No matches at the moment! 😢</Text>
            </View>
        )
    )
}

export default ChatList
