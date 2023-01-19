import Question from "./Question";
import "./QuizPage.css";

function QuizPage({ question, isValidQuiz, correctQuiz, handleToggleAnswer }) {
  return (
    <div className="question-container">
      <Question
        key={question.id}
        question={question.question}
        questionId={question.id}
        answerId={question.answerId}
        answers={question.answers}
        isValidQuiz={isValidQuiz}
        correctQuiz={correctQuiz}
        handleToggleAnswer={handleToggleAnswer}
      />
      <hr />
    </div>
  );
}

export default QuizPage;
