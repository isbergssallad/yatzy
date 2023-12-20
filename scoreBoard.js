





//variabler som säger hur mycket krävs för att få bonus och hur mycket man får
var bonusThreshold = 63;
var bonusValue = 35;

//funktion för att räkna ihop och kollar om spelaren får ett bonus
function updateBonus(){
    const upperSectionCategories = [round.scoreCategories.ones, round.scoreCategories.twos, round.scoreCategories.threes, round.scoreCategories.fours, round.scoreCategories.fives, round.scoreCategories.sixes]

    if (upperSectionCategories.every((state) => state.saved === true)){
        for (let i = 0; i < upperSectionCategories.length; i++){
            round.upperSectionSum += upperSectionCategories[i].score;
            console.log("upper scores: " + round.upperSectionSum)
        }

        document.getElementById("sum-score").innerHTML = round.upperSectionSum;

        if (round.upperSectionSum >= bonusThreshold){
            document.getElementById("bonus-score").innerHTML = bonusValue;
            round.totalScore += bonusValue
        } else {
            document.getElementById("bonus-score").innerHTML = 0;
        }
    }
}
