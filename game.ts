type Symbol = 'X' | 'O' | ' ';
type Board = Symbol[][];

const readline = require('readline-sync');

function draw(board: Board): void {
  console.log('\n');
  board.forEach(row => {
    console.log(row.map(cell => cell || ' ').join(' | '));
    console.log('---------');
  });
}

function updateBoard(board: Board, row: number, col: number, symbol: Symbol): void {
  board[row][col] = symbol;
}

function getValidInput(board: Board): [number, number] {
  while (true) {
    const input = readline.question("Ingrese x, y (ej. 0,1): ");
    const [rowStr, colStr] = input.replace(",", " ").split(" ");

    const row = parseInt(rowStr);
    const col = parseInt(colStr);

    if (
      !isNaN(row) && !isNaN(col) &&
      row >= 0 && row <= 2 &&
      col >= 0 && col <= 2
    ) {
      if (board[row][col] !== ' ') {
        console.log("Esa posición ya está ocupada, ingrese otra!");
      } else {
        return [row, col];
      }
    } else {
      console.log("Ingrese una posición válida entre 0 y 2, separada por coma o espacio.");
    }
  }
}

function hasWinner(board: Board, symbol: Symbol): boolean {
  const lines = [
    ...board, // filas
    ...[0, 1, 2].map(i => board.map(row => row[i])), // columnas
    board.map((row, i) => row[i]), // diagonal principal
    board.map((row, i) => row[2 - i]) // diagonal secundaria
  ];

  return lines.some(line =>
    Array.isArray(line)
      ? line.every(cell => cell === symbol)
      : false
  );
}

function playUser(board: Board): boolean {
  const [row, col] = getValidInput(board);
  updateBoard(board, row, col, 'X');
  if (hasWinner(board, 'X')) {
    draw(board);
    console.log('\t\tGanaste "X" !!!');
    return true;
  }
  return false;
}

function playComputer(board: Board): boolean {
  while (true) {
    const row = Math.floor(Math.random() * 3);
    const col = Math.floor(Math.random() * 3);

    if (board[row][col] === ' ') {
      updateBoard(board, row, col, 'O');
      console.log(`La Computadora juega: ${row}, ${col}`);
      if (hasWinner(board, 'O')) {
        draw(board);
        console.log('\t\tPerdiste !!, ganó "O"');
        return true;
      }
      return false;
    }
  }
}

function createEmptyBoard(): Board {
  return Array.from({ length: 3 }, () => Array(3).fill(' '));
}

function startGame(): void {
  console.log('\tNuevo Juego');
  const board = createEmptyBoard();
  let turn = Math.round(Math.random());

  draw(board);

  for (let i = 0; i < 9; i++) {
    const gameOver = turn === 1 ? playUser(board) : playComputer(board);
    if (gameOver) return;

    draw(board);
    turn = 1 - turn;
  }

  console.log("EMPATE !!");
}

function main(): void {  while (true) {
    startGame();
    const playAgain = readline.question("Desea iniciar un nuevo juego? (s/n): ").toLowerCase();
    if (playAgain !== 's') break;
    console.clear();
  }
}

main();
