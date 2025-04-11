import random
import os


def draw(game):
    for x in game:
        print(x)


def update_board(game, row, col, symbol):
    game[row][col] = symbol


def get_valid_input(game):
    while True:
        try:
            row, col = map(int, input("Ingrese x, y: ").replace(
                ",", " ").split())  # split() sin argumentos
            if 0 <= row <= 2 and 0 <= col <= 2:
                if game[row][col] != " ":
                    print("Esa posición ya está ocupada, ingrese otra!")
                else:
                    return row, col
            else:
                print("Ingrese una posición válida entre 0 y 2")
        except ValueError:
            print("Ingrese números separados por una coma ',' o espacio ' '")


def winner(game, symbol):
    # game = [["00", "01", "02"], ["10", "11", "12"], ["20", "21", "22"]]
    rows = game
    # rows = [game[i] for i in range(3)]
    cols = [[], [], []]
    for i in range(3):
        for j in range(3):
            cols[i].append(game[j][i])
    # cols = [game[j][i] for i in range(3) for j in range(3)]
    diags = [[], []]
    for i in range(3):
        diags[0].append(game[i][i])
        diags[1].append(game[i][2 - i])
    # diags = [[game[i][i] for i in range(3)], [game[i][2 - i] for i in range(3)]]
    lines = rows + cols + diags
    for line in lines:
        if set(line) == {symbol}:  # set([1,1,1]) == {1}
            return True
    return False


def play_user(game):
    row, col = get_valid_input(game)
    update_board(game, row, col, "x")
    if winner(game, "x"):
        draw(game)
        print('\t\t Ganaste "x" !!!')
        return True
    return False


def play_computer(game):
    while True:
        row, col = random.randint(0, 2), random.randint(0, 2)
        if game[row][col] == " ":
            update_board(game, row, col, "o")
            print(f"La Computadora juega: {row}, {col}")
            if winner(game, "o"):
                draw(game)
                print('\t\t Perdiste !!, ganó "o"')
                return True
            return False


def start():
    print("\t Nuevo Juego")
    game = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]
    # game = [[" " for _ in range(3)] for _ in range(3)]
    sw_turn = random.randint(0, 1)
    draw(game)
    for i in range(9):
        if sw_turn == 1:
            sw_turn = 0
            if play_user(game):
                return
        else:
            sw_turn = 1
            if play_computer(game):
                return
        draw(game)
    print("EMPATE !!")


if __name__ == "__main__":
    while True:
        start()
        if input("Desea iniciar un nuevo juego? (s/n)") == "s":
            os.system("cls")
        else:
            break