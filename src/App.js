import React from "react";
import StartPage from "./components/StartPage";
import "./App.css";
import QuizPage from "./components/QuizPage";

function App() {
  const [startGame, setStartGame] = React.useState(false);

  function handleStartQuizz() {
    setStartGame(true);
    return <QuizPage />;
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
