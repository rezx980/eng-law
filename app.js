// Professional Test Data Structure
const tests = [
    {
        id: 1,
        title: "Test 1: Sources of Obligation",
        subtitle: "Basic Concepts and Definitions",
        questions: [
            {
                type: "multiple",
                text: "How many main sources of obligation are recognized in Algerian civil law?",
                options: ["Three", "Four", "Five", "Six"],
                correct: 2,
                explanation: "Algerian civil law recognizes five main sources: Law, Contract, Unilateral Act, Harmful Act, and Quasi-contracts."
            },
            {
                type: "truefalse",
                text: "Obligations arising from administrative decisions are a traditional source of obligation in civil law.",
                correct: false,
                explanation: "The traditional sources are: Law, Contract, Unilateral Act, Harmful Act, Quasi-contracts."
            },
            {
                type: "translation",
                text: "Translate the following term from English to Arabic:",
                term: "Quasi-contract",
                correct: "شبه العقد",
                explanation: "Quasi-contract translates to 'شبه العقد' in Arabic."
            },
            {
                type: "fillblank",
                text: "An obligation arising from one person's enrichment at another's expense without legal cause is classified as a ______.",
                correct: "quasi-contract",
                explanation: "Unjust enrichment without legal cause falls under quasi-contracts."
            },
            {
                type: "translation",
                text: "Translate the following term from Arabic to English:",
                arabicTerm: "الإثراء بلا سبب",
                correct: "Unjust enrichment",
                explanation: "الإثراء بلا سبب translates to 'Unjust enrichment' in English."
            }
        ]
    },
    {
        id: 2,
        title: "Test 2: Definition & Elements of Contract",
        subtitle: "Contract Formation and Requirements",
        questions: [
            {
                type: "multiple",
                text: "Which article of the Algerian Civil Code defines the contract?",
                options: ["Article 53", "Article 54", "Article 55", "Article 56"],
                correct: 1,
                explanation: "Article 54 provides the definition of contract in Algerian law."
            },
            {
                type: "truefalse",
                text: "For a contract to be valid, the consent of only one party is sufficient.",
                correct: false,
                explanation: "Mutual consent of at least two parties is required for a valid contract."
            },
            {
                type: "translation",
                text: "Translate the following term from English to Arabic:",
                term: "Offer",
                correct: "إيجاب",
                explanation: "Offer translates to 'إيجاب' in Arabic."
            },
            {
                type: "fillblank",
                text: "The essential elements for a valid contract are: ______, ______, ______, and ______.",
                correct: "consent, capacity, lawful object, lawful cause",
                explanation: "These four elements must all be present for a contract to be valid."
            },
            {
                type: "translation",
                text: "Translate the following term from Arabic to English:",
                arabicTerm: "القبول",
                correct: "Acceptance",
                explanation: "القبول translates to 'Acceptance' in English."
            }
        ]
    },
    {
        id: 3,
        title: "Test 3: Classification of Contracts",
        subtitle: "Types and Categories of Contracts",
        questions: [
            {
                type: "multiple",
                text: "A contract formed by the simple exchange of consent without formalities is called:",
                options: ["Formal contract", "Consensual contract", "Real contract", "Signed contract"],
                correct: 1,
                explanation: "Consensual contracts require only mutual consent, no formalities."
            },
            {
                type: "truefalse",
                text: "A contract for the sale of real estate in Algerian law is a consensual contract.",
                correct: false,
                explanation: "Real estate sales require formalities (authentic deed), making them formal contracts."
            },
            {
                type: "translation",
                text: "Translate the following term from English to Arabic:",
                term: "Unilateral contract",
                correct: "عقد ملزم لجانب واحد",
                explanation: "Unilateral contract translates to 'عقد ملزم لجانب واحد' in Arabic."
            },
            {
                type: "fillblank",
                text: "A real contract is only completed by the ______ of the subject matter.",
                correct: "physical delivery",
                explanation: "Real contracts require actual delivery of the object."
            },
            {
                type: "translation",
                text: "Translate the following term from Arabic to English:",
                arabicTerm: "العقد الملزم للجانبين",
                correct: "Synallagmatic contract",
                explanation: "العقد الملزم للجانبين translates to 'Synallagmatic contract' in English."
            }
        ]
    }
];

