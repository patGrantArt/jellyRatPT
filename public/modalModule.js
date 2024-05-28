// create a self contained modal module for pixel graphics



//modal questions
// styling the placeholder text in the modal
// styling the hover state


//check for high scores
    // IF new high score
        //modalShowHS()
            //delete para inner text
            //create input field
            //append input field to para
            //activate modal_hs_input_Listen 
            //await input






function modals_init(){
    console.log('modals initialising');
    //create modal BG
    //
    let bdy = document.body;
    let bg = modal_create_BG();
    bdy.appendChild(bg);
    let gm = modal_gameModal_init(7, 6  );
    bdy.appendChild(gm);
    let hsm = modal_highScore_init(10,10);
    bdy.appendChild(hsm);
}


function modal_create_BG(){
        //create background
        let modal_BG = document.createElement('div')
        modal_BG.id = "modal_BG";
        modal_BG.style.position = "fixed";
        modal_BG.style.width = "100%";
        modal_BG.style.height = "100%";
        modal_BG.style.backgroundColor = "black";
        modal_BG.style.zIndex = "5";
        modal_BG.style.opacity = "0";
        modal_BG.style.visibility = "hidden";
        modal_BG.style.cursor = "pointer";
        modal_BG.style.transition = "opacity 500ms ease-in-out";
        return modal_BG
}


//creates a modal grid element
function modal_new_gridElem(string, colPos, rowPos){
    let elem = document.createElement('div');
    elem.id = `modal_${string}`;
    elem.classList = "graphic";
    elem.style.position = "absolute";
    elem.style.width = effective_tileWidth+"px";
    elem.style.height = effective_tileWidth+"px";
    elem.style.left = `${(colPos-1)*effective_tileWidth}px`;
    elem.style.top = `${(rowPos-1)*effective_tileWidth}px`;
    //elem.style.backgroundColor = "yellow";
    elem.style.backgroundPosition = graphicsGetBGpos(string);
    return elem
}
function modal_newPara(string, id, columns){
    let e = document.createElement('p');
    //e.style.zIndex = "7";   
    e.style.position = "relative";
    e.style.textAlign = "center";
    e.style.width = `${effective_tileWidth*(columns-2)}px`;
    e.style.fontSize = `${effective_tileWidth/3}px`;
    e.style.margin = '0';
    e.innerText = string;
    if(id){e.id = id};
    return e
}

function new_score_widget(array, prefix, highlight){
    let widge = document.createElement('div');
    widge.appendChild(new_score_widget_para("=========="))
    for(i=0; i<array.length; i++){
        let p = new_score_widget_para(`${i+1}.${array[i][0]} --- ${array[i][1]}`);
        p.id = `modal_${prefix}_scoreList_${i+1}`;
        if (i === highlight){
            p.style.color = `red`;
        } else {
            p.style.color = `grey`;
        }
        p.style.fontSize = `${effective_tileWidth / 4}px`;
        p.style.margin = 0;
        widge.appendChild(p);
    }
    widge.appendChild(new_score_widget_para("=========="))
    return widge;
}

function new_score_widget_para(string){
    let e = document.createElement('p');
    e.style.position = "relative";
    e.style.textAlign = "center";
    e.style.width = `${effective_tileWidth*6}px`;
    e.style.fontSize = `${effective_tileWidth/3}px`;
    e.style.margin = '0';
    e.innerText = string;
    return e

}



