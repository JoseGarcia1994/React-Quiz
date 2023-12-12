import Options from "./Options.jsx";

const Question = ({question}) => {
  return (
    <div>
      <h3>{question.question}</h3>

      <Options question={question}/>
    </div>
  );
};

export default Question;