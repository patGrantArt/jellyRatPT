console.log("Jelly Rat is Hungry!")

//BUG FIXES

//MVP TO DO
//Green tiled // or construction striped background for correct defuses on end game reveal
//rigorous BONUS CHECK for cleared tiles, jellies eaten, bombs defused
//bonus animation / sound / background change;


//SHARABLE PROTOTYPE
//Github project
//software map 
//Deploy to node server
//data persistence on server with mongoDB
//basic SEO

//DREAM PROTOTYPE BUILD
//test new mechanic - rat can wa
//haptics - bg 'shudder' on trap
//difficulty selection (bede lenny dad)
//three lives game system
//animated flood fill with SFX
//create pipes graphic
//animated title "Jelly Rat"
//Multiplane entry sequence
//10 levels connected by pipes
//'foyer' between game levels with ascore round-up
//escape hatch to multiplane jelly land
//'session' packet returned to server on GO (user data)

//PRODUCTION BUILD
//unique SFX
//game data tracking dashboard



//==========================================
//===== higher order functions ============
//==========================================

function letsGo(){
    console.log('initialising');
    gameData = setGameData(boxCount);
    setGridCoords(gameData, gridWidth);
    markEdges(gameData);
    setEntryExit(gameData);
    nearestNeighbours(gameData);
    trapFreeTiles = markTrapFreeTiles(gameData, ratPos, exitTileNum);
    setTraps(gameData, boxCount, trapCount);
    placeJellies(gameData);
    setGameBoard(gameBoardWidth);
    generateGrid(gameData, gridWidth, gridHeight);  
    loadHighScores();
    monthlyScoreReset();
    document.getElementById('trapsLeft').innerText = trapCount;
    modals_init();
    placeRat();
    listen(true);
       
}
function resetGame(){
    console.log(`resetting game`);
    modal_Hide();
    changeBG('reset');
    timerReset();
    score = 0;
    highScoreRank = false;
    refreshScore(score);
    defusedTraps = 0;
    document.getElementById('trapsLeft').innerText = trapCount;
    clearGameGrid();
    //reset variables specific to game instance
    gameData = undefined;
    trapLocations = [];
    ratPos = Math.ceil(Math.random() * (gridWidth - 1  - 1) + 1);
    trapFreeTiles = "";
    exitTileNum = "";
    //re-initialise the game
    console.log('initialising AGAIN');
    gameData = setGameData(boxCount);
    setGridCoords(gameData, gridWidth);
    markEdges(gameData);
    setEntryExit(gameData);
    nearestNeighbours(gameData);
    trapFreeTiles = markTrapFreeTiles(gameData, ratPos, exitTileNum);
    setTraps(gameData, boxCount, trapCount);
    placeJellies(gameData);
    setGameBoard(gameBoardWidth);
    generateGrid(gameData, gridWidth, gridHeight);
    placeRat();
    listen(true);
}
async function gameWin(){
    gameState = "win";
    timerStop(timer_ID);
    let bonus = check_All_Traps_Defused(trapCount, defusedTraps);
    if(bonus)(score += scoreBonus);
    highScoreRank = checkForHighScores(score, highScores);
    sfx.lvlComplete.play();
    pauseFor(1000);
    if(highScoreRank === false){
        modal_Show();
        return
    }

    modal_Show_HS(highScoreRank);
    
}
function enterAnalysis(bool){ 
    
    if(bool){
        gameState = "analysis";
        console.log(`entering analysis`);
        modal_Hide();
        listen(true);
        analysisMode = true;
    }
    if(!bool){
        gameState = "paused";
        console.log(`leaving analysis`);
        analysisMode = false;
        listen(false);
        modal_Show();
    }    
}
function escapePressed(){
    console.log("escape is pressed let's go to the modal");
    if(analysisMode){
        enterAnalysis(false);
        modal_Show();
    }
}
function submitHighScore(){
    if(highScoreRank === false){
        console.error(`submitted high score not valid`);
    }
    console.log(`submitting high score`);
    let string = document.getElementById('modal_HS_input').value;
    if(string === ""){string = "ANON"};
    highScores = score_update_HS_Array(string, score, highScoreRank, highScores);
    saveHighScores(highScores);
    modal_hide_HS();
    modal_Show();
} 
async function gameLose(){
    timerStop(timer_ID)
    sfx.trapHit.play();
    changeBG('red');
    showErrors();
    clearTrapCovers(trapLocations);
    highScoreRank = checkForHighScores(score, highScores);
    await pauseFor(1500);
    listen(false);
    if(highScoreRank === false){
        modal_Show();
        return
    }
    modal_Show_HS(highScoreRank);    
}



