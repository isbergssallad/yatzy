class GameState{
    //metod? funktion som körs när man skapar en ny instans
    //.this
    constructor(){
        //spelrundan avslutas
        this.ended = false;
        this.totalScore = 0;

        //objekt som innehåller olika kategorier med poäng och "state"
        //förbättring av koden, används en objekt istället för 13 globala variabler
        this.scoreCategories = {
            //nycklar och värden
            ones: {score: 0, saved: false},
            twos: {score: 0, saved: false},
            threes: {score: 0, saved: false},
            fours: {score: 0, saved: false},
            fives: {score: 0, saved: false},
            sixes: {score: 0, saved: false},
    
            threeOfAKind: {score: 0, saved: false},
            fourOfAKind: {score: 0, saved: false},
            fullHouse: {score: 0, saved: false},
            smallStraight: {score: 0, saved: false},
            largeStraight: {score: 0, saved: false},
            chance: {score: 0, saved: false},
            yahtzee: {score: 0, saved: false},
        }


        //en array som kollar hur många "kategorier" spelaren har bockat av.
        this.scoreCategorySaved = Array(13).fill(false);

    }

}

var round = new GameState()




var currentDices = [0, 0, 0, 0, 0];


//upper section i yatzy är alla från ettor till sexor. dessa variabler håller reda på de poängen och summa av de.
var upperSectionSum = 0;


//variabel för antalet tärningskast
var rolls = 3;



//variabel för att kolla om spelaren har valt en cell
var didPlayerCheckCell = false;


//variabel för gråa färgen när en ruta sparas på poängtabellen.
const savedColor = "rgb(181, 181, 181)"; 



var test = true


//funktion för vad som händer när en "kategori" klickas, tar in ett elementId, poängen, och ett kategori
function handleCategoryClick (elementId, score, category){
    if (didPlayerCheckCell == false){
        if (round.scoreCategories[category].saved == false){
             //sätter det kategoriet till "true"
             round.scoreCategories[category].saved = true;

            document.getElementById(elementId).style.backgroundColor = savedColor;

            //kör updateBonus() funktion för att kolla om spelaren har fått bonus
            updateBonus()
            

            round.totalScore += score;
            console.log(round.totalScore)
            

            //gör variabel till det motsatta
            didPlayerCheckCell = !didPlayerCheckCell;

            //gör att spelare inte kan spara tärningar efter att ha valt en cell
            diceSaveReset()

            //object.values ger en array av alla värden för ett objekt
            //om varje kategori har valt
            if (Object.values(round.scoreCategories).every((value) => value.saved === true)) {
                round.ended = true;
                document.getElementById("total-score").innerHTML = round.totalScore
                gameOver()
            }
        }
    }
}


var usernameInput = ""
//funktion när spelet är över
function gameOver(){
    //stänger av roll knappen
    document.getElementById("roll").disabled = true; //stänger av roll knappen
    
    document.getElementById("instructions").innerHTML = "You got a total of " + round.totalScore + " points. <br /> Type your username in the field below."

    //input field för användarnamn
    var usernameInputField = document.createElement("input");

    //input field egenskaper
    usernameInputField.setAttribute('type', 'text');
    usernameInputField.setAttribute('placeholder', 'Type Username'); 

    //submit knapp för input field
    var highscoreSubmitButton = document.createElement("button");
    highscoreSubmitButton.textContent = "Enter"

    //egenskaper för knappen
    highscoreSubmitButton.onclick = function(){
        //gör en variabel för att "spara" username som spelaren skriver in
        usernameInput = usernameInputField.value;
        saveHighscore();
    }

    //skapar klass namn för att kunna ändra css
    usernameInputField.className = "username-input";
    highscoreSubmitButton.className = "btn";
    

    document.getElementById("play-area").appendChild(usernameInputField);
    document.getElementById("play-area").appendChild(highscoreSubmitButton);
}


