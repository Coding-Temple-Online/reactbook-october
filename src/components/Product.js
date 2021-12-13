import React, { useContext } from 'react'
import { DataContext } from '../context/DataProvider';

export const Product = ( props ) => {
    const { addToCart } = useContext( DataContext );

    const p = props.data;

    const handleAddToCart = ( productData ) => {
        addToCart( productData );
    }

    return (
        <div className="col-4">
            <div className="card">
                <div className="card-header">
                    <h6>
                        { p.name }
                        <span className="float-right">${ p.price }</span>
                    </h6>
                </div>
                <div className="card-body">
                    <img className="card-img-top" src={ p.images[0] } alt={ p.name } />
                    <button onClick={() => handleAddToCart( p ) } style={{ marginBottom: '25px' }} className="btn btn-success btn-block">Add to Cart</button>
                    <p className="card-text">{ p.description }</p>
                </div>
            </div>
        </div>
    )
}
