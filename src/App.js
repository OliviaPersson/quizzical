import React from "react";
import StartPage from "./components/StartPage";
import QuizPage from "./components/QuizPage";
import uuid from "react-uuid";
import "./App.css";

function App() {
  const [startGame, setStartGame] = React.useState(false);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [checkAnswersIsClicked, setCheckAnswersIsClicked] =
    React.useState(false);
  const [color, setColor] = React.useState("");
  const [quizData, setQuizData] = React.useState([
    {
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
    },
  ]);

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
  }, []);

  console.log(quizData);

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
                color={color}
                question={question.question}
                answers={question.answers}
                handleToggleAnswer={handleToggleAnswer}
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
              onClick={handleCheckAnswers}
            >
              Check answers
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
