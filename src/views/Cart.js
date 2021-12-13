import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../components/CartItem';
import { DataContext } from '../context/DataProvider';

export const Cart = (props) =>
{
    const { cart } = useContext( DataContext );
    
    const handleCheckout = ( e ) => {
        e.preventDefault();
        
        fetch( '/api/shop/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { cartData: cart.items } )
        } )
            .then( res => res.json() )
            .then( data => {
                console.log( data );
                // Redirect to the Stripe Popup
                window.location.href = data.checkout_session

                
            } )
    }

    return (
        <React.Fragment>
            <h1>
                Cart
                <span className="float-right">
                    <form onSubmit={ ( e ) => handleCheckout( e ) }>
                        <input id="checkout-button" type="submit" className="btn btn-primary" value="Checkout" />
                    </form>
                </span>
            </h1>
            <hr />

            <div className="card shopping-cart">
                <div className="card-header bg-dark text-light">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i> Shopping Cart
                    <Link to='/shop/products' className="btn btn-outline-info btn-sm pull-right float-right">Continue Shopping</Link>
                    <div className="clearfix"></div>
                </div>
                <div className="card-body">

                    { cart.items ? cart.items.map( item => <CartItem key={ item.id } data={ item } /> ) : null }
                    {/* { cart.data ? cart.data.map( item => <CartItem key={ item.id } data={ item } /> ) : null } */}

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