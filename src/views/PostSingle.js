import { doc, getDoc, getFirestore } from '@firebase/firestore';
import React, { Component, useState, useEffect, useCallback } from 'react'
import { useMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { Post } from '../components/Post';

export const PostSingle = () => {

    const match = useMatch("/blog/:id");
    const id = match.params.id;
    const [postState, setPostState] = useState({});
    const [postLoadedState, setPostLoadedState] = useState("LOADING");
    const db = getFirestore();
    const docRef = doc( db, 'posts', id );

    const getPost = useCallback(
        async () =>
        {
            const docSnapshot = await getDoc( docRef );
            
            setPostState( docSnapshot.data() );
            setPostLoadedState( 'LOADED' );

        }, [ db ]
    )

    useEffect(() =>
    {
        getPost();
    }, [ getPost ])

    return (
        <React.Fragment>
            <Link className="btn btn-primary" to="/" style={ { marginBottom: '20px' } }>Back</Link>

            {
                postLoadedState === "LOADED" ? 
                <Post showLink={false} p={postState} /> : 
                <p>LOADING...</p>
            }
        </React.Fragment>
    )
}
