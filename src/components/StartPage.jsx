import React from "react";
import "./StartPage.css";

function StartPage({ user, setUser, handleStartQuizz }) {
  function handleChange(event) {
    const { name, value } = event.target;

    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleStartQuizz();
  }

  return (
    <div className="start-page-container">
      <h1 className="header">Quizzical</h1>
      <p className="form-label">What should we call you?</p>
      <form className="quiz-form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          placeholder="Name:"
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <div className="button-container">
          <button type="submit" className="start-button">
            Start quiz
          </button>
        </div>
      </form>
    </div>
  );
}

export default StartPage;
