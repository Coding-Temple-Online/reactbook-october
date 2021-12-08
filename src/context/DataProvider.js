import { collection, getDocs, getFirestore } from "@firebase/firestore";
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
            const querySnapshot = await getDocs(collection(db, 'posts'));
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

    useEffect(() =>
    {
        getPosts();
    }, [ getPosts ])

    const values = {
        posts, setPosts
    }

    return (
        <DataContext.Provider value={ values }>
            { props.children }
        </DataContext.Provider>
    )   

}