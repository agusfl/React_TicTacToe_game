/*
Al tutorial le hago unos pequeños cambios para que se pueda jugar de nuevo una vez que
haya un ganador o que se terminen los movimientos posibles.
*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Se crea la clase Square que devuelve un boton que se va a renderizar en el tablero
// La funcion onClick se pasa como prop desde el componente padre Board - ver codigo mas abajo en renderSquare
function Square(props) {
  
  // Se crea una variable para agregarle una clase al boton que se va a renderizar
  // para poder setear un color distinto a las 'X' y otro para las 'O'
  let squareClass = 'square';
  if (props.value === 'X') {
    squareClass += ' x-square'; // Aplica la clase "x-square" para "X" seteada en el archivo css
  } else if (props.value === 'O'){
    squareClass += ' o-square'; // Aplica la clase "o-square" para "O" seteada en el archivo css
  }

  return (
    // Se agrega la clase squareClass al boton que se va a renderizar para usarla en el css
    <button className={squareClass} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null), // se ponene todos los casilleros en null y pasan a marcarse con X o O cuando se apreta el boton
      xIsNext: true, // el primer turno es de X
  }}
  
    handleClick(i) {
    // Se crea una copia del array de squares para poder modificarlo
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
    return;
    }
    // Se setea los valores que van a ir en cada cuadrado X o O
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    // Se setea el estado de squares y xIsNext
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  
  // Agrega una función para reiniciar el juego y una vez que haya un ganador o que se terminen 
  // los movimientos posibles
  resetGame() {
    this.setState({
      squares: Array(9).fill(null), // se completa los 9 cuadrados del square en nulo vacio
      xIsNext: true, // se marca como X is next true para que arranque denuevo
    });
  }
  
  // Se crea una funcion para renderizar cada cuadrado del tablero
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
  const startAgainButton = 
    <button className='start-again-button' onClick={() => this.resetGame()}>Start Again</button>;

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
        {startAgainButton}
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
