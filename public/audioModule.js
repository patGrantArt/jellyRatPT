

// lightweight sound module for JS
// playing a sound requires the syntax sfx.name.play()

// sound assets organised into a 2D array with each elem 
    //[0] the fx name to call, 
    //[1] path of the asset, 
    //[2] the number of channels of the sound required

const soundLibrary = [
    ["move", "sounds/Kick.wav", 10],
    ["bump", "sounds/Bump.wav", 5],
    ["jelly1", "sounds/Beep.wav", 10],
    ["jelly2", "sounds/Fire Ball.wav", 5],
    ["jelly3", "sounds/Coin.wav", 5],
    ["jelly4", "sounds/Item.wav", 4],
    ["defused", "sounds/Thwomp.wav", 2],
    ["gameStart", "sounds/Powerup.wav", 2],
    ["gameOver", "sounds/Game Over.wav", 2],
    ["lvlComplete", "sounds/1up.wav", 2],
    ["trapHit", "sounds/Die.wav", 2]
    
]

//a function that creates a "channel" for each sound asset
function Channel(url){
    this.audioAsset = url;
    this.audioObj = new Audio(this.audioAsset);
    this.play = function(){this.audioObj.play()};
}

// SWITCHER a function that stores a given number of channels
// of each sound and allows switching between them with each play 
// enabling simulatenous plays of each sound
function Switcher(url, num){
    this.max = num;
    this.channels = [];
    this.inc = 0;
    for(let i = 0; i<this.max; i++){
        this.channels.push(new Channel(url))
    };
    this.play = function(){
        this.inc++
        if (this.inc === this.max){this.inc = 0};
        this.channels[this.inc].play();
    }
}

//init function that loops theough the sound library 
//returns one global sfx object 
//with a method to play each sound by name
function initialiseSound(lib){
    let obj = {};
    console.log("initialising sounds assets")   
    lib.forEach(sound => {
        let thisKey = sound[0];
        obj[thisKey] = new Switcher(sound[1], sound[2]) 
    });
    return obj;
}


//initalise
sfx = initialiseSound(soundLibrary);




