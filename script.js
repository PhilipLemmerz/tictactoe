/** difining of winning Options */
let winOption1 = [1.1, 1.2, 1.3];
let winOption2 = [2.1, 2.2, 2.3];
let winOption3 = [3.1, 3.2, 3.3];
let winOption4 = [1.1, 2.1, 3.1];
let winOption5 = [1.2, 2.2, 3.2];
let winOption6 = [1.3, 2.3, 3.3];
let winOption7 = [1.1, 2.2, 3.3];
let winOption8 = [1.3, 2.2, 3.1];


/** define Icons */
let circle = '<i class="fas cellIconCircle fa-circle"></i>';
let cross = '<i class="fas cellIconCross fa-times-circle"></i>';

/** global variables */
let witchPlayer = 'circlePlayer';
/** Array include the clicked Elements, if this Arrays are equal with one winning Option the player win */
let resultsPlayerCircle = [];
let resultsPlayerCross = [];
let winner;
let winnerNameForGameOver;

/**insert icons into table-cells */
/** the id includes structured number of field */
function insertIcon(id) {
    let clickedElement = document.getElementById(id);
    let circlePlayer = document.getElementById('player1');
    let crossPlayer = document.getElementById('player2');
    /** one Result contains inique field Indetifier  */
    let oneResult = id.slice(-3);
    /**changePlayer and check if player won */
    if (witchPlayer == 'circlePlayer' && clickedElement.innerHTML == '') {
        clickedElement.innerHTML = circle;
        witchPlayer = 'crossPlayer';
        /**highlight current Player */
        crossPlayer.classList.add('currentPlayer');
        circlePlayer.classList.remove('currentPlayer');
        /**push Result and check Win */
        resultsPlayerCircle.push(+oneResult);
        checkWin('Circle');
    } else if (witchPlayer == 'crossPlayer' && clickedElement.innerHTML == '') {
        clickedElement.innerHTML = cross;
        witchPlayer = 'circlePlayer';
        /**highlight current Player */
        crossPlayer.classList.remove('currentPlayer');
        circlePlayer.classList.add('currentPlayer');
        /**push Result and check Win */
        resultsPlayerCross.push(+oneResult);
        checkWin('Cross');
    }
}

/** Function checks if Result Array of one Player is equal width the winning option*/
function checkWin(icon) {
    identifyPlayerForWinCheck(icon);
    compareWinOptionWithResult();
}

/**set winner variable to Result Array of currentPlayer */
function identifyPlayerForWinCheck(icon) {
    if (icon == 'Circle') {
        winner = resultsPlayerCircle;
    } else {
        winner = resultsPlayerCross;
    }
}

/** checks if the result Array of the current Player contains a winning Option */
function compareWinOptionWithResult() {
    if (winOption1.every(v => winner.includes(v))) {
        /** use canvas Api AND draw a line with the following coordinates */
        drawLine(20, 25, 280, 25);
    }
    else if (winOption2.every(v => winner.includes(v))) {
        drawLine(20, 75, 280, 75);
    }
    else if (winOption3.every(v => winner.includes(v))) {
        drawLine(20, 125, 280, 125);
    }
    else if (winOption4.every(v => winner.includes(v))) {
        drawLine(50, 10, 50, 140);
    }
    else if (winOption5.every(v => winner.includes(v))) {
        drawLine(150, 10, 150, 140);
    }
    else if (winOption6.every(v => winner.includes(v))) {
        drawLine(250, 10, 250, 140);
    }
    else if (winOption7.every(v => winner.includes(v))) {
        drawLine(20, 10, 280, 140);
    }
    else if (winOption8.every(v => winner.includes(v))) {
        drawLine(280, 10, 10, 140);
    }
    /**  if no player won AND play is done */
    else if (resultsPlayerCircle.length >= 5 || resultsPlayerCross.length >= 5) {
        setTimeout(() => gameOver('noWinner'), 1000);
    }
}
/** 
 * CanvasAPI - function get Coordinates for the Winning-Line
 * and draw a line through the Winning cells 
 */
function drawLine(xStart, yStart, xEnd, yEnd) {
    document.getElementById('canvas').style.zIndex = '2';
    let draw = canvas.getContext('2d');
    draw.lineWidth = 8;
    draw.strokeStyle = "#26CE07";
    draw.beginPath();
    draw.moveTo(xStart, yStart);
    draw.lineTo(xEnd, yEnd);
    draw.stroke();
    setTimeout(gameOver, 1000);
}

function gameOver(noWinner) {
    indentifyWinner(noWinner);

    /**open game-over Popup */
    let content = document.querySelector('body');
    let gameOverDiv = document.createElement('gameOver');
    gameOverDiv.innerHTML = `
            <img  id="gameOverPic" src="/img/gameOver.png">
            <p id="gameOverText"> ${winnerNameForGameOver}</p>
            <button id="newGameBTN" onclick="newGame()"> neu starten </button>
        `;
    content.appendChild(gameOverDiv);
}

/**set the global 'winnerNameForGameOver' to Winner-Name  */
function indentifyWinner(noWinner) {
    if (noWinner == 'noWinner') {
        winnerNameForGameOver = 'Kein Spieler hat gewonnen'
    } else if (winner == resultsPlayerCross) {
        winnerNameForGameOver = 'Spieler <strong> <span style="color:#147403"> Player-Cross </span></strong> hat gewonnen.';
    } else {
        winnerNameForGameOver = 'Spieler <strong><span style="color:#147403"> Player-Circle </span></strong> hat gewonnen.';
    }
}

/** remove Result-Popup, Winning-Line, Icons and empty the Result Arrays */
function newGame() {
    let gameOverDiv = document.querySelector('gameOver');
    let draw = canvas.getContext('2d');    
    /**emty result Arrays */
    resultsPlayerCircle = [];
    resultsPlayerCross = [];
    /**delte the gameOver Popup */
    gameOverDiv.parentElement.removeChild(gameOverDiv);
    /**remove the Lines */
    draw.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('canvas').style.zIndex = '0';
    deleteCrossesAndCircles();
}

function deleteCrossesAndCircles() {
    let td = document.querySelectorAll('td');

    for (i = 0; i < td.length; i++) {
        td[i].innerHTML = '';
    }
}




