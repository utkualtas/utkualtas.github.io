let rowNum = 4;
let colNum = 4;
let table = [];
let oldTable = [];
let tempTable = [];
let isFirstSet = true;

let width = 600;
let height = 600;
let space = 16;

let layerX = 100;
let layerY = 150;

let elmX;
let elmY;
let elmXlenght = 0.0;
let elmYlenght = 0.0;
let elementXlenght = 0.0;

let animeSpeed = 10.0;
let makeAnimate = [];
let pullAninamte = [];
let isPull = true;

let score = 0;

let isMoving = false;


let colors = {
    2 : "#EEE4DA",
    4 : "#EDE0C8",
    8 : "#F2B179",
    16 : "#F59563",
    32 : "#F67C5F",
    64 : "#F65E3B",
    128 : "#EDCF72",
    256 : "#EDCC61",
    512 : "#EDC850",
    1024 : "#EDD150",
    2048 : "#EDF650",
    default : "#121212"
};

function setup() {
    // put setup code here
    let cnvs = createCanvas(800,950);
    cnvs.style("display", "block");
    cnvs.style("margin", "0px auto");
    background(0);
    elementCalculate();
    table = createTable(rowNum, colNum);
    setRandNum();
    tempTable = JSON.parse(JSON.stringify(table));
}


function draw() {
  // put drawing code here
    
    background(0);
    fill("#BBADA0");
    noStroke();
    rect(layerX, layerY, width, height, 8);
    
    //rect(100, 20, 200, 20);
    textSize(96);
    text("2048", 100, 110);
    
    rect(590, 40, 110, 62);
    rect(420, 40, 150, 62);
    textSize(18);
    textStyle(BOLD);
    fill("#363636");
    text("YENİ OYUN", 444, 74);
    
    textSize(18);
    //textStyle(NORMAL);
    //fill("#776E65");
    text("SCORE\n     " + score, 612, 62);
    
    
    for(let i=1; i<=rowNum; i++){       
        for(let j=1; j<=colNum; j++){
            fill("#CDC0B4");
            noStroke();
            rect(i * (elementXlenght + space) - (elementXlenght - layerX), j * (elementXlenght + space) - (elementXlenght - layerY) , elementXlenght, elementXlenght);   
        }
    }
    //playAnimation(makeAnimate,"pull");
    
    playAnimation(makeAnimate,"move");

    for(let i=1; i<=rowNum; i++){       
        for(let j=1; j<=colNum; j++){
            if(table[i-1][j-1]["val"] != null){
                //fill(table[i-1][j-1].toString());
                if(colors[table[i-1][j-1]["val"]] == undefined){
                    fill(colors["default"]);
                } else {
                    fill(colors[table[i-1][j-1]["val"].toString()]);
                }
                noStroke();
                rect(table[i-1][j-1]["x"], table[i-1][j-1]["y"], elementXlenght, elementXlenght);
                textSize(52);
                textStyle(BOLD);
                if(table[i-1][j-1]["val"] > 4){
                    fill("#F9F6F2");
                } else {
                    fill("#776E65");
                }
                let numText = table[i-1][j-1]["val"].toString();
                text(numText, table[i-1][j-1]["x"] + elementXlenght/2 - textWidth(numText)/2, table[i-1][j-1]["y"] + elementXlenght/2 + textDescent(numText));
                //say++;
            }
        }
    }
    
    
    
    
}


function watchTable(){
    //This function just for debug and see table on the console
    //console.clear();
        for(let i=0; i<4; i++){
            //for(let j=0; j<table[i].length; j++){
                let a = (JSON.stringify(table[i], ["val"])).replace('"val":', '').replace('"val":', '').replace('"val":', '').replace('"val":', '').replace('null', '0').replace('null', '0').replace('null', '0').replace('null', '0');

                console.log("Satir: " + i + "  " + a);
            //}
        }
}