function modal_gameModal_init(rows, cols){
    console.log(`initialising game modal`)

    //create modal container 
    let modal_ctnr = document.createElement('div')
    modal_ctnr.id = "modal_ctnr";
    modal_ctnr.style.position = "fixed";
    modal_ctnr.style.width = "100%";
    modal_ctnr.style.height = "100%";
    modal_ctnr.style.zIndex = "6";
    modal_ctnr.style.opacity = "0";
    modal_ctnr.style.visibility = "hidden";
    modal_ctnr.style.display = "flex";
    modal_ctnr.style.justifyContent = "center";
    modal_ctnr.style.cursor = "pointer";

    //create modal box
    let modal_box =  document.createElement('div')
    modal_box.id = "modal_box";
    //modal_box.classList = "graphic"
    modal_box.style.position = "relative";
    modal_box.style.width = `${(cols)*effective_tileWidth}px`;
    modal_box.style.height = `${(rows)*effective_tileWidth}px`;
    modal_box.style.top = "100px";
    modal_box.style.cursor = "default";
    //modal_box.style.backgroundColor = "pink";
    //modal_box.style.opacity = "0";
    //modal_box.style.visibility = "hidden";

    for(let i = 1; i<=cols; i++){
        for(let j = 1; j<=rows; j++){
            let thisStr;
            if(i===1 && j===1){thisStr = "mtl"}
            if(i===cols && j===1){thisStr = "mtr"}
            if(j===1 && i>1 && i<cols){thisStr = "mt"}
            if(i===1 && j>1 && j<rows){thisStr = "ml"}
            if(i>1 && i<cols && j>1 && j<rows){thisStr = "mc"}
            if(i===cols && j>1 && j<rows){thisStr = "mr"}
            if(i>1 && i<cols && j===rows){thisStr = "mb"}
            if(i===1 && j===rows){thisStr = "mbl"}
            if(i===cols && j===rows){thisStr = "mbr"}

            modal_box.appendChild(modal_new_gridElem(thisStr, i, j))
        }
    }

    let modal_text_box =  document.createElement('div')
    modal_text_box.id = "modal_text_box";
    //modal_text_box.classList = "graphic"
    modal_text_box.style.position = "absolute";
    modal_text_box.style.width = `${(cols)*effective_tileWidth}px`;
    modal_text_box.style.height = `${(rows)*effective_tileWidth}px`;
    modal_text_box.style.top = "100px";
    modal_text_box.style.cursor = "default";
    modal_text_box.style.display = "flex";
    modal_text_box.style.flexDirection = "column"
    modal_text_box.style.alignItems = 'center'
    modal_text_box.style.padding = `${effective_tileWidth}px 0 0 0`


    let modal_score_widget = document.createElement('div');
    modal_score_widget.id = 'modal_GM_score_widget';
    modal_score_widget.appendChild(new_score_widget(highScores, 'GM', null))


    //create modal para
    let modal_para_1 = modal_newPara("PLAY AGAIN?", null, cols)
    let modal_para_2 = modal_newPara(`${score}`, "modal_score_display", cols)
    modal_para_2.style.margin = "0 0 0 0";
    let modal_para_3 = modal_newPara('YOUR SCORE:', null, cols);

    //create modal button1
    let modal_b1 =  document.createElement('div');
    modal_b1.id = "modal_b1";
    modal_b1.classList = "graphic";
    modal_b1.style.position = "absolute";
    modal_b1.style.zIndex = "7";
    modal_b1.style.cursor = "pointer";
    modal_b1.style.left = `${effective_tileWidth*2}px`;
    modal_b1.style.top = `${effective_tileWidth*5}px`;
    modal_b1.style.width = `${effective_tileWidth}px`;
    modal_b1.style.height = `${effective_tileWidth}px`;
    modal_b1.style.backgroundPosition = graphicsGetBGpos("myes");

    //create modal button2
    let modal_b2 =  document.createElement('div');
    modal_b2.id = "modal_b2";
    modal_b2.classList = "graphic";
    modal_b2.style.position = "absolute";
    modal_b2.style.zIndex = "7";
    modal_b2.style.cursor = "pointer";
    modal_b2.style.left = `${effective_tileWidth*3}px`;
    modal_b2.style.top = `${effective_tileWidth*5}px`;
    modal_b2.style.width = `${effective_tileWidth}px`;
    modal_b2.style.height = `${effective_tileWidth}px`;
    modal_b2.style.backgroundPosition = graphicsGetBGpos("mno");

    modal_text_box.appendChild(modal_para_3);
    modal_text_box.appendChild(modal_para_2);
    modal_text_box.appendChild(modal_score_widget);
    modal_text_box.appendChild(modal_para_1);
    modal_text_box.appendChild(modal_b1);
    modal_text_box.appendChild(modal_b2);
    // modal_text_box.appendChild(modal_HS_input);
    modal_ctnr.appendChild(modal_box);
    modal_ctnr.appendChild(modal_text_box);
    //bdy.appendChild(modal_BG);  
    return modal_ctnr;

}
function modal_highScore_init(rows, cols){
    console.log(`initialising High Score modal`)

    //create modal container 
    let modal_ctnr_HS = document.createElement('div')
    modal_ctnr_HS.id = "modal_ctnr_HS";
    modal_ctnr_HS.style.position = "fixed";
    modal_ctnr_HS.style.width = "100%";
    modal_ctnr_HS.style.height = "100%";
    modal_ctnr_HS.style.zIndex = "7";
    modal_ctnr_HS.style.opacity = "0";
    modal_ctnr_HS.style.visibility = "hidden";
    modal_ctnr_HS.style.display = "flex";
    modal_ctnr_HS.style.justifyContent = "center";
    modal_ctnr_HS.style.cursor = "pointer";

    //create modal box
    let modal_box_HS =  document.createElement('div')
    modal_box_HS.id = "modal_box_HS";
    //modal_box_HS.classList = "graphic"
    modal_box_HS.style.position = "relative";
    modal_box_HS.style.width = `${(cols)*effective_tileWidth}px`;
    modal_box_HS.style.height = `${(rows)*effective_tileWidth}px`;
    modal_box_HS.style.top = "100px";
    modal_box_HS.style.cursor = "default";
    modal_box_HS.style.backgroundColor = "pink";


    for(let i = 1; i<=cols; i++){
        for(let j = 1; j<=rows; j++){
            let thisStr;
            if(i===1 && j===1){thisStr = "mhtl"}
            if(i===cols && j===1){thisStr = "mhtr"}
            if(j===1 && i>1 && i<cols){thisStr = "mht"}
            if(i===1 && j>1 && j<rows){thisStr = "mhl"}
            if(i>1 && i<cols && j>1 && j<rows){thisStr = "mhc"}
            if(i===cols && j>1 && j<rows){thisStr = "mhr"}
            if(i>1 && i<cols && j===rows){thisStr = "mhb"}
            if(i===1 && j===rows){thisStr = "mhbl"}
            if(i===cols && j===rows){thisStr = "mhbr"}

            modal_box_HS.appendChild(modal_new_gridElem(thisStr, i, j))
        }
    }

    let modal_text_box_HS =  document.createElement('div')
    modal_text_box_HS.id = "modal_text_box_HS";
    //modal_text_box_HS.classList = "graphic"
    modal_text_box_HS.style.position = "absolute";
    modal_text_box_HS.style.width = `${(cols)*effective_tileWidth}px`;
    modal_text_box_HS.style.height = `${(rows)*effective_tileWidth}px`;
    modal_text_box_HS.style.top = "100px";
    modal_text_box_HS.style.cursor = "default";
    modal_text_box_HS.style.display = "flex";
    modal_text_box_HS.style.flexDirection = "column"
    modal_text_box_HS.style.alignItems = 'center'
    modal_text_box_HS.style.padding = `${effective_tileWidth}px 0 0 0`


    let modal_HS_p_1 = modal_newPara("YOU HAVE NEW HIGH SCORE", null, cols)
    let modal_HS_p_2 = modal_newPara(`${score}`, "modal_HS_score_display")
    modal_HS_p_2.style.margin = "0 0 0 0";
    modal_HS_p_2.style.color = "red";
    let modal_HS_p_3 = modal_newPara(`ENTER YOUR NAME FOR THE LEADERBOARD:`)

    //HIGH SCORE RECORD - to do make into
    let modal_HS_score_widget = document.createElement('div');
    modal_HS_score_widget.id = 'modal_HS_score_widget';
    modal_HS_score_widget.appendChild(new_score_widget(highScores, 'HS', null))



    //create modal HS input
    let modal_HS_input = document.createElement('input', 'text')
    modal_HS_input.id = "modal_HS_input";
    modal_HS_input.style.fontFamily = "pressStart2P";
    modal_HS_input.oninput = inputToUpperCase;
    modal_HS_input.placeholder = "????";
    modal_HS_input.maxLength = 4;
    
    

    //create OK button
    let modal_b_ok =  document.createElement('div');
    modal_b_ok.id = "modal_b_ok";
    modal_b_ok.classList = "graphic";
    modal_b_ok.style.position = "relative";
    modal_b_ok.style.zIndex = "7";
    modal_b_ok.style.cursor = "pointer";
    modal_b_ok.style.width = `${effective_tileWidth*2}px`;
    modal_b_ok.style.height = `${effective_tileWidth}px`;
    modal_b_ok.style.backgroundPosition = graphicsGetBGpos("mok");

    modal_text_box_HS.appendChild(modal_HS_score_widget);
    modal_text_box_HS.appendChild(modal_HS_p_1);
    modal_text_box_HS.appendChild(modal_HS_p_2);
    modal_text_box_HS.appendChild(modal_HS_p_3);
    modal_text_box_HS.appendChild(modal_HS_input);
    modal_text_box_HS.appendChild(modal_b_ok);

    // modal_text_box.appendChild(modal_b2);
    // // modal_text_box.appendChild(modal_HS_input);
    modal_ctnr_HS.appendChild(modal_box_HS);
    modal_ctnr_HS.appendChild(modal_text_box_HS);
    return modal_ctnr_HS;

}





