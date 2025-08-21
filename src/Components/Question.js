import Options from "./Options";

function Question({
  questions,
  dispatch,
  index,
  selectedAnswer
}) {
  return (
    <div className="question">
      <h2 className="secondary-title">{questions[index].question}</h2>
      <Options
        questions={questions}
        index={index}
        dispatch={dispatch}
        correctAnswer={questions[index].correctAnswer}
        selectedAnswer={selectedAnswer}
      />
    </div>
  );
}

export default Question;