//ettor
document.getElementById("ones-score").onclick = function(){
    handleCategoryClick("ones-score", round.scoreCategories.ones.score, "ones")
}


//tvåor
document.getElementById("twos-score").onclick = function(){
    handleCategoryClick("twos-score", round.scoreCategories.twos.score, "twos")
}

//treor
document.getElementById("threes-score").onclick = function(){
    handleCategoryClick("threes-score", round.scoreCategories.threes.score, "threes")
}


//fyror
document.getElementById("fours-score").onclick = function(){
    handleCategoryClick("fours-score", round.scoreCategories.fours.score, "fours");
}


//femor
document.getElementById("fives-score").onclick = function(){
    handleCategoryClick("fives-score", round.scoreCategories.fives.score, "fives");
}


//sexor
document.getElementById("sixes-score").onclick = function(){
    handleCategoryClick("sixes-score", round.scoreCategories.sixes.score, "sixes");
}

//three of a kind cell onclick
document.getElementById("three-of-kind-score").onclick = function(){
    handleCategoryClick("three-of-kind-score", round.scoreCategories.threeOfAKind.score, "threeOfAKind");
}


//four of a kind cell onclick
document.getElementById("four-of-kind-score").onclick = function(){
    handleCategoryClick("four-of-kind-score", round.scoreCategories.fourOfAKind.score, "fourOfAKind");
}

//full house cell onclick
document.getElementById("full-house-score").onclick = function(){
    handleCategoryClick("full-house-score", round.scoreCategories.fullHouse.score, "fullHouse");
}


document.getElementById("small-straight-score").onclick = function(){
    handleCategoryClick("small-straight-score", round.scoreCategories.smallStraight.score, "smallStraight");
}


document.getElementById("large-straight-score").onclick = function(){
    handleCategoryClick("large-straight-score", round.scoreCategories.largeStraight.score, "largeStraight");
}


document.getElementById("chance-score").onclick = function(){
    handleCategoryClick("chance-score", round.scoreCategories.chance.score, "chance");
}


document.getElementById("yahtzee-score").onclick = function(){
    handleCategoryClick("yahtzee-score", round.scoreCategories.yahtzee.score, "yahtzee");
}



function displayScore(scoreCategory) {
    if (scoreCategory.saved == false && scoreCategory.score == 0){
        return "";
    }
    return scoreCategory.score;
}


var diceSaved = [false, false, false, false, false]

//funktion som gör att alla tärningar är inte sparade längre. finns för att hindra spelare från att spara mellan runder. ie spara tärning efter man har valt en cell.
function diceSaveReset(){
    for (let i = 0; i < diceSaved.length; i++){
        diceSaved[i] = false;
    }
}




//funktion för att visa instruktion till spelaren.
function playerInstructions(){
    if (rolls > 0){
        document.getElementById("instructions").innerHTML = "You have " + rolls + " rolls remaining.";
    } else {
        document.getElementById("instructions").innerHTML = "Select a cell on the scoreboard.";
    }
}


