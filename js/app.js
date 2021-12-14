function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// variable
const deck = document.querySelector("#deck");
const stars = document.querySelectorAll("#heart li");
const moves = document.querySelector("#moves");
const timer = document.querySelector("#timer");
const restart = document.querySelector("#restart");
const cardToShuffle = document.querySelectorAll("#deck li");
let arr = Array.from(cardToShuffle)
let openCards = [];
let movesCounter = 0;
let timerOut = true;
let match = 0;
let time = 0;
let timerId = 0;

//function
reShuffle()
//==============================================
function reShuffle(){
    
    let shuffled =  shuffle(arr);
    for(let card of shuffled){
        deck.appendChild(card);
    }
  }
//==============================================

function validClick(click){
    return click.classList.contains("card")&&!click.classList.contains("match")&&!openCards.includes(click)&&openCards.length <2;
}

//==============================================
function addMove(){
    movesCounter++;
    moves.innerHTML = movesCounter;
}
//==============================================
function resetMove(){
    movesCounter=0;
    moves.innerHTML = 0;
}
//==============================================
function removeStars(){
    if(movesCounter==8){
        stars[0].style.display = "none";
    }
    if(movesCounter==16){
        stars[1].style.display = "none";
    }
    if(movesCounter==24){
        stars[2].style.display = "none";
        resetGame();
    }
}
//=========================
function resetStars(){
    for(let star of stars){
        if(star.style.display=="none"){
            star.style.display="inline"
        }
    }
}

//==============================================
function resetMatch(){
    for(let item of deck.children){
        item.classList.remove("match","open")
    }
}
//==============================================
function resetGame(){
    stopTimer()
    resetMove();
    resetStars()
    resetMatch()
    reShuffle()
    match=0;
    openCards=[];
}
//==============================================
function checkMatch(){
    
    if(openCards[0].children[0].className === openCards[1].children[0].className){
        console.log(openCards);
        openCards[0].classList.add("match");
        openCards[1].classList.add("match");
        openCards = [];
        match++;

        if(match==8){
            setTimeout(() => {
                win()
        }, 1000); 
        }
    }
    else{
        setTimeout(()=>{
            openCards[0].classList.toggle("open");
            openCards[1].classList.toggle("open");
            openCards = [];
        },1000)
    }
}
 function win(){
    alert('You Win')
}

//==============================================
function timerCount(){

        let min = Math.floor(time/60);
        let sec = time%60;
        time++;
        if(sec <10){
            timer.innerHTML=`${min}:0${sec}`
        }
        else {
            timer.innerHTML=`${min}:${sec}`
        }
}
//==============================================
function initTime(){
timerOut = false;
timerId = setInterval(() => {
    timerCount();
}, 1000);
}
// ======================================
  function stopTimer(){
    timerOut = true;
    clearInterval(timerId);
    time=0;
    timerCount();
    
}
//==============================================
deck.addEventListener("click",(event)=>{
    target = event.target;
    if(validClick(target)){
        if(timerOut){
            initTime();
        }
    target.classList.toggle("open")
    openCards.push(target);

    if(openCards.length ==2){
        checkMatch();
        addMove();
        if(movesCounter >= 8 && match<8){
            removeStars();
        }
    }
   }
})

restart.addEventListener("click",resetGame);