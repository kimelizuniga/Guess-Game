const   userGuess = document.getElementById('userGuess'),
        previewGuess = document.getElementById('previewGuess'),
        previousGuess = document.getElementById('previousGuess'),
        previousCorrect = document.getElementById('previousCorrect'),
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
        diffOptions     = document.getElementById('difficultyOptions'),
        points          = document.getElementById('points'),
        ptsPosition     = document.getElementById('ptsPosition'),
        span            = document.getElementsByClassName('close')[0],
        modal           = document.getElementById('myModal'),
        playerNames     = document.getElementById('playerNames'),
        playerScore     = document.getElementById('playerScore'),
        playerScores    = document.getElementById('playerScores'),
        playerName      = document.getElementById('playerName'),
        submitName      = document.getElementById('submitName'),
        mainDiv    = document.getElementById('mainDiv'),
        cheat           = document.getElementById('cheatMod'),
        resetGame = document.getElementById('resetGame')

// PRE LOAD SETTINGS - STARTS ON EASY DIFFICULTY  //

let difficultyMultiplier = 100;
let difficultyPoints = 100;
let randomNumber = Math.floor((Math.random() * difficultyMultiplier) + 1);
let numOfHealth = 10;
let numHealth = "";
let roundNum = 2;
let currentPoints = 0;
let addHealth = 1;

let prevGuess = [];
let prevCorrect = [];
let pGuessVal = "";
let pCorrectVal = "";
health.style.display = 'none';

function setHealth(){
    for(let i = 0; i < numOfHealth; i++){
        health.innerHTML += ' <i class="health fas fa-heart"></i> '
    }
}

setHealth();

// Function for Adding or Subtracting Health Icon


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
    startButton.style.display = 'none';
    diffOptions.style.display = 'block'
    
}

// Checks if user input is wrong or correct //

function checkGuess() {
    if(userGuess.value != "" && userGuess.value <= difficultyMultiplier && userGuess.value != 0){
        if (userGuess.value != randomNumber){
            // health.textContent = numOfHealth -= 1;
            numOfHealth -= 1;
            
            for(let i = 0; i < numOfHealth; i++){
                numHealth += ' <i class="health fas fa-heart"></i> '
                health.innerHTML = numHealth;
            }
            numHealth = "";

            prevGuess.push(` ${userGuess.value} ,`)
            
            for(let i = 0; i < prevGuess.length; i++){
                pGuessVal = pGuessVal + prevGuess[i]
                previousGuess.innerHTML = pGuessVal;    
            }
            if(prevGuess.length == 5){
                prevGuess.shift()
            }
            pGuessVal = "";

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
            
            numOfHealth += addHealth;

            for(let i = 0; i < numOfHealth; i++){
                numHealth += ' <i class="health fas fa-heart"></i> '
                health.innerHTML = numHealth;
            }
            numHealth = "";

            numRound.innerHTML = roundNum++;
            
            points.textContent = currentPoints += difficultyPoints;

            randomNumber = Math.floor((Math.random() * difficultyMultiplier) + 1);
            cheat.innerHTML = randomNumber;
            previousGuess.innerHTML = "New Random Number Generated"
            prevGuess = []
            prevCorrect.push(` ${userGuess.value} ,`)
            
            for(let i = 0; i < prevCorrect.length; i++){
                pCorrectVal = pCorrectVal + prevCorrect[i]
                previousCorrect.innerHTML = pCorrectVal;    
            }
            if(prevCorrect.length == 5){
                prevCorrect.shift()
            }
            pCorrectVal = "";
            userGuess.value = "";
        } 
    
        if(numOfHealth == 0){
            gameOver();
        }
    
        // if(health.textContent <= 6 && health.textContent > 3){
        //     health.style.color = 'orange'
        // } else if(health.textContent <=3){
        //     health.style.color = 'red'
        // } 
        
    } else if(userGuess.value > difficultyMultiplier || userGuess.value == 0){
        lastResult.textContent = "You have entered an invalid number"
        lastResult.style.color = 'red'
    }

    if(numOfHealth > 14){
        ptsPosition.style.marginLeft = '8rem'
    }
}

