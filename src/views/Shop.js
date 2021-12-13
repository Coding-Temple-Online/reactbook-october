import React, { useContext } from 'react'
import { Product } from '../components/Product';
import { DataContext } from '../context/DataProvider'

export const Shop = () => {
    const { products } = useContext( DataContext );

    return (
        <React.Fragment>
            <h1>Shop</h1>
            <hr />

            <div className="card-deck">
                { products.map( p => <Product key={ p.id } data={ p } /> ) }
            </div>
        </React.Fragment>
    )
}
