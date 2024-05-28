function keyHandler(e){
    let keyPressed = e.key;

    if (keyPressed === "ArrowRight" || 
        keyPressed === "ArrowLeft" ||
        keyPressed === "ArrowUp" || 
        keyPressed === "ArrowDown"
        ){    
        gameLoop(keyPressed, e.shiftKey)          
    }
    if (keyPressed === "Escape"){
        escapePressed();

    };
    return
   
};
