import React from "react";
import uuid from "react-uuid";
import StartPage from "./components/StartPage";
import QuizPage from "./components/QuizPage";
import Result from "./components/Result";
import Score from "./components/Score";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();

  const initialQuizDataState = {
    id: "",
    question: "",
    category: "",
    type: "",
    difficulty: "",
    answereId: null,
    answers: [
      {
        id: "",
        value: "",
        isHeld: false,
        isCorrect: false,
      },
    ],
  };

  const [startGame, setStartGame] = React.useState(false);
  const [user, setUser] = React.useState({
    name: "",
  });
  const [correctQuiz, setCorrectQuiz] = React.useState(false);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [isValidQuiz, setIsValidQuiz] = React.useState(false);
  const [quizData, setQuizData] = React.useState([initialQuizDataState]);

  // React.useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(user));
  //   localStorage.setItem("correctAnswers", JSON.stringify(correctAnswers));
  // }, [user, correctAnswers]);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((response) => response.json())
      .then((data) => {
        setQuizData(() => {
          return data.results.map((question) => {
            const incorrect = question.incorrect_answers.map((answer) => {
              return {
                value: answer,
                id: uuid(),
                isHeld: false,
                isCorrect: false,
              };
            });

            const correct = {
              value: question.correct_answer,
              id: uuid(),
              isHeld: false,
              isCorrect: true,
            };

            return {
              id: uuid(),
              category: question.category,
              question: question.question,
              type: question.type,
              difficulty: question.difficulty,
              answerId: null,
              answers: [correct, ...incorrect],
            };
          });
        });
      });
  }, [startGame]);

  function handleStartQuizz() {
    setStartGame(true);
    navigate("/quiz");
  }

  function handleToggleAnswer(questionId, answerId) {
    if (!isValidQuiz) {
      setQuizData((prevState) =>
        prevState.map((question) => {
          if (question.id !== questionId) {
            return question;
          } else {
            return {
              ...question,
              answerId: question.answerId !== answerId ? answerId : null,
              answers: question.answers.map((answer) => {
                return answer.id === answerId
                  ? { ...answer, isHeld: !answer.isHeld }
                  : { ...answer, isHeld: false };
              }),
            };
          }
        })
      );
    }
  }

  function handleCheckAnswersValidation() {
    let questionIsAnwered = [];
    quizData?.map((question) => {
      question.answerId !== null
        ? questionIsAnwered.push(true)
        : questionIsAnwered.push(false);
    });

    let questionsAnswered = questionIsAnwered.every(
      (answer) => answer === true
    );

    questionsAnswered ? setIsValidQuiz(true) : setIsValidQuiz(false);

    //Using state not working
    return questionsAnswered;
  }

  function handleCountCorrectAnswers() {
    quizData?.map((question) => {
      question.answers.map((answer) => {
        if (answer.isHeld && !answer.isCorrect) {
        } else if (answer.isHeld && answer.isCorrect) {
          setCorrectAnswers((prevState) => prevState + 1);
        }
      });
    });
  }

  function handleCorrectQuiz() {
    setCorrectQuiz(true);
    const quizIsValid = handleCheckAnswersValidation();

    if (quizIsValid) {
      handleCountCorrectAnswers();
    }
  }

  function handleRestartQuiz() {
    navigate("/");
    setStartGame(false);
    setUser({ name: "" });
    setCorrectAnswers(0);
    setCorrectQuiz(false);
    setQuizData([initialQuizDataState]);
    setIsValidQuiz(false);
  }

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <StartPage
              user={user}
              setUser={setUser}
              handleStartQuizz={handleStartQuizz}
            />
          }
        ></Route>
        <Route
          path="/quiz"
          element={[
            <QuizPage
              user={user}
              quizData={quizData}
              isValidQuiz={isValidQuiz}
              correctQuiz={correctQuiz}
              handleToggleAnswer={handleToggleAnswer}
            />,
            <Result
              correctQuiz={correctQuiz}
              isValidQuiz={isValidQuiz}
              correctAnswers={correctAnswers}
              handleCorrectQuiz={handleCorrectQuiz}
            />,
          ]}
        ></Route>
        <Route
          path="/score"
          element={
            <Score
              user={user}
              correctAnswers={correctAnswers}
              handleRestartQuiz={handleRestartQuiz}
            />
          }
        ></Route>
      </Routes>
      {/* {!startGame ? (
          <StartPage
            user={user}
            setUser={setUser}
            handleStartQuizz={handleStartQuizz}
          />
        ) : (
          <div className="quiz-container">
            <QuizPage
              user={user}
              quizData={quizData}
              isValidQuiz={isValidQuiz}
              correctQuiz={correctQuiz}
              handleToggleAnswer={handleToggleAnswer}
            />
            <Result
              correctQuiz={correctQuiz}
              isValidQuiz={isValidQuiz}
              correctAnswers={correctAnswers}
              handleRestartQuiz={handleRestartQuiz}
              handleCorrectQuiz={handleCorrectQuiz}
            />
          </div>
        )} */}
    </div>
  );
}

export default App;
