var currentDices = [0, 0, 0, 0, 0];


//upper section i yatzy är alla från ettor till sexor. dessa variabler håller reda på de poängen och summa av de.
var upperSectionScores = [0, 0, 0, 0, 0, 0];
var upperSectionSum = 0;


//variabel för antalet tärningskast
var rolls = 3;

//variabel för att summan av poängen
var totalScore_player1 = 0;

//en array som kollar hur många "cells" spelaren har bockat av.
var state_player1 = Array(13).fill(false);


 //variabel för att kolla om spelaren har valt en cell
var didPlayerCheckCell = false;


//variabel för gråa färgen när en ruta sparas på poängtabellen.
const savedColor = "rgb(181, 181, 181)"; 

var gameOverState = false;


//funktion för vad som händer när en "kategori" klickas, tar in ett elementId, poängen, och ett index för state_player1
function handleCategoryClick (elementId, score, index){
    if (didPlayerCheckCell == false){
        if (state_player1[index] == false){
             //sätter det indexet till "true"
            state_player1[index] = true;

            //konvertera poängen till 0 om det är "" för att förhindra att göra ett mellan rum
            if (score == ""){
                score = 0
            }

            document.getElementById(elementId).style.backgroundColor = savedColor;

            //om indexet är under 5, dvs om det är i upper section. från ettor till sexor.
            if (index <= 5){
                updateBonus(upperSectionScores, index, score)
            }

            totalScore_player1 += score;
            console.log(totalScore_player1)
            

            //gör variabel till det motsatta
            didPlayerCheckCell = !didPlayerCheckCell;

            //gör att spelare inte kan spara tärningar efter att ha valt en cell
            diceSaveReset()

            //om varje kategori har valt
            if (state_player1.every((value) => value === true)) {
                gameOverState = true;
                document.getElementById("total-player1").innerHTML = totalScore_player1
                gameOver()
            }
        }
    }
}

//funktion när spelet är över
function gameOver(){
    //stänger av roll knappen
    document.getElementById("roll").disabled = true; //stänger av roll knappen
    
    document.getElementById("instructions").innerHTML = "You got a total of " + score + " points. Type your username in the field below."

    //
    var usernameInput = document.createElement("input");
    usernameInput.setAttribute('type', 'text');
    usernameInput.setAttribute('value', 'Type Username'); 
    usernameInput.className("username-input") 

    document.getElementById("play-area").appendChild(usernameInput)
}


//ettor
var onesScore = 0
document.getElementById("ones-player1").onclick = function(){
    handleCategoryClick("ones-player1", onesScore, 0)
}


//tvåor
var twosScore = 0
document.getElementById("twos-player1").onclick = function(){
    handleCategoryClick("twos-player1", twosScore, 1)
}

//treor
var threesScore = 0
document.getElementById("threes-player1").onclick = function(){
    handleCategoryClick("threes-player1", threesScore, 2)
}


//fyror
var foursScore = 0
document.getElementById("fours-player1").onclick = function(){
    handleCategoryClick("fours-player1", foursScore, 3);
}


//femor
var fivesScore = 0
document.getElementById("fives-player1").onclick = function(){
    handleCategoryClick("fives-player1", fivesScore, 4);
}


//sexor
var sixesScore = 0
document.getElementById("sixes-player1").onclick = function(){
    handleCategoryClick("sixes-player1", sixesScore, 5);
}

//three of a kind cell onclick
var threeOfAKindScore = 0
document.getElementById("three-of-kind-player1").onclick = function(){
    handleCategoryClick("three-of-kind-player1", threeOfAKindScore, 6);
}


//four of a kind cell onclick
var fourOfAKindScore = 0
document.getElementById("four-of-kind-player1").onclick = function(){
    handleCategoryClick("four-of-kind-player1", fourOfAKindScore, 7);
}

//full house cell onclick
var fullHouseScore = 0;
document.getElementById("full-house-player1").onclick = function(){
    handleCategoryClick("full-house-player1", fullHouseScore, 8);
}

