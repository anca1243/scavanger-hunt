import React, { Component } from 'react';

class Signup extends Component {

  constructor(props){
    super(props);
  }


  render() {
    return <div className="container block">
        <div className="">
        <p>Dear Astronaut,</p>
        <br></br>
        <p>Welcome to a vast galaxy far, far, away where daunting challenges and gripping misteries await you...</p>
        <br></br>
        <p> To start your adventure send a text message containing your astronaut nickname ( e.g. Howard "Fruitloops" Wolowitz) to </p>
        <br></br>
        <h2>+441403540181</h2>
        </div>
    </div>;

  }
}

export default Signup;
