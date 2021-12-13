import React, { useContext } from 'react'
import { DataContext } from '../context/DataProvider';

export const CartItem = ( props ) => {
    const data = props.data;
    const { updateCart, removeFromCart } = useContext( DataContext );

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-2 text-center">
                    <img className="img-responsive" src={data.images[ 0 ]} alt={data.name} height="80" />
                </div>
                <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                    <h4 className="product-name"><strong>{data.name}</strong></h4>
                    <h4>
                        <small>{ data.description }</small>
                    </h4>
                </div>
                <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                    <div className="col-3 col-sm-3 col-md-6 text-md-right" style={{ paddingTop: '5px' }}>
                        <h6><strong>${data.price} <span className="text-muted">x</span></strong></h6>
                    </div>
                    <div className="col-4 col-sm-4 col-md-4">
                        <div className="quantity">
                            <input onChange={ ( e ) => updateCart( e, data.id ) } type="number" step="1" max="99" min="1" defaultValue={ data.quantity } title="Qty" className="qty" size="4" />
                        </div>
                    </div>
                    <div className="col-2 col-sm-2 col-md-2 text-right">
                        <button onClick={ () => removeFromCart( data.id ) } type="button" className="btn btn-outline-danger btn-xs">
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
            <hr />
        </React.Fragment>
    )
}