function modalInit(rows, cols){
    console.log(`initalising modal at ${rows} by ${cols}`)
    
    
    

    


}

async function modal_Hide(){
    console.log(`hiding modal`);
    modal_Listen(false);
    modal_ctnr.style.opacity = "0";
    modal_BG.style.opacity = "0";
    await pauseFor(500);
    modal_BG.style.visibility = "hidden";
    modal_ctnr.style.visibility = "hidden";
}
async function modal_Show(){
    console.log(`showing modal`);
    let w = document.getElementById('modal_GM_score_widget');
    w.innerHTML = "";
    w.appendChild(new_score_widget(highScores, "GM", highScoreRank));
    modal_BG.style.visibility = "visible";
    modal_BG.style.opacity = "0.7";
    await pauseFor(500);
    modal_ctnr.style.visibility = "visible";
    modal_ctnr.style.opacity = "1";
    modal_Listen(true);
}

async function modal_Show_HS(num){
    modal_BG.style.visibility = "visible";
    modal_BG.style.opacity = "0.7";
    let activeRow = document.getElementById(`modal_HS_scoreList_${num+1}`);
    activeRow.style.color = 'red';
    document.getElementById("modal_HS_score_display").innerText = score;
    activeRow.style.color = 'red';
    score_tempLeaderboard(num, score, highScores);
    await pauseFor(500);
    modal_ctnr_HS.style.visibility = "visible";
    modal_ctnr_HS.style.opacity = "1";
    modal_HS_listen(true);
}
async function modal_hide_HS(){
    console.log(`hiding HS modal`);
    modal_HS_listen(false);
    modal_ctnr_HS.style.opacity = "0";
    modal_BG.style.opacity = "0";
    await pauseFor(500);
    modal_BG.style.visibility = "hidden";
    modal_ctnr_HS.style.visibility = "hidden";
    modal_Show();
}

function modal_HS_listen(bool){
    if(bool){
        console.log(`modal high Score listening`);
        document.getElementById('modal_b_ok').addEventListener('click', submitHighScore);
        //modal_ctnr_HS.addEventListener('click', modal_hide_HS);
    }
    if(!bool){
        console.log(`modal high Score no longer listening`);
        document.getElementById('modal_b_ok').removeEventListener('click', submitHighScore);
        //modal_ctnr_HS.removeEventListener('click', modal_hide_HS);
    }
    
    
    
} 

function modal_Listen(bool){
    if(bool){
        modal_ctnr.addEventListener('click', modal_Hide);
        modal_b1.addEventListener('click', resetGame);
        modal_b2.addEventListener('click', enterAnalysis);
    }
    if(!bool){
        modal_ctnr.removeEventListener('click', modal_Hide);
        modal_b1.removeEventListener('click', resetGame);
        modal_b2.addEventListener('click', enterAnalysis);
    }

}



