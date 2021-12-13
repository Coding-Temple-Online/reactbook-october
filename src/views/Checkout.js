import React from 'react'
import { useMatch } from 'react-router'

export const Checkout = () => {

    const match = useMatch( '/shop/checkout/:success' );
    const paymentResult = match.params.success;

    return (
        <div>
            { paymentResult ? paymentResult : null }
        </div>
    )
}
