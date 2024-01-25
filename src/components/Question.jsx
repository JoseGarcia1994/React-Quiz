import { useQuiz } from "../context/QuizContext.jsx";
import Options from "./Options.jsx";

const Question = () => {
  const {questions, index} = useQuiz();
  const question = questions.at(index)
  return (
    <div>
      <h3>{question.question}</h3>

      <Options question={question} />
    </div>
  );
};

export default Question;