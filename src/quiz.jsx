import React, { useState, useEffect } from "react";


function QuizAPP() {
    const [quizData, setQuizData] = useState([]); // Store all quiz data
    const [QsCount, setQsCount] = useState(0); // Track current question index
    const [selectedAnswer, setSelectedAnswer] = useState(null); // Store user's selected answer
    const [score, setScore] = useState(0); // Track the user's score
    const [isAnswered, setIsAnswered] = useState(false); // Check if the question has been answered
    const [loading, setLoading] = useState(true); // Handle loading state

    const fetchdata = async () => {
        try {
            const apiUrl = "https://the-trivia-api.com/v2/questions";
            const response = await fetch(apiUrl);
            const data = await response.json();

            setQuizData(data); // Store all questions
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchdata()
    }, [])

    const currentQuestion = quizData[QsCount]; // Get the current question

    const handleChoiceClick = (choice) => {
        if (isAnswered) return; // Prevent multiple clicks on the same question
        setSelectedAnswer(choice);
        setIsAnswered(true);

        if (choice === currentQuestion.correctAnswer) {
            setScore((prevScore) => prevScore + 1); // Increment score if the answer is correct
        }
    };

    const nextQuestion = () => {
        if (QsCount < quizData.length - 1) {
            setQsCount((prevCount) => prevCount + 1); // Move to the next question
            setSelectedAnswer(null); // Reset selected answer
            setIsAnswered(false); // Reset the answered state
        } else {
            alert(`Quiz Complete! Your score: ${score}/${quizData.length}`);
        }
    };

    if (loading) {
        return <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    }

    const choices = [
        ...currentQuestion.incorrectAnswers,
        currentQuestion.correctAnswer,
    ].sort(() => Math.random() - 0.5); // Shuffle choices

    return (
        <>
            <div className="container-fluid">
                <div
                    class="row justify-content-center align-items-center mt-5 main-app"
                >
                    <div class="col-12 text center"><h1 className="text-center text-primary">Quiz APP</h1></div>
                    <div class="col-12"><h4><span className="text-primary">Question {QsCount + 1}:</span>  {currentQuestion.question.text}</h4></div>
                    <div class="col-12"><ul>
                        {choices.map((choice, index) => (
                            <li
                                key={index}
                                onClick={() => handleChoiceClick(choice)}
                                style={{
                                    cursor: "pointer",
                                    backgroundColor: isAnswered
                                        ? choice === currentQuestion.correctAnswer
                                            ? "green"
                                            : choice === selectedAnswer
                                                ? "red"
                                                : ""
                                        : "",
                                    color: isAnswered ? "white" : "",
                                    padding: "10px",
                                    margin: "5px 0",
                                    border: "1px solid #ddd",
                                    borderRadius: "5px",
                                }}
                            >
                                {choice}
                            </li>
                        ))}
                    </ul></div>

                </div>




                {isAnswered && (
                    <p className="h5 text-center">
                        {selectedAnswer === currentQuestion.correctAnswer
                            ? "Correct! 🎉"
                            : `Incorrect! The correct answer is: ${currentQuestion.correctAnswer}`}
                    </p>
                )}
                <center>
                    <button onClick={nextQuestion} disabled={!isAnswered} className="btn btn-block btn-primary text-center">
                        {QsCount < quizData.length - 1 ? "Next" : "Finish Quiz"}
                    </button></center>
                <p className="h5 score text-center">Score: {score}/{quizData.length}</p>
                <br />
                <footer class="bg-primary text-white text-center py-2">
                    <div class="container">
                        <p class="mb-2">Connect with me:</p>
                        <div class="d-flex justify-content-center mb-3 h5 footer">
                            <a href="jnaveenkumar092005@gmail.com" class="text-white mx-2" target="_blank" aria-label="Gmail">
                                <i class="bi-envelope fa-lg">‎ </i>
                            </a>
                            <a href="https://www.instagram.com/naveen_jr.7/" class="text-white mx-2" target="_blank" aria-label="Instagram">
                                <i class="bi-instagram h5">‎ </i>                            </a>
                            <a href="https://www.linkedin.com/in/naveenkumarj2005/" class="text-white mx-2" target="_blank" aria-label="LinkedIn">
                                <i class="bi-linkedin">‎</i>
                            </a>
                        </div>
                        <p class="mb-0 h6">Naveen Kumar J &copy; 2025</p>
                    </div>
                </footer>

            </div>
        </>
    );
}

export default QuizAPP;



// import React, { useState, useEffect } from "react";

// function QuizAPP() {
//     let [QsCount, setQscount] = useState(0);
//     let [question, setQuestion] = useState(null);
//     // let [correctAnswer, setcorrectAnswer] = useState()
//     // let [choices, setChoices] = useState()
//     let fetchdata = async () => {
//         // https://random.dog/woof.json'

//         let ApiUrl = await fetch('https://the-trivia-api.com/v2/questions')
//         try {
//             let responce = await ApiUrl.json()
//             console.log(responce);

//             let result = responce[QsCount].question.text
//             setQuestion(result)


//         } catch (error) {
//             console.log(error);

//         }

//     }
//     function count() {
//         setQscount(QsCount => QsCount + 1)
//     }
//     useEffect(() => {
//         fetchdata()

//     }, [])

//     return (
//         <>
//             <h1>Quiz APP</h1>
//             <h4>Question:{question}</h4>
//             <p>pick one:
//                 <br />{correctAnswer}
//                 <br />
//                 {choices}</p>


//             <button onClick={() => { count() }}>NEXT</button>
//         </>
//     )
// }
// export default QuizAPP;
