const quizData = [
    {
        question: "Which mountain is the highest in the world?",
        options: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"],
        answer: 1
    },
    {
        question: "Which desert is the largest hot desert on Earth?",
        options: ["Gobi Desert", "Arabian Desert", "Sahara Desert", "Kalahari Desert"],
        answer: 2
    },
    {
        question: "Which compass direction is opposite to East?",
        options: ["North", "West", "South", "North-East"],
        answer: 1
    },
    {
        question: "Which ocean is the largest on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        answer: 2
    },
    {
        question: "Which animal is known as the King of the Jungle?",
        options: ["Tiger", "Lion", "Leopard", "Wolf"],
        answer: 1
    },
    {
        question: "What tool is commonly used to find direction while trekking?",
        options: ["Flashlight", "Compass", "Tent", "Binoculars"],
        answer: 1
    },
    {
        question: "Which continent has the Amazon Rainforest?",
        options: ["Asia", "Africa", "South America", "Australia"],
        answer: 2
    },
    {
        question: "Which is the longest river in the world?",
        options: ["Amazon River", "Yangtze River", "Nile River", "Mississippi River"],
        answer: 2
    },
    {
        question: "Which camping item helps you stay warm at night?",
        options: ["Sleeping Bag", "Map", "Compass", "Water Bottle"],
        answer: 0
    },
    {
        question: "Which natural phenomenon creates colorful lights in the polar sky?",
        options: ["Rainbow", "Aurora Borealis", "Solar Eclipse", "Meteor Shower"],
        answer: 1
    }
];

// STATE
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let timeLeft = 10;
let interval;

// ELEMENTS
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const counterEl = document.getElementById("questionCounter");
const progressEl = document.getElementById("progressDots");
const nextBtn = document.getElementById("nextBtn");

// LOAD QUESTION
function loadQuestion() {
    const q = quizData[currentQuestion];

    questionEl.textContent = q.question;
    counterEl.textContent = `Question ${currentQuestion + 1} / ${quizData.length}`;

    optionsEl.innerHTML = "";
    selectedAnswer = null;
    nextBtn.disabled = true;

    q.options.forEach((option, index) => {
        const card = document.createElement("div");
        card.className = "option-item";

        card.innerHTML = `
            <span class="option-marker">${String.fromCharCode(65 + index)}</span>
            <span class="option-text">${option}</span>
            <i class="bi bi-check-circle-fill"></i>
        `;

        card.addEventListener("click", () => {
            document.querySelectorAll(".option-item")
                .forEach(el => el.classList.remove("selected"));

            card.classList.add("selected");
            selectedAnswer = index;
            nextBtn.disabled = false;
        });

        optionsEl.appendChild(card);
    });

    updateProgress();
    startTimer();
}

// PROGRESS DOTS
function updateProgress() {
    progressEl.innerHTML = "";

    quizData.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = "dot";

        if (i < currentQuestion) dot.classList.add("completed");
        if (i === currentQuestion) dot.classList.add("active");

        progressEl.appendChild(dot);
    });
}

// TIMER
function startTimer() {
    clearInterval(interval);

    timeLeft = 10;
    timerEl.textContent = timeLeft;

    interval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(interval);
            nextQuestion();
        }
    }, 1000);
}

// NEXT QUESTION LOGIC
function nextQuestion() {
    if (selectedAnswer === quizData[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// NEXT BUTTON
nextBtn.addEventListener("click", () => {
    if (selectedAnswer === null) return;

    clearInterval(interval);
    nextQuestion();
});

// RESULT
function showResult() {
    clearInterval(interval);

    const percentage = Math.round((score / quizData.length) * 100);

    document.querySelector(".quiz-card").innerHTML = `
        <div class="result-box">
            <i class="bi bi-trophy-fill"></i>
            <h1>Quiz Completed</h1>
            <p>You scored ${score} out of ${quizData.length}</p>
            <div class="result-score">${percentage}%</div>
            <button class="btn-primary-glow" onclick="location.reload()">
                Play Again
            </button>
        </div>
    `;
}

// INIT
loadQuestion();