var smallStraightScore = 0;
document.getElementById("small-straight-player1").onclick = function(){
    handleCategoryClick("small-straight-player1", smallStraightScore, 9);
}

var largeStraightScore = 0;
document.getElementById("large-straight-player1").onclick = function(){
    handleCategoryClick("large-straight-player1", largeStraightScore, 10);
}

var chanceScore = 0;
document.getElementById("chance-player1").onclick = function(){
    handleCategoryClick("chance-player1", chanceScore, 11);
}

var yahtzeeScore = 0;
document.getElementById("yahtzee-player1").onclick = function(){
    handleCategoryClick("yahtzee-player1", yahtzeeScore, 12);
}





var diceSaved = [false, false, false, false, false]

//funktion som gör att alla tärningar är inte sparade längre. finns för att hindra spelare från att spara mellan runder. ie spara tärning efter man har valt en cell.
function diceSaveReset(){
    for (let i = 0; i < diceSaved.length; i++){
        diceSaved[i] = false;
    }
}


function updateScoreboard(savedState, score, elementId, scoreFunction){
    if (savedState == false){
        var score = scoreFunction(currentDices);
        scoreVar = score;
        document.getElementById(elementId).innerHTML = scoreVar;
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


        if (state_player1[0] == false) {
            onesScore = checkValues(currentDices, 1)
            document.getElementById("ones-player1").innerHTML = onesScore
            // console.log(onesScore)
        }

        if (state_player1[1] == false) {
            twosScore = checkValues(currentDices, 2)
            document.getElementById("twos-player1").innerHTML = twosScore
            // console.log(twosScore)
        }

        if (state_player1[2] == false){
            threesScore = checkValues(currentDices, 3)
            document.getElementById("threes-player1").innerHTML = threesScore
            // console .log(threesScore)
        }

        if (state_player1[3] == false){
            foursScore = checkValues(currentDices, 4)
            document.getElementById("fours-player1").innerHTML = foursScore
            // console.log(foursScore)
        }

        if (state_player1[4] == false){
            fivesScore = checkValues(currentDices, 5)
            document.getElementById("fives-player1").innerHTML = fivesScore
            // console.log(fivesScore)
        }

        if (state_player1[5] == false){
            sixesScore = checkValues(currentDices, 6)
            document.getElementById("sixes-player1").innerHTML = sixesScore
            // console.log(sixesScore)
        }

        if (state_player1[6] == false){
            threeOfAKindScore = checkThreeOfAKind(currentDices)
            document.getElementById("three-of-kind-player1").innerHTML = threeOfAKindScore
            // console.log(threeOfAKindScore)
        }

        if (state_player1[7] == false){
            fourOfAKindScore = checkFourOfAKind(currentDices)
            document.getElementById("four-of-kind-player1").innerHTML = fourOfAKindScore
            // console.log(fourOfAKindScore)
        }

        if (state_player1[8] == false){
            fullHouseScore = checkFullHouse(currentDices)
            document.getElementById("full-house-player1").innerHTML = fullHouseScore
        }

        if (state_player1[9] == false){
            smallStraightScore = checkSmallStraight(currentDices)
            document.getElementById("small-straight-player1").innerHTML = smallStraightScore
            // console.log(smallStraightScore)
        }

        if (state_player1[10] == false){
            largeStraightScore = checkLargeStraight(currentDices)
            document.getElementById("large-straight-player1").innerHTML = largeStraightScore
            // console.log(largeStraighScore)
        }

        if (state_player1[11] == false){
            chanceScore = checkChance(currentDices)
            document.getElementById("chance-player1").innerHTML = chanceScore
        }

        if (state_player1[12] == false){
            yahtzeeScore = checkYahtzee(currentDices)
            document.getElementById("yahtzee-player1").innerHTML = yahtzeeScore
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

        rolls--; //Minskar antalet tärningskast

        playerInstructions();
        // checkTotal();
        
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
