let images = ['images/dice-six-faces-1.png', 
              'images/dice-six-faces-2.png', 
              'images/dice-six-faces-3.png', 
              'images/dice-six-faces-4.png', 
              'images/dice-six-faces-5.png', 
              'images/dice-six-faces-6.png'];

let dice = document.querySelectorAll('img');

let round = 0;
let playerTotalScore = 0;
let computerTotalScore = 0;

// function roll() {
//     dice.forEach(function(die) {
//         die.classList.add('shake');
//     });
//     setTimeout(function() {
//         dice.forEach(function(die) {
//             die.classList.remove('shake');
//         });
//         let dieOne = Math.floor(Math.random() * 6);
//         let dieTwo = Math.floor(Math.random() * 6);
//         document.querySelector('.dice .self').innerHTML = `<img src="${images[dieOne]}" alt="dice-${dieOne + 1}">`;
//         document.querySelector('.dice .computer').innerHTML = `<img src="${images[dieTwo]}" alt="dice-${dieTwo + 1}">`;
        
//         let playerScore = dieOne + 1;
//         let computerScore = dieTwo + 1;
//         if (playerScore > computerScore) {
//             document.querySelector('.game-info').innerHTML = '<h2>You win!</h2>';
//         } else if (playerScore < computerScore) {
//             document.querySelector('.game-info').innerHTML = '<h2>Computer wins!</h2>';
//         } else {
//             document.querySelector('.game-info').innerHTML = '<h2>It\'s a tie!</h2>';
//         }
//     }, 1000);
// }


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


    dice.forEach(function(die) {
        die.classList.remove('shake');
    });
    document.querySelector('.dice .self').innerHTML = `
        <img src="${images[playerDice1 - 1]}" alt="dice-${playerDice1}">
        <img src="${images[playerDice2 - 1]}" alt="dice-${playerDice2}">
    `;
    document.querySelector('.dice .computer').innerHTML = `
        <img src="${images[computerDice1 - 1]}" alt="dice-${computerDice1}">
        <img src="${images[computerDice2 - 1]}" alt="dice-${computerDice2}">
    `;

}

// Function to update the game information
function updateGameInfo(playerScore, computerScore) {
    round++;
    playerTotalScore += playerScore;
    computerTotalScore += computerScore;
    document.getElementById('round-info').innerHTML += `
        <p>Round ${round}: Player Score - ${playerScore}, Computer Score - ${computerScore}</p>
    `;
    document.getElementById('score').innerHTML = `
        <h2>Player Total Score: ${playerTotalScore}</h2>
        <h2>Computer Total Score: ${computerTotalScore}</h2>
    `;
}

// Function to reset the game
function resetGame() {
    
    round = 0;
    playerTotalScore = 0;
    computerTotalScore = 0;
    
    document.getElementById('round-info').innerHTML = '';
    document.getElementById('score').innerHTML = '';

    document.querySelector('.dice .self').innerHTML = `
        <img src="images/dice-six-faces-1.png" alt="dice-six-faces-1">
        <img src="images/dice-six-faces-6.png" alt="dice-six-faces-6">
    `;
    document.querySelector('.dice .computer').innerHTML = `
    <img src="images/dice-six-faces-1.png" alt="dice-six-faces-1">
    <img src="images/dice-six-faces-6.png" alt="dice-six-faces-6">
    `;
    
}

// Event listener for roll button
document.getElementById('roll-btn').addEventListener('click', function() {

    // Add shake animation class to dice elements
    dice.forEach(function(die) {
        die.classList.add('shake');
    });

    // Roll dice for player and computer
    const playerDice1 = rollDice();
    const playerDice2 = rollDice();
    const computerDice1 = rollDice();
    const computerDice2 = rollDice();

    // Calculate scores
    const playerScore = calculateScore(playerDice1, playerDice2);
    const computerScore = calculateScore(computerDice1, computerDice2);

    // Update UI after a short delay to trigger shake animation
    setTimeout(function() {
        // Remove shake animation class from dice elements
        dice.forEach(function(die) {
            die.classList.remove('shake');
        });

        // Update UI with dice images and game info
        updateDiceImages(playerDice1, playerDice2, computerDice1, computerDice2);
        updateGameInfo(playerScore, computerScore);

        // Check if all rounds are completed
        if (round === 3) {
            // Determine the winner
            let winner;
            if (playerTotalScore > computerTotalScore) {
                winner = 'Player';
            } else if (playerTotalScore < computerTotalScore) {
                winner = 'Computer';
            } else {
                winner = 'It\'s a tie';
            }
            // Display the winner
            document.getElementById('round-info').innerHTML += `
                <p>Winner: ${winner}</p>
            `;

            // Disable roll button after third round
            document.getElementById('roll-btn').disabled = true;
        }
    }, 1000); 
});

// Event listener for reset button
document.getElementById('reset-btn').addEventListener('click', function() {
    resetGame();
    document.getElementById('roll-btn').disabled = false;
});