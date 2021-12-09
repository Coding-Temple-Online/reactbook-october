import { collection, getDocs, getFirestore, addDoc, getDoc, orderBy, query } from "@firebase/firestore";
import { createContext, useCallback, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ( props ) => {
    const [ posts, setPosts ] = useState([]);

    // connect to database
    const db = getFirestore();

    // create function to grab all posts from firestore database
    const getPosts = useCallback(
        async () =>
        {
            const q = query( collection(db, 'posts'), orderBy( "dateCreated", "desc" ) );
            
            const querySnapshot = await getDocs( q );
            // return querySnapshot;
            let newPosts = [];

            querySnapshot.forEach(doc =>
            {
                newPosts.push({
                    id: doc.id,
                    ...doc.data()
                })
            });

            setPosts(newPosts);

            return querySnapshot;
        }, [ db ]
    )

    const addPost = async ( postData ) => {
        const docRef = await addDoc( collection( db, 'posts' ), postData );
        const doc = await getDoc( docRef );
        setPosts( [ { ...doc.data(), id: docRef.id }, ...posts ] );
    }

    useEffect(() =>
    {
        getPosts();
    }, [ getPosts ])

    const values = {
        posts, setPosts, addPost
    }

    return (
        <DataContext.Provider value={ values }>
            { props.children }
        </DataContext.Provider>
    )   

}