function mousePressed(){
    if(mouseX >= 420 && mouseX <= 570 && mouseY >= 40 && mouseY <= 102){
        score = 0;
        isFirstSet = true;
        elementCalculate();
        table = createTable(rowNum, colNum); 
        setRandNum();
        tempTable = JSON.parse(JSON.stringify(table));
    }
}

function keyPressed() {
    if(keyCode === LEFT_ARROW && isMoving == false){
        oldTable = table;
        moveLeft();
        watchTable();
    } else if(keyCode === RIGHT_ARROW && isMoving == false){
        oldTable = table;
        moveRight();
        watchTable();
        
        //console.log(JSON.stringify(table));
    } else if(keyCode === UP_ARROW && isMoving == false){
        oldTable = table;
        moveUp();
        watchTable();
    } else if(keyCode === DOWN_ARROW && isMoving == false){
        oldTable = table;
        moveDown();
        watchTable();
    }
}

function playAnimation(animes){
    let isDone = true;
    let aName = null;
    oldTable = [];
    if(animes.length !=0){
        for(let i=0; i<animes.length; i++){
            if(animes[i]["isDone"] == false){
                isDone = false;
                break;
            } 
        }
        
        if(!isDone){
            for(let z=0; z<animes.length; z++){
                let oldPos = animes[z]["oldPosition"];
                let animeCount = animes[z]["animeCount"];
                let i = animes[z]["animeX"];
                let k = animes[z]["animeY"];
                let j = animes[z]["animeYTwo"];
                let animeName = animes[z]["animeName"];
                
                let sum = animeCount / animeSpeed;    
                
                if(animeName == "right"){
                    if(table[i][k]["x"] < (oldPos + animeCount)){
                        if(table[i][k]["x"] + sum > (oldPos + animeCount)){
                            table[i][k]["x"] = oldPos + animeCount;
                        } else {
                            table[i][k]["x"] += sum;
                        }
                    } else {
                        makeAnimate[z]["isDone"] = true;
                    }
                } else if(animeName == "left"){
                    if(table[i][k]["x"] > (oldPos - animeCount)){
                        if(table[i][k]["x"] - sum < (oldPos - animeCount)){
                            table[i][k]["x"] = oldPos - animeCount;
                        } else {
                            table[i][k]["x"] -= sum;
                        }
                    } else {
                        makeAnimate[z]["isDone"] = true;
                    }
                } else if(animeName == "up"){
                    if(table[k][i]["y"] > (oldPos - animeCount)){
                        if(table[k][i]["y"] - sum < (oldPos - animeCount)){
                            table[k][i]["y"] = oldPos - animeCount;
                        } else {
                            table[k][i]["y"] -= sum;
                        }
                    } else {
                        makeAnimate[z]["isDone"] = true;
                    }
                } else if(animeName == "down"){
                    if(table[k][i]["y"] < (oldPos + animeCount)){
                        if(table[k][i]["y"] + sum > (oldPos + animeCount)){
                            table[k][i]["y"] = oldPos + animeCount;
                        } else {
                            table[k][i]["y"] += sum;
                        }
                    } else {
                        makeAnimate[z]["isDone"] = true;
                    }
                }
                
            }
        } else {
            for(let z=0; z<animes.length; z++){
                makeAnimate.splice(z, 1);
                z--;
            }
            
            table = JSON.parse(JSON.stringify(tempTable));
            if(table != oldTable){
                findIndexNum(null);
                tempTable = table.slice(0);
            }
            table = JSON.parse(JSON.stringify(tempTable));
        }
        
        
    
    } else {
        
        isMoving = false;
        isPull = true;
        
    }
    
}


