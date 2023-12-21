//funktion för att skapa cellen i highscore tabellen.
function createHighscoreCells(){
    var table = document.getElementById("highscore-table");

    //loopar 20 gånger för att skapa 20 celler
    for (let i = 0; i < 20; i++){
        var row = document.createElement("tr");
        var cellTitle = document.createElement("th");
        var cellData = document.createElement("td");


        cellTitle.setAttribute("id", ("username-" + (i + 1)));
        cellTitle.innerHTML = (i + 1) + "."
        cellData.setAttribute("id", ("highscore-" + (i + 1)));

        row.appendChild(cellTitle);
        row.appendChild(cellData);
        table.appendChild(row);
    }
}

//körs när sidan laddas
createHighscoreCells();





//hämtar tidigare highscore från localStorage och konverterar/parse till ett javascript objekt *dokumentation
var previousHighscoreBoard = JSON.parse(localStorage.getItem("highscores"));
var highscoreBoard = previousHighscoreBoard;

//om highscoreBoard är null, vilket betyder att spelaren har inte sparat några poäng ännu
if (!highscoreBoard){
    highscoreBoard = []
}

//sparar highscoreBoard som JSON-sträng till localStorage, eftersom localStorage bara kan innehålla strängar
localStorage.setItem('highscores', JSON.stringify(highscoreBoard));


//funktion för att visa highscore
function displayHighscores(){
    //loopar genom highscoreBoard och visar användarnamn och poäng
    for (let i = 0; i < highscoreBoard.length; i++) {
        var entry = highscoreBoard[i];
        var [username, score] = entry.split(' - ');

        document.getElementById("username-" + (i + 1)).textContent = ( i + 1 ) + ". " + username;
        document.getElementById("highscore-" + (i + 1)).innerHTML = score;
    }
}



//funktion för att spara highscore
function saveHighscore(username) {
    //skapar en ny highscore "entry" med användarnamn och poäng
    var newHighscore = username + " - " + round.totalScore;

    //lägger till den nya highscore
    highscoreBoard.push(newHighscore);

    //sorteringsfunktion på highscoreBoard, från högst till lägst
    highscoreBoard.sort((entry1, entry2) => {
        var score1 = parseInt(entry1.split(' - ')[1]);
        var score2 = parseInt(entry2.split(' - ')[1]);
        return score2 - score1;
    });

    //behåll de 20 högsta highscores
    highscoreBoard = highscoreBoard.slice(0, 20);

    //uppdatera localstorage med den nya highscore lista, konvertera till strängar
    localStorage.setItem('highscores', JSON.stringify(highscoreBoard));

    //kör funktionen för att visa den nya highscore om inom top 20 i HTML
    displayHighscores();
}


displayHighscores();