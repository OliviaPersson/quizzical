import { useNavigate } from "react-router-dom";
import "./Button.css";

function Button({ isValidQuiz, handleCorrectQuiz, label }) {
  const navigate = useNavigate();

  return (
    <button
      className="button"
      onClick={isValidQuiz ? () => navigate("/score") : handleCorrectQuiz}
    >
      {label}
    </button>
  );
}

export default Button;