// When user pressed the key 'Enter', submits the user input for guess

userGuess.addEventListener('keyup', function(event){
    if(event.keyCode === 13 && this.value != "" && this.value <= difficultyMultiplier && userGuess.value != 0){
        checkGuess();
    } else if(event.keyCode === 13 && (userGuess.value > difficultyMultiplier || userGuess.value == 0)){
        lastResult.textContent = "You have entered an invalid number"
        lastResult.style.color = 'red'
    }
})

// Resets game when button is press/clicked //

function gameReset() {
    userGuess.value = "";
    userGuess.focus();
    startButton.style.display = 'block'
    gameInputs.style.display = 'none'
    numOfHealth = 10;
    health.innerHTML = "";
    health.style.display = 'none';
    setHealth();
    points.innerHTML = 0;
    lastResult.innerHTML = "";
    lastResult.style.fontSize = '1rem';
    correctNum.textContent = "";
    numRound.textContent = "-"
    previousCorrect.innerHTML = "-"
    previousGuess.innerHTML = "-"
    prevCorrect = [];
    prevGuess = [];
    roundNum = 2;
    diffOptions.style.display = 'none'
    roundDiv.style.display = 'none'
    previewGuess.style.display = 'none'


}

// DIFFICULTIES //

function easyGame() {
    labelDifficulty.textContent = '1-100'

    difficultyMultiplier = 100;
    difficultyPoints = 100;
    addHealth = 2;
    
    gameInputs.style.display = 'block';
    numRound.innerHTML = 1;
    randomNumber = Math.floor((Math.random() * difficultyMultiplier) + 1);
    cheat.innerHTML = randomNumber;
    userGuess.focus();
    currentPoints = 0;
    health.style.display = 'unset' 
    //Displays or hide displays
    startButton.style.display = 'none'
    diffOptions.style.display = 'none'
    previewGuess.style.display = 'block'
    roundDiv.style.display = 'block'
}

function normalGame() {
    labelDifficulty.textContent = '1-300'
    difficultyMultiplier = 300;
    difficultyPoints = 150;
    addHealth = 3;
    
    gameInputs.style.display = 'block';
    numRound.innerHTML = 1;
    randomNumber = Math.floor((Math.random() * difficultyMultiplier) + 1);
    cheat.innerHTML = randomNumber;
    userGuess.focus();
    currentPoints = 0;
    health.style.display = 'unset' 
    startButton.style.display = 'none'
    diffOptions.style.display = 'none'
    previewGuess.style.display = 'block'
    roundDiv.style.display = 'block'
}
function hardGame() {
    labelDifficulty.textContent = '1-600'
    difficultyMultiplier = 600;
    difficultyPoints = 300;
    addHealth = 4;
    
    gameInputs.style.display = 'block';
    numRound.innerHTML = 1;
    randomNumber = Math.floor((Math.random() * difficultyMultiplier) + 1);
    cheat.innerHTML = randomNumber;
    userGuess.focus();
    currentPoints = 0;
    health.style.display = 'unset'
    startButton.style.display = 'none'
    diffOptions.style.display = 'none'
    previewGuess.style.display = 'block'
    roundDiv.style.display = 'block'
}

// MODAL LOGIC //

function modalNone() {
    modal.style.display = 'none';
    gameReset();
}

function subName(){
    submitName.click();
}

span.addEventListener('click', modalNone)

window.onclick = function(event) {
    if(event.target == modal) {
        
        subName();
        modalNone();
    }
}

// Event listeners //

startButton.addEventListener('click', gameStart)
guessSubmit.addEventListener('click', checkGuess)
resetGame.addEventListener('click', gameReset)
easy.addEventListener('click', easyGame)
normal.addEventListener('click', normalGame)
hard.addEventListener('click', hardGame)

