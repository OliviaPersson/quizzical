import Question from "./Question";
import "./QuizPage.css";

function QuizPage({
  question,
  validQuiz,
  errorMessage,
  correctQuiz,
  handleToggleAnswer,
  handleRestartQuiz,
}) {
  return (
    <div className="question-container">
      <Question
        key={question.id}
        question={question.question}
        questionId={question.id}
        answereId={question.answereId}
        answers={question.answers}
        validQuiz={validQuiz}
        correctQuiz={correctQuiz}
        errorMessage={errorMessage}
        handleToggleAnswer={handleToggleAnswer}
        handleRestartQuiz={handleRestartQuiz}
      />
      <hr />
    </div>
  );
}

export default QuizPage;
