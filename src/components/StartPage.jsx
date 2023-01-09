import "./StartPage.css";

function StartPage() {
  return (
    <div className="start-page-container">
      <h1 className="header">Quizzical</h1>
      <p className="description">Some description if needed</p>
      <div className="button-container">
        <button className="start-button">Start quiz</button>
      </div>
    </div>
  );
}

export default StartPage;
