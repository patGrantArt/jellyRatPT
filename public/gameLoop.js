 
async function gameLoop(key, shiftBool){
     
    let dir = key.replace('Arrow','');

    if(shiftBool){defuseTrap(dir); return}
    
    //id target square
    let p = ratPos;
    if(dir === "Right" && p%gridWidth !== 0){p++;}
    if(dir === "Left" && p%gridWidth !== 1){p--;}
    if(dir === "Down" && p<=(boxCount-gridWidth)){
        p+= gridWidth;
        bg_Y_Offset-=oneMove;
    }
    if(dir === "Up" && p > gridWidth){
        p-= gridWidth;
        bg_Y_Offset+=oneMove;
    }
    let thisTile = getTileByNum(p);
    
    //no move scenarios
    if (thisTile.edge || thisTile.defused){
        sfx.bump.play()
        return
    }
    //analysis mode scenario
    if(gameState === 'analysis'){
        updateBgPosition(bg_Y_Offset);
        if(dir === "Up" || dir === "Down"){ratPos = p};
        return
    }  
    //trap scenario  
    if(thisTile.trap === true){
        gameLose()
        return
    }

    moveRatTo(p, dir)
    
    if (thisTile.jelly && thisTile.jelly !== 0 && !thisTile.visited){
        eatJelly(thisTile);
        
    }

    thisTile.visited = true;
    
    if(thisTile.jelly === 0){
        revealNeighboursOf(thisTile);
    }; 

    if(thisTile.entry === true){
        gameState = "inPlay";
        sfx.gameStart.play()
        timerStart()
    }
    if(thisTile.exit) {gameWin();}

}