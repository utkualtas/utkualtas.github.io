let rowNum = 4;
let colNum = 4;
let table = [];
let oldTable = [];
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
    2048 : "#EDF650"
};

function setup() {
    // put setup code here
    let cnvs = createCanvas(800,950);
    cnvs.style("display", "block");
    cnvs.style("margin", "0px auto");
    background(0);
    elementCalculate();
    createTable(rowNum, colNum); 
    setRandNum();
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
    playAnimation(makeAnimate,"move");
    //playAnimation(makeAnimate,"pull");
    

    for(let i=1; i<=rowNum; i++){       
        for(let j=1; j<=colNum; j++){
            if(table[i-1][j-1]["val"] != null){
                //fill(table[i-1][j-1].toString());
                fill(colors[table[i-1][j-1]["val"]]);
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
    console.clear();
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
        createTable(rowNum, colNum); 
        setRandNum();
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
                
                if(animeName == "right"){
                    if(table[i][k]["x"] <= (oldPos + animeCount)){
                        table[i][k]["x"] += 20;
                    } else {
                        makeAnimate[z]["isDone"] = true;
                    }
                } else if(animeName == "left"){
                    if(table[i][k]["x"] >= (oldPos - animeCount)){
                        table[i][k]["x"] -= 20;
                    } else {
                        makeAnimate[z]["isDone"] = true;
                    }
                } else if(animeName == "up"){
                    if(table[k][i]["y"] >= (oldPos - animeCount)){
                        table[k][i]["y"] -= 20;
                    } else {
                        makeAnimate[z]["isDone"] = true;
                    }
                } else if(animeName == "down"){
                    if(table[k][i]["y"] <= (oldPos + animeCount)){
                        table[k][i]["y"] += 20;
                    } else {
                        makeAnimate[z]["isDone"] = true;
                    }
                }
                
            }
        } else {
            for(let z=0; z<animes.length; z++){
                let oldPos = animes[z]["oldPosition"];
                let animeCount = animes[z]["animeCount"];
                let i = animes[z]["animeX"];
                let k = animes[z]["animeY"];
                let j = animes[z]["animeYTwo"];
                let animeName = animes[z]["animeName"];
                //console.log(oldPos);
                aName = animeName;
                
                if(animeName == "right"){
                    table[i][j]["val"] = table[i][j]["val"] * 2;
                    score += table[i][j]["val"];
                    table[i][k]["val"] = null;
                    table[i][k]["x"] = oldPos;                    
                } else if(animeName == "left"){
                    table[i][j]["val"] = table[i][j]["val"] * 2;
                    score += table[i][j]["val"];
                    table[i][k]["val"] = null;
                    table[i][k]["x"] = oldPos; 
                } else if(animeName == "up"){
                    table[j][i]["val"] = table[j][i]["val"] * 2;
                    score += table[j][i]["val"];
                    table[k][i]["val"] = null;
                    table[k][i]["y"] = oldPos; 
                } else if(animeName == "down"){
                    table[j][i]["val"] = table[j][i]["val"] * 2;
                    score += table[j][i]["val"];
                    table[k][i]["val"] = null;
                    table[k][i]["y"] = oldPos; 
                    
                }
                
                makeAnimate.splice(z, 1);
                z--;
            }
            if(aName == "right"){
                pullRight();    
            } else if(aName == "left"){
                pullLeft();
            } else if(aName == "up"){
                pullUp();
            } else if(aName == "down"){
                pullDown();
            }
            
            normalizeTable();
        }
        
        
    
    } else {
        isMoving = false;
        isPull = true;
        
    }
    
}


function moveRight(){
    for(let i=0; i<rowNum; i++){
        for(let j = colNum-1; j>=0; j--){
            if(table[i][j]["val"] != null){
                let num = table[i][j]["val"];
                for(let k=j-1; k>=0; k--){
                    if(k !=j && table[i][k]["val"] != null){               
                        if(table[i][k]["val"] == num){
                            //For animation
                            /*
                            makeAnimate["oldPosition"] = table[i][k]["x"];
                            makeAnimate["animeCount"] = (elementXlenght + space) * (j-k);
                            makeAnimate["animeX"] = i;
                            makeAnimate["animeY"] = k;
                            makeAnimate["animeYTwo"] = j;
                            makeAnimate["animeName"] = "right";
                            */
                            
                            let obj = {
                                oldPosition : table[i][k]["x"],
                                animeCount : (elementXlenght + space) * (j-k),
                                animeX : i,
                                animeY : k,
                                animeYTwo : j,
                                animeName : "right",
                                isDone : false
                            };
                            
                            makeAnimate.push(obj);
                            isPull = false;
                            
                            /*
                            table[i][j]["val"] = num * 2;
                            table[i][k]["val"] = null;
                            */
                            j = k-1;
                            
                        }                
                        break;
                        
                    }
                }
                
            }
        }
    }
    isMoving = true;
    if(isPull){
        pullRight();
    }
    
}

