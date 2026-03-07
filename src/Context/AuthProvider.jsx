import React, { useEffect, useState } from 'react';
import { AUthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider();

    const registerUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    const signInUser =(email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile=(profile)=>{
        return updateProfile(auth.currentUser, profile)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (user)=>{
            setUser(user)
            setLoading(false)
            console.log(user);
        })
        return ()=>{
            unSubscribe()
        }
    }, [])
    const authInfo = {
        registerUser, signInUser, user, loading, logOut, updateUserProfile, signInGoogle
    }
    return (
        <AUthContext value={authInfo}>
            {children}
        </AUthContext>
    );
};

export default AuthProvider;