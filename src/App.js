import React from "react";
import StartPage from "./components/StartPage";
import QuizPage from "./components/QuizPage";
import uuid from "react-uuid";
import "./App.css";

function App() {
  const [startGame, setStartGame] = React.useState(false);
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
                id={question.id}
                question={question.question}
                answers={question.answers}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
