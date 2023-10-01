import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { View, Text } from 'react-native'
import { getAuth, signOut, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { authentication } from '../firebase';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    //const [loading, setLoading] = useState(false)
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(
        () =>
          onAuthStateChanged(authentication, user => {
            if (user) {
              //logged in..
              setUser(user);
            } else {
              setUser(null);
            }
            setLoadingInitial(false);
          }),
        []
    );

    const registerUser = (email, password) => {
        console.log("registrar usuario")
        createUserWithEmailAndPassword(authentication, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            //setIsSignedIn(true);
            console.log('Registered with: ', user.email);
        })
        .catch(err => setError(err))
        .finally(() => setLoading(false));
    }

    const signInUser = (email, password) => {
        console.log("iniciar usuario")
        signInWithEmailAndPassword(authentication, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            //setIsSignedIn(true);
            console.log('Logged in with:', user.email);
        })
        .catch(err => setError(err))
        .finally(() => setLoading(false));
    }

    const logout = async () => {
        console.log("log out")
        setLoading(true);
        signOut(authentication)
          .catch(err => setError(err))
          .finally(() => setLoading(false));
    };

    const memoedValue = useMemo(
        () => ({
          user,
          loading,
          signInUser,
          registerUser,
          logout,
          error,
        }),
        [user, loading, error]
      );

    return (
        <AuthContext.Provider 
            value={memoedValue}
        >
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
};

export default function useAuth(){
    return useContext(AuthContext);
}
