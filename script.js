var currentDices = [0, 0, 0, 0, 0]

var upperSectionScores = [0, 0, 0, 0, 0, 0]
var upperSectionSum = 0
var bonusValue = 35
var bonusThreshold = 63

var savedScores = []
var rollCount = 2

var totalScore_player1 = 0

var state_player1 = [false, false, false, false, false, false, false, false, false, false, false, false]

function changeState(array, index){
    array[index] = !array[index]
    console.log("index state: "+ array[index])
}



//dice can be saved at the very start of the game, please fix
//after checking a cell, player can save dice, fix
//if save dice, the dice appears to be saved on screen, but it doesnt, it gets rerolled.
//can choose two cells, please fix


document.getElementById("roll").innerHTML = "ROLL (" + rollCount + ")"


function diceRoll(min, max) { //funktion för att få en slumpmässigt siffra / tärningskast
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function rollDice(index) { //funktion för tärningskastet
    if (diceSaved[index] == false) { //om tärningen på index i array är falsk
        const value = diceRoll(1, 6);
        currentDices[index] = value;
        document.getElementById("die-" + (index + 1)).src = "images/dice" + value + ".png";
    }
}



function countBonus(arr, index, valueToAdd){
    arr.splice(index, 1, valueToAdd);
    return arr;
}


let savedColor = "rgb(181, 181, 181)" //variabel för gråa färgen när en ruta sparas på poängtabellen.


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



//ettor
let areOnesSaved = false //variabel som kollar om ettor rullas
let onesScore = 0
document.getElementById("ones-player1").onclick = function(){
    areOnesSaved = true
    changeState(state_player1, 0)
    document.getElementById("ones-player1").style.backgroundColor = savedColor;
    countBonus(upperSectionScores, 0, onesScore) //kör funktionen som räknar om spelaren får bonus eller ej
    console.log("BonusArr: ", upperSectionScores)
    checkBonus()
    saveReset()
    totalScore_player1 += onesScore
}

//tvåor
let areTwosSaved = false
let twosScore = 0
document.getElementById("twos-player1").onclick = function(){
    areTwosSaved = true
    changeState(state_player1, 1)
    document.getElementById("twos-player1").style.backgroundColor = savedColor;
    countBonus(upperSectionScores, 1, twosScore)
    console.log("BonusArr: ", upperSectionScores)
    checkBonus()
    saveReset()
    totalScore_player1 += twosScore
}

//treor
let areThreesSaved = false
let threesScore = 0
document.getElementById("threes-player1").onclick = function(){
    areThreesSaved = true
    changeState(state_player1, 2)
    document.getElementById("threes-player1").style.backgroundColor = savedColor;
    countBonus(upperSectionScores, 2, threesScore)
    console.log("BonusArr: ", upperSectionScores)
    checkBonus()
    saveReset()
    totalScore_player1 += threesScore
}

//fyror
let areFoursSaved = false
let foursScore = 0
document.getElementById("fours-player1").onclick = function(){
    areFoursSaved = true
    changeState(state_player1, 3)
    document.getElementById("fours-player1").style.backgroundColor = savedColor;
    countBonus(upperSectionScores, 3, foursScore)
    console.log("BonusArr: ", upperSectionScores)
    checkBonus()
    saveReset()
    totalScore_player1 += foursScore
}

//femor
let areFivesSaved = false
let fivesScore = 0
document.getElementById("fives-player1").onclick = function(){
    areFivesSaved = true
    changeState(state_player1, 4)
    document.getElementById("fives-player1").style.backgroundColor = savedColor;
    countBonus(upperSectionScores, 4, fivesScore)
    console.log("BonusArr: ", upperSectionScores)
    checkBonus()
    saveReset()
    totalScore_player1 += fivesScore
}

//sexor
let areSixesSaved = false
let sixesScore = 0
document.getElementById("sixes-player1").onclick = function(){
    areSixesSaved = true
    changeState(state_player1, 5)
    document.getElementById("sixes-player1").style.backgroundColor = savedColor;
    countBonus(upperSectionScores, 5, sixesScore)
    console.log("BonusArr: ", upperSectionScores)
    checkBonus()
    saveReset()
    totalScore_player1 += sixesScore
}






//funktion för triss / tre i rad
var threeOfAKind = false
let threeOfAKindScore = 0
function checkThreeOfAKind(array) {
    for (let i = 0; i < array.length; i++) {
      let count = 1;
  
      for (let j = i + 1; j < array.length; j++) {
        if (array[i] === array[j]) {
          count++;
  
          if (count === 3) {
            return 12;
          }
        }
      }
    }
  
    return "";
}

//funktion för fyra i rad
var fourOfAKind = false
let fourOfAKindScore = 0
function checkFourOfAKind(array) {
    for (let i = 0; i < array.length; i++) {
      let count = 1;
  
      for (let j = i + 1; j < array.length; j++) {
        if (array[i] === array[j]) {
          count++;
  
          if (count === 4) {
            return 27;
          }
        }
      }
    }
  
    return "";
}

// function check4OfKind2(array){
//     var temp = array.slice()
//     var value = temp.sort(function(a, b) { return a - b; }).join('')
//     if (value[0] == value[3]){
//         return 40;
//     } else {
//         return ""
//     }
// }


//small straight / liten stege
var isSmallStraightSaved = false
var smallStraightScore = 0
function checkSmallStraight(array) { //funktion för att kolla liten stege
    var temp = array.slice(); //skapa en kopia av array
    var value = temp.sort(function(a, b) { return a - b; }).join('');
    if (value.includes("1234") || value.includes("2345") || value.includes("3456")) {
        return 30;
    } else {
        return "";
    }
}

//large straight / stora stege
var isLargeStraightSaved = false
var largeStraightScore = 0
function checkLargeStraight(array) { //funktion för att kolla liten stege
    var temp = array.slice(); //skapa en kopia av array som heter temp
    var value = temp.sort(function(a, b) { return a - b; }).join('');
    if (value.includes("12345") || value.includes("23456")) {
        return 40;
    } else {
        return "";
    }
}


//full house
var isFullHouseSaved = false
var fullHouseScore = 0
function checkFullHouse(array){
    var temp = array.slice();
    var value = temp.sort(function(a, b) { return a - b; }).join('');
    if (value[0] == value[1] && value[2] == value[4] || value[0] == value[2] || value[3] == value[4]){
        return 25;
    } else{
        return ""
    }
}


//yahtzee
var isYahtzeeSaved = false
function checkYahtzee(array) {
    for (let i = 0; i < array.length; i++) {
        let count = 1;
    
        for (let j = i + 1; j < array.length; j++) {
          if (array[i] === array[j]) {
            count++;
    
            if (count === 5) {
              return 50;
            }
          }
        }
      }
    
      return "";
}
document.getElementById("yahtzee-player1").onclick = function(){
    isYahtzeeSaved = true
    changeState(state_player1, 12)
    document.getElementById("yahtzee-player1").style.backgroundColor = savedColor;
    saveReset()
    totalScore_player1 += yahtzeeScore
}


//chance
var isChanceSaved = false
function checkChance(array) {
    let value = 0
    for (let i = 0; i < array.length; i++) {
        value += array[i]
    } 
    return value;
}
document.getElementById("chance-player1").onclick = function(){
    isChanceSaved = true
    changeState(state_player1, 11)
    document.getElementById("chance-player1").style.backgroundColor = savedColor;
    saveReset()
    totalScore_player1 += chanceScore
}





document.getElementById("three-of-kind-player1").onclick = function(){
    threeOfAKind = true
    changeState(state_player1, 6)
    document.getElementById("three-of-kind-player1").style.backgroundColor = savedColor;
    saveReset()
    totalScore_player1 += threeOfAKindScore
}

document.getElementById("four-of-kind-player1").onclick = function(){
    fourOfAKind = true
    changeState(state_player1, 7)
    document.getElementById("four-of-kind-player1").style.backgroundColor = savedColor;
    saveReset()
    totalScore_player1 += fourOfAKindScore
}

document.getElementById("small-straight-player1").onclick = function(){
    isSmallStraightSaved = true
    changeState(state_player1, 9)
    document.getElementById("small-straight-player1").style.backgroundColor = savedColor;
    saveReset()
    totalScore_player1 += smallStraightScore
}

document.getElementById("large-straight-player1").onclick = function(){
    isLargeStraightSaved = true
    changeState(state_player1, 10)
    document.getElementById("large-straight-player1").style.backgroundColor = savedColor;
    saveReset()
    totalScore_player1 += largeStraightScore
}

document.getElementById("full-house-player1").onclick = function(){
    isFullHouseSaved = true
    changeState(state_player1, 8)
    document.getElementById("full-house-player1").style.backgroundColor = savedColor;
    saveReset()
    totalScore_player1 += fullHouseScore
}





//bonus
function checkBonus(){
    if (areOnesSaved && areTwosSaved && areThreesSaved && areFoursSaved && areFivesSaved && areSixesSaved){
        for (let i = 0; i < upperSectionScores.length; i++){
            upperSectionSum += upperSectionScores[i];
            console.log("upper scores: " + upperSectionSum)
        }
        document.getElementById("sum-player1").innerHTML = upperSectionSum;
    
        if (upperSectionSum >= bonusThreshold){
            document.getElementById("bonus-player1").innerHTML = bonusValue;
            totalScore_player1 += bonusValue
        } else {
            document.getElementById("bonus-player1").innerHTML = 0;
        }
    }
}


// function checkBonus2(){
//     for (let i = 0; i < state_player1.length; i++){
//         let count = 0
//         if (state_player1[i] == true){
//             count += 1
//             upperSectionSum += upperSectionScores[i]
//             console.log("upper scores: " + upperSectionSum)
//             if (count == 6) {
//                 document.getElementById("sum-player1").innerHTML = upperSectionSum;
//                 if (upperSectionSum >= bonusThreshold){
//                     document.getElementById("bonus-player1").innerHTML = bonusValue;
//                 } else {
//                     document.getElementById("bonus-player1").innerHTML = 0;
//                 }
//             } 
//         }
//     }
// }



function checkTotal(){
    let count = 0
    for (let i = 0; i < state_player1.length; i++){
        if (state_player1[i] == true){
            count += 1
            if (count == state_player1.length){
                document.getElementById("total-player1").innerHTML = totalScore_player1
            }
        }
    }
}




var diceSaved = [false, false, false, false, false]

function saveReset(){
    for (let i = 0; i < diceSaved.length; i++){
        diceSaved[i] = false;
    }
}

function handleDiceClick(index) { //funktion till när en tärning klickas
    diceSaved[index] = !diceSaved[index]; //gör värdet i index motsattsen, ex. sant blir falsk och tvärtom
}

// document.getElementById("die-1").onclick = function () { //när första tärningen klicaks
//     handleDiceClick(0);
//     console.log(diceSaved);
// };

// document.getElementById("die-2").onclick = function () {
//     handleDiceClick(1);
//     console.log(diceSaved);
    
// };

// document.getElementById("die-3").onclick = function () {
//     handleDiceClick(2);
//     console.log(diceSaved);
// };

// document.getElementById("die-4").onclick = function () {
//     handleDiceClick(3);
//     console.log(diceSaved);
// };

// document.getElementById("die-5").onclick = function () {
//     handleDiceClick(4);
//     console.log(diceSaved);
// };


document.getElementById("roll").onclick = function() {
    // document.getElementById("roll").innerHTML = "ROLL (" + (rollCount - 1) + ")"

    rollDice(0);
    rollDice(1);
    rollDice(2);
    rollDice(3);
    rollDice(4);

    console.log(diceSaved)
    console.log("currentDices: " + currentDices)


    if (areOnesSaved == false) {
        onesScore = checkValues(currentDices, 1)
        document.getElementById("ones-player1").innerHTML = onesScore
        // console.log(onesScore)
    }

    if (areTwosSaved == false) {
        twosScore = checkValues(currentDices, 2)
        document.getElementById("twos-player1").innerHTML = twosScore
        // console.log(twosScore)
    }

    if (areThreesSaved == false){
        threesScore = checkValues(currentDices, 3)
        document.getElementById("threes-player1").innerHTML = threesScore
        // console.log(threesScore)
    }

    if (areFoursSaved == false){
        foursScore = checkValues(currentDices, 4)
        document.getElementById("fours-player1").innerHTML = foursScore
        // console.log(foursScore)
    }

    if (areFivesSaved == false){
        fivesScore = checkValues(currentDices, 5)
        document.getElementById("fives-player1").innerHTML = fivesScore
        // console.log(fivesScore)
    }

    if (areSixesSaved == false){
        sixesScore = checkValues(currentDices, 6)
        document.getElementById("sixes-player1").innerHTML = sixesScore
        // console.log(sixesScore)
    }

    if (threeOfAKind == false){
        threeOfAKindScore = checkThreeOfAKind(currentDices)
        document.getElementById("three-of-kind-player1").innerHTML = threeOfAKindScore
        // console.log(threeOfAKindScore)
    }

    if (fourOfAKind == false){
        fourOfAKindScore = checkFourOfAKind(currentDices)
        document.getElementById("four-of-kind-player1").innerHTML = fourOfAKindScore
        // console.log(fourOfAKindScore)
    }

    if (isSmallStraightSaved == false){
        smallStraightScore = checkSmallStraight(currentDices)
        document.getElementById("small-straight-player1").innerHTML = smallStraightScore
        // console.log(smallStraightScore)
    }

    if (isLargeStraightSaved == false){
        largeStraightScore = checkLargeStraight(currentDices)
        document.getElementById("large-straight-player1").innerHTML = largeStraightScore
        // console.log(largeStraighScore)
    }

    if (isFullHouseSaved == false){
        fullHouseScore = checkFullHouse(currentDices)
        document.getElementById("full-house-player1").innerHTML = fullHouseScore
        // console.log(fullHouseScore)
    }

    if (isYahtzeeSaved == false){
        yahtzeeScore = checkYahtzee(currentDices)
        document.getElementById("yahtzee-player1").innerHTML = yahtzeeScore
        // console.log(yahtzeeScore)
    }

    if (isChanceSaved == false){
        chanceScore = checkChance(currentDices)
        document.getElementById("chance-player1").innerHTML = chanceScore
        // console.log(chanceScore)
    }



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

    checkTotal()
        
}


// document.getElementById("roll").innerHTML = "Roll " + "(" + rollCount + ")"