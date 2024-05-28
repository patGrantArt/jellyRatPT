//TIMER MODULE 


let timer_seconds_elapsed = 0;
let timer_toDisplay = "00:00";
let timer_ID;

function timerStart(){
    console.log(`starting timer`);
    timer_ID = setInterval(() => {
        //console.log(`${timePassed} seconds have passed`);
        timer_seconds_elapsed++;
        timer_toDisplay = secsToMin(timer_seconds_elapsed);
        document.getElementById("timerDisplay").innerText = timer_toDisplay;
        if (timer_seconds_elapsed > (60*60)){
            clearInterval(timer_ID);
        }
    }, 1000);    
};
function timerStop(id){
    console.log(`stopping Timer with interval ID -->${id}`);
    clearInterval(id);
}
function timerReset(){
    clearInterval(timer_ID);
    document.getElementById("timerDisplay").innerText = "00:00";
    timer_ID = undefined;
    timer_seconds_elapsed = 0;

};

// ======== CONVERSION UTILITY =================

function secsToMin(num){
    let seconds = num;
    let minutes = 0;
    let result;
    if (seconds>=60){
        minutes += Math.floor(seconds/60);
        seconds = seconds%60;
        //console.log(`remainder ${remainder}`)
        //console.log(minutes);
        if (minutes >= 60){
            result = "TOO SLOW!"
            return result;     
        };
    }
    if (seconds <= 9){
        seconds = `0${seconds}`;
    };
    if (minutes <= 9){
        minutes = `0${minutes}`;
    };
    result = ` ${minutes}:${seconds} `; 
    return result;
}