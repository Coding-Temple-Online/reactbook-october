import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const Navbar = () => {
    const { currentUser, signIn, logOut } = useAuth();

    const handleLogin = () => {
        // alert( 'it works' );
        signIn();
    }

    const handleLogout = () => {
        logOut();
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Reactbook</Link>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact">Contact</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="." id="dropdownId" data-toggle="dropdown" aria-expanded="false">Shop</a>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            <Link className="dropdown-item" to=".">Products</Link>
                            <Link className="dropdown-item" to=".">Cart</Link>
                        </div>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {
                        !currentUser.loggedIn
                            ?
                        <li className="nav-item">
                            <a onClick={ handleLogin } href="#" className="nav-link">Login</a>
                        </li>
                            
                            :
                        <li className="nav-item">
                            <a onClick={ handleLogout } href="#" className="nav-link">Logout</a>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    )
}