function moveRatTo(num, direction){
    thisTile = getTileByNum(num);
    if (thisTile.visited || thisTile.jelly < 1){sfx.move.play();}
    turnRat(direction)
    ratPos = num;
    let pos = getTopAndLeft(num);
    let rat = document.getElementById('rat');
    rat.style.top = pos[0];
    rat.style.left = pos[1];
    clearTileCover(num);
    updateBgPosition(bg_Y_Offset);
}

function placeRat(){
    let rat = document.createElement("div");
    rat.id = "rat";
    rat.classList = "graphic";
    let pos = getTileElemByNum(ratPos);
    rat.style.top = pos.style.top;
    rat.style.left = pos.style.left;
    rat.style.width = `${oneMove}px`;
    rat.style.height = `${oneMove}px`;
    rat.style.backgroundPosition = graphicsGetBGpos('rd');
    document.getElementById('mainBox').appendChild(rat);
    //clearTileCover(ratPos); 
    revealNeighboursOf(getTileByNum(ratPos));
    
}
function turnRat(d){
    //console.log(`turning rat ${d}`);
    let r = document.getElementById('rat');
    let x;
    if (d === "Right"){x = 'rr'};
    if (d === "Left"){x = 'rl'};
    if (d === "Up"){x = 'ru'};
    if (d === "Down"){x = 'rd'};
    //console.log(`using sprite sheet ref: ${x}`);
    r.style.backgroundPosition = graphicsGetBGpos(x);
}
//returns an array of standardised object to represent tiles on the game grid
function setGameData(num){
    console.log(`setting game data`);
    let thisArr = new Array;
    for(let i = 1; i<=num; i++){
        let thisObj = new Object;
        thisObj.tileNum = i;
        thisObj.revealed = false;
        thisObj.trap = false;
        thisObj.edge = false;
        thisObj.defused = false;
        thisObj.visited = false;
        thisObj.exit = false;
        thisObj.entry = false;
        thisArr.push(thisObj)
    }
    console.log(`returning game data:`)
    //console.log(thisArr);
    return thisArr;
}
//adds grid co-orddinates to the game data
function setGridCoords(array, gridWidth){
    console.log(`setting game grid`);
    let incRow = 1;
    let incCol = 1;
    array.forEach(obj => {
        obj.colPos = incCol;
        incCol++
        if(incCol > gridWidth) {incCol = 1}; 
        obj.rowPos = incRow;  
        if(obj.tileNum%gridWidth === 0) {incRow++}; 
    });
}
//add

function markEdges(tilesArray){
    console.log(`marking edges`);
    //console.log(tilesArray)
    tilesArray.forEach(tile => {
        if(tile.rowPos === 1){tile.edge = 'blank'; return};
        if(tile.rowPos === gridHeight){tile.edge = 'blank'; return};
        if(tile.colPos === 1 && tile.rowPos === 2){tile.edge = 'etl'; return};
        if(tile.colPos === gridWidth && tile.rowPos === 2){tile.edge = 'etr'; return};
        if(tile.colPos === 1 && tile.rowPos === gridHeight-1){tile.edge = 'ebl'; return};
        if(tile.colPos === gridWidth && tile.rowPos === gridHeight-1){tile.edge = 'ebr'; return};
        if(tile.rowPos === 2){tile.edge = "et"; return};
        if(tile.rowPos === gridHeight-1){tile.edge = "eb"; return};
        if(tile.colPos === 1){tile.edge = "el"; return};
        if(tile.colPos === gridWidth){tile.edge = "er"; return};

        tile.edge = false;
        return
    })
    tilesArray.forEach(tile => {
        if(tile.edge){tile.revealed = true};
    });
  

}
function setEntryExit(tilesArray){
    //console.log(`setting entry and exit`);
    //set entry at ratpos
    //console.log(`setting pipe tile at ${ratPos}`);
    let t = getTileByNum(ratPos);
    t.edge = "blank";
    t.pipe = true;

    //console.log(`setting entry tile a ${ratPos+gridWidth}`);
    let e = getTileByNum(ratPos+gridWidth);
    e.entry = true;
    e.edge = false;

    
    //set exit
    //console.log(`setting exit`)
    let ll = boxCount - (gridWidth*2) + 3;
    let ul = boxCount - gridWidth - 2;
    exitTileNum = getRandomInt(ll, ul);
    //console.log(`exit tile is ${exitTileNum}`);
    x = getTileByNum(exitTileNum)
    //console.log(x);
    x.edge = false;
    x.exit = true;      
  
    let px = getTileByNum(exitTileNum+gridWidth);
    px.edge = 'blank';
    px.pipe = true;
}

