// constructs a possible action the AI could make
const AIAction = function ( pos ) {

  this.movePosition = pos;

  this.applyTo = function ( state ) {
    const next = new State( state );

    // put symbol on the board
    next.board[ this.movePosition ] = state.turn;

    if ( state.turn === 'O' ) {
      next.oMovesCount++;
    }

    next.changeTurn();

    return next;
  }
}


const AI = function () {
  // private variable: game being played
  let game = {};

  // private function: chooses a random cell
  const makeRandomMove = function ( turn ) {
    const emptyCells = game.currentState.getEmptyCells();
    const randomCell = emptyCells[ Math.floor( Math.random() * emptyCells.length )];
    const action = new AIAction( randomCell );

    const next = action.applyTo( game.currentState );

    ui.insertAt( randomCell, turn );

    game.advanceTo( next );

  }

  // public method: unsure of what this does
  this.plays = function ( _game ) {
    game = _game;
  };

  // public method: notify the AI that it's its turn
  this.notify = function( turn ) {
    makeRandomMove( turn );
  }

}
