// constructs a possible action the AI could make
const AIAction = function ( pos ) {

  this.movePosition = pos;

  this.minimaxValue = 0;

  this.applyTo = function ( state ) {
    const next = new State( state );

    // put symbol on the board
    next.board[ this.movePosition ] = state.turn;

    if ( state.turn === 'O' ) {
      next.aiMovesCount++;
    }

    next.changeTurn();

    return next;
  }
}

AIAction.ascending = function ( firstAction, secondAction ) {
  if ( firstAction.minimaxValue < secondAction.minimaxValue ) {
    return -1; // first action goes before second
  }
  else if ( firstAction.minimaxValue > secondAction.minimaxValue ) {
    return 1; // first action goes after
  }
  else {
    return 0; // tie
  }
}

AIAction.descending = function ( firstAction, secondAction ) {
  if ( firstAction.minimaxValue > secondAction.minimaxValue ) {
    return -1; // first action goes before second
  }
  else if ( firstAction.minimaxValue < secondAction.minimaxValue ) {
    return 1; // first action goes after
  }
  else {
    return 0; // tie
  }
}


const AI = function ( difficulty ) {

  this.AIDifficulty = difficulty;
  // private variable: game being played
  let game = {};

  const minimaxValue = function ( state ) {
    if ( state.isTerminal() ) {
      return Game.score( state );
    }
    else {
      let stateScore = 0;

      // X maximizes --> initialize minimax value to smaller than any possible score
      if ( state.turn === 'X' ) {
        stateScore = -100;
      }
      // O minimizes --> initialize minimax value to larger than any possible score
      else if ( state.turn === 'O' ) {
        stateScore = 100;
      }

      const emptyCells = state.getEmptyCells();
      const availableNextStates = emptyCells.map( function ( pos ) {
        const action = new AIAction( pos );
        const nextState = action.applyTo( state );

        return nextState;
      });

      availableNextStates.forEach( function ( nextState ) {
        const nextScore = minimaxValue( nextState ); // recursive call

        if ( state.turn === 'X' ) {
          // X wants to maximize: update stateScore if nextScore is larger
          if ( nextScore > stateScore ) {
            stateScore = nextScore;
          }
        }
        else if ( state.turn === 'O' ) {
          // O wants to minimize: update stateScore if nextScore is smaller
          if ( nextScore < stateScore ) {
            stateScore = nextScore;
          }
        }
      });

      return stateScore;
    }

  }

  // private function: chooses a random cell
  const makeRandomMove = function ( turn ) {
    const emptyCells = game.currentState.getEmptyCells();
    const randomCell = emptyCells[ Math.floor( Math.random() * emptyCells.length )];
    const action = new AIAction( randomCell );

    const next = action.applyTo( game.currentState );

    ui.insertAt( randomCell, turn );

    game.advanceTo( next );

  }

  const makeBestMove = function ( turn ) {
    const emptyCells = game.currentState.getEmptyCells();
    const availableActions = emptyCells.map( function ( pos ) {
      const action = new AIAction( pos );

      const next = action.applyTo( game.currentState );
      action.minimaxValue = minimaxValue( next );

      return action;
    });

    if ( game.currentState.turn === 'X' ) {
      // X wants to maximize: put the largest value first
      availableActions.sort( AIAction.descending );
    }
    else if ( game.currentState.turn === 'O' ) {
      // O wants to minimize: put the smallest value first
      availableActions.sort( AIAction.ascending );
    }

    const chosenAction = availableActions[ 0 ];
    const next = chosenAction.applyTo( game.currentState );

    ui.insertAt( chosenAction.movePosition , turn );

    game.advanceTo( next );

  }

  const makeMediumMove = function ( turn ) {
    const emptyCells = game.currentState.getEmptyCells();
    const availableActions = emptyCells.map( function ( pos ) {
      const action = new AIAction( pos );
      const next = action.applyTo( game.currentState );

      action.minimaxValue = minimaxValue( next );

      return action;
    });

    if ( game.currentState.turn === 'X' ) {
      availableActions.sort( AIAction.descending );
    }
    else if ( game.currentState.turn === 'O' ) {
      availableActions.sort( AIAction.ascending );
    }

    let chosenAction = {};
    const randomChoice = Math.floor( Math.random() * 3 );

    if ( randomChoice > 0 ) {
      chosenAction = availableActions[ 0 ];
    }
    else if ( randomChoice === 0 ) {
      // choose suboptimal choice if more than choice available
      if ( availableActions.length >= 2 ) {
        chosenAction = availableActions[ 1 ];
      }
      if ( availableActions.length === 1 ) {
        chosenAction = availableActions[ 0 ];
      }
    }
    const next = chosenAction.applyTo( game.currentState );

    ui.insertAt( chosenAction.movePosition, turn );

    game.advanceTo( next );
  }

  // public method: attaches ai to game
  this.plays = function ( _game ) {
    game = _game;
  };

  // public method: notify the AI that it's its turn
  this.notify = function( turn ) {
    if ( this.AIDifficulty === 'easy' ) {
      makeRandomMove( turn );
    }
    else if ( this.AIDifficulty === 'medium' ) {
      makeMediumMove( turn );
    }
    else if ( this.AIDifficulty === 'hard' ) {
      makeBestMove( turn );
    }

  }

}
