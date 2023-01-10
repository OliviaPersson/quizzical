import React from "react";
import StartPage from "./components/StartPage";
import QuizPage from "./components/QuizPage";
import "./App.css";

function App() {
  const [quizData, setQuizData] = React.useState([]);
  const [startGame, setStartGame] = React.useState(false);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((response) => response.json())
      .then((data) => setQuizData(data.results));
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
          {quizData.map((data) => {
            console.log(data.question);
            return (
              <QuizPage
                key={data.question}
                question={data.question}
                correctAnswer={data.correct_answer}
                incorrectAnswers={data.incorrect_answers}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
