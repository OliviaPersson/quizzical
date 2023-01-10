import "./QuizPage.css";
import uuid from "react-uuid";

function QuizPage({ question, correctAnswer, incorrectAnswers }) {
  return (
    <div className="question-container">
      <h3 className="question">{question}</h3>
      <div className="answer-options-container">
        <p className="answer-options">{correctAnswer}</p>
        {incorrectAnswers.map((answer) => (
          <p key={uuid()} className="answer-options">
            {answer}
          </p>
        ))}
      </div>

      <hr />
    </div>
  );
}

export default QuizPage;
