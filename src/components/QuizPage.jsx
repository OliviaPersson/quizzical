import "./QuizPage.css";

function QuizPage({ question, answers, handleToggleAnswer }) {
  const styles = { backgroundColor: "#D6DBF5" };

  return (
    <div className="question-container">
      <h3 className="question">{question}</h3>
      <div className="answer-options-container">
        {answers.map((answer) => (
          <p
            key={answer.id}
            className={answer.isHeld ? "selected" : "answer-options"}
            onClick={() => handleToggleAnswer(answer.id)}
          >
            {answer.value}
          </p>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default QuizPage;
