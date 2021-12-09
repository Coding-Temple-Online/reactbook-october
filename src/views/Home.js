import React, { useContext } from 'react'
import { Post } from '../components/Post';
import { useAuth } from '../context/AuthContext';
import { DataContext } from '../context/DataProvider';
import { NotAuthenticated } from './NotAuthenticated';
import { serverTimestamp } from '@firebase/firestore';

export const Home = () => {
    const { posts, addPost } = useContext( DataContext );
    const { currentUser } = useAuth();
    // console.log(currentUser)

    const handleSubmit = ( e ) => {
        // turno off page refresh
        e.preventDefault();

        // console.log(e.target.status.value)
        const formData = {
            body: e.target.status.value,
            dateCreated: serverTimestamp(),
            userId: currentUser.id
        }
        addPost( formData );
    }

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

                    <form onSubmit={ ( e ) => handleSubmit( e ) }>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-10">
                                    <input type="text" name="status" className="form-control" placeholder="Type your status" aria-describedby="helpId" />
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
