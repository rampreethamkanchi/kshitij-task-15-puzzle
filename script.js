let res = 0;
let x = 0;
let y = 0;
let timeafter = 0;
let moves = 0;
let id = 0;
let nofwin = 0;
let arr = [1];
arr.pop();
let b = 0;
let blank = 0;

// const box0 = document.getElementById("box1");
// const box1 = document.getElementById("box2");
// const box2 = document.getElementById("box3");
// const box3 = document.getElementById("box4");
// const box4 = document.getElementById("box5");
// const box5 = document.getElementById("box6");
// const box6 = document.getElementById("box7");
// const box7 = document.getElementById("box8");
// const box8 = document.getElementById("box9");
const main = document.getElementById("main");
const winMain = document.getElementById("winMain");
const playAgain = document.getElementById("playAgain");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const move = document.getElementById("move");
const time = document.getElementById("time");
const pauseplay = document.getElementById("pauseplay");
const timeTaken = document.getElementById("timeTaken");
const movesTaken = document.getElementById("movesTaken");
const info1 = document.getElementById("info1");
const info4 = document.getElementById("info4");
const leaderBoard = document.getElementById("leaderBoard");
// const inputTag=document.getElementById("inputTag");

function createBoxes(){
    let p=0;
    for(i=0;i<9;i++){
    // p = document.createElement("div");
    // p.
    main.innerHTML+=`<div class="box" id="box${i}"></div>`;
    }
}

function start() {
    clearInterval(id);
    id = 0;
    // createBoxes(n);
// var box = document.getElementsByClassName("box");
    main.style.display = "grid";
    winMain.style.display = "none";
    pause.style.display = "none";
    play.style.display = "none";
    pauseplay.style.display = "none";
    info1.style.display = "block";
    info4.style.display = "block";
    arr = [1];
    arr.pop();
    while (arr.length < 9) {
        r = Math.random();
        random = Math.floor(r * (8)) + 1;
        if (!arr.includes(random)) {
            arr.push(random);
        }
    }
    b = Math.random();
    blank = Math.floor(b * 9);
    arr.splice(blank, 0, " ");
    update();
    updateBlanck(blank);
    moves = 0;
    move.innerHTML = moves;
    timeafter = 0;
    time.innerHTML = "0:00";
}

function updateBlanck(n) {
    x = n % (3);
    y = Math.floor(n / (3));
}

function update() {
    // box0.innerHTML = `${arr[0]}`;
    // box1.innerHTML = `${arr[1]}`;
    // box2.innerHTML = `${arr[2]}`;
    // box3.innerHTML = `${arr[3]}`;
    // box4.innerHTML = `${arr[4]}`;
    // box5.innerHTML = `${arr[5]}`;
    // box6.innerHTML = `${arr[6]}`;
    // box7.innerHTML = `${arr[7]}`;
    // box8.innerHTML = `${arr[8]}`;
// var box = document.getElementsByClassName("box");

    for (i = 0; i < (3)*(3); i++) {
        box[i].innerHTML = `${arr[i]}`;
    }
}
// let f=0; let g=0;
function justexchange(a, b) {
    var l = arr[a];
    arr[a] = arr[b];
    arr[b] = l;
}
function mirror() {
    var bl = 0;
    for (let q = 0; q < 3; q++) {
        for (let j = 0; j < 3; j++) {
            // f=3i+j;
            if (j > q) {
                justexchange((3) * q + j, (3) * j + q);
            }
        }
    }
    update();
    for (let i = 0; i < (3)*(3); i++) {
        if (arr[i] == " ") {
            bl = i;
        }
    }
    updateBlanck(bl);
}

function exchange(a, b) {
    pause.style.display = "block";
    if (!id) {
        clearInterval(id);
        id = setInterval(() => {
            timeafter++;
            if (timeafter % 60 < 10) {
                time.innerHTML = `${Math.floor(timeafter / 60)}:0${
                    timeafter % 60
                }`;
            } else {
                time.innerHTML = `${Math.floor(timeafter / 60)}:${
                    timeafter % 60
                }`;
            }
        }, 1000);
    }
    t = arr[a];
    arr[a] = arr[b];
    arr[b] = t;
    update();
    updateBlanck(b);
    if (winCheck() == 1) {
        nofwin++;
        // winCheck()=0 should be there.
        timeTaken.innerHTML = `Time Taken: ${time.innerHTML}`;
        movesTaken.innerHTML = `Moves Taken: ${Number(move.innerHTML) + 1}`;
        main.style.display = "none";
        winMain.style.display = "block";
        play.style.display = "none";
        pause.style.display = "none";
        info1.style.display = "none";
        info4.style.display = "none";
        localStorage.setItem(`${nofwin}`, `${timeafter}`);
        // console.log(localStorage.getItem(`${nofwin}`));
        res = 0;
        clearInterval(id);
        timeafter = 0;
        // time.innerHTML = "0:00";
    }
    moves++;
    move.innerHTML = moves;
}

