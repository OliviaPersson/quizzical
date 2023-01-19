import "./Result.css";

function Result({
  correctAnswers,
  validQuiz,
  correctQuiz,
  handleRestartQuiz,
  handleCheckAnswers,
}) {
  return (
    <div className="result-container">
      {correctQuiz && validQuiz ? (
        <h3 className="answer-result">
          You scored {correctAnswers}/10 correct answers
        </h3>
      ) : (
        ""
      )}
      <button
        className="check-answer-button"
        onClick={validQuiz ? handleRestartQuiz : handleCheckAnswers}
      >
        {correctQuiz && validQuiz ? "Play again" : "Check answers"}
      </button>
    </div>
  );
}

export default Result;
