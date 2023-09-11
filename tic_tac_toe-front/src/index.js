/*
Al tutorial le hago unos pequeños cambios para que se pueda jugar de nuevo una vez que
haya un ganador o que se terminen los movimientos posibles.
*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
/*
El primer codigo antes de cambiarlo por la function Square:

class Square extends React.Component {
  render() {
    return (
      <button 
        className="square" 
        onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}
*/
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      gameOver: false, // Nuevo estado para controlar si el juego ha terminado - esto es extra al tutorial - cambia a true cuando se termine el juego porque gano alguien o porque se completaron todos los casilleros - ver mas abajo en el codigo
    };
  }
  
    handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i] || this.state.gameOver) {
    return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const winner = calculateWinner(squares); // lo declaro aca para usarlo en la definicion de abajo de gameOver
    const gameOver = winner || squares.every((square) => square !== null); // defino gameOver como si winner es true osea que hay un ganador o si todos los cuadrados fueron completados por lo tanto son distinto a null
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      gameOver: gameOver, // Actualiza el estado de gameOver a true cuando haya un ganador
    });
  }
  
  // Agrega una función para reiniciar el juego y una vez que haya un ganador o que se terminen 
  // los movimientos posibles
  resetGame() {
    this.setState({
      squares: Array(9).fill(null), // se completa los 9 cuadrados del square en nulo vacio
      xIsNext: true, // se marca como X is next true para que arranque denuevo
      gameOver: false, // se pone la variable creada para ver si se termino el juego en false para que arranque neuvamente
    });
  }
  
  renderSquare(i) {
    return (
      <Square 
             value={this.state.squares[i]} 
             onClick={() => this.handleClick(i)}
             />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    // Agrega un botón para jugar de nuevo - lo que se hace aca es que si gameOver es true y se apreta el boton
    // se llama a la funcion resetGame que esta definida arriba para resetear el juego
  const playAgainButton = this.state.gameOver ? (
    <button className='play-again-button' onClick={() => this.resetGame()}>Play Again</button>
  ) : null;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        {playAgainButton}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
            <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
