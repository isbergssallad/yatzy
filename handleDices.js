 //funktion för att få en slumpmässigt siffra / tärningskast
function diceRoll(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function rollDice(index) { //funktion för tärningskastet
    if (diceSaved[index] == false) { //om tärningen på index i array är falsk
        const value = diceRoll(1, 6);
        currentDices[index] = value;
        document.getElementById("die-" + (index + 1)).src = "images/dice" + value + ".png";
    }
}


//funktion till när en tärning klickas
function handleDiceClick(index) {
    //gör värdet i index motsattsen, ex. sant blir falsk och tvärtom 
    diceSaved[index] = !diceSaved[index];
}