function moveLeft(){
    for(let i=0; i<rowNum; i++){
        for(let j=0; j<colNum; j++){
            if(table[i][j]["val"] != null){
                let num = table[i][j]["val"];
                for(let k=j+1; k<colNum; k++){
                    if(k !=j && table[i][k]["val"] != null){
                        if(table[i][k]["val"] == num && k != j){
                            //table[i][j]["val"] = num * 2;
                            //table[i][k]["val"] = null;
                            
                            let obj = {
                                oldPosition : table[i][k]["x"],
                                animeCount : (elementXlenght + space) * (k-j),
                                animeX : i,
                                animeY : k,
                                animeYTwo : j,
                                animeName : "left",
                                isDone : false
                            };
                            
                            makeAnimate.push(obj);
                            isPull = false;
                            
                            j = k+1;
                        
                        }
                        break;
                    }
                }
            }
        }
    }
    isMoving = true;
    if(isPull){
        pullLeft();
    }
    //findIndexNum();
}

function moveUp(){
    for(let i=0; i<colNum; i++){
        for(let j=0; j<rowNum; j++){
            if(table[j][i]["val"] != null){
                let num = table[j][i]["val"];
                for(let k=j+1; k<rowNum; k++){
                    if(k != j && table[k][i]["val"] != null){
                        if(table[k][i]["val"] == num){
                            //table[j][i]["val"] = num * 2;
                            //table[k][i]["val"] = null;
                            
                            let obj = {
                                oldPosition : table[k][i]["y"],
                                animeCount : (elementXlenght + space) * (k-j),
                                animeX : i,
                                animeY : k,
                                animeYTwo : j,
                                animeName : "up",
                                isDone : false
                            };
                            
                            makeAnimate.push(obj);
                            isPull = false;
                            
                            j = k+1;
                            
                        }
                        break;
                    }
                }
            }
        }
    }
    isMoving = true;
    if(isPull){
        pullUp();
    }
    //findIndexNum();   
}

function moveDown(){
    for(let i=0; i<colNum; i++){
        for(let j=rowNum-1; j>=0; j--){
            if(table[j][i]["val"] != null){
                let num = table[j][i]["val"];
                for(let k=j-1; k>=0; k--){
                    if(k != j && table[k][i]["val"] != null){
                        if(table[k][i]["val"] == num && k != j){
                            //table[j][i]["val"] = num * 2;
                            //table[k][i]["val"] = null;
                            
                            let obj = {
                                oldPosition : table[k][i]["y"],
                                animeCount : (elementXlenght + space) * (j-k),
                                animeX : i,
                                animeY : k,
                                animeYTwo : j,
                                animeName : "down",
                                isDone : false
                            };
                            
                            makeAnimate.push(obj);
                            isPull = false;
                            
                            j = k-1;
                            
                        }
                        break;
                    }
                }
            }
        }
    }
    isMoving = true;
    if(isPull){
        pullDown();
    }
    //findIndexNum();   
}




function pullRight(){
    for(let i=0; i<rowNum; i++){
        for(let j=colNum-1; j>=0; j--){
            if(table[i][j]["val"] != null){
                let num = table[i][j]["val"];
                let count = 0;
                for(let k=j; k<colNum; k++){
                    if(table[i][k]["val"] == null){
                        table[i][k]["val"] = num;
                        table[i][k-1]["val"] = null;
                        /*
                        let obj = {
                            oldPosition : table[i][k]["x"],
                            animeCount : (elementXlenght + space) * (j-k),
                            animeX : i,
                            animeY : k,
                            animeYTwo : j,
                            animeName : "right",
                            isDone : false
                        };

                        pullAnimate.push(obj);
                        */
                        
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
    
    /*
    if(rand == 2 || rand == 4){
        return rand;
    } else {
        return getRandomNum();
    }
    */
}

function createTable(rowNum, colNum){
    for(let i=0; i<colNum; i++){
        table[i] = [];
        for(let j=0; j<rowNum; j++){
            table[i][j] = {
                x : ((j+1) * (elementXlenght + space) - (elementXlenght - layerX)),
                y : ((i+1) * (elementXlenght + space)  - (elementXlenght - layerY)),
                val : null
            };
        }
    }
    
}


function normalizeTable(){
    for(let i=0; i<colNum; i++){
        for(let j=0; j<rowNum; j++){
                table[i][j]["x"] = ((j+1) * (elementXlenght + space) - (elementXlenght - layerX));
                table[i][j]["y"] = (i+1) * (elementXlenght + space)  - (elementXlenght - layerY);
        }
    }
    
}
