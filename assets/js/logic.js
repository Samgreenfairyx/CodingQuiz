// Event listener to initiate quiz when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    // DOM elements
    const startButton = document.getElementById("start");
    const questionsContainer = document.getElementById("questions");
    const choicesContainer = document.getElementById("choices");
    const feedbackContainer = document.getElementById("feedback");
    const endScreen = document.getElementById("end-screen");
    const timeDisplay = document.getElementById("time");
    const finalScoreDisplay = document.getElementById("final-score");
    const initialsInput = document.getElementById("initials");
    const submitButton = document.getElementById("submit");

    // Quiz state variables
    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 90; // Initial time limit in seconds

    // Audio elements for correct and incorrect answers
    const correctSound = new Audio('../sfx/correct.wav');
    const incorrectSound = new Audio('../sfx/incorrect.wav'); 

    // Function to start the quiz
    function startQuiz() {
        // Hide start button
        startButton.style.display = "none";
        // Show questions container
        questionsContainer.classList.remove("hide");
        // Display the first question
        displayQuestion();
        // Start the timer
        startTimer();
    }

    // Function to display the current question
    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        // Set the text content of the question title
        document.getElementById("question-title").textContent = currentQuestion.question;

        // Clear previous choices
        choicesContainer.innerHTML = "";

        // Display choices as buttons
        currentQuestion.choices.forEach((choice, index) => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.addEventListener("click", () => checkAnswer(index));
            choicesContainer.appendChild(button);
        });

        // Create a new element for displaying correctness feedback
        const feedbackLine = document.createElement("div");
        feedbackLine.id = "feedback-line";
        feedbackLine.classList.add("feedback", "hide");

        // Create a new element for displaying feedback text
        const feedbackText = document.createElement("p");
        feedbackText.id = "feedback-text";
        feedbackLine.appendChild(feedbackText);
    }

    // Function to check the selected answer
    function checkAnswer(choiceIndex) {
        const currentQuestion = questions[currentQuestionIndex];
        const feedbackLine = document.getElementById("feedback-line");
        const feedbackText = document.getElementById("feedback-text");

        // Remove previous styling classes
        feedbackLine.classList.remove("correct", "wrong");

        // Check if the selected choice is the correct answer
        if (currentQuestion.choices[choiceIndex] === currentQuestion.correctAnswer) {
            // Correct answer
            score++;
            feedbackText.textContent = "Correct!";
            feedbackLine.classList.add("correct");
            correctSound.play(); // Play correct sound
        } else {
            // Incorrect answer, deduct time
            timeLeft -= 10;
            feedbackText.textContent = "Wrong!";
            feedbackLine.classList.add("wrong");
            incorrectSound.play(); // Play incorrect sound
        }

        // Show the feedback line and text
        feedbackLine.classList.remove("hide");

        // Move to the next question after a short delay
        setTimeout(function () {
            feedbackLine.classList.add("hide");
            currentQuestionIndex++;

            // Check if there are more questions
            if (currentQuestionIndex < questions.length) {
                displayQuestion(); // Display the next question
                choicesContainer.classList.remove("no-click"); // Enable choices again
            } else {
                endQuiz(); // End the quiz if no more questions
            }
        }, 1000); // Delay in milliseconds before moving to the next question
    }

    // Function to start the timer
    function startTimer() {
        const timerInterval = setInterval(function () {
            timeLeft--;
            timeDisplay.textContent = timeLeft;

            // Check if time has run out
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endQuiz(); // End the quiz if time is up
            }
        }, 1000); // Update every 1 second
    }

    // Function to end the quiz
    function endQuiz() {
        const questionsContainer = document.getElementById("questions");
        const feedbackText = document.getElementById("feedback-text");

        if (questionsContainer && feedbackText) {
            // Hide questions container
            questionsContainer.classList.add("hide");
            // Display final score
            feedbackText.textContent = `Your final score is ${score}.`;

            const feedbackLine = document.getElementById("feedback-line");
            if (feedbackLine) {
                // Show feedback line
                feedbackLine.classList.remove("hide");
            }

            const finalScoreDisplay = document.getElementById("final-score");
            if (finalScoreDisplay) {
                // Display final score
                finalScoreDisplay.textContent = score;
            }

            const endScreen = document.getElementById("end-screen");
            if (endScreen) {
                // Show end screen
                endScreen.classList.remove("hide");
            }
        } else {
            console.error("Required elements not found.");
        }
    }

    // Event listener for the submit button
    submitButton.addEventListener("click", function () {
        // Handle saving initials and score
        const initials = initialsInput.value;
        // Save the initials and score (example: store in local storage)
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScores.push({ initials, score });
        localStorage.setItem("highScores", JSON.stringify(highScores));

        // Redirect to the highscores page
        window.location.href = "highscores.html";
    });

    // Event listener for the start button
    startButton.addEventListener("click", startQuiz);
});
