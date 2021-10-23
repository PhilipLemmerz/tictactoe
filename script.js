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

let witchPlayer = 'circlePlayer';
let resultsPlayerCircle = [];
let resultsPlayerCross = [];
let winner;

/**insert icons into table-cells */
function insertIcon(id) {
    let clickedElement = document.getElementById(id);
    let circlePlayer = document.getElementById('player1');
    let crossPlayer = document.getElementById('player2');
    let oneResult = id.slice(-3);

    //change icons each round AND only one icon per cell
    if (witchPlayer == 'circlePlayer' && clickedElement.innerHTML == '') {
        clickedElement.innerHTML = circle;
        witchPlayer = 'crossPlayer';
        /**highlight current Player */
        crossPlayer.classList.add('currentPlayer');
        circlePlayer.classList.remove('currentPlayer');
        resultsPlayerCircle.push(+oneResult);
        checkWin('Circle');    
    } else if (witchPlayer == 'crossPlayer' && clickedElement.innerHTML == '') {
        clickedElement.innerHTML = cross;
        witchPlayer = 'circlePlayer';
        crossPlayer.classList.remove('currentPlayer');
        circlePlayer.classList.add('currentPlayer');        
        resultsPlayerCross.push(+oneResult);
        checkWin('Cross');        
    }
}

function checkWin(icon) {
    if(icon == 'Circle'){
        winner = resultsPlayerCircle;
    } else {
        winner = resultsPlayerCross;
    }   

    if(winOption1.every(v => winner.includes(v))){
        console.log('gewonnen');
        drawLine(20,25,280,25);
    }
    else if(winOption2.every(v => winner.includes(v))){
        console.log('gewonnen');
        drawLine(20, 75, 280, 75);
    }
    else if(winOption3.every(v => winner.includes(v))){
        drawLine(20, 125, 280, 125);
    }
    else if(winOption4.every(v => winner.includes(v))){
        drawLine(50,10,50,140);
    }
    else if(winOption5.every(v => winner.includes(v))){
        drawLine(150,10,150,140);
    }
    else if(winOption6.every(v => winner.includes(v))){
        drawLine(250,10,250,140);
    }
    else if(winOption7.every(v => winner.includes(v))){
        drawLine(20,10,280,140);
    }
    else if(winOption8.every(v => winner.includes(v))){
        drawLine(280,10,10,140);    
    }
    
    else if( resultsPlayerCircle.length >=5 || resultsPlayerCross.length>=5) {
        setTimeout(()=> gameOver('noWinner'), 2000);
    }
   
     
}

function drawLine(xStart, yStart, xEnd, yEnd) {
    document.getElementById('canvas').style.zIndex ='2';
    let draw = canvas.getContext('2d'); 
    draw.lineWidth = 8;
    draw.strokeStyle = "#26CE07";     
    draw.beginPath();
    draw.moveTo(xStart, yStart );
    draw.lineTo(xEnd, yEnd);
    draw.stroke();

    setTimeout(gameOver, 1000);
}

function gameOver(noWinner) {
    let winnerName;
    if(noWinner == 'noWinner'){
        winnerName = 'Kein Spieler hat gewonnen'
    }
    else if(winner == resultsPlayerCross){
       winnerName = 'Spieler <strong> <span style="color:#147403"> Player-Cross </span></strong> hat gewonnen.';
    } else{
        winnerName = 'Spieler <strong><span style="color:#147403"> Player-Circle </span></strong> hat gewonnen.';
    }

    let content = document.querySelector('body');
    let gameOverDiv = document.createElement('gameOver');
    
    gameOverDiv.innerHTML = `
        <img  id="gameOverPic" src="/img/gameOver.png">
        <p id="gameOverText"> ${winnerName}</p>
        <button id="newGameBTN" onclick="newGame()"> neu starten </button>
    `;
    content.appendChild(gameOverDiv);
}

function newGame() {
    let gameOverDiv = document.querySelector('gameOver');
    let draw =  canvas.getContext('2d');
    let td = document.querySelectorAll('td');
    
    gameOverDiv.parentElement.removeChild(gameOverDiv);
    draw.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('canvas').style.zIndex ='0';

    for(i=0; i<td.length; i++){
        td[i].innerHTML = '';
    } 

    resultsPlayerCircle = [];
    resultsPlayerCross = [];
}




