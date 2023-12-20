//funktion för att räkna ihop ett värde i poängtabellen
function countDicesOfSameValue(array, value){
    var count = 0;
    for(i = 0; i < array.length; i++){
        if(array[i] == value){count+=value}
    }
    //hindrar det att visa 0 i rutan om inga 2 nollor kastas.
    if (count == 0){
        return 0;
    }
    else {
        return count;
    }
}



//funktion för triss / tre i rad
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
  
    return 0;
}

//funktion för fyra i rad
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
  
    return 0;
}


//liten stegen eller small straight funktion
function checkSmallStraight(array){
     //använder Set för att ta bort duplicata värde
    var uniqueValues = new Set(array)
    console.log("unique" + uniqueValues)
    //konverterar Set tillbaka till array för att kunna sortera och joina ihop värden
    var uniqueValuesAsArray = Array.from(uniqueValues)
    var sortedArray = uniqueValuesAsArray.sort(function(a, b) { return a - b; }).join('');
    console.log("unique sorted" + sortedArray)
    //if-sats som kollar om den liten stege finns med i sorterad arrayn
    if (sortedArray.includes("1234") || sortedArray.includes("2345") || sortedArray.includes("3456")) {
        return 30;
    } else {
        return 0;
    }
}


//stora stegen eller large straight funktion
function checkLargeStraight(array) {
    //skapa en kopia av array som heter temp
    var temp = array.slice(); 
    //sorterar temp
    var value = temp.sort(function(a, b) { return a - b; }).join('');
    //if-sats som kollar om stora stege finns i sorterade arrayn
    if (value.includes("12345") || value.includes("23456")) {
        return 40;
    } else {
        return 0;
    }
}


//full house eller kåk funktionen
function checkFullHouse(array){
    var temp = array.slice();
    //sorterar tärningar
    var value = temp.sort(function(a, b) { return a - b; }).join('');
    //en if-sats för att jämföra värden och kollar efter kåk
    if (value[0] == value[1] && value[2] == value[4] || value[0] == value[2] && value[3] == value[4]){
        return 25;
    } else {
        return 0;
    }
}


//chans eller chance funktionen
function checkChance(array) {
    let value = 0
    //räknar ihop alla tärningar
    for (let i = 0; i < array.length; i++) {
        value += array[i]
    } 
    return value;
}


//yatzy eller yahtzee funktionen
function checkYahtzee(array) {
    for (let i = 0; i < array.length; i++) {
        let count = 1;
        //räkna antalet tärningar som matchas dvs. hur många av samma tärning finns det
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] === array[j]) {
                count++;
            }
        }
        //om antalet tärningar är 5 dvs. spelaren har fått yatzy
        if (count === 5) {
            return 50;
        }
    }
    return 0;
}


//variabler som säger hur mycket krävs för att få bonus och hur mycket man får
var bonusThreshold = 63;
var bonusValue = 35;

//funktion för att räkna ihop och kollar om spelaren får ett bonus
function updateBonus(){
    const upperSectionCategories = [round.scoreCategories.ones, round.scoreCategories.twos, round.scoreCategories.threes, round.scoreCategories.fours, round.scoreCategories.fives, round.scoreCategories.sixes]

    if (upperSectionCategories.every((state) => state.saved === true)){
        for (let i = 0; i < upperSectionCategories.length; i++){
            upperSectionSum += upperSectionCategories[i].score;
            console.log("upper scores: " + upperSectionSum)
        }

        document.getElementById("sum-score").innerHTML = upperSectionSum;

        if (upperSectionSum >= bonusThreshold){
            document.getElementById("bonus-score").innerHTML = bonusValue;
            round.totalScore += bonusValue
        } else {
            document.getElementById("bonus-score").innerHTML = 0;
        }
    }
}