// Application State
let currentTestIndex = 0;
let userAnswers = {};
let testResults = {};
let totalAnswered = 0;
let totalQuestions = 0;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    const testsContainer = document.getElementById('testsContainer');

    // Initialize storage and calculate totals
    tests.forEach(test => {
        userAnswers[test.id] = {};
        testResults[test.id] = { total: test.questions.length, correct: 0 };
        totalQuestions += test.questions.length;
        test.questions.forEach((_, index) => {
            userAnswers[test.id][index] = null;
        });
    });

    // Create test content
    tests.forEach(test => {
        const testDiv = document.createElement('div');
        testDiv.className = 'test-content';
        testDiv.id = `test-${test.id}`;

        const testHeader = document.createElement('div');
        testHeader.className = 'test-header';
        testHeader.innerHTML = `
            <div class="test-title">${test.title}</div>
            <div class="test-subtitle">${test.subtitle}</div>
        `;
        testDiv.appendChild(testHeader);

        // Create questions
        const questionsContainer = document.createElement('div');
        questionsContainer.className = 'question-container';

        test.questions.forEach((question, index) => {
            const questionCard = document.createElement('div');
            questionCard.className = 'question-card';
            questionCard.id = `test-${test.id}-q${index}`;
            questionCard.dataset.questionIndex = index;

            const questionNumber = document.createElement('span');
            questionNumber.className = 'question-number';
            questionNumber.textContent = index + 1;

            const questionText = document.createElement('div');
            questionText.className = 'question-text';
            questionText.appendChild(questionNumber);
            
            // Add question text
            const textSpan = document.createElement('span');
            textSpan.textContent = question.text;
            questionText.appendChild(textSpan);
            
            // Add Arabic text if present
            if (question.arabicTerm) {
                const arabicDiv = document.createElement('div');
                arabicDiv.className = 'arabic-text';
                arabicDiv.textContent = question.arabicTerm;
                questionText.appendChild(arabicDiv);
            }
            
            // Add term for translation questions
            if (question.term) {
                const termDiv = document.createElement('div');
                termDiv.style.marginTop = '10px';
                termDiv.style.fontSize = '1.4rem';
                termDiv.style.fontWeight = '600';
                termDiv.style.color = 'var(--primary-color)';
                termDiv.style.padding = '10px';
                termDiv.style.backgroundColor = '#f0f4ff';
                termDiv.style.borderRadius = '6px';
                termDiv.textContent = `"${question.term}"`;
                questionText.appendChild(termDiv);
            }

            questionCard.appendChild(questionText);

            // Add question type specific content
            addQuestionContent(test.id, index, question, questionCard);

            // Explanation placeholder
            const explanation = document.createElement('div');
            explanation.className = 'explanation';
            explanation.id = `explanation-${test.id}-${index}`;
            questionCard.appendChild(explanation);

            questionsContainer.appendChild(questionCard);
        });

        testDiv.appendChild(questionsContainer);

        // Navigation buttons for this test
        const navButtons = document.createElement('div');
        navButtons.className = 'navigation-buttons';
        
        const prevButton = document.createElement('button');
        prevButton.className = 'nav-button';
        prevButton.innerHTML = '← Previous Test';
        prevButton.onclick = () => navigateToTest(currentTestIndex - 1);
        if (test.id === 1) prevButton.disabled = true;
        
        const checkButton = document.createElement('button');
        checkButton.className = 'nav-button check';
        checkButton.innerHTML = '✓ Check All Answers';
        checkButton.onclick = () => checkAllAnswers(test.id);
        
        const nextButton = document.createElement('button');
        nextButton.className = 'nav-button next';
        nextButton.innerHTML = 'Next Test →';
        nextButton.onclick = () => {
            if (checkAllAnswers(test.id)) {
                navigateToTest(currentTestIndex + 1);
            }
        };
        if (test.id === tests.length) {
            nextButton.innerHTML = 'Finish Tests →';
            nextButton.onclick = () => {
                if (checkAllAnswers(test.id)) {
                    completeAllTests();
                }
            };
        }

        navButtons.appendChild(prevButton);
        navButtons.appendChild(checkButton);
        navButtons.appendChild(nextButton);
        testDiv.appendChild(navButtons);

        testsContainer.appendChild(testDiv);
    });

    // Show first test
    showTest(0);
    updateProgress();
}

