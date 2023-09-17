/*
Al tutorial le hago unos pequeños cambios para que se pueda jugar de nuevo una vez que
haya un ganador o que se terminen los movimientos posibles.
Por mas comentarios del codigo ver: notas Api_Stock - React
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
      winsX: 0, // Inicializa el contador de victorias de X
      winsO: 0, // Inicializa el contador de victorias de O
  }}
  
    // Definimos el metodo handleClick que se va a llamar cuando se aprete un boton del Board
    handleClick(i) {
    // Se crea una copia del array de squares para poder modificarlo
    const squares = this.state.squares.slice();
    
    // Se llama a la funcion calculateWinner para ver si hay un ganador (si 'squares' es verdadero) o si se terminaron los movimientos posibles (square[i] es verdadero)
    if (calculateWinner(squares) || squares[i]) {
      // se retorna para que no se haga nada si hay un ganador o si se terminaron los movimientos posibles a menos que se aprete el boton de jugar de nuevo
      return;
    }

    // Se setea los valores que van a ir en cada cuadrado X o O
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    
    /*
    A continuacion se hacen unos calculos (para ver el historial de victorias) dentro de handleClick porque 
    la funcion calculateWinner (creada mas abajo y fuera de la clase Board) no tiene acceso al contexto
    del componente y su estado por eso no puede actualizar el estado del componente directamente
    */
    // Se crea la variable winner que llama a calculateWinner y se setea el valor de quien haya ganado
    const winner = calculateWinner(squares);

    // Si el ganador es 'X', actualiza los cuadrados, el siguiente jugador y el contador de victorias
    if (winner === 'X') {
      // Se llama a setState para actualizar el estado del componente basandonos en el estado anterior (prevState)
      this.setState((prevState) => ({
        squares: squares, // Actualiza los cuadrados
        xIsNext: !prevState.xIsNext, // Cambia el valor de xIsNext al contrario del valor anterior para que le toque al proximo jugador
        winsX: prevState.winsX + 1, // Incrementa el contador de victorias de X
      }));
      // Si el ganador es 'O', actualiza los cuadrados, el siguiente jugador y el contador de victorias
    } else if (winner === 'O') {
      this.setState((prevState) => ({
        squares: squares,
        xIsNext: !prevState.xIsNext,
        winsO: prevState.winsO + 1, // Incrementa el contador de victorias de O
      }));
    } else {
      // Si no hay ganador, actualiza solo los cuadrados y el siguiente jugador ya que la partida aun no termino
      this.setState({
        squares: squares, // Actualiza los cuadrados
        xIsNext: !this.state.xIsNext, // Cambia el valor de xIsNext a false
      });
    }
  }
  
  // Agrega una función para reiniciar el juego y una vez que haya un ganador o que se terminen 
  // los movimientos posibles
  resetGame() {
    this.setState({
      squares: Array(9).fill(null), // se completa los 9 cuadrados del square en nulo vacio
      xIsNext: true, // se marca como X is next true para que arranque denuevo
    });
  }

  // Funcion para resetear el contador de victorias de 'X' y 'O'
  resetWins() {
    this.setState({
      winsX: 0,
      winsO: 0,
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

  renderWins() {
    return (
      <div className="wins">
        <div className="wins-title">Wins:</div>
        <div className="wins-x">X: {this.state.winsX}</div>
        <div className="wins-o">O: {this.state.winsO}</div>
        <button className="reset-wins" onClick={() => this.resetWins()}>Reset</button>
      </div>
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      // status = 'Winner: ' + winner;

      // Seteo un estilo personalizado para el texto que dice "Winner" dependiendo si el valor es X o O
      // se toman los colores seteados en el archivo css para la X o para la O
      status =(
        <span>
        Winner: <span className={winner === 'X' ? 'x-square' : 'o-square'}>{winner}</span>
      </span>
      );
    } else {      
      // Seteo un estilo personalizado para el texto que dice "Next player" dependiendo si el valor es X o O
      status = (
        // si xIsNext es true se agrega la clase x-square al span que contiene la X y sino se agrega la clase o-square
        // esto hace que tome los estilos del css para cada caso, ademas seteo el texto que va a ir dentro del span X o O
        <span>
          Next player: <span className={this.state.xIsNext ? 'x-square' : 'o-square'}>{this.state.xIsNext ? 'X' : 'O'}</span>
        </span>
      );
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
        {/* Mostrar el historial de victorias */}
        {this.renderWins()}
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
    /*
    Esta línea de código verifica si las tres posiciones del tablero squares representadas por a, b y c
    contienen el mismo valor ('X' o 'O') y están ocupadas, lo que significa que un jugador
    ha completado una combinación ganadora en el juego de tic-tac-toe
    */ 
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // Actualiza el contador de victorias y llama a setState para reflejar los cambios en el estado
      // retorna el valor de la posicion a que es el que gano ('X' o 'O')
      return squares[a];
    }
  }
  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
