import React, { useRef, useState, useLayoutEffect, useEffect } from 'react'
import { View, TouchableOpacity, Text, Image, SafeAreaView } from 'react-native'
import Swiper from "react-native-deck-swiper";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import generateId from '../lib/generateId';


const Card = () => {

    const navigation = useNavigation();
    const { user } = useAuth();
    const color = "#84BDFF"
    const swipeRef = useRef(null);
    const [profiles, setProfiles] = useState([]);

    const swipeLeft = (cardIndex) => {
        if (!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        console.log(`Has swipeado no al usuario: ${userSwiped.displayName}`)

        //Lo mete en la coleccion "passes" del usuario que ha swipeado PASS!
        setDoc(
            doc(db, 'users', user.uid, 'passes', userSwiped.id), 
            userSwiped
        );
    }

    const swipeRight = async (cardIndex) => {
        if (!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        const profileLoggedIn = await (
            await getDoc(doc(db, "users", user.uid))
        ).data();

        //TODO: cambiarlo al server en un cloud
        getDoc(doc(db, 'users', userSwiped.id, 'swipes', user.uid)).then(
            (documentSnapshot) => {
                if(documentSnapshot.exists()){
                    // Ha swipeado y el otro usuario ya le habia swipeado antes tambien
                    // hay MATCH!!!!
                    console.log(`Enhorabuena crack! Has hecho match con ${userSwiped.displayName}`);

                    //MATCH!! uid1 + uid2 concatenados
                    setDoc(
                        doc(db, "matches", generateId(userSwiped.id, user.uid)), {
                            users: {
                                [user.uid]: profileLoggedIn,
                                [userSwiped.id]:  userSwiped
                            },
                            usersMatched: [user.uid, userSwiped.id],
                            timestamp: serverTimestamp(),
                        }
                    );

                    navigation.navigate("Match", {
                        profileLoggedIn,
                        userSwiped
                    });
                      
                } else {
                    // O el usuario es el primero en hacer swipe de los 2 o el otro le ha dicho que no ya
                    // :( PASSED
                    console.log(`Has swipeado al usuario: ${userSwiped.displayName} que curra de: (${userSwiped.job}))`)
                }

                //lo meto en la coleccion swipe para saber que ya le ha dado YEAH!! pase lo que pase
                setDoc(
                    doc(db, "users", user.uid, "swipes", userSwiped.id),
                    userSwiped
                );
        })  
    }

    useLayoutEffect(
        () => 
            onSnapshot(doc(db, "users", user.uid), (snapshot) => {
                if (!snapshot.exists()){
                    navigation.navigate("Modal");
                }
            }),
    []);

    useEffect(() => {
        let unsub;
        
        const fetchCards = async () => {

            //que no salgan las que has swipeado left
            //en passes tenemos los ids de todos los que hemos dicho que no
            const passes = await getDocs(collection(db, 'users', user.uid, 'passes')).then(
                (snapshot) => snapshot.docs.map(doc => doc.id)
            );

            //que no salgan las que has swipeado right
            //en swipes tenemos los ids de todos los ya hemos likeado
            const swipes = await getDocs(collection(db, 'users', user.uid, 'swipes')).then(
                (snapshot) => snapshot.docs.map(doc => doc.id)
            );

            const passedUserIds = passes.length > 0 ? passes : ['test'];
            const swipedUserIds = swipes.length > 0 ? swipes : ['test'];


            /* 
             * [...passedUserIds, ...swipedUserIds] --> ¿WID? what is doing
             * empieza siendo un vector vacio pero le concatena los usuarios
             * que ha dicho que NAH y los que ha dicho que YEAH!
             * para que no le salgan más veces
             */
            unsub = onSnapshot(
                query(
                    collection(db, 'users'), 
                    where('id', 'not-in', [...passedUserIds, ...swipedUserIds])
                ), 
                (snapshot) => {
                setProfiles(
                    snapshot.docs
                    .filter(doc => doc.id !== user.uid)
                    .map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                )
            })
        };

        fetchCards();
        return unsub;
    }, [])



    return (
        <View className="flex-1">
            <View className="flex-1 -mt-6">
                <Swiper 
                    ref={swipeRef}
                    containerStyle={{ backgroundColor: "transparent" }}
                    cards={profiles}
                    stackSize={5}
                    cardIndex={0}
                    animateCardOpacity
                    verticalSwipe={false}
                    onSwipedLeft={(cardIndex) => {
                        console.log("Swipe PASS");
                        swipeLeft(cardIndex);
                    }}
                    onSwipedRight={(cardIndex) => {
                        console.log("Swipe MATCH");
                        swipeRight(cardIndex);
                    }}
                    backgroundColor={color}
                    overlayLabels={{
                        left: {
                            title: "NOPE!",
                            style: {
                                label: {
                                    textAlign: "right",
                                    color: "red",
                                },
                            },
                        },

                        right: {
                            title: "YEAH!",
                            style: {
                                label: {
                                    color: color,
                                },
                            },
                        },

                    }}

                    //Vector de cartas, si no quedan cartas pues decimos que no hay más
                    renderCard={(card) => 
                        card ? (
                        <View 
                            key={card.id} 
                            className="relative bg-white h-3/4 rounded-xl"
                        >
                            {/* Profile picture */}
                            <Image 
                                className="absolute top-0 h-full w-full rounded-xl" 
                                source={{uri: card.photoURL}}  
                            />
                            
                            {/* Nombre etc*/}
                            <View className="absolute bottom-0 justify-between flex-row items-center bg-white w-full h-20 px-6 py-2 rounded-b-xl shadow-xl">
                                <View>
                                    <Text className="text-xl font-bold">{card.displayName}</Text>
                                    <Text>{card.job}</Text>
                                </View>
                                <Text className="text-2xl font-bold">{card.age}</Text>
                            </View>
                        </View>
                    ) : (
                        <View className="relative bg-white h-3/4 rounded-xl justify-center items-center shadow-xl">
                            {/* Text no more profiles */}
                            <Text className="font-bold pb-5">No more profiles</Text>

                            {/* Sad emoji */}
                            <Image 
                                className="h-20 w-20" 
                                source={require("../assets/Crying-Face-Emoji.png")}  
                            />
                        </View>
                    )}
                />            
            </View>

            <View className="flex flex-row justify-evenly">
                <TouchableOpacity 
                    onPress={() => swipeRef.current.swipeLeft()}
                    className="items-center justify-center rounded-full w-16 h-16 bg-red-200"
                >
                    <Entypo name="cross" size={24} color="red"/>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => swipeRef.current.swipeRight()}
                    className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
                >
                    <AntDesign name="heart" size={24} color="green"/>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Card
