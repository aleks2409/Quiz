// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        imgSrc : "img/africa.jpg",
        choiceA : "Africa",
        choiceB : "Europe",
        choiceC : "Antarctica",
        correct : "A"
    },{
        imgSrc : "img/europe.jpg",
        choiceA : "Oceania",
        choiceB : "Europe",
        choiceC : "Asia",
        correct : "B"
    },{
        imgSrc : "img/north_a.jpg",
        choiceA : "South America",
        choiceB : "Africa",
        choiceC : "North America",
        correct : "C"
    },{
        imgSrc : "img/antarctica.jpg",
        choiceA : "Asia",
        choiceB : "Europe",
        choiceC : "Antarctica",
        correct : "C"
    },
    {
        imgSrc : "img/asia.jpg",
        choiceA : "Asia",
        choiceB : "Africa",
        choiceC : "Oceania",
        correct : "A"
    },
];

// create some variables


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(3750 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 3000) ? "" :
              (scorePerCent >= 2250) ? "" :
              (scorePerCent >= 1500) ? "" :
              (scorePerCent >= 750) ? "" :
              "";
    
    scoreDiv.innerHTML += "<p> Your Score </br>"+ scorePerCent +" pts</p>";
}





