function moveRight(){
    isMoving = true;
    for(let i=0; i<rowNum; i++){
        
        for(let j = colNum-1; j>=0; j--){
            
            if(tempTable[i][j]["val"] != null){
                console.log(tempTable);
                let num = tempTable[i][j]["val"];
                let say = j;
                for(let z=j+1; z<colNum; z++){
                    if(tempTable[i][z]["val"] == null){
                        say++;
                        oldTable = [];
                    } else {
                        break;
                    }
                }
                
                if(say-j > 0){
                    let tmp = tempTable[i][j]["val"];
                    tempTable[i][say]["val"] = tmp;
                    tempTable[i][j]["val"] = null;
                    console.log(tmp);
                    console.log("Say eksi J : " + (say-j));
                    let obj = {
                        oldPosition : tempTable[i][j]["x"],
                        animeCount : (elementXlenght + space) * (say-j),
                        animeX : i,
                        animeY : j,
                        animeYTwo : say,
                        animeName : "right",
                        isDone : false
                    };
                    makeAnimate.push(obj);
                    j = say;
                }
                
                num = tempTable[i][j]["val"];
                for(let k=j-1; k>=0; k--){
                    if(k !=j && tempTable[i][k]["val"] != null){               
                        if(tempTable[i][k]["val"] == num){

                            tempTable[i][j]["val"] = num * 2;
                            score += (num*2);
                            tempTable[i][k]["val"] = null;
                            //For animation
                            let obj = {
                                oldPosition : tempTable[i][k]["x"],
                                animeCount : (elementXlenght + space) * (j-k),
                                animeX : i,
                                animeY : k,
                                animeYTwo : j,
                                animeName : "right",
                                isDone : false
                            };

                            makeAnimate.push(obj);
                            isPull = false;
                            j = k;
                        }                
                            break;
                    }
                }
            }
        }
    }
}


function debugTable(tab){
    let say = 0;
    for(let i=0; i<rowNum; i++){
        for(let j=0; j<colNum; j++){
            if(tab[say] != 0){
                
            tempTable[i][j]["val"] = tab[say];
            table[i][j]["val"] = tab[say];
            } else {
                tempTable[i][j]["val"] = null;
                table[i][j]["val"] = null;
            }
            
            say++;
        }
    }
}

function moveLeft(){
    isMoving = true;
    for(let i=0; i<rowNum; i++){
        for(let j=0; j<colNum; j++){
            if(tempTable[i][j]["val"] != null){
                
                console.log(tempTable);
                let num = tempTable[i][j]["val"];
                
                let say = j;
                for(let z=j-1; z>-1; z--){
                    if(tempTable[i][z]["val"] == null){
                        say--;
                        oldTable = [];
                    } else {
                        break;
                    }
                }
                
                if(j-say > 0){
                    let tmp = tempTable[i][j]["val"];
                    tempTable[i][say]["val"] = tmp;
                    tempTable[i][j]["val"] = null;
                    console.log(tmp);
                    console.log("Say eksi J : " + (j-say));
                    let obj = {
                        oldPosition : tempTable[i][j]["x"],
                        animeCount : (elementXlenght + space) * (j-say),
                        animeX : i,
                        animeY : j,
                        animeYTwo : say,
                        animeName : "left",
                        isDone : false
                    };
                    makeAnimate.push(obj);
                    j = say;
                }
                
                
                
                
                num = tempTable[i][j]["val"];
                for(let k=j+1; k<colNum; k++){
                    if(k !=j && tempTable[i][k]["val"] != null){
                        if(tempTable[i][k]["val"] == num && k != j){
                            tempTable[i][j]["val"] = num * 2;
                            score += (num*2);
                            tempTable[i][k]["val"] = null;
                            
                            let obj = {
                                oldPosition : tempTable[i][k]["x"],
                                animeCount : (elementXlenght + space) * (k-j),
                                animeX : i,
                                animeY : k,
                                animeYTwo : j,
                                animeName : "left",
                                isDone : false
                            };
                            makeAnimate.push(obj);
                            isPull = false;
                            j = k;
                        }
                        break;
                    }
                }
            }
        }
    }
}

