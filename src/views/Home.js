import React, { Component } from 'react'
import Post from '../components/Post';

export default class Home extends Component {
    constructor() {
        super();

        this.state = {
            posts: []
        }

        console.log('component constructed')
    }

    componentDidMount() {
        console.log('component mounted')
        fetch( './posts.json' )
            .then( res => res.json() )
            .then( data => this.setState({
                posts: data
            }) );
    }

    
    render() {
        console.log('component rendered')
        return (
            <React.Fragment>
                <h3>
                    Home
                    | Welcome
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
                    { this.state.posts.map( post => <Post key={ post.id } p={ post } /> ) }
                    {/* { this.posts.map( post => <Post stuff={ post } p={ post } /> ) } */}
                </ul>
            </React.Fragment>
        )
    }
}
