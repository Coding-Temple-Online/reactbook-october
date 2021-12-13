import { collection, getDocs, getFirestore, addDoc, getDoc, orderBy, query, doc, setDoc, deleteDoc } from "@firebase/firestore";
import { createContext, useCallback, useEffect, useState } from "react";
import Stripe from "stripe";
import { useAuth } from "./AuthContext";
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';


export const DataContext = createContext();

export const DataProvider = ( props ) => {
    const { currentUser } = useAuth();
    const [ posts, setPosts ] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({ items: {}, quantity: 0, subtotal: 0, grandtotal: 0 });
    const [stripe, setStripeCredentials] = useState('');
    
    // Instantiate Stripe
    useEffect(() => {
        setStripeCredentials( Stripe( process.env.REACT_APP_STRIPE_TEST_PK ) );
    }, [ setStripeCredentials ]);

    // connect to database
    const db = getFirestore();

    useEffect(() => {
        fetch( `${ process.env.REACT_APP_BACKEND_URL }/api/products` )
            .then( ( res ) => res.json() )
            .then( ( data ) => setProducts( data ) );
    }, [])

    const getCart = useCallback(
        async () =>
        {
            let data = {};
            let quantity = 0;
            let tax = 0;
            let subtotal = 0;

            const cartRef = doc(db, 'users', currentUser.id);
            const cartCollection = await collection(cartRef, 'cart')
            const querySnapshot = await getDocs(cartCollection);

            let products = [];
            querySnapshot.forEach(doc =>
            {

                // console.log( doc.data() )
                // create a new key for the product and store the product's info inside on object
                data[ doc.id ] = doc.data();

                // add it and set the cart's quantity equal to the product's quantity
                quantity += Number( doc.data().quantity );
                subtotal += doc.data().price_value * Number( doc.data().quantity );

                products.push(doc.data())
            })

            setCart({
                data: products,
                quantity: Number( quantity ),
                subtotal: Number( subtotal ).toFixed( 2 ),
                tax,
                grandtotal: Number( subtotal + tax ).toFixed( 2 )
            })

        }, [ currentUser.id, db ]
    )

    const removeFromCart = useCallback(
        async ( productId ) => {
            if ( currentUser.id ) 
                {
                    const productRef = doc( db, 'users', currentUser.id, 'cart', productId );
                    const productDoc = await getDoc(productRef);

                    // if product exists
                    if ( productDoc.exists() ) 
                    {
                        // set quantity to 1
                        await deleteDoc( productRef )
                    }
                }

                getCart();
        },
        [ currentUser.id, db, getCart ],
    )

    const updateCart = useCallback(
        async ( e, productId ) => {
            
            const performOperation = setTimeout( async() => {
                if ( currentUser.id ) 
                {
                    const quantity =  e.target.value;
                    const productRef = doc( db, 'users', currentUser.id, 'cart', productId );
                    const productDoc = await getDoc(productRef);

                    // if product exists
                    if ( productDoc.exists() ) 
                    {
                        // set quantity to 1
                        await setDoc( productRef, {
                            quantity: Number( quantity )
                        }, { merge: true } )
                    }
                }

                getCart();

            }, 2000);

            return () => clearTimeout( performOperation );

        },
        [ currentUser.id, db, getCart ],
    )

    const addToCart = useCallback(
        async ( productData ) => {
            // if user is logged in
            if (currentUser.id) {

                // access user's cart product from collection
                const productRef = doc( db, 'users', currentUser.id, 'cart', productData.id );
                
                // find product
                const productDoc = await getDoc( productRef );

                // console.log( productDoc );
                
                // if product exists
                if ( !productDoc.exists() ) 
                {
                    // set quantity to 1
                    await setDoc( productRef, {
                        ...productData,
                        quantity: 1
                    } )
                }
                else 
                {
                    // increment quantity by 1
                    let quantity = productDoc.data().quantity;
                    quantity++;
                    // console.log( productData )
                    await setDoc( productRef, {
                        ...productData,
                        // id: productData.id,
                        // description: productData.description,
                        // image: productData.image,
                        // name: productData.name,
                        // price: {
                        //     id: productData.metadata,price_id,
                        //     value: productData.price
                        // },
                        quantity
                    } )
                }
            }

            getCart();

        }, [ db, currentUser.id , getCart ]
    )


    // create function to grab all posts from firestore database
    const getPosts = useCallback(
        async () =>
        {
            // get user's posts and sort them by timestamp in descending order
            const q = query( collection(db, 'posts'), orderBy( "dateCreated", "desc" ) );
            
            const querySnapshot = await getDocs( q );
            // return querySnapshot;
            let newPosts = [];

            querySnapshot.forEach(doc =>
            {
                // build post data object
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

    useEffect(() => {
        if ( currentUser.loggedIn ) {
            getCart();
            // if ( cart.hasOwnProperty( 'items' ) ) {
            //     getCart();
            // }
        }
    }, [ db, currentUser.loggedIn, getCart ])

    const values = {
        posts, setPosts, addPost, products, setProducts, addToCart, cart, setCart, updateCart, removeFromCart, stripe
    }

    return (
        <DataContext.Provider value={ values }>
            {/* <Elements stripe={ stripePromise }> */}
                { props.children }
            {/* </Elements> */}
        </DataContext.Provider>
    )   

}