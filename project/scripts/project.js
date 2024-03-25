let images = ['images/dice-six-faces-1.png', 
'images/dice-six-faces-2.png', 
'images/dice-six-faces-3.png', 
'images/dice-six-faces-4.png', 
'images/dice-six-faces-5.png', 
'images/dice-six-faces-6.png'];

let dice = document.querySelectorAll('img');

function roll() {
    dice.forEach(function(die) {
        die.classList.add('shake');
    });
    setTimeout(function() {
        dice.forEach(function(die) {
            die.classList.remove('shake');
        });
        let dieOne = Math.floor(Math.random() * 6);
        let dieTwo = Math.floor(Math.random() * 6);
        document.querySelector('.dice .self').innerHTML = `<img src="${images[dieOne]}" alt="dice-${dieOne + 1}">`;
        document.querySelector('.dice .computer').innerHTML = `<img src="${images[dieTwo]}" alt="dice-${dieTwo + 1}">`;
        
        let playerScore = dieOne + 1;
        let computerScore = dieTwo + 1;
        if (playerScore > computerScore) {
            document.querySelector('.game-info').innerHTML = '<h2>You win!</h2>';
        } else if (playerScore < computerScore) {
            document.querySelector('.game-info').innerHTML = '<h2>Computer wins!</h2>';
        } else {
            document.querySelector('.game-info').innerHTML = '<h2>It\'s a tie!</h2>';
        }
    }, 1000);
}


// Function to generate a random number between 1 and 6 (inclusive)
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Function to calculate the score for a pair of dice
function calculateScore(dice1, dice2) {
    if (dice1 === 1 || dice2 === 1) {
        return 0;
    } else if (dice1 === dice2) {
        return (dice1 + dice2) * 2;
    } else {
        return dice1 + dice2;
    }
}

// Function to update the UI with dice images
function updateDiceImages(playerDice1, playerDice2, computerDice1, computerDice2) {
    document.querySelector('.dice .self').innerHTML = `
        <img src="images/dice-six-faces-${playerDice1}.png" alt="dice-six-faces-${playerDice1}">
        <img src="images/dice-six-faces-${playerDice2}.png" alt="dice-six-faces-${playerDice2}">
    `;
    document.querySelector('.dice .computer').innerHTML = `
        <img src="images/dice-six-faces-${computerDice1}.png" alt="dice-six-faces-${computerDice1}">
        <img src="images/dice-six-faces-${computerDice2}.png" alt="dice-six-faces-${computerDice2}">
    `;
}

// Function to update the game information
function updateGameInfo(playerScore, computerScore) {
    document.querySelector('.game-info').innerHTML = `
        <h2>Player Score: ${playerScore}</h2>
        <h2>Computer Score: ${computerScore}</h2>
    `;
}

// Function to reset the game
function resetGame() {
    document.querySelector('.game-info').innerHTML = '';
    document.querySelector('.dice .self').innerHTML = '';
    document.querySelector('.dice .computer').innerHTML = '';
}

// Event listener for roll button
document.getElementById('roll-btn').addEventListener('click', function() {
    dice.forEach(function(die) {
        die.classList.add('shake');
    });
    setTimeout(function() {
        dice.forEach(function(die) {
            die.classList.remove('shake');
        });
        // Roll dice for player and computer
        const playerDice1 = rollDice();
        const playerDice2 = rollDice();
        const computerDice1 = rollDice();
        const computerDice2 = rollDice();

        // Calculate scores
        const playerScore = calculateScore(playerDice1, playerDice2);
        const computerScore = calculateScore(computerDice1, computerDice2);

        // Update UI
        updateDiceImages(playerDice1, playerDice2, computerDice1, computerDice2);
        updateGameInfo(playerScore, computerScore);
    }, 1000);
});

// Event listener for reset button
document.getElementById('reset-btn').addEventListener('click', function() {
    resetGame();
});