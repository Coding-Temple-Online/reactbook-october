import moment from 'moment';
import React from 'react'
import { Link } from 'react-router-dom';
import firebase from '../firebase';

export const Post = ( props ) => {
    const p = props.p;
    const showLink = props.showLink !== undefined ? props.showLink : true;

    console.log(p)
    // console.log( moment().fromNow( p.timestamp.toDate() ) );
    // console.log( firebase.firestore.Timestamp.fromDate( p.timestamp.toDate() ));

    return (
        <li className="list-group-item">
            <p>
                {showLink ? <Link to={{ pathname: `/blog/${ p.id }` }}>{p.body}</Link> : p.body}
            </p>
            <p>
                <cite>&mdash; user's email address</cite>
                {/* <cite>&mdash; {p.user.emailAddress}</cite> */}
                <span className="float-right">
                    <small>{ moment( p.timestamp.toDate() ).fromNow() }</small>
                </span>
            </p>
        </li>
    )
}
