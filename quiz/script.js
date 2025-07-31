const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Jane Austen", correct: false },
            { text: "Mark Twain", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "O2", correct: false },
            { text: "H2O", correct: true },
            { text: "CO2", correct: false },
            { text: "NaCl", correct: false }
        ]
    },
    {
        question: "What is the primary function of a CPU?",
        answers: [
            { text: "Store data", correct: false },
            { text: "Display graphics", correct: false },
            { text: "Execute instructions", correct: true },
            { text: "Connect to the internet", correct: false }
        ]
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Nitrogen", correct: false },
            { text: "Carbon Dioxide", correct: true },
            { text: "Hydrogen", correct: false }
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "High-level Text Machine Language", correct: false },
            { text: "Hyperlink and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "What is the smallest country in the world?",
        answers: [
            { text: "Monaco", correct: false },
            { text: "Vatican City", correct: true },
            { text: "San Marino", correct: false },
            { text: "Liechtenstein", correct: false }
        ]
    },
    {
        question: "What is the process of a liquid becoming a gas?",
        answers: [
            { text: "Condensation", correct: false },
            { text: "Sublimation", correct: false },
            { text: "Evaporation", correct: true },
            { text: "Melting", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
const TIME_LIMIT = 10; // Time limit for each question in seconds
let myChart; // Variable to hold the Chart.js instance

const questionTextElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const quizArea = document.getElementById('quiz-area');
const scoreContainer = document.getElementById('score-container');
const finalScoreElement = document.getElementById('final-score');
const timerElement = document.getElementById('timer');
const scoreChartCanvas = document.getElementById('score-chart');

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizArea.style.display = 'block';
    scoreContainer.style.display = 'none';
    nextButton.style.display = 'none';
    if (myChart) {
        myChart.destroy(); // Destroy previous chart if it exists
    }
    showQuestion();
}

// Function to display the current question
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionTextElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        answerButtonsElement.appendChild(button);
        button.addEventListener('click', selectAnswer);
    });
    startTimer();
}

// Function to start the countdown timer
function startTimer() {
    let timeLeft = TIME_LIMIT;
    timerElement.textContent = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

// Function to handle a timeout
function handleTimeOut() {
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true; // Disable all buttons
    });
    nextButton.style.display = 'block';
}

// Function to reset the quiz state for a new question
function resetState() {
    clearInterval(timerInterval);
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    nextButton.style.display = 'none';
}

// Function to handle user's answer selection
function selectAnswer(e) {
    clearInterval(timerInterval);
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    if (isCorrect) {
        score++;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('wrong');
    }

    // Disable all other buttons and highlight the correct one
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    nextButton.style.display = 'block';
}

// Function to move to the next question or show the final score
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Function to display the final score and chart
function showScore() {
    quizArea.style.display = 'none';
    scoreContainer.style.display = 'block';
    finalScoreElement.textContent = `Your score: ${score} out of ${questions.length}`;

    // Create the doughnut chart
    const incorrectScore = questions.length - score;
    const data = {
        labels: ['Correct', 'Incorrect'],
        datasets: [{
            data: [score, incorrectScore],
            backgroundColor: [
                '#a9dfbf', // Correct
                '#f1948a'  // Incorrect
            ],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                      font: {
                        family: 'Poppins',
                      },
                      color: '#2c3e50',
                    }
                }
            }
        }
    };
    
    myChart = new Chart(scoreChartCanvas, config);
}

// Event listeners
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', startQuiz);

// Initial call to start the quiz
startQuiz();
