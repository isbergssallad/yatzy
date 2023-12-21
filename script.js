class GameState{
    //metod? funktion som körs när man skapar en ny instans
    //.this
    constructor(){
        //spelrundan avslutas
        this.ended = false;
        this.totalScore = 0;

        this.currentDices = Array(5).fill(0)

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

        //en array för att visa tärningars state
        this.savedDices = Array(5).fill(false);

        //variabel för antalet tärningskast
        this.rolls = 3;

        //upper section i yatzy är alla från ettor till sexor. dessa variabler håller reda på de poängen och summa av de.
        this.upperSectionSum = 0;

        //variabler som säger hur mycket krävs för att få bonus och hur mycket man får
        this.bonusThreshold = 63;
        this.bonusValue = 35;

        //variabel för att kolla om spelaren har valt en cell
        this.didPlayerCheckCell = false;

        //instruktion vid spelets start
        document.getElementById("instructions").innerHTML = "Start the game by clicking 'ROLL'"

    }

    //funktion för att räkna ihop poäng av samma tärning, ex tre 1:or
    countDicesOfSameValue(value){
        var count = 0;
        for(let i = 0; i < this.currentDices.length; i++){
            if(this.currentDices[i] == value){count+=value}
        }
        //ge 0 poäng om inga tärning av det "value" kastas
        if (count == 0){
            return 0;
        }
        else {
            return count;
        }
    }

    //funktion för triss / tre i rad
    checkThreeOfAKind() {
        for (let i = 0; i < this.currentDices.length; i++) {
            let count = 1;
    
            for (let j = i + 1; j < this.currentDices.length; j++) {
                if (this.currentDices[i] === this.currentDices[j]) {
                    count++;
            
                    if (count === 3) {
                        return 12;
                    }
                }
            }
        }
        return 0;
    }

    //metod för att räkna fyra i rad
    checkFourOfAKind() {
        for (let i = 0; i < this.currentDices.length; i++) {
            let count = 1;
        
            for (let j = i + 1; j < this.currentDices.length; j++) {
                if (this.currentDices[i] === this.currentDices[j]) {
                    count++;
            
                    if (count === 4) {
                        return 27;
                    }
                }
            }
        }
        return 0;
    }


    //metod för att räkna full house eller kåk
    checkFullHouse(){
        //skapar en kopia av tärningen
        var temp = this.currentDices.slice();
        //sorterar tärningar
        var value = temp.sort(function(a, b) { return a - b; }).join('');
        //en if-sats för att jämföra värden och kollar efter kåk
        if (value[0] == value[1] && value[2] == value[4] || value[0] == value[2] && value[3] == value[4]){
            return 25;
        } else {
            return 0;
        }
    }


    //metod för att räkna liten stegen eller small straight
    checkSmallStraight(){
        //använder Set för att ta bort duplicata värde
        var uniqueValues = new Set(this.currentDices)
        //konverterar Set tillbaka till array för att kunna sortera och joina ihop värden
        var uniqueValuesAsArray = Array.from(uniqueValues)
        var sortedArray = uniqueValuesAsArray.sort(function(a, b) { return a - b; }).join('');
        //if-sats som kollar om den liten stege finns med i sorterad arrayn
        if (sortedArray.includes("1234") || sortedArray.includes("2345") || sortedArray.includes("3456")) {
            return 30;
        } else {
            return 0;
        }
    }

    //metod för att räkna ut stora stegen eller large straight
    checkLargeStraight() {
        //skapa en kopia av array som heter temp
        var temp = this.currentDices.slice(); 
        //sorterar temp
        var value = temp.sort(function(a, b) { return a - b; }).join('');
        //if-sats som kollar om stora stege finns i sorterade arrayn
        if (value.includes("12345") || value.includes("23456")) {
            return 40;
        } else {
            return 0;
        }
    }

    //metod för att räkna ut chans eller chance
    checkChance() {
        let value = 0
        //räknar ihop alla tärningar
        for (let i = 0; i < this.currentDices.length; i++) {
            value += this.currentDices[i]
        } 
        return value;
    }

    //metod för att räkna ut yatzy eller yahtzee
    checkYahtzee() {
        for (let i = 0; i < this.currentDices.length; i++) {
            let count = 1;
            //räkna antalet tärningar som matchas dvs. hur många av samma tärning finns det
            for (let j = i + 1; j < this.currentDices.length; j++) {
                if (this.currentDices[i] === this.currentDices[j]) {
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

    //metod för att räkna ihop och kollar om spelaren får ett bonus
    updateBonus(){
        const upperSectionCategories = [round.scoreCategories.ones, round.scoreCategories.twos, round.scoreCategories.threes, round.scoreCategories.fours, round.scoreCategories.fives, round.scoreCategories.sixes]

        if (upperSectionCategories.every((state) => state.saved === true)){
            for (let i = 0; i < upperSectionCategories.length; i++){
                round.upperSectionSum += upperSectionCategories[i].score;
                console.log("upper scores: " + round.upperSectionSum)
            }

            document.getElementById("sum-score").innerHTML = round.upperSectionSum;

            if (round.upperSectionSum >= round.bonusThreshold){
                document.getElementById("bonus-score").innerHTML = round.bonusValue;
                round.totalScore += round.bonusValue
            } else {
                document.getElementById("bonus-score").innerHTML = 0;
            }
        }
    }


}




//starta en ny runda av spelet
var round = new GameState();


//variabel för gråa färgen när en ruta sparas på poängtabellen.
const savedColor = "rgb(181, 181, 181)"; 




//funktion för vad som händer när en "kategori" klickas, tar in ett elementId, poängen, och ett kategori
function handleCategoryClick (elementId, score, category){
    if (round.didPlayerCheckCell == false && round.rolls < 3){
        if (round.scoreCategories[category].saved == false){
             //sätter det kategoriet till "true"
             round.scoreCategories[category].saved = true;

            document.getElementById(elementId).style.backgroundColor = savedColor;

            //kör metoden updateBonus() funktion om kategorin matchar, förhindrar funktionen från att köras vid fel kategorier.
            const upperSectionCategories = ["ones", "twos", "threes", "fours", "fives", "sixes"];
            if (upperSectionCategories.includes(category)){
                round.updateBonus();
            }


            //if-sats för att visa 0 istället för tom sträng
            if (score == 0){
                document.getElementById(elementId).innerHTML = score;
            }
            
            //lägger score till i totala poängen
            round.totalScore += score;
            

            //gör variabel till det motsatta
            round.didPlayerCheckCell = !round.didPlayerCheckCell;


            //object.values ger en array av alla värden för ett objekt
            //om varje kategori har valt
            if (Object.values(round.scoreCategories).every((value) => value.saved === true)) {
                round.ended = true;
                document.getElementById("total-score").innerHTML = round.totalScore;
                gameOver();
            }
        }
    }
}



//funktion när spelet är över
function gameOver(){
    //stänger av roll knappen
    document.getElementById("roll").disabled = true; //stänger av roll knappen
    
    document.getElementById("instructions").innerHTML = "You got a total of " + round.totalScore + " points. <br /> Type your username in the field below.";

    //input field för användarnamn
    var usernameInputField = document.createElement("input");

    //input field egenskaper
    usernameInputField.setAttribute('type', 'text');
    usernameInputField.setAttribute('placeholder', 'Type Username'); 

    //submit knapp för input field
    var highscoreSubmitButton = document.createElement("button");
    highscoreSubmitButton.textContent = "Enter";

    //egenskaper för knappen
    highscoreSubmitButton.onclick = function(){
        //gör en variabel för att "spara" username som spelaren skriver in
        saveHighscore(usernameInputField.value);
        document.location.reload();
    }

    //div för att sätta de ihop
    var container = document.createElement("div");


    //skapar klass namn för att kunna ändra css
    usernameInputField.className = "username-input-field";
    highscoreSubmitButton.className = "btn";
    container.className = "username-input"
    

    container.appendChild(usernameInputField);
    container.appendChild(highscoreSubmitButton);

    document.getElementById("play-area").appendChild(container)
}





//ettor
document.getElementById("ones-score").onclick = function(){
    handleCategoryClick("ones-score", round.scoreCategories.ones.score, "ones");
}


//tvåor
document.getElementById("twos-score").onclick = function(){
    handleCategoryClick("twos-score", round.scoreCategories.twos.score, "twos");
}

//treor
document.getElementById("threes-score").onclick = function(){
    handleCategoryClick("threes-score", round.scoreCategories.threes.score, "threes");
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


//funktion för att visa poäng på poängtabellen när cellen är inte sparat
function displayScore(scoreCategory) {
    if (scoreCategory.saved == false && scoreCategory.score == 0){
        return "";
    }
    return scoreCategory.score;
}



//funktion för att visa instruktion till spelaren.
function playerInstructions(){
    if (round.rolls > 0){
        document.getElementById("instructions").innerHTML = "You have " + round.rolls + " rolls remaining.";
    } else {
        document.getElementById("instructions").innerHTML = "Select a cell on the scoreboard.";
    }
}


document.getElementById("roll").onclick = function() {
    //får bara kasta tärningar om antalet kast är större än 0 och spelaren inte valt en poäng cell.
    if (round.rolls > 0 && round.didPlayerCheckCell == false){
        rollDice(0);
        rollDice(1);
        rollDice(2);
        rollDice(3);
        rollDice(4);


        console.log(round.savedDices)
        console.log("round.currentDices: " + round.currentDices)


        if (round.scoreCategories.ones.saved == false) {
            round.scoreCategories.ones.score = round.countDicesOfSameValue(1);
            document.getElementById("ones-score").innerHTML = displayScore(round.scoreCategories.ones);
            // console.log(onesScore)
        }


        if (round.scoreCategories.twos.saved == false) {
            round.scoreCategories.twos.score = round.countDicesOfSameValue(2);
            document.getElementById("twos-score").innerHTML = displayScore(round.scoreCategories.twos);
            // console.log(twosScore)
        }

        if (round.scoreCategories.threes.saved == false){
            round.scoreCategories.threes.score = round.countDicesOfSameValue(3);
            document.getElementById("threes-score").innerHTML = displayScore(round.scoreCategories.threes);
            // console .log(threesScore)
        }

        if (round.scoreCategories.fours.saved == false){
            round.scoreCategories.fours.score = round.countDicesOfSameValue(4);
            document.getElementById("fours-score").innerHTML = displayScore(round.scoreCategories.fours);
            // console.log(foursScore)
        }

        if (round.scoreCategories.fives.saved == false){
            round.scoreCategories.fives.score = round.countDicesOfSameValue(5);
            document.getElementById("fives-score").innerHTML = displayScore(round.scoreCategories.fives);
            // console.log(fivesScore)
        }


        if (round.scoreCategories.sixes.saved == false){
            round.scoreCategories.sixes.score = round.countDicesOfSameValue(6);
            document.getElementById("sixes-score").innerHTML = displayScore(round.scoreCategories.sixes);
            // console.log(sixesScore)
        }

        if (round.scoreCategories.threeOfAKind.saved == false){
            round.scoreCategories.threeOfAKind.score = round.checkThreeOfAKind();
            document.getElementById("three-of-kind-score").innerHTML = displayScore(round.scoreCategories.threeOfAKind);
            // console.log(threeOfAKindScore)
        }

        if (round.scoreCategories.fourOfAKind.saved == false){
            round.scoreCategories.fourOfAKind.score = round.checkFourOfAKind();
            document.getElementById("four-of-kind-score").innerHTML = displayScore(round.scoreCategories.fourOfAKind);
            // console.log(fourOfAKindScore)
        }

        if (round.scoreCategories.fullHouse.saved == false){
            round.scoreCategories.fullHouse.score = round.checkFullHouse();
            document.getElementById("full-house-score").innerHTML = displayScore(round.scoreCategories.fullHouse);
        }

        if (round.scoreCategories.smallStraight.saved == false){
            round.scoreCategories.smallStraight.score = round.checkSmallStraight();
            document.getElementById("small-straight-score").innerHTML = displayScore(round.scoreCategories.smallStraight);
            // console.log(smallStraightScore)
        }

        if (round.scoreCategories.largeStraight.saved == false){
            round.scoreCategories.largeStraight.score = round.checkLargeStraight();
            document.getElementById("large-straight-score").innerHTML = displayScore(round.scoreCategories.largeStraight);
            // console.log(largeStraighScore)
        }

        if (round.scoreCategories.chance.saved == false){
            round.scoreCategories.chance.score = round.checkChance();
            document.getElementById("chance-score").innerHTML = displayScore(round.scoreCategories.chance);
        }

        if (round.scoreCategories.yahtzee.saved == false){
            round.scoreCategories.yahtzee.score = round.checkYahtzee();
            document.getElementById("yahtzee-score").innerHTML = displayScore(round.scoreCategories.yahtzee);
        }


        //tärningarna onclick
        document.getElementById("die-1").onclick = function () {
            handleDiceClick(0);
            console.log(round.currentDices)
        };

        document.getElementById("die-2").onclick = function () {
            handleDiceClick(1);
            console.log(round.currentDices)
        };

        document.getElementById("die-3").onclick = function () {
            handleDiceClick(2);
            console.log(round.currentDices)
        };

        document.getElementById("die-4").onclick = function () {
            handleDiceClick(3);
            console.log(round.currentDices)
        };

        document.getElementById("die-5").onclick = function () {
            handleDiceClick(4);
            console.log(round.currentDices)
        };

        //Minskar antalet tärningskast
        round.rolls--;

        playerInstructions();
        
    } else {
        //spelaren måste välja en cell innan de får rulla igen
        if (round.didPlayerCheckCell){
            round.rolls = 3;
            diceSaveReset(); 
            round.didPlayerCheckCell = false;
            document.getElementById("roll").click();
        }
    }
}
