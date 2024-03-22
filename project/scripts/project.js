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
    // Roll dice for player and computer
    const playerDie1 = rollDice();
    const playerDie2 = rollDice();
    const computerDie1 = rollDice();
    const computerDie2 = rollDice();

    // Calculate scores
    const playerScore = calculateScore(playerDie1, playerDie2);
    const computerScore = calculateScore(computerDie1, computerDie2);

    // Update UI
    updateDiceImages(playerDie1, playerDie2, computerDie1, computerDie2);
    updateGameInfo(playerScore, computerScore);
});

// Event listener for reset button
document.getElementById('reset-btn').addEventListener('click', function() {
    resetGame();
});