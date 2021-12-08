import React, { useContext, useEffect, useState } from 'react'
import { Post } from '../components/Post';
import { useAuth } from '../context/AuthContext';
import { DataContext } from '../context/DataProvider';
import { NotAuthenticated } from './NotAuthenticated';

export const Home = () => {
    const { posts, setPosts } = useContext( DataContext );
    const { currentUser } = useAuth();
    console.log(currentUser)

    return (
        <React.Fragment>
            {
                !currentUser.loggedIn
                    ?
                <NotAuthenticated />
                    :
                <React.Fragment>
                    <h3>
                        Home
                        | Welcome {currentUser.loggedIn ? currentUser.name : null}
                    </h3>
                    <hr />

                    <form action="" method="post">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-10">
                                    <input type="text" name="user_status" id="" className="form-control" placeholder="Type your status" aria-describedby="helpId" />
                                </div>
                                <div className="col-md-2">
                                    <input type="submit" value="Post" className="btn btn-info btn-block" />
                                </div>
                            </div>
                        </div>
                    </form>

                    <hr />

                    <ul className="list-group">
                        {posts.map(post => <Post key={post.id} p={post} />)}
                    </ul>
                </React.Fragment>
            }
        </React.Fragment>
    )
}
