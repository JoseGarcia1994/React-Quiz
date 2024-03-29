import { useQuiz } from "../context/QuizContext.jsx";

const Progress = () => {
  const {index, numQuestions, points, maxPoints, answer} = useQuiz();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)}/>

      <p>Questions <strong>{index + 1}</strong> / {numQuestions}</p>

      <p><strong>{points}</strong> / {maxPoints}</p>
    </header>
  );
};

export default Progress;