import * as readlineSync from 'readline-sync';

type Board = string[][];

function draw(game: Board): void {
    game.forEach(row => console.log(row.join(' | ')));
}

function updateBoard(game: Board, row: number, col: number, symbol: string): void {
    game[row][col] = symbol;
}

function getValidInput(game: Board): [number, number] {
    while (true) {
        const input = readlineSync.question('Ingrese x, y: ').replace(',', ' ').split(' ').map(Number);

        if (input.length !== 2 || input.some(isNaN)) {
            console.log("Ingrese números válidos separados por una coma ',' o espacio ' '");
            continue;
        }

        const [row, col] = input;
        const isValidPosition = row >= 0 && row <= 2 && col >= 0 && col <= 2;

        if (!isValidPosition) {
            console.log('Ingrese una posición válida entre 0 y 2');
            continue;
        }

        if (game[row][col] !== ' ') {
            console.log('Esa posición ya está ocupada, ingrese otra!');
            continue;
        }

        return [row, col];
    }
}

function winner(game: Board, symbol: string): boolean {
    const rows = game;
    const cols = Array.from({ length: 3 }, (_, i) => game.map(row => row[i]));
    const diags = [
        game.map((row, i) => row[i]),
        game.map((row, i) => row[2 - i])
    ];
    const lines = [...rows, ...cols, ...diags];

    return lines.some(line => line.every(cell => cell === symbol));
}

function playUser(game: Board): boolean {
    const [row, col] = getValidInput(game);
    updateBoard(game, row, col, 'x');

    if (winner(game, 'x')) {
        draw(game);
        console.log('\t\t Ganaste "x" !!!');
        return true;
    }
    return false;
}

function playComputer(game: Board): boolean {
    while (true) {
        const row = Math.floor(Math.random() * 3);
        const col = Math.floor(Math.random() * 3);

        if (game[row][col] === ' ') {
            updateBoard(game, row, col, 'o');
            console.log(`La Computadora juega: ${row}, ${col}`);

            if (winner(game, 'o')) {
                draw(game);
                console.log('\t\t Perdiste !!, ganó "o"');
                return true;
            }
            return false;
        }
    }
}

function start(): void {
    console.log('\t Nuevo Juego');
    const game: Board = Array.from({ length: 3 }, () => Array(3).fill(' '));
    let userTurn = Math.round(Math.random());

    draw(game);

    for (let i = 0; i < 9; i++) {
        const currentPlayerWon = userTurn
            ? playUser(game)
            : playComputer(game);

        if (currentPlayerWon) {
            return;
        }

        userTurn = 1 - userTurn;
        draw(game);
    }

    console.log('EMPATE !!');
}

function main(): void {
    while (true) {
        start();
        const again = readlineSync.question('Desea iniciar un nuevo juego? (s/n): ').toLowerCase();
        if (again !== 's') {
            break;
        }
    }
}

main();
