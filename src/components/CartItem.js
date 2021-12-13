import React, { useContext } from 'react'
import { DataContext } from '../context/DataProvider';

export const CartItem = ( props ) => {
    const { updateCart, removeFromCart } = useContext( DataContext );

    const p = props.data;

    return (
        <React.Fragment>
            {/* <!-- PRODUCT --> */}
            <div className="row">
                <div className="col-12 col-sm-12 col-md-2 text-center">
                    <img className="img-responsive" src={ p.image } alt={ p.name } height="80" />
                </div>
                <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                    <h4 className="product-name"><strong>{ p.name }</strong></h4>
                    <h4>
                        <small>{ p.description }</small>
                    </h4>
                </div>
                <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                    <div className="col-3 col-sm-3 col-md-6 text-md-right" style={{ paddingTop: '5px' }}>
                        <h6><strong>${ p.price_value } <span className="text-muted">x</span></strong></h6>
                    </div>
                    <div className="col-4 col-sm-4 col-md-4">
                        <div className="quantity">
                            <input onChange={ ( e ) => updateCart( e, p.id ) } type="number" step="1" max="99" min="1" defaultValue={ p.quantity } title="Qty" className="qty" size="4" />
                        </div>
                    </div>
                    <div className="col-2 col-sm-2 col-md-2 text-right">
                        <button onClick={ () => removeFromCart( p.id ) } type="button" className="btn btn-outline-danger btn-xs">
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
            <hr />
        </React.Fragment>
    )
}
