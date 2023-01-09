import React from "react";
import StartPage from "./components/StartPage";
import QuizPage from "./components/QuizPage";
import "./App.css";

function App() {
  const [startGame, setStartGame] = React.useState(false);

  function handleStartQuizz() {
    setStartGame(true);
  }

  return (
    <div className="app">
      {!startGame ? (
        <StartPage handleStartQuizz={handleStartQuizz} />
      ) : (
        <QuizPage />
      )}
    </div>
  );
}

export default App;