function addQuestionContent(testId, questionIndex, question, container) {
    const contentDiv = document.createElement('div');
    
    switch(question.type) {
        case 'multiple':
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'options-container';
            
            question.options.forEach((option, optionIndex) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';
                optionDiv.textContent = option;
                optionDiv.onclick = function() {
                    selectOption(testId, questionIndex, optionIndex, optionsDiv);
                };
                optionsDiv.appendChild(optionDiv);
            });
            contentDiv.appendChild(optionsDiv);
            break;

        case 'truefalse':
            const tfDiv = document.createElement('div');
            tfDiv.className = 'true-false-container';
            
            const trueBtn = document.createElement('div');
            trueBtn.className = 'tf-button true';
            trueBtn.textContent = 'True';
            trueBtn.onclick = function() {
                selectTrueFalse(testId, questionIndex, true, tfDiv);
            };
            
            const falseBtn = document.createElement('div');
            falseBtn.className = 'tf-button false';
            falseBtn.textContent = 'False';
            falseBtn.onclick = function() {
                selectTrueFalse(testId, questionIndex, false, tfDiv);
            };
            
            tfDiv.appendChild(trueBtn);
            tfDiv.appendChild(falseBtn);
            contentDiv.appendChild(tfDiv);
            break;

        case 'fillblank':
            const fillDiv = document.createElement('div');
            fillDiv.className = 'fill-blank-container';
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'blank-input';
            input.placeholder = 'Type your answer here...';
            input.oninput = function() {
                updateFillBlank(testId, questionIndex, this);
            };
            fillDiv.appendChild(input);
            contentDiv.appendChild(fillDiv);
            break;

        case 'translation':
            const transDiv = document.createElement('div');
            transDiv.className = 'translation-container';
            
            const transQuestion = document.createElement('div');
            transQuestion.className = 'translation-question';
            transQuestion.textContent = question.arabicTerm ? 'Write the English translation:' : 'Write the Arabic translation:';
            transDiv.appendChild(transQuestion);
            
            const transInput = document.createElement('input');
            transInput.type = 'text';
            transInput.className = 'translation-input';
            transInput.placeholder = question.arabicTerm ? 'English translation...' : 'Arabic translation...';
            transInput.oninput = function() {
                updateTranslation(testId, questionIndex, this);
            };
            transDiv.appendChild(transInput);
            
            contentDiv.appendChild(transDiv);
            break;
    }

    container.appendChild(contentDiv);
}

function showTest(testIndex) {
    // Hide all tests
    document.querySelectorAll('.test-content').forEach(test => {
        test.classList.remove('active');
    });
    
    // Show selected test
    document.getElementById(`test-${testIndex + 1}`).classList.add('active');
    
    currentTestIndex = testIndex;
    updateProgress();
}

function navigateToTest(testIndex) {
    if (testIndex >= 0 && testIndex < tests.length) {
        showTest(testIndex);
    }
}

function updateProgress() {
    // Update answered count
    totalAnswered = 0;
    tests.forEach(test => {
        totalAnswered += Object.values(userAnswers[test.id]).filter(a => a !== null).length;
    });
    
    // Update progress bar
    const progressPercentage = (totalAnswered / totalQuestions) * 100;
    document.getElementById('overallProgressBar').style.width = `${progressPercentage}%`;
    
    // Update progress info
    document.getElementById('currentTestInfo').textContent = `Test ${currentTestIndex + 1} of ${tests.length}`;
    document.getElementById('overallProgress').textContent = `${Math.round(progressPercentage)}% Complete`;
}

// Answer handling functions
function selectOption(testId, questionIndex, optionIndex, container) {
    container.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    container.children[optionIndex].classList.add('selected');
    userAnswers[testId][questionIndex] = optionIndex;
    updateProgress();
}

function selectTrueFalse(testId, questionIndex, value, container) {
    container.querySelectorAll('.tf-button').forEach(btn => {
        btn.classList.remove('selected');
    });
    container.children[value ? 0 : 1].classList.add('selected');
    userAnswers[testId][questionIndex] = value;
    updateProgress();
}

function updateFillBlank(testId, questionIndex, input) {
    userAnswers[testId][questionIndex] = input.value.trim();
    updateProgress();
}

function updateTranslation(testId, questionIndex, input) {
    userAnswers[testId][questionIndex] = input.value.trim();
    updateProgress();
}

