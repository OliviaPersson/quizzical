import "./QuizPage.css";

function QuizPage({ id, question, answers }) {
  console.log(question);
  return (
    <div className="question-container">
      <h3 className="question">{question}</h3>
      <div className="answer-options-container">
        {answers.map((answer) => (
          <p key={answer.id} className="answer-options">
            {answer.value}
          </p>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default QuizPage;