document.getElementById("roll").onclick = function() {
    //får bara kasta tärningar om antalet kast är större än 0 och spelaren inte valt en poäng cell.
    if (rolls > 0 && didPlayerCheckCell == false){
        rollDice(0);
        rollDice(1);
        rollDice(2);
        rollDice(3);
        rollDice(4);


        console.log(diceSaved)
        console.log("currentDices: " + currentDices)


        if (round.scoreCategories.ones.saved == false) {
            round.scoreCategories.ones.score = countDicesOfSameValue(currentDices, 1)
            document.getElementById("ones-score").innerHTML = displayScore(round.scoreCategories.ones);
            // console.log(onesScore)
        }


        if (round.scoreCategories.twos.saved == false) {
            round.scoreCategories.twos.score = countDicesOfSameValue(currentDices, 2)
            document.getElementById("twos-score").innerHTML = displayScore(round.scoreCategories.twos);
            // console.log(twosScore)
        }

        if (round.scoreCategories.threes.saved == false){
            round.scoreCategories.threes.score = countDicesOfSameValue(currentDices, 3)
            document.getElementById("threes-score").innerHTML = displayScore(round.scoreCategories.threes);
            // console .log(threesScore)
        }

        if (round.scoreCategories.fours.saved == false){
            round.scoreCategories.fours.score = countDicesOfSameValue(currentDices, 4)
            document.getElementById("fours-score").innerHTML = displayScore(round.scoreCategories.fours);
            // console.log(foursScore)
        }

        if (round.scoreCategories.fives.saved == false){
            round.scoreCategories.fives.score = countDicesOfSameValue(currentDices, 5)
            document.getElementById("fives-score").innerHTML = displayScore(round.scoreCategories.fives);
            // console.log(fivesScore)
        }


        if (round.scoreCategories.sixes.saved == false){
            round.scoreCategories.sixes.score = countDicesOfSameValue(currentDices, 6)
            document.getElementById("sixes-score").innerHTML = displayScore(round.scoreCategories.sixes);
            // console.log(sixesScore)
        }

        if (round.scoreCategories.threeOfAKind.saved == false){
            round.scoreCategories.threeOfAKind.score = checkThreeOfAKind(currentDices)
            document.getElementById("three-of-kind-score").innerHTML = displayScore(round.scoreCategories.threeOfAKind)
            // console.log(threeOfAKindScore)
        }

        if (round.scoreCategories.fourOfAKind.saved == false){
            round.scoreCategories.fourOfAKind.score = checkFourOfAKind(currentDices)
            document.getElementById("four-of-kind-score").innerHTML = displayScore(round.scoreCategories.fourOfAKind)
            // console.log(fourOfAKindScore)
        }

        if (round.scoreCategories.fullHouse.saved == false){
            round.scoreCategories.fullHouse.score = checkFullHouse(currentDices)
            document.getElementById("full-house-score").innerHTML = displayScore(round.scoreCategories.fullHouse)
        }

        if (round.scoreCategories.smallStraight.saved == false){
            round.scoreCategories.smallStraight.score = checkSmallStraight(currentDices)
            document.getElementById("small-straight-score").innerHTML = displayScore(round.scoreCategories.smallStraight)
            // console.log(smallStraightScore)
        }

        if (round.scoreCategories.largeStraight.saved == false){
            round.scoreCategories.largeStraight.score = checkLargeStraight(currentDices)
            document.getElementById("large-straight-score").innerHTML = displayScore(round.scoreCategories.largeStraight)
            // console.log(largeStraighScore)
        }

        if (round.scoreCategories.chance.saved == false){
            round.scoreCategories.chance.score = checkChance(currentDices)
            document.getElementById("chance-score").innerHTML = displayScore(round.scoreCategories.chance)
        }

        if (round.scoreCategories.yahtzee.saved == false){
            round.scoreCategories.yahtzee.score = checkYahtzee(currentDices)
            document.getElementById("yahtzee-score").innerHTML = displayScore(round.scoreCategories.yahtzee)
        }


        //tärningarna onclick
        document.getElementById("die-1").onclick = function () {
            handleDiceClick(0);
            console.log(currentDices)
        };

        document.getElementById("die-2").onclick = function () {
            handleDiceClick(1);
            console.log(currentDices)
        };

        document.getElementById("die-3").onclick = function () {
            handleDiceClick(2);
            console.log(currentDices)
        };

        document.getElementById("die-4").onclick = function () {
            handleDiceClick(3);
            console.log(currentDices)
        };

        document.getElementById("die-5").onclick = function () {
            handleDiceClick(4);
            console.log(currentDices)
        };

        //Minskar antalet tärningskast
        rolls--;

        playerInstructions();
        
    } else {
        //spelaren måste välja en cell innan de får rulla igen
        if (didPlayerCheckCell){
            rolls = 3;
            diceSaveReset(); 
            didPlayerCheckCell = false;
            document.getElementById("roll").click();
        }
    }
}
