import React, { Component } from 'react';

class Instructions extends Component {

  constructor(props){
    super(props);
  }


  render() {
    return <div className="container">
      <h3>Instructions</h3>
      <div className="block">
      <br></br>
      <p>
      Your marvelous adventure will span across 4 rounds. The first person to finish each round will receive a piece of a puzzle - but make sure to play all of them to gather points! Each question is worth a bunch of points - depending on how hard the riddle was, of course. At the end of all the rounds, the player with the highest score will receive the extra special, unique 5th piece of the puzzle.
      </p>
      <br></br>
      <p> Game Rules </p>
      <br></br>
      <p> 1. Do not cheat! The mighty Thor will strike you down if you do! </p>
      <p> 2. When answering a riddle, don't forget to add the challenge number at the beginning of your answer </p>
      <p> 3. Do not try to send the correct answer multiple times to score more points, we check </p>
      <p> 4. When a round ends, keep your phone close. The next round might start soon after! </p>
      <p> 5. Please do not open the puzzle pieces until our presentation! </p>
      <p> 6. If you get stuck on any of the challenges, you can get a hint by sending the text "hint". Don't forget to add the challenge number at the beginning of the text </p> 

      </div>
    </div>;

  }
}

export default Instructions;
