import { browserLocalPersistence, getAuth, GoogleAuthProvider, onAuthStateChanged, setPersistence, signInWithPopup, signOut } from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import firebase from "../firebase";

export const AuthContext = createContext();

export function useAuth() {
    return useContext( AuthContext );
}

export const AuthProvider = ( {children} ) => {
    const [currentUser, setCurrentUser] = useState({ loggedIn: false });

    let auth = getAuth();
    let provider = new GoogleAuthProvider();

    function logOut() {
        signOut( auth )
            .then( () => {
                setCurrentUser({ loggedIn: false });
                console.log('User logged out successfully')
            })
            .catch( ( error ) => {
                console.log(error);
                console.log('There was an error logging out.')
            })
    }

    function signIn() {
        return setPersistence( auth, browserLocalPersistence )
            .then( () => {

                signInWithPopup( auth, provider )
                    .then( result => {
                        const credential = GoogleAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;
                        
                        console.log(credential);
                        console.log(token);
                    } )
            } )
            .catch( err => console.error( err ) )
    }

    useEffect(() => {
        onAuthStateChanged( auth, ( user ) => {
            if ( user )
            {
                setCurrentUser({
                    id: user.uid,
                    name: user.displayName,
                    image: user.photoURL,
                    email: user.email,
                    loggedIn: true
                });
            }
        } );
    }, [])

    const values = { signIn, logOut, currentUser };

    return (
        <AuthContext.Provider value={ values }>
            { children }
        </AuthContext.Provider>
    )

}