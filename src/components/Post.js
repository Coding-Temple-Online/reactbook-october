import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Post extends Component {
    
    render() {

        // console.log( this.props );
        const p = this.props.p;

        return (
            <li className="list-group-item">
                <p><Link to={{pathname: `/blog/${p.id}`}}>{ p.body }</Link></p>
                <p>
                    <cite>&mdash; { p.user.emailAddress }</cite>
                    <span className="float-right">
                        <small>2 seconds ago</small>
                    </span>
                </p>
            </li>
        )
    }
}
