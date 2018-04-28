import React, { Component } from 'react';

class Leaderboard extends Component {

  constructor(props){
    super(props);
    this.state = {
      users: props.users
    }
    console.log(props.users)

  }
  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users });
  }

  render() {
    return <div className="container">
      <h3>Leaderboard</h3>
      <table>
      <tbody>
      <tr>
        <th>Astronaut</th>
        <th>Score</th>
      </tr>
      {this.state.users.map((user) =>
        <tr key={user.id}>
          <td>{user.doc.name}</td>
          <td>{user.doc.score}</td>
        </tr>
      )}
      </tbody>
    </table>
    </div>;

  }
}

export default Leaderboard;
