import React, { Component, useState, useEffect } from 'react'
import { useMatch } from 'react-router';
import Post from '../components/Post'

export default function PostSingle() {

    const match = useMatch("/blog/:id")
    const id = match.params.id
    const [postState, setPostState] = useState({})
    const [postLoadedState, setPostLoadedState] = useState("LOADING")

    useEffect(function() {
        fetch( '/posts.json' )
            .then( res => res.json() )
            .then( data => {
                let post = data.filter((currPost) => {
                    return id == currPost.id
                })[0]

                setPostState(post)
                setPostLoadedState("LOADED")
            })
    }, [id])

    return (
        <React.Fragment>
            {
                postLoadedState === "LOADED" ? 
                <Post p={postState} /> : 
                <p>LOADING...</p>
            }
        </React.Fragment>
    )
}
