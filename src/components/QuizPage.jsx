import "./QuizPage.css";

function QuizPage({
  question,
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
  function setClassName(answer) {
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
          <div className="answer-option">
            <p
              key={answer.id}
              style={style}
              className={setClassName(answer)}
              onClick={() => handleToggleAnswer(answer.id)}
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