function winCheck() {
    // for (i = 0; i < 8; i++) {
    //     if (!(arr[i] == i)) {
    //         res = 1;
    //         break;
    //     }
    // }

    if (arr[0] == 1) {
        res = 1;
    }
    return res;
}

function checkAdjacent(a) {
    let x1 = a % (3);
    let y1 = Math.floor(a / (3));
    if (((x1 - x == 1 || x1 - x == -1) && (y1 - y == 0)) ||((y1 - y == 1 || y1 - y == -1) && (x1 - x == 0)) ) {
        return 1;
    } else return 0;
}

start();
for (let h = 0; h < (3)*(3); h++) {
    function closure(index) {
        box[index].addEventListener("click", () => {
            if (checkAdjacent(index) == 1) {
                exchange((3) * y + x, index);
            }
        });
    }
    closure(h);
}

// box0.addEventListener("click", () => {
//     if (x == 0 && y == 1) {
//         exchange(3, 0);
//     }
//     if (x == 1 && y == 0) {
//         exchange(1, 0);
//     }
// });
// box1.addEventListener("click", () => {
//     if (x == 0 && y == 0) {
//         exchange(0, 1);
//     }
//     if (x == 1 && y == 1) {
//         exchange(4, 1);
//     }
//     if (x == 2 && y == 0) {
//         exchange(2, 1);
//     }
// });
// box2.addEventListener("click", () => {
//     if (x == 2 && y == 1) {
//         exchange(5, 2);
//     }
//     if (x == 1 && y == 0) {
//         exchange(1, 2);
//     }
// });
// box3.addEventListener("click", () => {
//     if (x == 0 && y == 0) {
//         exchange(0, 3);
//     }
//     if (x == 1 && y == 1) {
//         exchange(4, 3);
//     }
//     if (x == 0 && y == 2) {
//         exchange(6, 3);
//     }
// });
// box4.addEventListener("click", () => {
//     if (x == 0 && y == 1) {
//         exchange(3, 4);
//     }
//     if (x == 1 && y == 0) {
//         exchange(1, 4);
//     }
//     if (x == 2 && y == 1) {
//         exchange(5, 4);
//     }
//     if (x == 1 && y == 2) {
//         exchange(7, 4);
//     }
// });
// box5.addEventListener("click", () => {
//     if (x == 2 && y == 0) {
//         exchange(2, 5);
//     }
//     if (x == 1 && y == 1) {
//         exchange(4, 5);
//     }
//     if (x == 2 && y == 2) {
//         exchange(8, 5);
//     }
// });
// box6.addEventListener("click", () => {
//     if (x == 0 && y == 1) {
//         exchange(3, 6);
//     }
//     if (x == 1 && y == 2) {
//         exchange(7, 6);
//     }
// });
// box7.addEventListener("click", () => {
//     if (x == 0 && y == 2) {
//         exchange(6, 7);
//     }
//     if (x == 1 && y == 1) {
//         exchange(4, 7);
//     }
//     if (x == 2 && y == 2) {
//         exchange(8, 7);
//     }
// });
// box8.addEventListener("click", () => {
//     if (x == 2 && y == 1) {
//         exchange(5, 8);
//     }
//     if (x == 1 && y == 2) {
//         exchange(7, 8);
//     }
// });
playAgain.addEventListener("click", () => {
    start();
});
pause.addEventListener("click", () => {
    clearInterval(id);
    pause.style.display = "none";
    play.style.display = "block";
    pauseplay.style.display = "block";
    main.style.display = "none";
    winMain.style.display = "none";
    info4.style.display ="none";
});
play.addEventListener("click", () => {
    id = setInterval(() => {
        timeafter++;
        if (timeafter % 60 < 10) {
            time.innerHTML = `${Math.floor(timeafter / 60)}:0${timeafter % 60}`;
        } else {
            time.innerHTML = `${Math.floor(timeafter / 60)}:${timeafter % 60}`;
        }
    }, 1000);
    pause.style.display = "block";
    play.style.display = "none";
    pauseplay.style.display = "none";
    main.style.display = "grid";
    winMain.style.display = "none";
    info4.style.display ="block";
});
info1.addEventListener("click", () => {
    start();
});
leaderBoard.addEventListener("click", () => {
    window.open("./leaderBoard.html", "_blank");
});
info4.addEventListener("click", () => {
    mirror();
});