function moveUp(){
    isMoving = true; 
    for(let i=0; i<colNum; i++){
        for(let j=0; j<rowNum; j++){
            if(tempTable[j][i]["val"] != null){
                
                let num = tempTable[j][i]["val"];
                
                let say = j;
                for(let z=j-1; z>-1; z--){
                    if(tempTable[z][i]["val"] == null){
                        say--;
                        oldTable = [];
                    } else {
                        break;
                    }
                }
                
                if(j-say > 0){
                    let tmp = tempTable[j][i]["val"];
                    tempTable[say][i]["val"] = tmp;
                    tempTable[j][i]["val"] = null;
                    console.log(tmp);
                    console.log("Say eksi J : " + (j-say));
                    let obj = {
                        oldPosition : tempTable[j][i]["y"],
                        animeCount : (elementXlenght + space) * (j-say),
                        animeX : i,
                        animeY : j,
                        animeYTwo : say,
                        animeName : "up",
                        isDone : false
                    };
                    makeAnimate.push(obj);
                    j = say;
                }
                
                num = tempTable[j][i]["val"];
                for(let k=j+1; k<rowNum; k++){
                    if(k != j && tempTable[k][i]["val"] != null){
                        if(tempTable[k][i]["val"] == num){
                            tempTable[j][i]["val"] = num * 2;
                            score += (num*2);
                            tempTable[k][i]["val"] = null;
                            let obj = {
                                oldPosition : tempTable[k][i]["y"],
                                animeCount : (elementXlenght + space) * (k-j),
                                animeX : i,
                                animeY : k,
                                animeYTwo : j,
                                animeName : "up",
                                isDone : false
                            };
                            makeAnimate.push(obj);
                            j = k;
                        }
                        break;
                    }
                }
            }
        }
    }
}

function moveDown(){
    isMoving = true; 
    for(let i=0; i<rowNum; i++){
        for(let j=colNum-1; j>=0; j--){
            if(tempTable[j][i]["val"] != null){
                
                console.log(tempTable);
                let num = tempTable[j][i]["val"];
                let say = j;
                for(let z=j+1; z<colNum; z++){
                    if(tempTable[z][i]["val"] == null){
                        say++;
                        oldTable = [];
                    } else {
                        break;
                    }
                }
                
                if(say-j > 0){
                    let tmp = tempTable[j][i]["val"];
                    tempTable[say][i]["val"] = tmp;
                    tempTable[j][i]["val"] = null;
                    console.log(tmp);
                    console.log("Say eksi J : " + (say-j));
                    let obj = {
                        oldPosition : tempTable[j][i]["y"],
                        animeCount : (elementXlenght + space) * (say-j),
                        animeX : i,
                        animeY : j,
                        animeYTwo : say,
                        animeName : "down",
                        isDone : false
                    };
                    makeAnimate.push(obj);
                    j = say;
                }
                
                
                
                
                num = tempTable[j][i]["val"];
                for(let k=j-1; k>=0; k--){
                    if(k != j && tempTable[k][i]["val"] != null){
                        if(tempTable[k][i]["val"] == num){
                            tempTable[j][i]["val"] = num * 2;
                            score += (num*2);
                            tempTable[k][i]["val"] = null;
                            let obj = {
                                oldPosition : tempTable[k][i]["y"],
                                animeCount : (elementXlenght + space) * (j-k),
                                animeX : i,
                                animeY : k,
                                animeYTwo : j,
                                animeName : "down",
                                isDone : false
                            };
                            makeAnimate.push(obj);
                            
                            j = k;
                        }
                            break;
                    }
                }
            }
        }
    }
}




function pullRight(i,j){
                let num = table[i][j]["val"];
                let say = j;
                for(let z=j+1; z<colNum; z++){
                    if(table[i][z]["val"] == null){
                        say++;
                        oldTable = [];
                        
                    } else {
                        //break;
                    }
                }
                /*
                table[i][j]["val"] = null;
                table[i][say]["val"] = num;*/
                
                            let obj = {
                                oldPosition : table[i][j]["x"],
                                animeCount : (elementXlenght + space) * (say-j),
                                animeX : i,
                                animeY : j,
                                animeYTwo : say,
                                animeName : "pullright",
                                isDone : false
                            };
                            
                            makeAnimate.push(obj);
                            //isPull = false;
    if(table != oldTable){
        //findIndexNum(null);
    }
}

