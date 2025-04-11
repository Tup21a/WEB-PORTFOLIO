import readline from 'readline';

type Player = 'X' | 'O';
type Board = (Player | null)[];

class TicTacToe {
    private readonly board: Board;
    private currentPlayer: Player;
    private rl: readline.Interface;

    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    private printBoard(): void {
        console.log('\n');
        for (let i = 0; i < 9; i += 3) {
            console.log(
                ` ${this.board[i] || ' '} | ${this.board[i + 1] || ' '} | ${this.board[i + 2] || ' '} `
            );
            if (i < 6) console.log('-----------');
        }
        console.log('\n');
    }

    private isValidMove(position: number): boolean {
        return position >= 0 && position < 9 && this.board[position] === null;
    }

    private checkWinner(): Player | null {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (!this.board[a]) {
                return null;
            }
            if (this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                return this.board[a];
            }
        }

        return null;
    }

    private isBoardFull(): boolean {
        return this.board.every(cell => cell !== null);
    }

    private makeMove(): void {
        this.printBoard();
        console.log(`Player ${this.currentPlayer}'s turn`);
        console.log('Enter position (0-8):');

        this.rl.question('', (input) => {
            const position = parseInt(input);

            if (isNaN(position) || !this.isValidMove(position)) {
                console.log('Invalid move! Please try again.');
                this.makeMove();
                return;
            }

            this.board[position] = this.currentPlayer;
            const winner = this.checkWinner();

            if (winner) {
                this.printBoard();
                console.log(`Player ${winner} wins!`);
                this.rl.close();
                return;
            }

            if (this.isBoardFull()) {
                this.printBoard();
                console.log('It\'s a draw!');
                this.rl.close();
                return;
            }

            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.makeMove();
        });
    }

    public start(): void {
        console.log('Welcome to Tic Tac Toe!');
        console.log('Positions are numbered from 0 to 8, left to right, top to bottom.');
        this.makeMove();
    }
}

// Start the game
const game = new TicTacToe();
game.start(); 