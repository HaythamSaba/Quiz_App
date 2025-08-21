function NextButton({ dispatch, answer, index, numQuestions,selectedQuestions }) {
  if (answer === null) return null;
  console.log(index <= numQuestions - 1);
  if (index < numQuestions - 1)
    return (
      <div className="btn-next-container">
        <button
        className="btn btn-next"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next Question
      </button>
      </div>
    );
  if (index === numQuestions - 1)
    return (
      <div className="btn-next-container">
        <button
        className="btn btn-next"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
      </div>
    );
}

export default NextButton;
