import "./Result.css";
import Button from "./Button";

function Result({
  correctAnswers,
  isValidQuiz,
  correctQuiz,
  handleCorrectQuiz,
}) {
  function setButtonLabel() {
    return correctQuiz && isValidQuiz
      ? "Continue to scoreboard"
      : "Check answers";
  }

  return (
    <div className="result-container">
      {correctQuiz && isValidQuiz ? (
        <h3 className="answer-result">
          You scored {correctAnswers}/10 correct answers
        </h3>
      ) : (
        ""
      )}
      <Button
        label={setButtonLabel()}
        isValidQuiz={isValidQuiz}
        handleCorrectQuiz={handleCorrectQuiz}
      />
    </div>
  );
}

export default Result;
