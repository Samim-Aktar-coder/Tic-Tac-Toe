let player1Name = document.querySelector('.player-1 h2');
let player1Result = document.querySelector('.player-1 h3');
let player2Name = document.querySelector('.player-2 h2');
let player2Result = document.querySelector('.player-2 h3');
let squares = document.querySelectorAll('.grid div');

let player1Turn;
let player2Turn;

function toss() {
    let randomNum = Math.floor(Math.random() * 25);
    if (randomNum % 2 === 0) {
        player1Turn = true;
        player2Turn = false;
        player1Name.classList.add('active');
    } else {
        player1Turn = false;
        player2Turn = true;
        player2Name.classList.add('active');
    }
}

toss();

function yourTurn() {
    if (player1Turn) {
        this.classList.add('cross');
        player1Turn = false;
        player2Turn = true;
        player2Name.classList.add('active');
        player1Name.classList.remove('active');
    } else if (player2Turn) {
        this.classList.add('round');
        player1Turn = true;
        player2Turn = false;
        player2Name.classList.remove('active');
        player1Name.classList.add('active');
    }
    checkForWin();
}


squares.forEach(square => {
    square.addEventListener('click', yourTurn);
});

function checkForWin() {
    let winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8]
    ];

    winPatterns.forEach(pattern => {
        if (
            squares[pattern[0]].classList.contains('cross') &&
            squares[pattern[1]].classList.contains('cross') &&
            squares[pattern[2]].classList.contains('cross')
        ) {
            player1Result.classList.add('win');
            player1Result.textContent = 'WIN';
            player2Result.classList.add('lose');
            player2Result.textContent = 'LOSE';
            squares.forEach(square => {
                square.removeEventListener('click', yourTurn);
            });
            player1Name.classList.add('active');
            player2Name.classList.remove('active');
        } else if (
            squares[pattern[0]].classList.contains('round') &&
            squares[pattern[1]].classList.contains('round') &&
            squares[pattern[2]].classList.contains('round')
        ) {
            player2Result.classList.add('win');
            player2Result.textContent = 'WIN';
            player1Result.classList.add('lose');
            player1Result.textContent = 'LOSE';
            squares.forEach(square => {
                square.removeEventListener('click', yourTurn);
            });
            player1Name.classList.remove('active');
            player2Name.classList.add('active');
        }
    });
}

