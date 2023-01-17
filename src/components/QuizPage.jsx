import "./QuizPage.css";

function QuizPage({
  question,
  questionId,
  answers,
  checkAnswersIsClicked,
  handleToggleAnswer,
}) {
  const style = {
    margin: "0px",
    borderRadius: "8px",
    fontFamily: "Inter",
    fontSize: "10.24px",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingLeft: "8px",
    paddingRight: "8px",
    cursor: "pointer",
  };
  function handleSetClassName(answer) {
    if (!checkAnswersIsClicked) {
      if (answer.isHeld) {
        return "isHeld";
      } else {
        return "notHeld";
      }
    } else {
      if (answer.isHeld && answer.isCorrect) {
        return "correct-answer";
      } else if (answer.isHeld && !answer.isCorrect) {
        return "wrong-answer";
      } else {
        return "not-selected";
      }
    }
  }

  return (
    <div className="question-container">
      <h3 className="question">{question}</h3>
      <div className="answer-options-container">
        {answers.map((answer) => (
          <div key={answer.id} className="answer-option">
            <p
              key={answer.id}
              style={style}
              className={handleSetClassName(answer)}
              onClick={() => handleToggleAnswer(questionId, answer.id)}
            >
              {answer.value}
            </p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default QuizPage;
