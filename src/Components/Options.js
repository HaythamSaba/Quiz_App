function Options({
  questions,
  dispatch,
  correctAnswer,
  index,
  selectedAnswer,
}) {
  const hasAnswered = selectedAnswer !== null;
  return (
    <div className="options">
      {questions[index].options.map((option, i) => (
        <button
          className={`btn btn-option  ${
            i === selectedAnswer ? "answer" : ""
          } ${
            hasAnswered ? (i === correctAnswer ? "correct" : "wrong") : ""
          }`}
          disabled={hasAnswered}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
