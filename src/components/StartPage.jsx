import "./StartPage.css";

function StartPage({ handleStartQuizz }) {
  return (
    <div className="start-page-container">
      <h1 className="header">Quizzical</h1>
      <p className="form-label">What should we call you?</p>
      <form className="quiz-form">
        <input
          className="form-input"
          placeholder="Name:"
          type="text"
          name="name"
        />
        {/* <input type="submit" value="Submit" /> */}
        <div className="button-container">
          <button onClick={handleStartQuizz} className="start-button">
            Start quiz
          </button>
        </div>
      </form>
    </div>
  );
}

export default StartPage;
