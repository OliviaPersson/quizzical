import "./Result.css";

function Result({
  correctAnswers,
  isValidQuiz,
  correctQuiz,
  handleRestartQuiz,
  handleCorrectQuiz,
}) {
  return (
    <div className="result-container">
      {correctQuiz && isValidQuiz ? (
        <h3 className="answer-result">
          You scored {correctAnswers}/10 correct answers
        </h3>
      ) : (
        ""
      )}
      <button
        className="check-answer-button"
        onClick={isValidQuiz ? handleRestartQuiz : handleCorrectQuiz}
      >
        {correctQuiz && isValidQuiz ? "Play again" : "Check answers"}
      </button>
    </div>
  );
}

export default Result;