function checkAnswer(testId, questionIndex) {
    const question = tests[testId - 1].questions[questionIndex];
    const userAnswer = userAnswers[testId][questionIndex];
    const questionElement = document.getElementById(`test-${testId}-q${questionIndex}`);
    const explanation = document.getElementById(`explanation-${testId}-${questionIndex}`);

    // Remove previous markings
    questionElement.querySelectorAll('.option.correct').forEach(el => {
        el.classList.remove('correct');
    });
    questionElement.querySelectorAll('.tf-button.correct').forEach(btn => {
        btn.classList.remove('correct');
    });
    questionElement.querySelectorAll('.blank-input').forEach(input => {
        input.classList.remove('correct', 'incorrect');
    });
    questionElement.querySelectorAll('.translation-input').forEach(input => {
        input.classList.remove('correct', 'incorrect');
    });

    // Check answer based on type
    let isCorrect = false;

    switch(question.type) {
        case 'multiple':
            if (userAnswer === question.correct) {
                isCorrect = true;
                questionElement.querySelectorAll('.option')[question.correct].classList.add('correct');
            } else if (userAnswer !== null) {
                questionElement.querySelectorAll('.option')[question.correct].classList.add('correct');
            }
            break;

        case 'truefalse':
            if (userAnswer === question.correct) {
                isCorrect = true;
                const btn = question.correct ? 
                    questionElement.querySelector('.tf-button.true') : 
                    questionElement.querySelector('.tf-button.false');
                btn.classList.add('correct');
            } else if (userAnswer !== null) {
                const correctBtn = question.correct ? 
                    questionElement.querySelector('.tf-button.true') : 
                    questionElement.querySelector('.tf-button.false');
                correctBtn.classList.add('correct');
            }
            break;

        case 'fillblank':
            if (userAnswer && userAnswer.toLowerCase() === question.correct.toLowerCase()) {
                isCorrect = true;
                const input = questionElement.querySelector('.blank-input');
                input.classList.add('correct');
            } else if (userAnswer) {
                const input = questionElement.querySelector('.blank-input');
                input.classList.add('incorrect');
            }
            break;

        case 'translation':
            if (userAnswer && userAnswer.trim().toLowerCase() === question.correct.toLowerCase()) {
                isCorrect = true;
                const input = questionElement.querySelector('.translation-input');
                input.classList.add('correct');
            } else if (userAnswer) {
                const input = questionElement.querySelector('.translation-input');
                input.classList.add('incorrect');
            }
            break;
    }

    // Update results
    if (isCorrect && !questionElement.dataset.checked) {
        testResults[testId].correct++;
        questionElement.dataset.checked = 'true';
    }

    // Show explanation
    if (question.explanation) {
        explanation.textContent = `Explanation: ${question.explanation}`;
        explanation.classList.add('show');
    }

    return isCorrect;
}

function checkAllAnswers(testId) {
    const test = tests[testId - 1];
    let allChecked = true;
    let allCorrect = true;

    test.questions.forEach((_, index) => {
        if (userAnswers[testId][index] === null) {
            allChecked = false;
        } else {
            if (!checkAnswer(testId, index)) {
                allCorrect = false;
            }
        }
    });

    if (!allChecked) {
        alert(`Please answer all ${test.questions.length} questions in this test before proceeding.`);
        return false;
    }

    return true;
}

function completeAllTests() {
    // Hide all tests
    document.querySelectorAll('.test-content').forEach(test => {
        test.classList.remove('active');
    });
    
    // Show completion screen
    document.getElementById('completionScreen').classList.add('active');
    
    // Calculate and display final score
    let totalCorrect = 0;
    let totalQuestions = 0;
    
    tests.forEach(test => {
        totalQuestions += testResults[test.id].total;
        totalCorrect += testResults[test.id].correct;
    });
    
    const percentage = (totalCorrect / totalQuestions) * 100;
    let grade = '';
    let gradePoints = '';
    
    if (percentage >= 90) {
        grade = 'Excellent';
        gradePoints = '20/20';
    } else if (percentage >= 80) {
        grade = 'Very Good';
        gradePoints = '16-19/20';
    } else if (percentage >= 70) {
        grade = 'Good';
        gradePoints = '14-15/20';
    } else if (percentage >= 60) {
        grade = 'Satisfactory';
        gradePoints = '12-13/20';
    } else {
        grade = 'Needs Review';
        gradePoints = 'Below 12/20';
    }
    
    document.getElementById('finalScoreDisplay').textContent = 
        `Score: ${totalCorrect}/${totalQuestions} (${percentage.toFixed(1)}%)`;
    
    document.getElementById('finalGrade').textContent = 
        `Grade: ${grade} - ${gradePoints}`;
}

function showDetailedScore() {
    let detailedScore = "Detailed Results:\n\n";
    
    tests.forEach(test => {
        detailedScore += `${test.title}:\n`;
        detailedScore += `  Correct: ${testResults[test.id].correct}/${testResults[test.id].total}\n`;
        detailedScore += `  Score: ${Math.round((testResults[test.id].correct / testResults[test.id].total) * 100)}%\n\n`;
    });
    
    alert(detailedScore);
}

function restartTests() {
    // Reset all data
    currentTestIndex = 0;
    userAnswers = {};
    testResults = {};
    totalAnswered = 0;
    totalQuestions = 0;
    
    // Hide completion screen
    document.getElementById('completionScreen').classList.remove('active');
    
    // Clear the container and reinitialize
    const testsContainer = document.getElementById('testsContainer');
    testsContainer.innerHTML = '';
    
    // Reinitialize the app
    initializeApp();
}
