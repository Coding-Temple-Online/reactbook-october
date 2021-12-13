import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import Stripe from 'stripe';
import { CartItem } from '../components/CartItem';
import { DataContext } from '../context/DataProvider';
import { Checkout } from './Checkout';

export const Cart = () => {
    const { cart, setCart, removeFromCart, stripe } = useContext( DataContext );

    const createCheckout = async ( e ) => {
        e.preventDefault();
        
        await fetch(`${ process.env.REACT_APP_BACKEND_URL }/shop/create-checkout-session`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cartData: cart })
        } )
            .then( res => res.json() )
            .then( data => {
                // console.log( 'hello' )
                if ( data.checkout_session )
                {
                    
                    return console.log( stripe )
                    // return stripe.redirectToCheckout({ sessionId: data.id });

                    // history.push( 'data.checkout_session' );

                    // console.log( data.checkout_session );
                    setCart({
                        data: [],
                        quantity: Number( 0 ),
                        subtotal: Number( 0 ).toFixed( 2 ),
                        tax: Number( 0 ).toFixed( 2 ),
                        grandtotal: Number( 0 ).toFixed( 2 )
                    })

                    // remove all items from Firebase cart
                    console.log(cart.data)
                    for ( const item of cart.data ) {
                        removeFromCart( item.id )
                    }

                    return () => <Checkout checkoutSessionData={ data } />
                }
            } )
    }

    return (
        <React.Fragment>
            <h1>
                Cart
                <span className="float-right">
                    <form action={`${ process.env.REACT_APP_BACKEND_URL }/shop/create-checkout-session`} onSubmit={ ( e ) => createCheckout( e ) } method="post">
                        <input id="checkout-button" type="submit" className="btn btn-primary" value="Checkout" />
                    </form>
                </span>
            </h1>
            <hr />

            <div className="card shopping-cart">
                <div className="card-header bg-dark text-light">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i> Shopping Cart
                    <Link to='/shop/products' className="btn btn-outline-info btn-sm pull-right">Continue Shopping</Link>
                    <div className="clearfix"></div>
                </div>
                <div className="card-body">
                    
                    { cart.data ? cart.data.map( item => <CartItem key={ item.id } data={ item } /> ) : null }

                </div>
                <div className="card-footer">
                    {/* <!-- <div className="coupon col-md-5 col-sm-5 no-padding-left pull-left">
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" className="form-control" placeholder="cupone code">
                                </div>
                                <div className="col-6">
                                    <input type="submit" className="btn btn-default" value="Use cupone">
                                </div>
                            </div>
                        </div> --> */}
                    <div className="text-right">
                        <div className="cart-totals">
                            Subtotal: <b> { `$${ cart.subtotal }` } </b>
                        </div>
                        <div className="cart-totals">
                            Tax: <b>{ `$${ cart.tax }` }</b>
                        </div>
                        <div className="cart-totals">
                            Grand total: <b>{`$${ cart.grandtotal }`}</b>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
