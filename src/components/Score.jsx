import "./Score.css";

function Score({ user, correctAnswers, handleRestartQuiz }) {
  return (
    <div className="Score-board">
      <h1>Score board</h1>
      <p>
        {user.name}: {correctAnswers}
      </p>
      <button className="return-to-homepage-button" onClick={handleRestartQuiz}>
        Return to homepage
      </button>
    </div>
  );
}

export default Score;
