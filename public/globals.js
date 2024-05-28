//height of visible play area
let viewPortHeight;
let bg_Y_Offset;

//graphics sheet info
const gs_tileWidth = 16; //px
const gs_tileScale = 4; 
const effective_tileWidth = gs_tileWidth * gs_tileScale;

//Game set up
let gameData;
const gridWidth =14; //boxes
const gridHeight = 30; //boxes
const boxCount = gridHeight * gridWidth;
const gameBoardWidth = gridWidth * effective_tileWidth; //px
const oneMove = effective_tileWidth;
let ratPos = Math.ceil(Math.random() * (gridWidth - 3) + 1);
console.log(`ratpos is ${ratPos}`);
let trapCount = 50;
let trapLocations = [];
let trapFreeTiles;
let defusedTraps = 0; 
let exitTileNum; 

//Audio     
let sfx;

// gameState
let gameStatesArray = ['foyer', "inPlay", 'paused', "win", 'lose', 'analysis']
let gameState = 'foyer';

//points system
let score = 0;
let highScores;
let highScoreRank = false;
const scoreBonus = 100;

//time data
let dateLastVisit = localStorage.getItem('lastVisit');
const dateNow = new Date();
console.log(`the day of the month is ${dateNow.getDate()}`);
console.log(`miliseconds that have passed ${dateNow.getTime()}`)


