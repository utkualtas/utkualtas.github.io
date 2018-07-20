let rowNum = 4;
let colNum = 4;
let table = new Array();
let oldTable = new Array();
let tempTable = new Array();
let isFirstSet = true;

let cnvWidth = 800;

let width = 600;
let height = 600;
let space = 16;

let layerX = (cnvWidth - width)/2;
let layerY = 160;

let elementXlenght = 0.0;
let sizeText = 60;
/* ANIME EFFECT VERIABLES ---------------------------------------------------------------- */
let animeSpeed = 6.0; // More less is more faster
let makeAnimate = [];
let pullAninamte = [];

/* SHAKE EFFECT VERIABLES ---------------------------------------------------------------- */
let shakeList = [];
let shakeLimit = 26.0;
let shakeSpeed = 10.0;
let isShaked = true;
let isGrow = false;

/* APPEAR EFFECT VERIABLES ---------------------------------------------------------------- */
let appearIndex = null;

let a = [1,2,3];
let b = [1,2,3];

let keyStack = [];
let keyOnline = false;


let isMoving = false;

let score = 0;


let colors = {
    2: "#EEE4DA",
    4: "#EDE0C8",
    8: "#F2B179",
    16: "#F59563",
    32: "#F67C5F",
    64: "#F65E3B",
    128: "#EDCF72",
    256: "#EDCC61",
    512: "#EDC850",
    1024: "#EDD150",
    2048: "#EDF650",
    default: "#121212"
};

function setup() {
    // put setup code here
    let cnvs = createCanvas(cnvWidth, windowHeight);
    cnvs.style("display", "block");
    cnvs.style("margin", "0px auto");
    //background(0);
    elementCalculate();
    table = createTable(rowNum, colNum);
    setRandNum();
    tempTable = JSON.parse(JSON.stringify(table));
}


function draw() {
    // put drawing code here
    console.log("looping");

    background(255);
    fill("#BBADA0");
    noStroke();
    rect(layerX, layerY, width, height, 8);

    //rect(100, 20, 200, 20);
    textStyle(NORMAL);
    textSize(100);
    text("2048", 100, 110);

    rect(590, 40, 110, 62,8);
    rect(420, 40, 150, 62,8);
    textSize(18);
    textStyle(BOLD);
    fill("#776E65");
    text("YENİ OYUN", 444, 74);

    textSize(18);
    text("SCORE\n     " + score, 612, 62);


    for (let i = 1; i <= rowNum; i++) {
        for (let j = 1; j <= colNum; j++) {
            fill("#CDC0B4");
            noStroke();
            rect(i * (elementXlenght + space) - (elementXlenght - layerX), j * (elementXlenght + space) - (elementXlenght - layerY), elementXlenght, elementXlenght,8);
        }
    }
    //playAnimation(makeAnimate,"pull");

    playAnimation(makeAnimate);
    appearNum();

    for (let i = 1; i <= rowNum; i++) {
        for (let j = 1; j <= colNum; j++) {
            if (table[i - 1][j - 1]["val"] != null) {
                //fill(table[i-1][j-1].toString());
                if (colors[table[i - 1][j - 1]["val"]] == undefined) {
                    fill(colors["default"]);
                } else {
                    fill(colors[table[i - 1][j - 1]["val"].toString()]);
                }
                noStroke();
                rect(table[i - 1][j - 1]["x"], table[i - 1][j - 1]["y"], table[i-1][j-1]["lengthX"], table[i-1][j-1]["lengthY"], 8);
                textSize(table[i-1][j-1]["textSize"]);
                textStyle(BOLD);
                if (table[i - 1][j - 1]["val"] > 4) {
                    fill("#F9F6F2");
                } else {
                    fill("#776E65");
                }
                let numText = table[i - 1][j - 1]["val"].toString();
                text(numText, table[i - 1][j - 1]["x"] + table[i-1][j-1]["lengthX"] / 2 - textWidth(numText) / 2, table[i - 1][j - 1]["y"] + table[i-1][j-1]["lengthY"] / 2 + textDescent(numText));
                //say++;
            }
        }
    }


}


function watchTable() {
    //This function just for debug and see table on the console
    //console.clear();
    for (let i = 0; i < 4; i++) {
        //for(let j=0; j<table[i].length; j++){
        let a = (JSON.stringify(table[i], ["val"])).replace('"val":', '').replace('"val":', '').replace('"val":', '').replace('"val":', '').replace('null', '0').replace('null', '0').replace('null', '0').replace('null', '0');

        console.log("Satir: " + i + "  " + a);
        //}
    }
}

