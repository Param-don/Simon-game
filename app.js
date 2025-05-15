let gameSeq = [];
let userSeq = [];
let btns = ["green", "red", "yellow", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if (started === false) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    // Change background to green when user clicks
    btn.style.backgroundColor = "lightgreen";
    setTimeout(function() {
        // Reset to original color after flash
        btn.style.backgroundColor = "";
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    
    gameFlash(randBtn);
}

function checkAnswer(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>. <br>Press any key to restart.`;
        document.body.classList.add("wrong");
        setTimeout(() => {
            document.body.classList.remove("wrong");
        }, 250);
        startOver();
    }
}

function startOver() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", function() {
        if (!started) return;
        
        let userColor = this.classList[1];
        userSeq.push(userColor);
        
        userFlash(this);  // This will now flash green
        checkAnswer(userSeq.length - 1);
    });
}