function markTrapFreeTiles(tilesArray, en, ex){
    //isolate arrival and exit points
    let landingTile = en+(gridWidth*2);
    let leavingTile = ex-gridWidth;
    console.log(`marking trap free tiles around tile ${landingTile} and tile ${leavingTile}`);
    //create array from neighbours
    let nbr1 = getTileByNum(landingTile).neighbours;
    nbr1.push(landingTile);
    nbr1.push(leavingTile);
    let nbr2 = getTileByNum(leavingTile).neighbours;
    //combine arrays and remove any duplicates with SET
    let thisArray = nbr1.concat(nbr2);
    for(let i=0; i<tilesArray.length; i++){
        if(!gameData[i].edge){continue };
        if(gameData[i].edge === "et"){
            thisArray.push(gameData[i].tileNum + gridWidth);
        }
        if(gameData[i].edge === "el"){
            thisArray.push(gameData[i].tileNum + 1);
        }
        if(gameData[i].edge === "er"){
            thisArray.push(gameData[i].tileNum - 1);
        }
        if(gameData[i].edge === "eb"){
            thisArray.push(gameData[i].tileNum - gridWidth);
        }
    };
    thisSet = new Set(thisArray);
    thisArray = Array.from(thisSet);
    return thisArray;
}
function setTraps(tilesArray, boxesNum, trapsNum){
    if(trapsNum >= boxCount){
        console.log("too many traps... check globals... Auto resetting trapcount to avoid game break")
        trapCount = Math.floor(boxCount/6);
        trapsNum = trapCount;
    }
    let inc = trapsNum;
    while(inc > 0){
        //console.log(`looping ${inc}`)
        let randomIndex = (Math.floor(Math.random()*(boxesNum-1)));
        let o=tilesArray[randomIndex]
        if(tilesArray[randomIndex].trap){continue};
        if(tilesArray[randomIndex].entry || tilesArray[randomIndex].exit){continue};
        if(tilesArray[randomIndex].edge !== false){continue};
        if(trapFreeTiles.includes(randomIndex+1)){continue};
        inc--;
        tilesArray[randomIndex].trap = true;
        trapLocations.push({trapNum:randomIndex+1, madeSafe:false});
    };   
}
function nearestNeighbours(gameDataArray){
    console.log(`finding neighbours`);
    gameDataArray.forEach(obj=>{
        //console.log(`looping tile ${obj.tileNum}`);
        let result = [];
        let num = obj.tileNum;
        if(obj.colPos > 1){result.push(num-1)}
        if(obj.colPos < gridWidth){result.push(num+1)}
        if(obj.rowPos > 1){
            let theOneAbove = num-gridWidth;
            //console.log(`the one above is ${theOneAbove}`);
            result.push(theOneAbove);
            if(obj.colPos > 1){result.push(theOneAbove-1)};
            if(obj.colPos < gridWidth){result.push(theOneAbove+1)}
        }
        if(obj.rowPos < gridHeight){
            let theOneBelow = num+gridWidth;
            //console.log(`the one below is ${theOneBelow}`)
            result.push(theOneBelow);
            if(obj.colPos > 1){result.push(theOneBelow-1)};
            if(obj.colPos < gridWidth){result.push(theOneBelow+1)}
        }
        result = result.sort(function(a, b){return a-b});
        obj.neighbours = result;
    });
}
function placeJellies(gameDataArray){
    console.log(`placing jellies`)
    for(let i=0; i<gameDataArray.length; i++){
        let tile = gameDataArray[i];
        if(tile.trap){continue};
        if(tile.entry || tile.exit){continue};
        if(tile.edge !== false){continue};
        let trapInc = 0;
        for(let i = 0; i<tile.neighbours.length; i++){
            //console.log(`checking neighbour ${tile.neighbours[i]}`)
            //console.log(`trap? `)
            let thisNbr = getTileByNum(tile.neighbours[i]);
            if (thisNbr.trap === true){
                //console.log(`this one is a trap`);
                trapInc++;
            }
        };
        if(!gameDataArray[i].trap){gameDataArray[i].jelly = trapInc;}
    };
}
function eatJelly(o){
    if(o.jelly === 1 || o.jelly === 2){
        sfx.jelly2.play();
        score+=o.jelly;
    };
    if(o.jelly >= 3 && o.jelly <= 5){
        sfx.jelly3.play();
        score+=o.jelly;
    };
    if(o.jelly > 5){
        sfx.jelly4.play();
        score+=o.jelly;
    };
    refreshScore(score);
    let e = document.getElementById(`jelly-${o.tileNum}`);
    e.style.backgroundPositionY = `-${effective_tileWidth*1}px`;
    
}
function generateGrid(gameDataArray, columns, rows){
    console.log(`gererating grid`)
    //console.log(gameDataArray);
    let mainBox = document.getElementById("mainBox");
    for(let index=0; index<gameDataArray.length; index++){
        mainBox.appendChild(newBoxElement(gameDataArray[index]));
        
        if(!gameDataArray[index].edge
            && !gameDataArray[index].entry
            && !gameDataArray[index].exit
        ){
            mainBox.appendChild(newJellyElement(gameDataArray[index]));
            mainBox.appendChild(newCoverElement(gameDataArray[index]));    
        }
        if(gameDataArray[index].exit || gameDataArray[index].entry){
            mainBox.appendChild(newCoverElement(gameDataArray[index]));    
        }

    }
}
function clearGameGrid(){
    console.log(`clearing game grid`);
    let e = document.getElementById('mainBox');
    e.innerHTML = "";
}
function newBoxElement(tile){
    //console.log(tile);
    let thisElem = document.createElement('div');
    thisElem.classList = `box graphic`;
    thisElem.id = `box-${tile.tileNum}`;
    thisElem.setAttribute("data-col", tile.colPos);
    thisElem.setAttribute("data-row", tile.rowPos);
    thisElem.setAttribute("data-jelly", tile.jelly);
    thisElem.style.width = `${effective_tileWidth}px`;
    thisElem.style.height = `${effective_tileWidth}px`;
    if (tile.edge !== false){
        thisElem.style.backgroundPosition = graphicsGetBGpos(tile.edge);
    };
    if (tile.trap){
        thisElem.style.backgroundPosition = graphicsGetBGpos('t5');
    };
    if(!tile.edge && !tile.trap){
        let thisRando = Math.ceil(Math.random() * 8);
        //console.log(`this rando is ${thisRando}`)
        thisElem.style.backgroundPosition = graphicsGetBGpos(`b${thisRando}`);
    }
    if(tile.entry){
        thisElem.style.backgroundPosition = graphicsGetBGpos('h4');
    } 
    if(tile.exit){
        thisElem.style.backgroundPosition = graphicsGetBGpos('h1');
    }

    thisElem.style.left = `${effective_tileWidth*(tile.colPos-1)}px`;
    thisElem.style.top = `${effective_tileWidth*(tile.rowPos-1)}px`;
    return thisElem
};
function newJellyElement(tile){
    //console.log(tile);
    let thisElem = document.createElement('div');
    if(tile.trap){thisElem.classList = "box trap graphic"}
    else{thisElem.classList = `jelly${tile.jelly} graphic`};
    thisElem.id = `jelly-${tile.tileNum}`;
    thisElem.style.position = "absolute";
    thisElem.style.width = `${effective_tileWidth}px`;
    thisElem.style.height = `${effective_tileWidth}px`;
    thisElem.style.left = `${effective_tileWidth*(tile.colPos-1)}px`;
    thisElem.style.top = `${effective_tileWidth*(tile.rowPos-1)}px`;
    return thisElem
};
function newCoverElement(tile){
    //console.log(tile);
    let thisElem = document.createElement('div');
    thisElem.classList = `cover graphic see`;
    thisElem.id = `cover-${tile.tileNum}`;
    thisElem.setAttribute("data-col", tile.colPos);
    thisElem.setAttribute("data-row", tile.rowPos);
    thisElem.setAttribute("data-jelly", tile.jelly);
    thisElem.style.width = `${effective_tileWidth}px`;
    thisElem.style.height = `${effective_tileWidth}px`;
    thisElem.style.left = `${effective_tileWidth*(tile.colPos-1)}px`;
    thisElem.style.top = `${effective_tileWidth*(tile.rowPos-1)}px`;
    if (tile.exit) {
        thisElem.classList.replace('cantSee', 'see');
        thisElem.style.backgroundPosition = graphicsGetBGpos('h2');
    }
    if (tile.entry) {
        thisElem.classList.replace('cantSee', 'see');
        thisElem.style.backgroundPosition = graphicsGetBGpos('h3');
    }
    return thisElem;
};
function clearTileCover(num){
    //console.log(`clearing tile cover ${num}`)
    let tileObj = getTileByNum(num);
    if(tileObj.edge || tileObj.revealed){return};
    tileObj.revealed = true;
    let cvr = document.getElementById(`cover-${num}`);
    cvr.classList.replace(`see`, 'cantSee')
};
function setGameBoard(width){
    console.log(`setting game board`);
    viewPortHeight = document.body.offsetHeight;
    bg_Y_Offset = Math.floor(viewPortHeight / 5 * 2);    
    let mainBox = document.getElementById('mainBox');
    mainBox.style.width = `${width}px`;
    //mainBox.style.height = `${width}px`;
    mainBox.style.top = bg_Y_Offset+"px";
}
// returns an object from an array of objects by a uniqueID
function getTileByNum(number){
    let theRightTile = gameData.find((tile)=>tile.tileNum === number);
    if(!theRightTile){
        console.error(`your function: getTileByNum() is broken. Couldn't find the tile in game Data`)
    };
    return theRightTile;
}
function getTileElemByNum(number){
    return document.getElementById(`box-${number}`);
}
//returns array of a tiles relative position by given number [style.top, style.left]
function getTopAndLeft(tileNumber){
    let tile = document.getElementById(`box-${ratPos}`);
    return [tile.style.top, tile.style.left]

}
function blockTile(num, bool){
    let thisTile = document.getElementById(`box-${num}`);
    let classList = thisTile.classList.value;
    let classArray = classList.split(" ");
    if(bool){
        console.log(`blocking tile ${num}`);
        let filtered = classArray.filter(string => string.includes('jelly'))
        console.log(filtered);
        thisTile.classList.replace(filtered[0], 'blocked');
    }
    if(!bool){
        console.log(`un-blocking tile ${num}`);
        let filtered = classArray.filter(string => string.includes('blocked'))
        console.log(filtered);
        let jellyNum = thisTile.getAttribute('data-jelly')
        console.log(`jellyNum is ${jellyNum}`)
        thisTile.classList.replace(filtered[0], `jelly${jellyNum}`);
    }

}
//this function recieves a tile obj and checks whether the tile with that number has all of its adjacebnt tiles revealed. returning boolean.
function areNbrsRevealed(t){
    let thisArray = t.neighbours.filter(n => {
        let tile = getTileByNum(n);
        //console.log(tile.revealed);
        if(tile.revealed){return false};
        return true;
    });
    if(thisArray.length === 0){return true};
    return false;
}
//reveals neighbouring tiles and then recursively reveals adjacent 0 tiles
async function revealNeighboursOf(tileObj){
        let arrA = []
        tileObj.neighbours.forEach(nbr =>{
            let o = getTileByNum(nbr);
            if (o.revealed === false){
                arrA.push(o);
            }
        });
        arrA.forEach(obj => {
            clearTileCover(obj.tileNum);
            obj.revealed = true;
        })
        let arrB = arrA.filter(obj => {
            if(obj.jelly === 0){return true};
            return false;
        });
        if(arrB.length === 0){return};
        arrB.forEach(obj => {
            revealNeighboursOf(obj);
        })    
}
//updates the position of background on up down move
function updateBgPosition(new_Y_Offset){
    document.getElementById('mainBox').style.top = new_Y_Offset+"px";
}
//recieves a tile number and returns the number of neighbouring tiles that are still obscured.
function hiddenNeighbours(tileNum){
    return getTileByNum(tileNum).neighbours
        .filter(nbr => getTileByNum(nbr).revealed?false:true)
        .length;
};
function defuseTrap(dir){
    let targetTile;
    if(dir === "Right" && ratPos%gridWidth !== 0){
        targetTile = ratPos+1;
    }
    if(dir === "Left" && ratPos%gridWidth !== 1){
        targetTile = ratPos-1;
    }
    if(dir === "Down" && ratPos<=(boxCount-gridWidth)){
        targetTile = ratPos + gridWidth;
    }
    if(dir === "Up" && ratPos > gridWidth){
        targetTile = ratPos - gridWidth;
    }
    let o = getTileByNum(targetTile);
    let c = document.getElementById(`cover-${targetTile}`)

    if(o.revealed || o.edge){
        sfx.bump.play(); 
        return
    };
    if(o.defused){
        o.defused = false;
        defusedTraps--;
        document.getElementById("trapsLeft").innerText = trapCount - defusedTraps;
        c.classList.replace('defused', 'cover');
        sfx.defused.play();
        return
    }
    defusedTraps++;
    o.defused = true;
    c.classList.replace('cover', 'defused');
    sfx.defused.play();
    let trapsRemaining = trapCount - defusedTraps;
    document.getElementById("trapsLeft").innerText = trapsRemaining;
    if(trapsRemaining === 0){
        sfx.gameStart.play();
        changeBG("green");
        console.log("BONUS!");
        console.log("====== BONUS!");
        console.log("============= BONUS!");
    }
    return
}


