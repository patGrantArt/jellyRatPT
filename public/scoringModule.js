console.log(`initialising scoring system`)

//GLOBALS - points system
// let score = 0;
// let highScores;
// const dateNow = new Date();
// let dateOfLastScoreUpdate;



//init


function loadHighScores(){
    highScores = JSON.parse(localStorage.getItem('highScores'));
    if(highScores === null){
        console.log(`no high score data available`)
        highScores = [['????',0], ['????',0], ['????',0], ['????',0], ['????',0]]
    }
}

function monthlyScoreReset(){
    console.log(`checking if monthly score reset is needed`)
    if(!dateLastVisit){
        console.log(`no previous visits on record`);
        dateLastVisit = new Date(0);
    } else {
        dateLastVisit = new Date(parseInt(dateLastVisit));
    }
    if (dateLastVisit.getMonth() !== dateNow.getMonth() || dateLastVisit.getYear() !== dateNow.getYear() ){
        console.log(`It's a new month. Resetting high scores`)
        highScores = [['????',0], ['????',0], ['????',0], ['????',0], ['????',0]];
        localStorage.setItem('lastVisit', dateNow.getTime());
    } else ( 
        console.log(`no score reset needed`)
    )
}

function refreshScore(scoreGlobal){
    scoreDisplay.innerText = scoreGlobal;
    modal_score_display.innerText = `${scoreGlobal}`;
}
function checkForHighScores(num, scoresArray){
    for(let i=0; i<scoresArray.length; i++){
        if(num > scoresArray[i][1]){
            return i;
        }
    };
    console.log(`no high scores`)
    return false
}

function saveHighScores(scoresArray){
    console.log(`saving high scores to Local Storage`);
    let s = JSON.stringify(scoresArray);

    localStorage.setItem('highScores', s);
}


//changes the leaderboard on the HS modal
function score_tempLeaderboard(position, scr, array){
    let widget = document.getElementById('modal_HS_score_widget');
    widget.innerHTML = "";
    let arrayCopy = [...array];
    arrayCopy.splice(position, 0, ['NEW!', scr],);
    arrayCopy.pop();
    document.getElementById("modal_HS_score_widget").appendChild(new_score_widget(arrayCopy, 'HS', position))   
}

function score_update_HS_Array(string, num, rank, array){
    let arrayCopy = [...array];
    arrayCopy.splice(rank, 0, [string, num],);
    arrayCopy.pop();
    return arrayCopy;
}


