class GameState{
    //metod? funktion som körs när man skapar en ny instans
    //.this
    constructor(){
        //spelrundan avslutas
        this.ended = false;
        this.totalScore = 0;

        //en array som kollar hur många "kategorier" spelaren har bockat av.
        this.scoreCategorySaved = Array(13).fill(false);

        this.onesScore = 0;
        this.twosScore = 0;
        this.threesScore = 0;
        this.foursScore = 0;
        this.fivesScore = 0;
        this.sixesScore = 0;

        this.threeOfAKindScore = 0;
        this.fourOfAKindScore = 0;
        this.fullHouseScore = 0;
        this.smallStraightScore = 0;
        this.largeStraightScore = 0;
        this.chanceScore = 0;
        this.yahtzeeScore = 0;
        
    }

}

var round = new GameState()




var currentDices = [0, 0, 0, 0, 0];


//upper section i yatzy är alla från ettor till sexor. dessa variabler håller reda på de poängen och summa av de.
var upperSectionScores = [0, 0, 0, 0, 0, 0];
var upperSectionSum = 0;


//variabel för antalet tärningskast
var rolls = 3;



//variabel för att kolla om spelaren har valt en cell
var didPlayerCheckCell = false;


//variabel för gråa färgen när en ruta sparas på poängtabellen.
const savedColor = "rgb(181, 181, 181)"; 



var test = true


