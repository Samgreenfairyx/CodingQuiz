// Event listener to execute code when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    // DOM elements
    const highScoresList = document.getElementById("highscores");
    const clearButton = document.getElementById("clear");

    // Retrieve high scores from storage (e.g., local storage)
    const storedScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Use a Map to store unique entries based on initials and score
    const uniqueEntries = new Map();

    // Display high scores in the list, filtering out duplicates
    storedScores.forEach((entry, index) => {
        const key = `${entry.initials}-${entry.score}`;

        if (!uniqueEntries.has(key)) {
            // Create a list item for each unique entry
            const listItem = document.createElement("li");
            listItem.textContent = `${entry.initials} - ${entry.score}`;
            highScoresList.appendChild(listItem);

            uniqueEntries.set(key, true); // Mark the entry as seen
        }
    });

    // Show the high scores container
    document.getElementById("highscores").classList.remove("hide");

    // Event listener for the "Clear Highscores" button
    if (clearButton) {
        clearButton.addEventListener("click", function () {
            clearHighScores();
        });
    }

    // Function to show high scores (can be expanded with additional logic)
    function showHighScores() {
        console.log("High scores link clicked");
        // Additional logic can be added here if needed
    }

    // Function to clear high scores
    function clearHighScores() {
        // Clear high scores from local storage
        localStorage.removeItem("highScores");

        // Clear the displayed high scores on the page
        highScoresList.innerHTML = "";
    }

    // Event delegation on the document body for the high scores link
    document.body.addEventListener("click", function (event) {
        // Check if the clicked element is within the high scores link
        if (event.target.closest(".scores a")) {
            event.preventDefault();
            showHighScores(); // Show high scores when the link is clicked
        }
    });
});
