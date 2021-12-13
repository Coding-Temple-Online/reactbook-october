import { collection, getDocs, getFirestore, addDoc, getDoc, orderBy, query, doc, setDoc, updateDoc, deleteDoc } from "@firebase/firestore";
import { createContext, useCallback, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';


export const DataContext = createContext();

export const DataProvider = ( props ) => {
    const { currentUser } = useAuth();
    const [ posts, setPosts ] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({ items: [], quantity: 0, subtotal: 0, tax: 0, grandtotal: 0 });
    const [currentTimeout, setCurrentTimeout] = useState( null );
    
    // connect to database
    const db = getFirestore();

    useEffect(() => {
        fetch( '/api/products' )
            .then( ( res ) => res.json() )
            .then( ( data ) => setProducts( data ) );
    }, [])

    const getCart = async () => {
       if ( currentUser.id ) {
        //    let data = [];
           let cartQuantity = 0;
           let subtotal = 0;
           let tax = 0;

           // const userRef = doc( db, 'users', currentUser.id );
           const userCartCollection = collection(db, 'users', currentUser.id, 'cart');

        //    get access to the user's cart collection
           const querySnapshot = await getDocs(userCartCollection);

           let products = [];
           
        //    loop over all the collection's data
           querySnapshot.forEach(doc =>
           {
            //    send an api request to our Flask backend
               fetch(`/api/product/${ doc.id }`, {
                })
                    .then( res => res.json() )
                    .then( data => {
                        // incremement the cart's quantity by the product's quantity
                        cartQuantity+=doc.data().quantity;
                        
                        // Add the data to the products list, including its quantity
                        products.push( { ...data, quantity: doc.data().quantity } );

                        // Incremenet the cart's subtotal by the product's price * its quantity
                        subtotal += data.price * doc.data().quantity;

                        // Implement tax
                        // tax += whatever the tax is... good luck
                        // console.log( doc.data() )
                        
                        // Set the state of our cart equal to the new information
                        setCart({
                            items: [ ...products ],
                            quantity: cartQuantity,
                            subtotal: subtotal.toFixed( 2 ),
                            tax: (0).toFixed( 2 ),
                            grandtotal: (subtotal + tax).toFixed( 2 )
                        })
                    } )

            });
            
       }

    };

    useEffect(() => {
        getCart();
    }, [ currentUser.id ])


    const addToCart =  useCallback(
        async (productData) =>
        {
            // if current user is logged in
            if (currentUser.id)
            {

                // console.log( productData )

                // access user's cart product from the collection
                const productRef = doc(db, 'users', currentUser.id, 'cart', productData.id)

                // find the product
                const productDoc = await getDoc(productRef);

                // if the product is not found
                if (!productDoc.exists())
                {
                    // add the product's information to the Firebase database 
                    // and set the product's quantity to 1
                    await setDoc(productRef, {
                        quantity: 1
                    })
                }
                else
                {
                    // increment the product's quantity by one
                    let quantity = productDoc.data().quantity;
                    quantity++;

                    await updateDoc(productRef, {
                        quantity: Number(quantity)
                    }, { merge: true })
                }

                // const productDoc = await setDoc( doc( db, 'users', currentUser.id, 'cart', productData.id ), {
                //     quantity: 1
                // } )
            }

            getCart();

        }, [ db, currentUser.id ]
    )

    const updateCart = async( e, productId ) => {
            // alert( productId );
            // alert(  );
            // if there is a timeout state
            if ( currentTimeout ) {
                // remove any old timeout state
                clearTimeout( currentTimeout );
            }

            const performOperation = setTimeout( async() => {

                // this block of functionality will only run if it hasn't been run 
                setCurrentTimeout( null );

                // if current user is logged in
                if ( currentUser.id ) {
                    // store the new quantity of the product
                    const quantity = e.target.value;
    
                    // go find the product by its ID
                    const productRef = doc( db, 'users', currentUser.id, 'cart', productId );
    
                    await updateDoc( productRef, {
                        quantity: Number( quantity )
                    }, { merge: true } )
    
                }
    
                getCart();
            }, 2000 );

            setCurrentTimeout( performOperation );

        }

    const removeFromCart = useCallback(
        async( productId ) => {
            if ( currentUser.id ) {
                const productRef = doc( db, 'users', currentUser.id, 'cart', productId );
                await deleteDoc( productRef )
            }
            getCart();
        }, [ currentUser.id, db ]
    )

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
        posts, setPosts, addPost, products, setProducts, addToCart, cart, updateCart, removeFromCart
    }

    return (
        <DataContext.Provider value={ values }>
            {/* <Elements stripe={ stripePromise }> */}
                { props.children }
            {/* </Elements> */}
        </DataContext.Provider>
    )   

}