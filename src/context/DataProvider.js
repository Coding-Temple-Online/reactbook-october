import { collection, getDocs, getFirestore, addDoc, getDoc, orderBy, query, doc, setDoc } from "@firebase/firestore";
import { createContext, useCallback, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';


export const DataContext = createContext();

export const DataProvider = ( props ) => {
    const { currentUser } = useAuth();
    const [ posts, setPosts ] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({ items: {}, quantity: 0, subtotal: 0, grandtotal: 0 });
    
    // connect to database
    const db = getFirestore();

    useEffect(() => {
        fetch( '/api/products' )
            .then( ( res ) => res.json() )
            .then( ( data ) => setProducts( data ) );
    }, [])

    function getCart() {
        let data = {};
        let quantity = 0;
        let subtotal = 0;
        let grandtotal = 0;
    };

    const addToCart = async ( productData ) => {
        if (currentUser.id) {
            const productDoc = await setDoc( doc( db, 'users', currentUser.id, 'cart', productData.id ), {
                quantity: 1
            } )
        }
    }

    // useEffect( () => {
    //     doStuff();
    // }, [ currentUser ])


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
        posts, setPosts, addPost, products, setProducts, addToCart
    }

    return (
        <DataContext.Provider value={ values }>
            {/* <Elements stripe={ stripePromise }> */}
                { props.children }
            {/* </Elements> */}
        </DataContext.Provider>
    )   

}