function pullLeft(){
    for(let i=0; i<rowNum; i++){
        for(let j=0; j<colNum; j++){
            if(table[i][j]["val"] != null){
                let num = table[i][j]["val"];
                let count = 0;
                for(let k=j; k>=0; k--){
                    if(table[i][k]["val"] == null){
                        table[i][k]["val"] = num;
                        table[i][j+count]["val"] = null;
                        /*
                        let obj = {
                            oldPosition : table[i][k]["x"],
                            animeCount : (elementXlenght + space) * (j-k),
                            animeX : i,
                            animeY : k,
                            animeYTwo : j,
                            animeName : "right",
                            isDone : false,
                            jCount : count
                        };

                        pullAnimate.push(obj);
                            
                           */ 
                        
                        oldTable = [];
                        
                        count--;
                    }
                }
            }
        }
    }
    if(table != oldTable){
        findIndexNum(null);
    }
}

function pullUp(){
    for(let i=0; i<colNum; i++){
        for(let j=0; j<rowNum; j++){
            if(table[j][i]["val"] != null){
                let num = table[j][i]["val"];
                let count = 0;
                for(let k=j; k>=0; k--){
                    if(table[k][i]["val"] == null){
                        table[k][i]["val"] = num;
                        table[j+count][i]["val"] = null;
                        
                        
                        oldTable = [];
                        
                        count--;
                    }
                }
            }
        }
    }
    if(table != oldTable){
        findIndexNum(null);
    }
}

function pullDown(){
    for(let i=0; i<colNum; i++){
        for(let j=rowNum-1; j>=0; j--){
            if(table[j][i]["val"] != null){
                let num = table[j][i]["val"];
                let count = 0;
                for(let k=j; k<rowNum; k++){
                    if(table[k][i]["val"] == null){
                        table[k][i]["val"] = num;
                        table[j+count][i]["val"] = null;
                        
                        oldTable = [];
                        
                        count++;
                    }
                }
            }
        }
    }
    if(table != oldTable){
        findIndexNum(null);
    }
}





function elementCalculate(){
    elementXlenght = (width - space * (rowNum + 1)) / rowNum;
}



function setRandNum(){
    if(isFirstSet){
        findIndexNum(null);
        findIndexNum(2);
        isFirstSet = false;
    } else {
        findIndexNum(null);
    }
}

function findIndexNum(direkt){
    let x = int(random(colNum));
    let y = int(random(rowNum));
    
    if(table[x][y]["val"] == null){
        if(direkt == null){
            table[x][y]["val"] = getRandomNum();
        } else {
            table[x][y]["val"] = 2;

        }
    } else {
        findIndexNum(direkt);
    }
}


function getRandomNum(){
    //let rand = int(random(5));
    let rand2 = random(101);
    
    if(rand2 < 90){
        return 2;
    } else {
        return 4;
    }
}

function createTable(rowNum, colNum){
    let tab = [];
    for(let i=0; i<colNum; i++){
        tab[i] = [];
        for(let j=0; j<rowNum; j++){
            tab[i][j] = {
                x : ((j+1) * (elementXlenght + space) - (elementXlenght - layerX)),
                y : ((i+1) * (elementXlenght + space)  - (elementXlenght - layerY)),
                val : null
            };
        }
    }
    return tab;
    
}


function normalizeTable(){
    for(let i=0; i<colNum; i++){
        for(let j=0; j<rowNum; j++){
                tempTable[i][j]["x"] = ((j+1) * (elementXlenght + space) - (elementXlenght - layerX));
                tempTable[i][j]["y"] = (i+1) * (elementXlenght + space)  - (elementXlenght - layerY);
        }
    }
    
}