function showErrors(){
    //show defusing mistakes
    let mistakeTiles =  gameData.filter(tile => {
        if(tile.defused && !tile.trap){return true};
    })
    mistakeTiles.forEach(tile => {
        let e = getTileElemByNum(tile.tileNum);
        e.style.backgroundPosition = graphicsGetBGpos('t4');
        document.getElementById(`jelly-${tile.tileNum}`).classList.add('cantSee');
        clearTileCover(tile.tileNum);
    })
    //show correct defuses
    let correctTiles =  gameData.filter(tile => {
        if(tile.defused && tile.trap){return true};
    })
    correctTiles.forEach(tile => {
        let e = getTileElemByNum(tile.tileNum);
        e.style.backgroundPosition = graphicsGetBGpos('t6');
        clearTileCover(tile.tileNum);
    })
}




// recives a tile number an returns the number of traps adjacent.
function neighbourTraps(tileNum){
    return getTileByNum(tileNum).neighbours
        .filter(nbr=>getTileByNum(nbr).trap?true:false)
        .length;
}
//pause the code for a given number of ms (arg) - only work inside an async function
function pauseFor(aLilBit) {
    return new Promise(resolve => setTimeout(resolve, aLilBit));
}

function changeBG(colour){
    if (colour === "red"){document.body.style.backgroundColor = "red"};
    if (colour === "green"){document.body.style.backgroundColor = "green"};
    if (colour === "reset"){document.body.style.backgroundColor = ""};

}
function clearTrapCovers(locationsArray){
    locationsArray.forEach((tile)=> {
        clearTileCover(tile.trapNum);
    })
}
function isTileRevealed(obj){
    obj.revealed? true: false;
}
function check_All_Traps_Defused(traps, defusedTraps){
    if(traps === defusedTraps){
        console.log(`tile cleared bonus`);
        return true
    }
    if(traps > defusedTraps){
        console.log(`no bonus... WIMP!`);
        return false
    }
    if(traps < defusedTraps){
        console.error(`somethign wrong with check_all_traps_defused() check`)
    }
};
// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
// change the value of an input to upper case on input
function inputToUpperCase(e){
    e.target.value = e.target.value.toUpperCase();
}
