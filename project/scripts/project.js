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

// Function to update the game information
function updateGameInfo(playerScore, computerScore) {
    round++;
    playerTotalScore += playerScore;
    computerTotalScore += computerScore;
    document.getElementById('round-info').innerHTML += `
        <p>Round ${round}: Player Score is ${playerScore}, Computer Score is ${computerScore}</p>
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

    // Reset dice images
    document.querySelector('#dice-1').setAttribute("src", "images/dice-six-faces-1.png");
    document.querySelector('#dice-2').setAttribute("src", "images/dice-six-faces-6.png");
    document.querySelector('#dice-3').setAttribute("src", "images/dice-six-faces-1.png");
    document.querySelector('#dice-4').setAttribute("src", "images/dice-six-faces-6.png");

    document.getElementById('roll-btn').disabled = false;
    
}

// Function to add shake animation class to dice elements
function addShakeAnimation() {
    dice.forEach(function(die) {
        die.classList.add('shake');
    });
}

// Function to remove shake animation class from dice elements
function removeShakeAnimation() {
    dice.forEach(function(die) {
        die.classList.remove('shake');
    });
}

let isAnimating = false;

// Show popup with winner information
function showWindow(winner) {
    if (!isAnimating) {
        const popup = document.getElementById('popup');
        const popupContent = document.querySelector('.popup-content');
        popupContent.innerHTML = `<h2>Winner: ${winner}</h2> 
        <div id="close-btn"><button>Close</button></div>`;
        setTimeout(function() {
            popup.style.opacity = '1';
        }, 100);
        popup.style.visibility = 'visible';

        // Add event listener to the close button
        const closeBtn = document.getElementById('close-btn');
        closeBtn.addEventListener('click', function() {
            popup.style.opacity = 0;
            setTimeout(function() {
                popup.style.visibility = 'hidden';
            }, 500);
        });
    }
}

// Event listener for roll button
document.getElementById('roll-btn').addEventListener('click', function() {
    
    // Roll dice for player and computer
    const playerDice1 = rollDice();
    const playerDice2 = rollDice();
    const computerDice1 = rollDice();
    const computerDice2 = rollDice();

    // Add shake animation class to dice elements
    addShakeAnimation();

    setTimeout(function() {
        
        removeShakeAnimation();

        document.querySelector('#dice-1').setAttribute("src", images[playerDice1 - 1]);
        document.querySelector('#dice-2').setAttribute("src", images[playerDice2 - 1]);
        document.querySelector('#dice-3').setAttribute("src", images[computerDice1 - 1]);
        document.querySelector('#dice-4').setAttribute("src", images[computerDice2 - 1]);

        // Calculate scores
        const playerScore = calculateScore(playerDice1, playerDice2);
        const computerScore = calculateScore(computerDice1, computerDice2);

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
            // document.getElementById('round-info').innerHTML += `
            //     <h2>Winner: ${winner}</h2>
            // `;
            showWindow(winner);
            // Disable roll button after third round
            document.getElementById('roll-btn').disabled = true;
        }

    }, 1000);
  
});

// Event listener for reset button
document.getElementById('reset-btn').addEventListener('click', function() {
    resetGame();
});
