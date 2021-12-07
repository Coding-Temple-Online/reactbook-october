import React, { Component } from 'react'
import Navbar from '../components/Navbar';
import Contact from './Contact';
import Home from './Home';
import { Routes, Route, useMatch } from 'react-router-dom';
import PostSingle from './PostSingle';

export default function Main() {
    return (
        <React.Fragment>
            <header>
                <Navbar />
            </header>

            <main className="container">
                <Routes>
                    <Route exact path='/' element={ <Home /> } />
                    <Route exact path='/contact' element={ <Contact /> } />
                    <Route path="/blog/:id" element={<PostSingle />}  />
                </Routes>
            </main>

            <footer>

            </footer>
        </React.Fragment>
    )
}
