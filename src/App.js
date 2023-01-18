import React from "react";
import StartPage from "./components/StartPage";
import QuizPage from "./components/QuizPage";
import uuid from "react-uuid";
import "./App.css";

function App() {
  const initialState = {
    id: "",
    question: "",
    category: "",
    type: "",
    difficulty: "",
    isAnswered: false,
    answers: [
      {
        id: "",
        value: "",
        isHeld: false,
        isCorrect: false,
      },
    ],
  };

  const [startGame, setStartGame] = React.useState(false);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [correctQuiz, setCorrectQuiz] = React.useState(false);
  const [quizData, setQuizData] = React.useState([initialState]);
  const [errorMessage, setErrorMessage] = React.useState(
    "Please enter an answer"
  );

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((response) => response.json())
      .then((data) => {
        setQuizData(() => {
          return data.results.map((question) => {
            const incorrect = question.incorrect_answers.map((answer) => {
              return {
                value: answer,
                id: uuid(),
                isHeld: false,
                isCorrect: false,
              };
            });

            const correct = {
              value: question.correct_answer,
              id: uuid(),
              isHeld: false,
              isCorrect: true,
            };

            return {
              id: uuid(),
              category: question.category,
              question: question.question,
              type: question.type,
              difficulty: question.difficulty,
              isAnswered: false,
              answers: [correct, ...incorrect],
            };
          });
        });
      });
  }, [startGame]);

  function handleRestartQuiz() {
    setStartGame(false);
    setCorrectAnswers(0);
    setCorrectQuiz(false);
    setQuizData([initialState]);
  }

  function handleStartQuizz() {
    setStartGame(true);
  }

  function handleToggleAnswer(questionId, answerId) {
    if (!correctQuiz) {
      setQuizData((prevState) =>
        prevState.map((question) => {
          if (question.id !== questionId) {
            return question;
          } else {
            return {
              ...question,
              isAnswered: !question.isAnswered,
              answers: question.answers.map((answer) => {
                return answer.id === answerId
                  ? { ...answer, isHeld: !answer.isHeld }
                  : { ...answer, isHeld: false };
              }),
            };
          }
        })
      );
    }
  }

  function handleCheckAnswers() {
    setCorrectQuiz(true);

    quizData.map((question) => {
      question.answers.map((answer) => {
        if (answer.isHeld && !answer.isCorrect) {
        } else if (answer.isHeld && answer.isCorrect) {
          setCorrectAnswers((prevState) => prevState + 1);
        }
      });
    });
  }

  return (
    <div className="app">
      {!startGame ? (
        <StartPage handleStartQuizz={handleStartQuizz} />
      ) : (
        <div className="quiz-container">
          {quizData?.map((question) => {
            return (
              <QuizPage
                key={question.id}
                question={question.question}
                questionId={question.id}
                isAnswered={question.isAnswered}
                answers={question.answers}
                correctQuiz={correctQuiz}
                errorMessage={errorMessage}
                handleToggleAnswer={handleToggleAnswer}
                handleRestartQuiz={handleRestartQuiz}
              />
            );
          })}
          <div className="result-container">
            {correctQuiz ? (
              <h3 className="answer-result">
                You scored {correctAnswers}/10 correct answers
              </h3>
            ) : (
              ""
            )}
            <button
              className="check-answer-button"
              onClick={!correctQuiz ? handleCheckAnswers : handleRestartQuiz}
            >
              {correctQuiz ? "Play again" : "Check answers"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
