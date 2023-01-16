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
  const [checkAnswersIsClicked, setCheckAnswersIsClicked] =
    React.useState(false);
  // const [answerColors, setAnswerColors] = React.useState([
  //   {
  //     backgroundColor: "#4D5B9E",
  //     borderColor: "#4D5B9E",
  //     textColor: "#293264",
  //   },
  // ]);
  const [quizData, setQuizData] = React.useState([initialState]);

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
              answers: [correct, ...incorrect],
            };
          });
        });
      });
  }, [startGame]);

  console.log(quizData);

  function handleRestartQuiz() {
    setStartGame(false);
    setCorrectAnswers(0);
    setCheckAnswersIsClicked(false);
    setQuizData([initialState]);
  }

  function handleStartQuizz() {
    setStartGame(true);
  }

  function handleToggleAnswer(id) {
    setQuizData((prevState) =>
      prevState.map((question) => {
        return {
          ...question,
          answers: question.answers.map((answer) => {
            return answer.id === id
              ? { ...answer, isHeld: !answer.isHeld }
              : answer;
          }),
        };
      })
    );
  }

  function handleCheckAnswers() {
    setCheckAnswersIsClicked(true);

    quizData.map((question) => {
      question.answers.map((answer) => {
        if (answer.isHeld && !answer.isCorrect) {
          console.log("Wrong answer!");
        } else if (answer.isHeld && answer.isCorrect) {
          setCorrectAnswers((prevState) => prevState + 1);
          console.log("Correct answer!");
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
                answers={question.answers}
                checkAnswersIsClicked={checkAnswersIsClicked}
                // answerColors={answerColors}
                handleToggleAnswer={handleToggleAnswer}
                handleRestartQuiz={handleRestartQuiz}
              />
            );
          })}
          <div className="result-container">
            {checkAnswersIsClicked ? (
              <h3 className="answer-result">
                You scored {correctAnswers}/10 correct answers
              </h3>
            ) : (
              ""
            )}
            <button
              className="check-answer-button"
              onClick={
                !checkAnswersIsClicked ? handleCheckAnswers : handleRestartQuiz
              }
            >
              {checkAnswersIsClicked ? "Play again" : "Check answers"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
