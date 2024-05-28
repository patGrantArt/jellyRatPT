// b = boards, t = traps, r = rats, 
//e = edge, j = Jellies, n = numbers, 
//h = hole

const graphicsLookup = {
    b1: "1 4",
    b2: "2 4",
    b3: "3 4",
    b4: "4 4",
    b5: "1 5",
    b6: "2 5",
    b7: "3 5",
    b8: "4 5",
    t1: "4 2",
    t2: "5 2",
    t3: "6 2",
    t4: "6 4",
    t5: "6 5",
    t6: "6 10",
    rl: "1 2",
    rr: "0 2",
    ru: "3 2",
    rd: "2 2",
    etl: "0 3",
    etr: "5 3",
    ebl: "0 6",
    ebr: "5 6",
    et: "1 3",
    el: "0 4",
    er: "5 4",
    eb: "1 6",
    j1: "0 0", 
    j2: "1 0", 
    j3: "2 0", 
    j4: "3 0", 
    j5: "4 0", 
    j6: "5 0", 
    j7: "6 0", 
    j8: "7 0", 
    n1: "0 1", 
    n2: "1 1", 
    n3: "2 1", 
    n4: "3 1", 
    n5: "4 1", 
    n6: "5 1", 
    n7: "6 1", 
    n8: "7 1", 
    h1: "3 6",
    h2: "6 6",
    h3: "6 7",
    h4: "3 3",
    blank: "0 7",
    mtl: "3 7",
    mt: "4 7",
    mtr: "5 7",
    ml: "3 8",
    mc: "4 8",
    mr: "5 8",
    mbl: "3 9",
    mb: "4 9",
    mbr: "5 9",
    mno: "6 8",
    myes: "6 9",
    mok: "1 12",
    mhtl: "3 10",
    mht: "4 10",
    mhtr: "5 10",
    mhl: "3 11",
    mhc: "4 11",
    mhr: "5 11",
    mhbl: "3 12",
    mhb: "4 12",
    mhbr: "5 12"
}

function graphicsGetBGpos(string){
    //console.log(`looking up graphics with the string ${string}`);
    // console.log(graphicsLookup);
    // console.log(graphicsLookup[string]);
    let thispos = graphicsLookup[string];
    thispos = thispos.split(" ");
    let thisX = thispos[0] * gs_tileScale * gs_tileWidth 
    let thisY = thispos[1] * gs_tileScale * gs_tileWidth 
    let styleString = `-${thisX}px -${thisY}px`;
    return styleString
}
