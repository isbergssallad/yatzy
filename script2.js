// Use consistent variable naming conventions
var savedDices = [];
var currentDices = [];

var bonusScores = [0, 0, 0, 0, 0, 0];
var upperSectionSum = 0;

var savedScores = [];

// Use constants instead of magic numbers
const THREE_OF_A_KIND_SCORE = 12;
const FOUR_OF_A_KIND_SCORE = 27;
const BONUS_THRESHOLD = 63;
const BONUS_VALUE = 35;

//färg när en ruta klickas
let savedColor = "rgb(181, 181, 181)";

//function för en tärningskast, ec randomize ett nummer
function diceRoll(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkValues(array, value){ //funktion för att räkna ihop ett värde i poängtabellen
    var count = 0;
    for(i = 0; i < array.length; i++){
        if(array[i] == value){count+=value}
    }
    if (count == 0){ //för att det inte ska stå "0" i rutan om det inga 2or som rullas
        return "";
    }
    else {
        return count;
    }
}


function updatePlayerScore(elementId, score, bonusIndex) {
    if (!score) return;
    document.getElementById(elementId).innerHTML = score;

    if (bonusScores[bonusIndex] === 0) {
        bonusScores[bonusIndex] = score;
        upperSectionSum += score;

        if (upperSectionSum >= BONUS_THRESHOLD) {
            document.getElementById("bonus-player1").innerHTML = BONUS_VALUE;
        }
    }
}

// Function to check for three of a kind
var threeOfAKind = false
function checkThreeOfAKind(array) {
    for (let i = 0; i < array.length; i++) {
        let count = 1;
    
        for (let j = i + 1; j < array.length; j++) {
          if (array[i] === array[j]) {
            count++;
    
            if (count === 3) {
                return THREE_OF_A_KIND_SCORE;
            }
          }
        }
      }
    
      return "";
    }


// Function to check for four of a kind
var fourOfAKind = false
function checkFourOfAKind(array) {
    for (let i = 0; i < array.length; i++) {
        let count = 1;
    
        for (let j = i + 1; j < array.length; j++) {
          if (array[i] === array[j]) {
            count++;
    
            if (count === 4) {
                return FOUR_OF_A_KIND_SCORE;
            }
          }
        }
      }
    
      return "";
    }


// Function to handle dice click events
function handleDiceClick(index, savedFlag) {
    const currentDice = currentDices[index];

    if (!savedFlag) {
        savedDices[index] = currentDice;
    } else {
        savedDices[index] = null;
    }
}

let areOnesSaved = false
document.getElementById("ones-player1").onclick = function () {
    areOnesSaved = true
    document.getElementById("ones-player1").style.backgroundColor = savedColor;
    countBonus(bonusScores, 0, onesScore)
    console.log("BonusArr: ", bonusScores)
    updatePlayerScore("ones-player1", onesScore, 0);
};

let areTwosSaved = false
document.getElementById("twos-player1").onclick = function () {
    areTwosSaved = true
    document.getElementById("twos-player1").style.backgroundColor = savedColor;
    countBonus(bonusScores, 1, twosScore)
    console.log("BonusArr: ", bonusScores)
    updatePlayerScore("twos-player1", twosScore, 1);
};

let areThreesSaved = false
document.getElementById("threes-player1").onclick = function () {
    areThreesSaved = true;
    document.getElementById("threes-player1").style.backgroundColor = savedColor;
    countBonus(bonusScores, 2, threesScore);
    console.log("BonusArr: ", bonusScores);
    updatePlayerScore("threes-player1", threesScore, 2);
};

let areFoursSaved = false
document.getElementById("fours-player1").onclick = function () {
    areFoursSaved = true;
    document.getElementById("fours-player1").style.backgroundColor = savedColor;
    countBonus(bonusScores, 3, foursScore);
    console.log("BonusArr: ", bonusScores);
    updatePlayerScore("fours-player1", foursScore, 3);
};

let areFivesSaved = false
document.getElementById("fives-player1").onclick = function () {
    areFivesSaved = true;
    document.getElementById("fives-player1").style.backgroundColor = savedColor;
    countBonus(bonusScores, 4, fivesScore);
    console.log("BonusArr: ", bonusScores);
    updatePlayerScore("fives-player1", fivesScore, 4);
};

let areSixesSaved = false
document.getElementById("sixes-player1").onclick = function () {
    areSixesSaved = true;
    document.getElementById("sixes-player1").style.backgroundColor = savedColor;
    countBonus(bonusScores, 5, sixesScore);
    console.log("BonusArr: ", bonusScores);
    updatePlayerScore("sixes-player1", sixesScore, 5);
};




var d1Saved = false
var d2Saved = false
var d3Saved = false
var d4Saved = false
var d5Saved = false


document.getElementById("roll").onclick = function () {
    const rollDice = (index, savedFlag) => {
        if (!savedFlag) {
            const value = diceRoll(1, 6);
            currentDices[index] = value;
            document.getElementById(`die-${index + 1}`).src = `/images/dice${value}.png`;
        }
    };

    // Roll the dice if they are not saved
    rollDice(0, d1Saved);
    rollDice(1, d2Saved);
    rollDice(2, d3Saved);
    rollDice(3, d4Saved);
    rollDice(4, d5Saved);

    // Update scores based on the current dice values
    if (areOnesSaved == false) {
        onesScore = checkValues(currentDices, 1);
        updatePlayerScore("ones-player1", onesScore, 0);
    }

    if (areTwosSaved == false) {
        twosScore = checkValues(currentDices, 2);
        updatePlayerScore("twos-player1", twosScore, 1);
    }

    if (areThreesSaved == false) {
        threesScore = checkValues(currentDices, 3);
        updatePlayerScore("threes-player1", threesScore, 2);
    }

    if (areFoursSaved == false) {
        foursScore = checkValues(currentDices, 4);
        updatePlayerScore("fours-player1", foursScore, 3);
    }

    if (areFivesSaved == false) {
        fivesScore = checkValues(currentDices, 5);
        updatePlayerScore("fives-player1", fivesScore, 4);
    }

    if (areSixesSaved == false) {
        sixesScore = checkValues(currentDices, 6);
        updatePlayerScore("sixes-player1", sixesScore, 5);
    }

    // Repeat the pattern for other score categories
    if (threeOfAKind == false) {
        updatePlayerScore("three-of-kind-player1", checkThreeOfAKind(currentDices), 6);
    }

    if (fourOfAKind == false) {
        updatePlayerScore("four-of-kind-player1", checkFourOfAKind(currentDices), 7);
    }

    // Handle dice click events
    const handleDiceClick = (index, savedFlag) => {
        if (!savedFlag) {
            savedDices[index] = currentDices[index];
        } else {
            savedDices[index] = null;
        }
    };

    document.getElementById("die-1").onclick = function () {
        handleDiceClick(0, d1Saved);
        d1Saved = !d1Saved;
    };

    document.getElementById("die-2").onclick = function () {
        handleDiceClick(1, d2Saved);
        d2Saved = !d2Saved;
    };

    // Repeat the pattern for other dice

    console.log(savedDices);
};