function mousePressed() {
    if (mouseX >= 420 && mouseX <= 570 && mouseY >= 40 && mouseY <= 102) {
        score = 0;
        isFirstSet = true;
        elementCalculate();
        table = createTable(rowNum, colNum);
        setRandNum();
        tempTable = JSON.parse(JSON.stringify(table));
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        //oldTable = table;
        //moveLeft();
        keyStack.push("left");
        keyOnline = true;
        redraw();
        //startStack();
        //loop();
        //watchTable();
    } else if (keyCode === RIGHT_ARROW) {
        //oldTable = table;
        //moveRight();
        keyStack.push("right");
        keyOnline = true;
        redraw();
        //startStack();
        //loop();
        //watchTable();
    } else if (keyCode === UP_ARROW) {
        //oldTable = table;
        //moveUp();
        keyStack.push("up");
        keyOnline = true;
        redraw();
        //loop();
        //watchTable();
    } else if (keyCode === DOWN_ARROW) {
        //oldTable = table;
        //moveDown();
        keyStack.push("down");
        keyOnline = true;
        redraw();
        //loop();
        //watchTable();
    }
    console.log(keyStack);
}

function playAnimation(animes) {
    let isDone = true;
    let aName = null;
    //oldTable = [];
    if (animes.length != 0) {
        for (let i = 0; i < animes.length; i++) {
            if (animes[i]["isDone"] == false) {
                isDone = false;
                break;
            }
        }

        if (!isDone) {
            for (let z = 0; z < animes.length; z++) {
                let oldPos = animes[z]["oldPosition"];
                let animeCount = animes[z]["animeCount"];
                let i = animes[z]["animeX"];
                let k = animes[z]["animeY"];
                let j = animes[z]["animeYTwo"];
                let animeName = animes[z]["animeName"];

                let sum = animeCount / animeSpeed;

                if (animeName == "right") {
                    if (table[i][k]["x"] < (oldPos + animeCount)) {
                        if (table[i][k]["x"] + sum > (oldPos + animeCount)) {
                            table[i][k]["x"] = oldPos + animeCount;
                        } else {
                            table[i][k]["x"] += sum;
                        }
                    } else {
                        makeAnimate[z]["isDone"] = true;
                    }
                } else if (animeName == "left") {
                    if (table[i][k]["x"] > (oldPos - animeCount)) {
                        if (table[i][k]["x"] - sum < (oldPos - animeCount)) {
                            table[i][k]["x"] = oldPos - animeCount;
                        } else {
                            table[i][k]["x"] -= sum;
                        }
                    } else {
                        makeAnimate[z]["isDone"] = true;
                    }
                } else if (animeName == "up") {
                    if (table[k][i]["y"] > (oldPos - animeCount)) {
                        if (table[k][i]["y"] - sum < (oldPos - animeCount)) {
                            table[k][i]["y"] = oldPos - animeCount;
                        } else {
                            table[k][i]["y"] -= sum;
                        }
                    } else {
                        makeAnimate[z]["isDone"] = true;
                    }
                } else if (animeName == "down") {
                    if (table[k][i]["y"] < (oldPos + animeCount)) {
                        if (table[k][i]["y"] + sum > (oldPos + animeCount)) {
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
            for (let z = 0; z < animes.length; z++) {
                makeAnimate.splice(z, 1);
                z--;
            }

            table = JSON.parse(JSON.stringify(tempTable));
            if (table != oldTable) {
                findIndexNum(null);
                tempTable = table.slice(0);
            }
            table = JSON.parse(JSON.stringify(tempTable));
            keyStack.splice(0,1);
        }
        



    } else {
        
        if(shakeList.length > 0){
            isShaked = false;
            for(let i=0; i<shakeList.length; i++){
                let x = shakeList[i]["i"];
                let y = shakeList[i]["j"];
                if(!isGrow && table[x][y]["lengthX"] < elementXlenght + shakeLimit){
                    //console.log("table = " + table[x][y]["lengthX"] );
                    //console.log("deger = " + (elementXlenght + shakeLimit));
                    isGrow = false;
                } else {
                    isGrow = true;
                }
                if(!isGrow){
                    table[x][y]["x"] -= shakeSpeed/2;
                    table[x][y]["y"] -= shakeSpeed/2;
                    table[x][y]["lengthX"] += shakeSpeed;
                    table[x][y]["lengthY"] += shakeSpeed;
                    table[x][y]["textSize"] += shakeSpeed;
                    tempTable[x][y]["x"] -= shakeSpeed/2;
                    tempTable[x][y]["y"] -= shakeSpeed/2;
                    tempTable[x][y]["lengthX"] += shakeSpeed;
                    tempTable[x][y]["lengthY"] += shakeSpeed;
                    tempTable[x][y]["textSize"] += shakeSpeed;
                } else {
                    if(table[x][y]["lengthX"] > elementXlenght){
                        table[x][y]["x"] += shakeSpeed/2;
                        table[x][y]["y"] += shakeSpeed/2;
                        table[x][y]["lengthX"] -= shakeSpeed;
                        table[x][y]["lengthY"] -= shakeSpeed;
                        table[x][y]["textSize"] -= shakeSpeed;
                        tempTable[x][y]["x"] += shakeSpeed/2;
                        tempTable[x][y]["y"] += shakeSpeed/2;
                        tempTable[x][y]["lengthX"] -= shakeSpeed;
                        tempTable[x][y]["lengthY"] -= shakeSpeed;
                        tempTable[x][y]["textSize"] -= shakeSpeed;
                        
                    } else {
                        isGrow = false;
                        isShaked = true;
                        shakeList = [];
                    }
                }
            }
        }
        if(keyStack.length > 0){
           keyOnline = true;
        } else {
            keyOnline = false;
        }
        
        if(isShaked && appearIndex == null){
            isMoving = false;
            if(!keyOnline){
                noLoop();        
            }
        }
        
        if(!isMoving && keyStack.length > 0){
            let name = keyStack[0];
            if(name === "right"){
                //oldtable = table.slice(0);
                //oldtable = tempTable;
                oldTable = JSON.parse(JSON.stringify(table));
                moveRight();
            } else if(name === "left"){
                //oldtable = table.slice(0);
                //oldtable = tempTable;
                oldTable = JSON.parse(JSON.stringify(table));
                moveLeft();
            } else if(name === "up"){
                //oldtable = table.slice(0);
                //oldtable = tempTable;
                oldTable = JSON.parse(JSON.stringify(table));
                moveUp();
            } else if(name === "down"){
                //oldtable = table.slice(0);
                //oldtable = tempTable;
                oldTable = JSON.parse(JSON.stringify(table));
                moveDown();
            }
            if(JSON.stringify(table)==JSON.stringify(oldTable)){
                keyStack.splice(0,1);
            }
            loop();
        }
        
        
    }

}

function startStack(){
    if(!isMoving && keyStack.length > 0){
            let name = keyStack[0];
            if(name === "right"){
                moveRight();
            } else if(name === "left"){
                moveLeft();
            } else if(name === "up"){
                moveUp();
            } else if(name === "down"){
                moveDown();
            }
            loop();
        }
}


function moveRight() {
    //oldTable = table;
    oldTable = table.slice(0);
    isMoving = true;
    for (let i = 0; i < rowNum; i++) {

        for (let j = colNum - 1; j >= 0; j--) {

            if (tempTable[i][j]["val"] != null) {
                let num = tempTable[i][j]["val"];
                let say = j;
                for (let z = j + 1; z < colNum; z++) {
                    if (tempTable[i][z]["val"] == null) {
                        say++;
                        oldTable = [];
                    } else {
                        break;
                    }
                }

                if (say - j > 0) {
                    let tmp = tempTable[i][j]["val"];
                    tempTable[i][say]["val"] = tmp;
                    tempTable[i][j]["val"] = null;
                    let obj = {
                        oldPosition: tempTable[i][j]["x"],
                        animeCount: (elementXlenght + space) * (say - j),
                        animeX: i,
                        animeY: j,
                        animeYTwo: say,
                        animeName: "right",
                        isDone: false
                    };
                    makeAnimate.push(obj);
                    j = say;
                }

                num = tempTable[i][j]["val"];
                for (let k = j - 1; k >= 0; k--) {
                    if (k != j && tempTable[i][k]["val"] != null) {
                        if (tempTable[i][k]["val"] == num) {

                            tempTable[i][j]["val"] = num * 2;
                            score += (num * 2);
                            tempTable[i][k]["val"] = null;
                            //For animation
                            let obj = {
                                oldPosition: tempTable[i][k]["x"],
                                animeCount: (elementXlenght + space) * (j - k),
                                animeX: i,
                                animeY: k,
                                animeYTwo: j,
                                animeName: "right",
                                isDone: false
                            };
                            makeAnimate.push(obj);
                            oldTable = [];
                            shakeList.push({
                                i : i,
                                j : j
                            });
                            
                            j = k;
                        }
                        break;
                    }
                }
            }
        }
    }
}


function debugTable(tab) {  //For set table usage: debugTable([0,0,0,0 ,2,0,0,0 ,4,0,0,0 ,4,0,0,0]);
    let say = 0;
    for (let i = 0; i < rowNum; i++) {
        for (let j = 0; j < colNum; j++) {
            if (tab[say] != 0) {

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

function moveLeft() {
    //oldTable = table;
    oldTable = table.slice(0);
    isMoving = true;
    for (let i = 0; i < rowNum; i++) {
        for (let j = 0; j < colNum; j++) {
            if (tempTable[i][j]["val"] != null) {
                let num = tempTable[i][j]["val"];

                let say = j;
                for (let z = j - 1; z > -1; z--) {
                    if (tempTable[i][z]["val"] == null) {
                        say--;
                        oldTable = [];
                    } else {
                        break;
                    }
                }

                if (j - say > 0) {
                    let tmp = tempTable[i][j]["val"];
                    tempTable[i][say]["val"] = tmp;
                    tempTable[i][j]["val"] = null;
                    let obj = {
                        oldPosition: tempTable[i][j]["x"],
                        animeCount: (elementXlenght + space) * (j - say),
                        animeX: i,
                        animeY: j,
                        animeYTwo: say,
                        animeName: "left",
                        isDone: false
                    };
                    makeAnimate.push(obj);
                    j = say;
                }

                num = tempTable[i][j]["val"];
                for (let k = j + 1; k < colNum; k++) {
                    if (k != j && tempTable[i][k]["val"] != null) {
                        if (tempTable[i][k]["val"] == num && k != j) {
                            tempTable[i][j]["val"] = num * 2;
                            score += (num * 2);
                            tempTable[i][k]["val"] = null;

                            let obj = {
                                oldPosition: tempTable[i][k]["x"],
                                animeCount: (elementXlenght + space) * (k - j),
                                animeX: i,
                                animeY: k,
                                animeYTwo: j,
                                animeName: "left",
                                isDone: false
                            };
                            makeAnimate.push(obj);
                            oldTable = [];
                            shakeList.push({
                                i : i,
                                j : j
                            });
                            j = k;
                        }
                        break;
                    }
                }
            }
        }
    }
}

function moveUp() {
    //oldTable = table;
    oldTable = table.slice();
    isMoving = true;
    for (let i = 0; i < colNum; i++) {
        for (let j = 0; j < rowNum; j++) {
            if (tempTable[j][i]["val"] != null) {

                let num = tempTable[j][i]["val"];

                let say = j;
                for (let z = j - 1; z > -1; z--) {
                    if (tempTable[z][i]["val"] == null) {
                        say--;
                        oldTable = [];
                    } else {
                        break;
                    }
                }

                if (j - say > 0) {
                    let tmp = tempTable[j][i]["val"];
                    tempTable[say][i]["val"] = tmp;
                    tempTable[j][i]["val"] = null;
                    let obj = {
                        oldPosition: tempTable[j][i]["y"],
                        animeCount: (elementXlenght + space) * (j - say),
                        animeX: i,
                        animeY: j,
                        animeYTwo: say,
                        animeName: "up",
                        isDone: false
                    };
                    makeAnimate.push(obj);
                    j = say;
                }

                num = tempTable[j][i]["val"];
                for (let k = j + 1; k < rowNum; k++) {
                    if (k != j && tempTable[k][i]["val"] != null) {
                        if (tempTable[k][i]["val"] == num) {
                            tempTable[j][i]["val"] = num * 2;
                            score += (num * 2);
                            tempTable[k][i]["val"] = null;
                            let obj = {
                                oldPosition: tempTable[k][i]["y"],
                                animeCount: (elementXlenght + space) * (k - j),
                                animeX: i,
                                animeY: k,
                                animeYTwo: j,
                                animeName: "up",
                                isDone: false
                            };
                            makeAnimate.push(obj);
                            oldTable = [];
                            shakeList.push({
                                i : j,
                                j : i
                            });
                            j = k;
                        }
                        break;
                    }
                }
            }
        }
    }
}

function moveDown() {
    //oldTable = table;
    oldTable = table.slice();
    isMoving = true;
    for (let i = 0; i < rowNum; i++) {
        for (let j = colNum - 1; j >= 0; j--) {
            if (tempTable[j][i]["val"] != null) {

                let num = tempTable[j][i]["val"];
                let say = j;
                for (let z = j + 1; z < colNum; z++) {
                    if (tempTable[z][i]["val"] == null) {
                        say++;
                        oldTable = [];
                    } else {
                        break;
                    }
                }

                if (say - j > 0) {
                    let tmp = tempTable[j][i]["val"];
                    tempTable[say][i]["val"] = tmp;
                    tempTable[j][i]["val"] = null;
                    let obj = {
                        oldPosition: tempTable[j][i]["y"],
                        animeCount: (elementXlenght + space) * (say - j),
                        animeX: i,
                        animeY: j,
                        animeYTwo: say,
                        animeName: "down",
                        isDone: false
                    };
                    makeAnimate.push(obj);
                    j = say;
                }

                num = tempTable[j][i]["val"];
                for (let k = j - 1; k >= 0; k--) {
                    if (k != j && tempTable[k][i]["val"] != null) {
                        if (tempTable[k][i]["val"] == num) {
                            tempTable[j][i]["val"] = num * 2;
                            score += (num * 2);
                            tempTable[k][i]["val"] = null;
                            let obj = {
                                oldPosition: tempTable[k][i]["y"],
                                animeCount: (elementXlenght + space) * (j - k),
                                animeX: i,
                                animeY: k,
                                animeYTwo: j,
                                animeName: "down",
                                isDone: false
                            };
                            makeAnimate.push(obj);
                            oldTable = [];
                            shakeList.push({
                                i : j,
                                j : i
                            });
                            j = k;
                        }
                        break;
                    }
                }
            }
        }
    }
}

function elementCalculate() {
    elementXlenght = (width - space * (rowNum + 1)) / rowNum;
	sizeText = elementXlenght / 2;
}

function setRandNum() {
    if (isFirstSet) {
        findIndexNum(null);
        findIndexNum(2);
        isFirstSet = false;
    } else {
        findIndexNum(null);
    }
}

function findIndexNum(direkt) {
    let x = int(random(colNum));
    let y = int(random(rowNum));

    if (table[x][y]["val"] == null) {
        if (direkt == null) {
            table[x][y]["val"] = getRandomNum();
        } else {
            table[x][y]["val"] = 2;
        }
        if(!isFirstSet){
            
        table[x][y]["x"] += elementXlenght/2;  
        table[x][y]["y"] += elementXlenght/2;
        table[x][y]["lengthX"] = 0;
        table[x][y]["lengthY"] = 0;
        table[x][y]["textSize"] = 0;
        
        appearIndex = {
            i : x,
            j : y
        };
        }
    } else {
        findIndexNum(direkt);
    }
}

function appearNum(){
    if(appearIndex != null){
            let x = appearIndex["i"];
            let y = appearIndex["j"];
            if(table[x][y]["lengthX"] < elementXlenght){
                speed = 26.0;
                table[x][y]["x"] -= speed/2;
                table[x][y]["y"] -= speed/2;
                table[x][y]["lengthX"] += speed;
                table[x][y]["lengthY"] += speed;
                table[x][y]["textSize"] += sizeText / (elementXlenght/speed);
                tempTable[x][y]["x"] -= speed/2;
                tempTable[x][y]["y"] -= speed/2;
                tempTable[x][y]["lengthX"] += speed;
                tempTable[x][y]["lengthY"] += speed;
                tempTable[x][y]["textSize"] += sizeText / (elementXlenght/speed);
                
            } else {
                appearIndex = null;
            }
        }
}

function getRandomNum() {
    let rand2 = random(101);
    if (rand2 < 90) {
        return 2;
    } else {
        return 4;
    }
}


function createTable(rowNum, colNum) {
    let tab = [];
    for (let i = 0; i < colNum; i++) {
        tab[i] = [];
        for (let j = 0; j < rowNum; j++) {
            tab[i][j] = {
                x: ((j + 1) * (elementXlenght + space) - (elementXlenght - layerX)),
                y: ((i + 1) * (elementXlenght + space) - (elementXlenght - layerY)),
                lengthX : elementXlenght,
                lengthY : elementXlenght,
                textSize : sizeText,
                val: null
            };
        }
    }
    return tab;

}
