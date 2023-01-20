import Question from "./Question";
import "./QuizPage.css";

function QuizPage({
  user,
  quizData,
  isValidQuiz,
  correctQuiz,
  handleToggleAnswer,
}) {
  return (
    <div className="question-container">
      <p className="user-label">Good luck {user.name}!</p>
      {quizData?.map((question) => {
        return (
          <div className="question" key={question.id}>
            <Question
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
      })}
    </div>
  );
}

export default QuizPage;
