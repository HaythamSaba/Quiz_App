function  FinishScreen({ dispatch, points, numQuestions }) {
  let percentage = (points / numQuestions) * 100;
  let finalResult = "";
  if (percentage >= 90) {
    finalResult = "Excellent";
  }
  else if (percentage < 90 && percentage >= 80) {
    finalResult = " Very Good";
  }
  else if (percentage < 80 && percentage >= 70) {
    finalResult = "Good";
  } 
  else if (percentage < 70 && percentage >= 60) {
    finalResult = "Average";
  }
  else if (percentage < 60 && percentage >= 50) {
    finalResult = "Just Pass";
  }
  else {
    finalResult = "Failed";
  }
  return (
    <div className="finish-container">
      <p className="result">
        {finalResult} you scored {points} of {numQuestions} (
        {Math.ceil(percentage)}%)
      </p>
      <button className="btn"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Start New Quiz
      </button>
    </div>
  );
}

export default FinishScreen;
