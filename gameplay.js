/*gameboard: 
- Clear
- RenderPieces
- checkOpen

player:
- assignPiece
- makeMove

gameFlow:
- startGame
- assign player 1 & 2
- restart
- determineWinner
*/
alert("Press 'Start New Game' to begin");

const container = document.querySelector('.container');

const gameboard = (() => {
    const allCells = document.querySelectorAll('.cell');
    let array = ["", "", "", "", "", "", "", "", ""];
    const clearGame = () => {
        for (let cell of allCells) {
            cell.innerHTML = '';
        };
        array.forEach(function (element, index) {
            element = '';
            array[index] = element;
        });
    }
    const render = () => {
        for (let i = 0; i < array.length; i++) {
            for (let cell of allCells) {
                if (cell.classList.contains(i) == true) {
                    cell.innerHTML = array[i];
                }
            }

        }
    }
    const checkOpen = (domElement) => {
        if (domElement.innerHTML == '') return true;
        else return false;
    }
    const turn = () => {
        if (array.includes("X") != true) return 1;
        let counts = {};
        array.forEach(function (x) {
            counts[x] = (counts[x] || 0) + 1;
        });
        if(counts["X"] <= counts["O"]) return 1;
        else return 2;
        };

    const determineWinner = () => {
        for (let i = 0; i < array.length; i++) {
            if (array[i] != '') {
                //handle columns
                if (i == 0 || i == 3 || i == 6) {
                    if (array[i] == array[i + 1] && array[i + 1] == array[i + 2]) {
                        return array[i];
                    }
                }
                //handle rows
                if (i < 3) {
                    if (array[i] == array[i + 3] && array[i + 3] && array[i + 6]) {
                        return array[i];
                    }
                }
                //handle diagonals
                if (i == 0) {
                    if (array[0] == array[4] && array[4] == array[8]) {
                        return array[i];
                    }
                }
                if (i == 2) {
                    if (array[2] == array[4] && array[4] == array[6]) {
                        return array[i];
                    }
                }

            }
        }
        if (gameboard.array.findIndex((element) => element === '') === -1) {
            return "no one. Its a tie!"
        }
    }
    return {
        array,
        turn,
        render,
        clearGame,
        checkOpen,
        determineWinner
        }
    })();


const player = (number) => {
    const playerPiece = number == 1 ? 'X' : 'O';
    return {
        playerPiece
    }
};


const game = (() => {
    let playerOne = player(1);
    let playerTwo = player(2);
    let start = () => {
            container.addEventListener('click', function(e) {
                if (gameboard.checkOpen(e.target) == true) {
                    let cellNum = e.target.classList[1];
                    if (gameboard.turn() === 1) {
                        gameboard.array[cellNum] = playerOne.playerPiece;
                    }
                    else if (gameboard.turn() === 2) {
                        gameboard.array[cellNum] = playerTwo.playerPiece;
                    }
                    gameboard.render();
                    if (gameboard.determineWinner() != undefined){
                        alert("winner is " + gameboard.determineWinner());
                    } 
                }
            });
        }
        return {
            start
        }
    })();


document.querySelector('#start').addEventListener('click', function() {
        gameboard.clearGame();
        game.start();
    })





