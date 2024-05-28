function listen(bool){

    if(bool){
        console.log(`listening`);
        document.addEventListener('keydown', keyHandler, false);
    }
    if(!bool){
        console.log(`no longer listening`);
        document.removeEventListener('keydown', keyHandler, false);

    }
}
function listenAndAnalyse(bool){
    if(bool){
        console.log(`listening and Analysing`);
        document.addEventListener('keydown', keyHandler, false);
    }
    if(!bool){
        console.log(`no longer listening and analysing`);
        document.removeEventListener('keydown', keyHandler, false);

    }

}
