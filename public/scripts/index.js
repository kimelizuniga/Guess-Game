const   userGuess = document.getElementById('userGuess'),
        lastResult = document.getElementById('lastResult'),
        numRound  = document.getElementById('numRound'),
        roundDiv  = document.getElementById('roundDiv'),
        correctNum = document.getElementById('correctNumber'),
        startButton = document.getElementById('startButton'),
        gameInputs = document.getElementById('gameInputs'),
        guessSubmit = document.getElementById('submitGuess'),
        health       = document.getElementById('health'),
        easy        = document.getElementById('easy'),
        normal        = document.getElementById('normal'),
        hard        = document.getElementById('hard'),
        labelDifficulty = document.getElementById('labelNum'),
        points          = document.getElementById('points'),
        span            = document.getElementsByClassName('close')[0],
        modal           = document.getElementById('myModal'),
        playerNames     = document.getElementById('playerNames'),
        playerScore     = document.getElementById('playerScore'),
        playerScores    = document.getElementById('playerScores'),
        playerName      = document.getElementById('playerName'),
        submitName      = document.getElementById('submitName'),
        cheat           = document.getElementById('cheatMod'),
        resetGame = document.getElementById('resetGame')

// PRE LOAD SETTINGS - STARTS ON EASY DIFFICULTY  //

let difficultyMultiplier = 100;
let randomNumber = Math.floor((Math.random() * difficultyMultiplier) + 1);
let numOfHealth = 10;
let roundNum = 2;
let currentPoints = 0;
let addHealth = 1;

// const highScores = [
//     {
//         name: 'Guest',
//         points: '1000'
//     }
//  ];

// for(let i = 0; i < highScores.length; i++){
//     playerNames.innerHTML +=  '<li>' + highScores[i].name + '</li>'
//     playerScores.innerHTML += '<li>' + highScores[i].points + '</li>'
// }


easy.style.textDecoration = 'underline';



// Logic when game is over //

function gameOver() {
    lastResult.textContent = 'GAME OVER'
    correctNum.textContent = `( The correct number was: ${randomNumber} )`
    modal.style.display = "block";
    roundNum = 2;
    playerName.focus();
    playerScore.value = currentPoints;
    
 }

// Logic when Start button is clicked

function gameStart() {
    gameInputs.style.display = 'block';
    startButton.style.display = 'none';
    numRound.innerHTML = 1;
    randomNumber = Math.floor((Math.random() * difficultyMultiplier) + 1);
    cheat.innerHTML = randomNumber;
    userGuess.focus();
    currentPoints = 0;
}

// Checks if user input is wrong or correct //

function checkGuess() {
    if(userGuess.value != "" && userGuess.value <= difficultyMultiplier){
        if (userGuess.value != randomNumber){
            health.textContent = numOfHealth -= 1;
           if(userGuess.value < randomNumber){
               lastResult.textContent = 'Higher'
               lastResult.style.color = 'red'
               userGuess.value = "";
           } else if(userGuess.value > randomNumber) {
               lastResult.textContent = 'Lower'
               lastResult.style.color = 'red'
               userGuess.value = "";
           } 
        } else {
            lastResult.textContent = 'CORRECT!';
            lastResult.style.color = 'green'
            userGuess.value = "";
            health.textContent = numOfHealth += addHealth;
            numRound.innerHTML = roundNum++;
           
            points.textContent = currentPoints += difficultyMultiplier;

            randomNumber = Math.floor((Math.random() * difficultyMultiplier) + 1);
            cheat.innerHTML = randomNumber;
        } 
    
        if(health.textContent == 0){
            gameOver();
        }
    
        if(health.textContent <= 6 && health.textContent > 3){
            health.style.color = 'orange'
        } else if(health.textContent <=3){
            health.style.color = 'red'
        } 
        
    } else if(userGuess.value > difficultyMultiplier){
        lastResult.textContent = "You have entered an invalid number"
    }
}

// When user pressed the key 'Enter', submits the user input for guess

userGuess.addEventListener('keyup', function(event){
    if(event.keyCode === 13 && this.value != "" && this.value <= difficultyMultiplier){
        checkGuess();
    } else if(userGuess.value > difficultyMultiplier){
        lastResult.textContent = "You have entered an invalid number"
    } else {
        lastResult.innerHTML = "...";
        lastResult.style.color = 'black';
    }
})

// Resets game when button is press/clicked //

function gameReset() {
    userGuess.value = "";
    userGuess.focus();
    startButton.style.display = 'block'
    gameInputs.style.display = 'none'
    numOfHealth = 10;
    health.textContent = 10;
    health.style.color = '#11DD55'
    points.innerHTML = 0;
    lastResult.innerHTML = "";
    lastResult.style.fontSize = '1rem';
    correctNum.textContent = "";
    numRound.textContent = "-"
    roundNum = 2;
}

// DIFFICULTIES //

function easyGame() {
    labelDifficulty.textContent = '1-100'
    easy.style.textDecoration = 'underline'
    normal.style.textDecoration = 'none'
    hard.style.textDecoration = 'none'
    difficultyMultiplier = 100;
    addHealth = 1;
    gameReset();
}

function normalGame() {
    labelDifficulty.textContent = '1-300'
    easy.style.textDecoration = 'none'
    normal.style.textDecoration = 'underline'
    hard.style.textDecoration = 'none'
    difficultyMultiplier = 200;
    addHealth = 2;
    gameReset();
}
function hardGame() {
    labelDifficulty.textContent = '1-600'
    easy.style.textDecoration = 'none'
    normal.style.textDecoration = 'none'
    hard.style.textDecoration = 'underline'
    difficultyMultiplier = 400;
    addHealth = 3;
    gameReset();
}

// MODAL LOGIC //

function modalNone() {
    modal.style.display = 'none';
    gameReset();
}

span.addEventListener('click', modalNone)

window.onclick = function(event) {
    if(event.target == modal) {
        modalNone();
    }
}

// // Highscore Name and Points Logic


// function addScore() {
//     modalNone();

//     let playerProfile = {
//         name: playerName.value,
//         points: currentPoints
//     };

//     highScores.push(playerProfile);
//     playerNames.innerHTML = ''
//     playerScores.innerHTML = ''

//     for(let i = 0; i < highScores.length; i++){
//         playerNames.innerHTML +=  '<li>' + highScores[i].name + '</li>'
//         playerScores.innerHTML += '<li>' + highScores[i].points + '</li>'
//     }
// }



// submitName.addEventListener('click', addScore)

// Event listeners //

startButton.addEventListener('click', gameStart)
guessSubmit.addEventListener('click', checkGuess)
resetGame.addEventListener('click', gameReset)
easy.addEventListener('click', easyGame)
normal.addEventListener('click', normalGame)
hard.addEventListener('click', hardGame)