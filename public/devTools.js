//Welcome to my Tiny Topo development tools. This was created to save time and hassle while 'hand setting' your routes

//===== HOW TO =====
//START by adding the script tag <script src="devTools.js"></script> to your html markup AFTER the body load
//THEN add the id of the routes you want to adjust to the array "adjustTheseElements"
//THEN change the global variable "devMode" to true.
//LOAD the site 
//CHECK the Dev Tools Checkbox and CLICK on the element you want to adjust
//you can now adjust the paramaters as follows:
//TOP keys Q&A, LEFT Keys W S, WIDTH keys E D, HEIGHT kleys R F, BGX keys T G, and BGY keys Y H. 
//push OPTION for larger (ten pixel) adjustment.
//WHEN your route is set then push P to print the CSS to the console for an easy copy paste to the CSS file

//======= future improvements ========
// - print a json or object for copy paste to a data file
// - change OPTION key function to SHIFT for 10 px adjustment.
// - some sort of map setting tool.


//say hello
console.log(`DevTools online!`);

//globals
var devMode = false;
var elementInDevMode = undefined;
var adjustTheseElements = ["dev1"];


//devTool library in alphabetical order
function checkRadio(idString){
    console.log(`checking radio button ${idString}`);
    let radio = document.getElementById(idString);
    console.log(radio);
    if (radio.checked){
        console.log(`checked!`);
        return true
    } 
    return false
}
function convertPXL(arg){
    //console.log(`converting pixels`)
    if (typeof(arg) === "string"){
        let regx = /-?\d+/;
        let thisArray = arg.match(regx);
        let thisNum = thisArray[0];
        //console.log(`returning ${typeof(thisNum)}... ${thisNum}`);
        return thisNum
    }
    if (typeof(arg) === "number"){
        return `calc(var(--scale)*${arg}px)`
    }
}
function devChangeStyle(paramString, styleString){
    if(paramString === "top"){elementInDevMode.style.top = styleString}; 
    if(paramString === "left"){elementInDevMode.style.left = styleString};
    if(paramString === "width"){elementInDevMode.style.width = styleString};
    if(paramString === "height"){elementInDevMode.style.height = styleString}; 
    if(paramString === "background-position-x"){elementInDevMode.style.backgroundPositionX = styleString}; 
    if(paramString === "background-position-y"){elementInDevMode.style.backgroundPositionY = styleString};       
}
function devClickedElement(id){
    console.log(`element clicked -> ${id}`);
    if(!checkRadio("devModeCheck")){
        console.log(`dev mode not checked`)
        console.log(`resetting elementInDevMode to undefined`);
        elementInDevMode = undefined;
        return
    }
    elementInDevMode = document.getElementById(id);
    let computedStyles = window.getComputedStyle(elementInDevMode, null);
    console.log("======")
    console.log(computedStyles.top);
    console.log(elementInDevMode);
    console.log(elementInDevMode.style);
    console.log(elementInDevMode.style.top);
    const scale = gs_tileScale;
    if(elementInDevMode.style.top === ""){
        console.log(`no top --- adding`)
        elementInDevMode.style.top = convertPXL( convertPXL(computedStyles.top) / scale );
    };  
    if(elementInDevMode.style.left === ""){
        console.log(`no left --- adding`)
        elementInDevMode.style.left = convertPXL( convertPXL(computedStyles.left) / scale );
    };
    if(elementInDevMode.style.width === ""){
        console.log(`no width --- adding`)
        elementInDevMode.style.width = convertPXL( convertPXL(computedStyles.width) / scale );
    };  
    if(elementInDevMode.style.height === ""){
        console.log(`no height --- adding`)
        elementInDevMode.style.height = convertPXL( convertPXL(computedStyles.height) / scale );
    };   
    if(elementInDevMode.style.backgroundPositionX === ""){
        console.log(`no bgX --- adding`)
        console.log(computedStyles.backgroundPositionX)
        console.log(convertPXL( computedStyles.backgroundPositionX ));
        console.log(convertPXL( computedStyles.backgroundPositionX ) / scale)

        elementInDevMode.style.backgroundPositionX = convertPXL( convertPXL(computedStyles.backgroundPositionX) / scale );
    }; 
    if(elementInDevMode.style.backgroundPositionY === ""){
        console.log(`no bgX --- adding`)
        elementInDevMode.style.backgroundPositionY = convertPXL( convertPXL(computedStyles.backgroundPositionY) / scale );
    }; 
    elementInDevMode.style.opacity = 0.9;
    elementInDevMode.style.border = "1px solid red";
    // if(elementInDevMode.style.left === ""){
    //     elementInDevMode.style.left = computedStyles.left;
    // }
    // if(elementInDevMode.style.width === ""){
    //     elementInDevMode.style.width = computedStyles.width;
    // }
    // if(elementInDevMode.style.height === ""){
    //     elementInDevMode.style.height = computedStyles.height;
    // }
    // if(elementInDevMode.style.backgroundPositionX === ""){
    //     elementInDevMode.style.backgroundPositionX = computedStyles.backgroundPositionX;
    // }
    // if(elementInDevMode.style.backgroundPositionY === ""){
    //     elementInDevMode.style.backgroundPositionY = computedStyles.backgroundPositionY;
    // }
    console.log(`moving this element:`)
    console.log(elementInDevMode);
    listenDevMode(true);
    return
    
}
function devCreateDevElement(){
}
function devGetIncrement(keyString, altKey){
    if(keyString === "KeyQ" && !altKey){return -1};
    if(keyString === "KeyQ" && altKey){return -10};
    if(keyString === "KeyA" && !altKey){return 1};
    if(keyString === "KeyA" && altKey){return 10};
    if(keyString === "KeyW" && !altKey){return -1};
    if(keyString === "KeyW" && altKey){return -10};
    if(keyString === "KeyS" && !altKey){return 1};
    if(keyString === "KeyS" && altKey){return 10};
    if(keyString === "KeyE" && !altKey){return -1};
    if(keyString === "KeyE" && altKey){return -10};
    if(keyString === "KeyD" && !altKey){return 1};
    if(keyString === "KeyD" && altKey){return 10};
    if(keyString === "KeyR" && !altKey){return -1};
    if(keyString === "KeyR" && altKey){return -10};
    if(keyString === "KeyF" && !altKey){return 1};
    if(keyString === "KeyF" && altKey){return 10};
    if(keyString === "KeyT" && !altKey){return -1};
    if(keyString === "KeyT" && altKey){return -10};
    if(keyString === "KeyG" && !altKey){return 1};
    if(keyString === "KeyG" && altKey){return 10};
    if(keyString === "KeyY" && !altKey){return -1};
    if(keyString === "KeyY" && altKey){return -10};
    if(keyString === "KeyH" && !altKey){return 1};
    if(keyString === "KeyH" && altKey){return 10};
    return undefined;
}
function devGetParam(string){
    if(string === "KeyQ" || string === "KeyA" ){return "top"}; 
    if(string === "KeyW" || string === "KeyS" ){return "left"};
    if(string === "KeyE" || string === "KeyD" ){return "width"};
    if(string === "KeyR" || string === "KeyF" ){return "height"};
    if(string === "KeyT" || string === "KeyG" ){return "background-position-x"};
    if(string === "KeyY" || string === "KeyH" ){return "background-position-y"}; 
}
function DevKeyHandler(e){
    let keyPressed = e.code;
    let altKey = e.altKey;

    if(keyPressed === "KeyP"){
        devPrintCSS(elementInDevMode);
        return
    }

    //get parameter based on key id
    let param = devGetParam(keyPressed, altKey);

    //get increment based on key id
    let inc = devGetIncrement(keyPressed, altKey);
    
    //debug
    //console.log(`changing param "${param}" of element "${elementInDevMode.id}" by ${inc}`);

    //get the computed value of the param and convert
    let paramValue = elementInDevMode.style.getPropertyValue(param);
    paramValue = convertPXL( paramValue );
    paramValue = +paramValue //change type to num

    let newStyle = paramValue+inc;
    newStyle = convertPXL(newStyle);
    devChangeStyle(param, newStyle);       
}
function devPrintCSS (element){
    //console.log(`assembing string of CSS on element ${element.id}`)
    let result = ""
    let styles = element.style;
    //console.log(styles);
    //console.log(`top value is: ${styles.top}`)
    let line1 = "top: "+styles.top+";\n";
    let line2 = "left: "+styles.left+";\n";
    let line3 = "width: "+styles.width+";\n";
    let line4 = "height: "+styles.height+";\n";
    let line5 = "background-position-x: "+styles.backgroundPositionX+";\n";
    let line6 = "background-position-y: "+styles.backgroundPositionY+";";
    //console.log(`topline value is: ${line1+line2}`)
    result = line1+line2+line3+line4+line5+line6;
    console.log(result)
}
function listenDevMode(bool){
    let buttons = document.querySelectorAll(".devMode-btn");
    //console.log(buttons)
    if(bool){
        document.addEventListener("keydown", DevKeyHandler, false);
    }
    if(!bool){
        document.removeEventListener("keydown", DevKeyHandler, false)
    }
}


// init script
function devModeInitialise(){
    console.log(`Dev Tools initialising`);
    let elem = document.createElement('div')
    elem.id = "devMode";
    let p = document.createElement('p');
    p.innerText = "dev?";
    let radio = document.createElement("input");
    radio.id = "devModeCheck";
    radio.type = "checkbox";
    elem.appendChild(p);
    elem.appendChild(radio);
    document.body.appendChild(elem);
    adjustTheseElements.forEach( (id) => {
        console.log(id)
        document.getElementById(id).addEventListener('click', ()=>{devClickedElement(id)}, false);
    });
}

//get this shit going
if(devMode === true){   devModeInitialise() }
