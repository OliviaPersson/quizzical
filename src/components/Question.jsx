import ErrorMessage from "./ErrorMessage";
import "./Question.css";

function Question({
  question,
  questionId,
  answers,
  answerId,
  isValidQuiz,
  correctQuiz,
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
    if (!isValidQuiz) {
      return answer.isHeld ? "isHeld" : "notHeld";
    } else if (isValidQuiz) {
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
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: `<h3 class="question">${question}</h3>`,
        }}
      ></div>
      <div className="answer-options-container">
        {answers.map((answer) => (
          <div
            key={answer.id}
            style={style}
            className={handleSetClassName(answer)}
            onClick={() => handleToggleAnswer(questionId, answer.id)}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: `<p class="answer-option">${answer.value}</p>`,
              }}
            ></div>
          </div>
        ))}
      </div>
      {answerId === null && !isValidQuiz && correctQuiz ? <ErrorMessage /> : ""}
    </div>
  );
}

export default Question;