//funktion för vad som händer när en "kategori" klickas, tar in ett elementId, poängen, och ett index för state_player1
function handleCategoryClick (elementId, score, index){
    if (didPlayerCheckCell == false){
        if (round.scoreCategorySaved[index] == false){
             //sätter det indexet till "true"
            round.scoreCategorySaved[index] = true;

            document.getElementById(elementId).style.backgroundColor = savedColor;

            //om indexet är under 5, dvs om det är i upper section. från ettor till sexor.
            if (index <= 5){
                updateBonus(upperSectionScores, index, score)
            }

            round.totalScore += score;
            console.log(round.totalScore)
            

            //gör variabel till det motsatta
            didPlayerCheckCell = !didPlayerCheckCell;

            //gör att spelare inte kan spara tärningar efter att ha valt en cell
            diceSaveReset()

            //om varje kategori har valt
            if (round.scoreCategorySaved.every((value) => value === true)) {
                round.ended = true;
                document.getElementById("total-player1").innerHTML = round.totalScore
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
document.getElementById("ones-player1").onclick = function(){
    handleCategoryClick("ones-player1", round.onesScore, 0)
}


//tvåor
document.getElementById("twos-player1").onclick = function(){
    handleCategoryClick("twos-player1", round.twosScore, 1)
}

//treor
document.getElementById("threes-player1").onclick = function(){
    handleCategoryClick("threes-player1", round.threesScore, 2)
}


//fyror
document.getElementById("fours-player1").onclick = function(){
    handleCategoryClick("fours-player1", round.foursScore, 3);
}


//femor
document.getElementById("fives-player1").onclick = function(){
    handleCategoryClick("fives-player1", round.fivesScore, 4);
}


//sexor
document.getElementById("sixes-player1").onclick = function(){
    handleCategoryClick("sixes-player1", round.sixesScore, 5);
}

//three of a kind cell onclick
document.getElementById("three-of-kind-player1").onclick = function(){
    handleCategoryClick("three-of-kind-player1", round.threeOfAKindScore, 6);
}


//four of a kind cell onclick
document.getElementById("four-of-kind-player1").onclick = function(){
    handleCategoryClick("four-of-kind-player1", round.fourOfAKindScore, 7);
}

//full house cell onclick
document.getElementById("full-house-player1").onclick = function(){
    handleCategoryClick("full-house-player1", round.fullHouseScore, 8);
}


document.getElementById("small-straight-player1").onclick = function(){
    handleCategoryClick("small-straight-player1", round.smallStraightScore, 9);
}


document.getElementById("large-straight-player1").onclick = function(){
    handleCategoryClick("large-straight-player1", round.largeStraightScore, 10);
}


document.getElementById("chance-player1").onclick = function(){
    handleCategoryClick("chance-player1", round.chanceScore, 11);
}


document.getElementById("yahtzee-player1").onclick = function(){
    handleCategoryClick("yahtzee-player1", round.yahtzeeScore, 12);
}



function displayScore(isSaved, score) {
    if (isSaved == false && score == 0){
        return "";
    }
    return score;
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


        if (round.scoreCategorySaved[0] == false) {
            round.onesScore = countDicesOfSameValue(currentDices, 1)
            document.getElementById("ones-player1").innerHTML = displayScore(round.scoreCategorySaved[0], round.onesScore);
            // console.log(onesScore)
        }


        if (round.scoreCategorySaved[1] == false) {
            round.twosScore = countDicesOfSameValue(currentDices, 2)
            document.getElementById("twos-player1").innerHTML = displayScore(round.scoreCategorySaved[1], round.twosScore);
            // console.log(twosScore)
        }

        if (round.scoreCategorySaved[2] == false){
            round.threesScore = countDicesOfSameValue(currentDices, 3)
            document.getElementById("threes-player1").innerHTML = displayScore(round.scoreCategorySaved[2], round.threesScore);
            // console .log(threesScore)
        }

        if (round.scoreCategorySaved[3] == false){
            round.foursScore = countDicesOfSameValue(currentDices, 4)
            document.getElementById("fours-player1").innerHTML = displayScore(round.scoreCategorySaved[3], round.foursScore);
            // console.log(foursScore)
        }

        if (round.scoreCategorySaved[4] == false){
            round.fivesScore = countDicesOfSameValue(currentDices, 5)
            document.getElementById("fives-player1").innerHTML = displayScore(round.scoreCategorySaved[4], round.fivesScore);
            // console.log(fivesScore)
        }


        if (round.scoreCategorySaved[5] == false){
            round.sixesScore = countDicesOfSameValue(currentDices, 6)
            document.getElementById("sixes-player1").innerHTML = displayScore(round.scoreCategorySaved[5], round.sixesScore);
            // console.log(sixesScore)
        }

        if (round.scoreCategorySaved[6] == false){
            round.threeOfAKindScore = checkThreeOfAKind(currentDices)
            document.getElementById("three-of-kind-player1").innerHTML = displayScore(round.scoreCategorySaved[6], round.threeOfAKindScore)
            // console.log(threeOfAKindScore)
        }

        if (round.scoreCategorySaved[7] == false){
            round.fourOfAKindScore = checkFourOfAKind(currentDices)
            document.getElementById("four-of-kind-player1").innerHTML = displayScore(round.scoreCategorySaved[7], round.fourOfAKindScore)
            // console.log(fourOfAKindScore)
        }

        if (round.scoreCategorySaved[8] == false){
            round.fullHouseScore = checkFullHouse(currentDices)
            document.getElementById("full-house-player1").innerHTML = displayScore(round.scoreCategorySaved[8], round.fullHouseScore)
        }

        if (round.scoreCategorySaved[9] == false){
            round.smallStraightScore = checkSmallStraight(currentDices)
            document.getElementById("small-straight-player1").innerHTML = displayScore(round.scoreCategorySaved[9], round.smallStraightScore)
            // console.log(smallStraightScore)
        }

        if (round.scoreCategorySaved[10] == false){
            round.largeStraightScore = checkLargeStraight(currentDices)
            document.getElementById("large-straight-player1").innerHTML = displayScore(round.scoreCategorySaved[10], round.largeStraightScore)
            // console.log(largeStraighScore)
        }

        if (round.scoreCategorySaved[11] == false){
            round.chanceScore = checkChance(currentDices)
            document.getElementById("chance-player1").innerHTML = displayScore(round.scoreCategorySaved[11], round.chanceScore)
        }

        if (round.scoreCategorySaved[12] == false){
            round.yahtzeeScore = checkYahtzee(currentDices)
            document.getElementById("yahtzee-player1").innerHTML = displayScore(round.scoreCategorySaved[12], round.yahtzeeScore)
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
