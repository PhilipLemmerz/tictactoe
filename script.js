/** define Icons */
let circle = '<i class="fas cellIconCircle fa-circle"></i>';
let cross = '<i class="fas cellIconCross fa-times-circle"></i>';

let witchPlayer = 'circlePlayer';
let resultsPlayerCircle = [];
let resultsPlayerCross = [];





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
        resultsPlayerCircle.push(oneResult);
        console.log(resultsPlayerCircle);
                
    
    } else if (witchPlayer == 'crossPlayer' && clickedElement.innerHTML == '') {
        clickedElement.innerHTML = cross;
        witchPlayer = 'circlePlayer';
        crossPlayer.classList.remove('currentPlayer');
        circlePlayer.classList.add('currentPlayer');
        resultsPlayerCross.push(oneResult);
        console.log(resultsPlayerCross);
    }
}




