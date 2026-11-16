
const questions = [
    {
        question: "Which language is used to structure a web page?",
        options: ["CSS", "HTML", "JavaScript", "Python"],
        answer: "HTML"
    },
    {
        question: "Which language is used to style web pages?",
        options: ["HTML", "Python", "CSS", "C++"],
        answer: "CSS"
    },
    {
        question: "Which language makes a web page interactive?",
        options: ["JavaScript", "HTML", "SQL", "CSS"],
        answer: "JavaScript"
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<p>", "<img>"],
        answer: "<a>"
    },
    {
        question: "Which method is used to select an element by ID?",
        options: [
            "getElementByClass()",
            "queryAll()",
            "getElementById()",
            "getId()"
        ],
        answer: "getElementById()"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");

const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");

function showQuestion() {

    answered = false;

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreElement.textContent = `Score: ${score}`;

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    feedback.textContent = "";

    optionsElement.innerHTML = "";

    nextButton.disabled = true;

    current.options.forEach(function(option) {

        const button = document.createElement("button");

        button.textContent = option;

        button.classList.add("option-btn");

        button.addEventListener("click", function() {
            checkAnswer(button, option);
        });

        optionsElement.appendChild(button);

    });
}

function checkAnswer(selectedButton, selectedAnswer) {

    if (answered) {
        return;
    }

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;

    const allButtons =
        document.querySelectorAll(".option-btn");

    allButtons.forEach(function(button) {

        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }

    });

    if (selectedAnswer === correctAnswer) {

        score++;

        feedback.textContent = "Correct Answer! Well done.";

        feedback.style.color = "green";

    } else {

        selectedButton.classList.add("wrong");

        feedback.textContent =
            `Wrong Answer! Correct answer: ${correctAnswer}`;

        feedback.style.color = "red";

    }

    scoreElement.textContent = `Score: ${score}`;

    nextButton.disabled = false;
}

nextButton.addEventListener("click", function() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});

function showResult() {

    quizBox.style.display = "none";

    resultBox.style.display = "block";

    progressBar.style.width = "100%";

    document.getElementById("final-score").textContent =
        `Your Score: ${score} / ${questions.length}`;

    let message = "";

    if (score === questions.length) {
        message = "Excellent! Perfect Score!";
    } else if (score >= 3) {
        message = "Great Job! Keep Learning.";
    } else {
        message = "Keep Practicing! You can do better.";
    }

    document.getElementById("result-message").textContent = message;
}

document.getElementById("restart-btn").addEventListener("click", function() {

    currentQuestion = 0;

    score = 0;

    resultBox.style.display = "none";

    quizBox.style.display = "block";

    showQuestion();

});

showQuestion();
