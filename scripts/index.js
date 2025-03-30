// Quiz questions data structure
      const quizData = {
        science: [
            {
                question: "What is the chemical symbol for gold?",
                answers: ["Au", "Ag", "Fe", "Cu"],
                correct: 0,
                hint: "This symbol comes from the Latin word 'aurum'",
              },
              {
                question: "What planet is known as the Red Planet?",
                answers: ["Mars", "Venus", "Jupiter", "Saturn"],
                correct: 0,
                hint: "This planet is named after the Roman god of war.",
              },
              {
                question: "What gas do plants absorb during photosynthesis?",
                answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
                correct: 1,
                hint: "This gas is exhaled by humans and animals.",
              },
              {
                question: "What is the powerhouse of the cell?",
                answers: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
                correct: 1,
                hint: "It generates most of the cell's energy supply.",
              },
              {
                question: "Which element has the atomic number 1?",
                answers: ["Oxygen", "Helium", "Hydrogen", "Carbon"],
                correct: 2,
                hint: "This is the lightest element in the periodic table.",
              },
              {
                question: "What force keeps planets in orbit around the sun?",
                answers: ["Magnetism", "Friction", "Gravity", "Inertia"],
                correct: 2,
                hint: "This is the same force that makes objects fall to the ground.",
              },
              {
                question: "What is the most abundant gas in Earth's atmosphere?",
                answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
                correct: 1,
                hint: "This gas makes up about 78% of the atmosphere.",
              },
          // Add more questions...
        ],
        history: [
            {
                question: "Who was the first President of the United States?",
                answers: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
                correct: 0,
                hint: "He is often referred to as the 'Father of His Country'.",
              },
              {
                question: "In which year did World War II end?",
                answers: ["1942", "1945", "1948", "1950"],
                correct: 1,
                hint: "It ended with the surrender of Japan.",
              },
              {
                question: "What ancient civilization built the pyramids?",
                answers: ["Romans", "Aztecs", "Egyptians", "Greeks"],
                correct: 2,
                hint: "They are located in Giza.",
              },
              {
                question: "Who was known as the 'Maid of Orléans'?",
                answers: ["Catherine the Great", "Joan of Arc", "Marie Curie", "Queen Elizabeth I"],
                correct: 1,
                hint: "She was a French heroine and saint.",
              },
              {
                question: "Which empire was ruled by Julius Caesar?",
                answers: ["Greek Empire", "Roman Empire", "Ottoman Empire", "British Empire"],
                correct: 1,
                hint: "This empire was known for its extensive road network.",
              },
              {
                question: "What ship sank in 1912 on its maiden voyage?",
                answers: ["Lusitania", "Bismarck", "Titanic", "Queen Mary"],
                correct: 2,
                hint: "It was considered unsinkable.",
              },
              {
                question: "Which war was fought between the North and South regions in the United States?",
                answers: ["World War I", "The Civil War", "The Revolutionary War", "The Vietnam War"],
                correct: 1,
                hint: "It was primarily over slavery and states' rights.",
              },
          // Add more questions...
        ],
        tech: [
            {
                question: "Who is known as the father of the computer?",
                answers: ["Alan Turing", "Charles Babbage", "Steve Jobs", "Bill Gates"],
                correct: 1,
                hint: "He designed the Analytical Engine.",
              },
              {
                question: "What does CPU stand for?",
                answers: ["Central Processing Unit", "Computer Personal Unit", "Central Performance Unit", "Core Processing Unit"],
                correct: 0,
                hint: "It's the brain of the computer.",
              },
              {
                question: "Which company developed the Windows operating system?",
                answers: ["Apple", "Microsoft", "Google", "IBM"],
                correct: 1,
                hint: "It was founded by Bill Gates and Paul Allen.",
              },
              {
                question: "What does HTTP stand for?",
                answers: ["HyperText Transfer Protocol", "HyperText Transmission Process", "High Transfer Text Protocol", "HyperText Transaction Protocol"],
                correct: 0,
                hint: "It's used for transferring web pages.",
              },
              {
                question: "Which programming language is known for its snake logo?",
                answers: ["Java", "C++", "Python", "Ruby"],
                correct: 2,
                hint: "It's named after a British comedy group.",
              },
              {
                question: "What year was the first iPhone released?",
                answers: ["2005", "2007", "2009", "2011"],
                correct: 1,
                hint: "It was introduced by Steve Jobs.",
              },
              {
                question: "What does RAM stand for in computing?",
                answers: ["Random Access Memory", "Readily Available Memory", "Rapid Access Module", "Read-Only Memory"],
                correct: 0,
                hint: "It's a type of volatile memory.",
              },
        ],
      };
    let currentQuestion = 0;
    let score = 0;
    let timer;
    let hintsRemaining = 3;
    let currentCategory = "";
    let questions = [];
    // Initialize the quiz with the selected category
    function initializeQuiz() {
    const categorySelect = document.querySelector("#category-select");
    currentCategory = categorySelect.value;
    if (!currentCategory) {
        alert("Please select a category!");
        return;
    }
    questions = [...quizData[currentCategory]];
    shuffleQuestions();
    // Show instructions instead of directly starting the quiz
    // Hide landing page with animation
    document.querySelector("#landing-page").classList.remove("active");
    setTimeout(() => {
        document.querySelector("#landing-page").classList.add("d-none");
        // Show instructions with animation
        document.querySelector("#instructions-container").classList.remove("d-none");
        setTimeout(() => {
            document.querySelector("#instructions-container").classList.add("active");
        }, 50);
    }, 500);
    }
    //  Start the quiz after reading instructions
    function startQuiz() {
    // Hide instructions with animation
    document.querySelector("#instructions-container").classList.remove("active");
    setTimeout(() => {
        document.querySelector("#instructions-container").classList.add("d-none");
        // Show quiz with animation
        document.querySelector("#quiz-container").classList.remove("d-none");
        setTimeout(() => {
            document.querySelector("#quiz-container").classList.add("active");
        }, 50);
    }, 500);
    loadQuestion();
    }
    // Shuffle questions using the Fisher-Yates algorithm
    function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    }
    //  Load the current question and its answers
    function loadQuestion() {
    const question = questions[currentQuestion];
    document.querySelector("#question-text").textContent = question.question;
    const answersHtml = question.answers
        .map((answer, index) => `<div class="answer-option" data-index="${index}">${answer}</div>`)
        .join("");  
    document.querySelector("#answers-container").innerHTML = answersHtml;
    updateProgress();
    startTimer();
    }
    //   Start the countdown timer for the current question
    function startTimer() {
    let timeLeft = 30;
    const timeRemainingElement = document.querySelector("#time-remaining");
    timeRemainingElement.textContent = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timeRemainingElement.textContent = timeLeft;
        if (timeLeft <= 5) {
        timeRemainingElement.style.color = "red";
        }
        if (timeLeft <= 0) {
        clearInterval(timer);
        handleAnswer(-1); // Time's up, no answer selected
        }
    }, 1000);
    }
    /**
    * Handle the selected answer and show feedback
    * @param {number} selectedIndex - The index of the selected answer, -1 if time expired
    */
    function handleAnswer(selectedIndex) {
    clearInterval(timer);
    const correct = questions[currentQuestion].correct;
    if (selectedIndex === correct) {
        score++;
        document.querySelector("#correct-sound").play();
        
        if (selectedIndex >= 0) { // Only if an answer was actually selected
        document.querySelector(`.answer-option[data-index="${selectedIndex}"]`).classList.add("correct");
        }
    } else {
        document.querySelector("#wrong-sound").play();
        
        if (selectedIndex >= 0) { // Only if an answer was actually selected
        document.querySelector(`.answer-option[data-index="${selectedIndex}"]`).classList.add("incorrect");
        }
        
        document.querySelector(`.answer-option[data-index="${correct}"]`).classList.add("correct");
    }
    // Move to next question after a short delay
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
        loadQuestion();
        } else {
        showScoreboard();
        }
    }, 1500);
    }
    // Update the progress bar to show quiz completion percentage
    function updateProgress() {
    const progress = (currentQuestion / questions.length) * 100;
    document.querySelector("#progress-bar").style.width = `${progress}%`;
    }
    // Show a hint for the current question
    function showHint() {
    if (hintsRemaining > 0) {
        hintsRemaining--;
        document.querySelector("#hint-button").textContent = `Use Hint (${hintsRemaining})`;
        alert(questions[currentQuestion].hint);
    }
    }
    // Display final score and update leaderboard
    function showScoreboard() {
    // Hide quiz with animation
    document.querySelector("#quiz-container").classList.remove("active");
    setTimeout(() => {
        document.querySelector("#quiz-container").classList.add("d-none");
        // Show scoreboard with animation
        document.querySelector("#scoreboard").classList.remove("d-none");
        setTimeout(() => {
            document.querySelector("#scoreboard").classList.add("active");
            // Add the fade-in animation for each scoreboard element with staggered delay
            const scoreElements = document.querySelectorAll('.scoreboard-item');
            scoreElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('active');
                }, 100 * index);
            });
        }, 50);
    }, 500);
    // Calculate percentage and display score
    const scorePercentage = Math.round((score / questions.length) * 100);
    document.querySelector("#score").textContent = `${score}/${questions.length}`;
    document.querySelector("#score-percentage").textContent = `${scorePercentage}%`;
    // Add dynamic score message based on performance
    let scoreMessage = "";
    let scoreClass = "";
    if (scorePercentage >= 90) {
        scoreMessage = "Outstanding! You're a true master!";
        scoreClass = "score-excellent";
    } else if (scorePercentage >= 70) {
        scoreMessage = "Great job! You really know your stuff!";
        scoreClass = "score-good";
    } else if (scorePercentage >= 50) {
        scoreMessage = "Good effort! Keep practicing!";
        scoreClass = "score-average";
    } else {
        scoreMessage = "Don't worry, practice makes perfect!";
        scoreClass = "score-needs-improvement";
    }
    document.querySelector("#score-message").textContent = scoreMessage;
    document.querySelector("#score-message").className = scoreClass;
    // Configure social sharing buttons
    setupSocialSharing(scorePercentage, scoreMessage);
    // Update leaderboard with current score
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    const userName = localStorage.getItem("userName") || "User";
    leaderboard.push({
        name: userName,
        score: score,
        percentage: scorePercentage,
        category: currentCategory,
        date: new Date().toLocaleDateString(),
    });
    // Sort leaderboard by score (highest first) and keep top 5
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard.slice(0, 5)));
    updateLeaderboardDisplay();
    }
    /**
    * Set up social sharing functionality
    * @param {number} scorePercentage - The user's score as a percentage
    * @param {string} scoreMessage - The message describing the user's performance
    */
    function setupSocialSharing(scorePercentage, scoreMessage) {
        const shareText = `I scored ${scorePercentage}% in the ${currentCategory} quiz! ${scoreMessage}`;
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(shareText);
        // Set up Twitter sharing
        const twitterBtn = document.querySelector("#share-twitter");
        if (twitterBtn) {
            twitterBtn.href = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        }
        // Set up Facebook sharing
        const facebookBtn = document.querySelector("#share-facebook");
        if (facebookBtn) {
            facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
        }
        // Set up WhatsApp sharing
        const whatsappBtn = document.querySelector("#share-whatsapp");
        if (whatsappBtn) {
            whatsappBtn.href = `https://wa.me/?text=${text} ${url}`;
        }
    }
    /* Update the leaderboard display with scores from localStorage */
    function updateLeaderboardDisplay() {
        const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
        // Clear existing table rows (except header)
        const tableBody = document.querySelector("#leaderboard-table");
        if (tableBody) {
            tableBody.innerHTML = "";
            if (leaderboard.length === 0) {
                // If no entries, show a message
                const emptyRow = document.createElement("tr");
                emptyRow.innerHTML = `<td colspan="5" class="text-center">No scores yet. Be the first!</td>`;
                tableBody.appendChild(emptyRow);
            } else {
                // Add each leaderboard entry as a table row
                leaderboard.forEach((entry, index) => {
                    const row = document.createElement("tr");
                    row.classList.add("leaderboard-row");
                    // Add animation delay based on index
                    row.style.animationDelay = `${index * 0.15}s`;
                    // Add rank medal for top 3
                    let rankDisplay = `<span class="rank">${index + 1}</span>`;
                    if (index === 0) {
                        rankDisplay = `<span class="rank rank-gold">🥇</span>`;
                    } else if (index === 1) {
                        rankDisplay = `<span class="rank rank-silver">🥈</span>`;
                    } else if (index === 2) {
                        rankDisplay = `<span class="rank rank-bronze">🥉</span>`;
                    }
                    // Calculate performance class based on score percentage
                    const scoreClass = entry.percentage >= 80 ? "high-score" : 
                                      entry.percentage >= 60 ? "mid-score" : "low-score";
                    
                    row.innerHTML = `
                        <td>${rankDisplay}</td>
                        <td>${entry.name || "User"}</td>
                        <td class="${scoreClass}">${entry.score}/${questions.length} (${entry.percentage}%)</td>
                        <td><span class="category-badge category-${entry.category}">${entry.category}</span></td>
                        <td>${entry.date}</td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        } else {
            // Fallback to old list display if table isn't found
            const leaderboardHtml = leaderboard
                .map((entry) => `<li>Score: ${entry.score} - ${entry.category} (${entry.date})</li>`)
                .join("");
                
            document.querySelector("#leaderboard-list").innerHTML = leaderboardHtml;
        }
    }
    /* Initialize event listeners when DOM is fully loaded */
    /* Initialize all sections to ensure proper state on page load */
    function initializePageState() {
        document.querySelectorAll(".section-container").forEach(section => {
        document.querySelectorAll(".section-container").forEach(section => {
            if (!section.classList.contains("d-none")) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });
    })}
    document.addEventListener("DOMContentLoaded", () => {
        // Initialize page state on load
        initializePageState();
        // Button click handlers
        document.querySelector("#start-quiz").addEventListener("click", initializeQuiz);
        document.querySelector("#continue-to-quiz").addEventListener("click", startQuiz);
        document.querySelector("#hint-button").addEventListener("click", showHint);
        document.querySelector("#retry-quiz").addEventListener("click", () => location.reload());
        // Name input for leaderboard
        const nameInput = document.querySelector("#player-name");
        if (nameInput) {
            // Load saved name if exists
            const savedName = localStorage.getItem("userName");
            if (savedName) {
                nameInput.value = savedName;
            }
            // Save name when changed
            nameInput.addEventListener("change", () => {
                localStorage.setItem("userName", nameInput.value);
            });
        }
        // Theme toggle
        document.querySelector("#theme-toggle").addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
        // Use event delegation for answer options
        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("answer-option")) {
            const selectedIndex = parseInt(event.target.getAttribute("data-index"));
            handleAnswer(selectedIndex);
            }
        });
    });
    