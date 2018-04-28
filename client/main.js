import React, { Component } from 'react';
import Signup from './signup.js';
import Instructions from './instructions.js';
import Leaderboard from './leaderboard.js';
import axios from 'axios';

var couchDBApi = axios.create({
  baseURL: 'http://proxy.rp01.eu.ngrok.io',
  auth: {
    username: 'pi',
    password: 'cluster'
  },
  headers: {
    'Content-Type': 'application/json'
  }
});
var db = "scavanger_test";
class Main extends Component {

  constructor(props){
    super(props);
    this.state={
      users:[]
    }

    couchDBApi.get("/"+db+"/_all_docs?include_docs=true")
      .then(response => {
        console.log(response.data.rows);
        this.setState({users: response.data.rows})
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        this.setState({users: []})
      })
  }


  render() {
    return <div className="container">
      <h2 className="center-text"> A hacker's scavanger hunt in the galaxy </h2>
      <div className="center-text">
      < Signup/>

      < Instructions/>

      < Leaderboard users={this.state.users}/>

      </div>
    </div>;

  }
}

export default Main;
