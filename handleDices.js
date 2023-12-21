 //funktion för att få en slumpmässigt siffra / tärningskast
function diceRoll(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function rollDice(index) { //funktion för tärningskastet
    if (round.savedDices[index] == false) { //om tärningen på index i array är falsk
        const value = diceRoll(1, 6);
        round.currentDices[index] = value;
        document.getElementById("die-" + (index + 1)).src = "images/dice" + value + ".png";
    }
}

//funktion som gör att alla tärningar är inte sparade längre. finns för att hindra spelare från att spara mellan runder. ie spara tärning efter man har valt en cell.
function diceSaveReset(){
    for (let i = 0; i < round.savedDices.length; i++){
        round.savedDices[i] = false;
        document.getElementById("die-" + (i + 1)).style.filter = "brightness(1)"; 
    }
}


//funktion till när en tärning klickas
function handleDiceClick(index) {
    //gör värdet i index motsattsen, ex. sant blir falsk och tvärtom 
    round.savedDices[index] = !round.savedDices[index];
    if (round.savedDices[index] == true){
        document.getElementById("die-" + (index + 1)).style.filter = "brightness(0.6)"; 
    } else {
        document.getElementById("die-" + (index + 1)).style.filter = "brightness(1)"; 
    }
}




