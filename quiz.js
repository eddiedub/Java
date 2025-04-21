const allQuestions = [
    // Java Questions
    {
        question: "What is the correct way to declare a Java array?",
        options: [
            "int[] arr = new int[5];",
            "array int[] = new array(5);",
            "int arr[] = int[5];",
            "int arr = new int[5];"
        ],
        correct: 0,
        explanation: "In Java, arrays are declared using square brackets and instantiated using new."
    },
    {
        question: "Which React Native hook is used for state management?",
        options: [
            "useState",
            "useEffect",
            "useRef",
            "useContext"
        ],
        correct: 0,
        explanation: "useState is the primary hook for managing component state in React Native."
    },
    {
        question: "In React Native, how do you handle user touch events?",
        options: [
            "TouchableOpacity",
            "onClick",
            "onPress",
            "handleClick"
        ],
        correct: 0,
        explanation: "TouchableOpacity is a wrapper component that makes its children respond properly to touches."
    }
    // Add more questions...
];

let questions = [];
let currentQuestion = 0;
let score = 0;

function initializeQuiz() {
  // Randomly select 10 questions
  questions = [...allQuestions]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
  currentQuestion = 0;
  score = 0;
  displayQuestion();
}

function displayQuestion() {
  const container = document.getElementById('question-container');
  const question = questions[currentQuestion];
  const nextBtn = document.getElementById('next-btn');
  
  // Update next button state
  nextBtn.style.display = 'none';
  
  let html = `<h3>Question ${currentQuestion + 1} of 10:</h3>
              <p class="question-text">${question.question}</p>`;
  question.options.forEach((option, index) => {
    html += `<div class="quiz-option" onclick="checkAnswer(${index})">${option}</div>`;
  });
  
  container.innerHTML = html;
}

function checkAnswer(answer) {
  const question = questions[currentQuestion];
  const container = document.getElementById('question-container');
  const nextBtn = document.getElementById('next-btn');
  
  // Show next button after answering
  nextBtn.style.display = 'block';
  
  if (answer === question.correct) {
    score++;
    document.getElementById('score').textContent = score;
    container.innerHTML += `
      <div class="feedback correct">
        <p>✅ Correct!</p>
        <p>${question.explanation}</p>
      </div>`;
  } else {
    container.innerHTML += `
      <div class="feedback incorrect">
        <p>❌ Incorrect. The correct answer was: ${question.options[question.correct]}</p>
        <p>${question.explanation}</p>
      </div>`;
  }
  
  // Disable options after answering
  document.querySelectorAll('.quiz-option').forEach(opt => {
    opt.style.pointerEvents = 'none';
    if (opt.textContent === question.options[question.correct]) {
      opt.classList.add('correct-answer');
    }
  });
}

// Update next button event listener
document.getElementById('next-btn').addEventListener('click', () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    displayQuestion();
  } else {
    showFinalScore();
  }
});

function showFinalScore() {
  const container = document.getElementById('question-container');
  container.innerHTML = `
    <h3>Quiz Complete!</h3>
    <p>Your final score: ${score}/10</p>
    <button onclick="initializeQuiz()" class="quiz-btn">Try Again</button>`;
  document.getElementById('next-btn').style.display = 'none';
}

// Initialize quiz
initializeQuiz();
