import "./StartPage.css";

function StartPage({ handleStartQuizz }) {
  return (
    <div className="start-page-container">
      <h1 className="header">Quizzical</h1>
      <p className="description">Some description if needed</p>
      <div className="button-container">
        <button onClick={handleStartQuizz} className="start-button">
          Start quiz
        </button>
      </div>
    </div>
  );
}

export default StartPage;
