import React, { useCallback, useEffect, useState } from 'react'
import { Main } from './views/Main';
import firebase from './firebase'
import { collection, getDocs, getFirestore } from '@firebase/firestore';

export const App = () => {
  const [posts, setPosts] = useState([]);
  
  const db = getFirestore();
  
  const getPosts = useCallback(
    async () => {
      const querySnapshot = await getDocs( collection( db, 'posts' ) );
      // return querySnapshot;
      let newPosts = [];

      querySnapshot.forEach( doc => {
        newPosts.push({
          id: doc.id,
          ...doc.data()
        })
      } );

      setPosts( newPosts );
  
      return querySnapshot;
    }, [ db ]
  )
  
  useEffect(() => {
    getPosts();
  }, [ getPosts ])

  return (
    <div>
      <Main posts={posts} />
    </div>
  )
}
