import { useReducer, useEffect } from "react";
import Home from "./Home";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Footer from "./Footer";
import Timer from "./Timer";
import NextButton from "./NextButton";
import FinishScreen from "./FinishScreen";

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  status: "loading",
  selectedLanguage: null,
  index: 0,
  correctAnswer: null,
  QuestionsSelectedLanguage: [],
  selectedAnswer: null,
  secondsRemaining: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, status: "loading" };
    case "error":
      return { ...state, status: "error" };
    case "initial":
      return { ...state, questions: action.payload, status: "initial" };
    case "languageChosen":
      return {
        ...state,
        selectedLanguage: action.payload,
        status: "ready",
        QuestionsSelectedLanguage: state.questions.filter(
          (question) => question.language === action.payload
        ),
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining:
          state.QuestionsSelectedLanguage.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        selectedAnswer: action.payload,
        points:
          action.payload === question.correctAnswer
            ? state.points + 1
            : state.points,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        correctAnswer: null,
        selectedAnswer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
      return {
        ...state,
        status: "initial",
        index: 0,
        correctAnswer: null,
        selectedAnswer: null,
        secondsRemaining: null,
        points: 0,
        selectedLanguage: null,
      };
    default:
      throw new Error("Unknown action");
  }
}
function App() {
  const [
    {
      questions,
      status,
      selectedLanguage,
      index,
      correctAnswer,
      QuestionsSelectedLanguage,
      selectedAnswer,
      secondsRemaining,
      points,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  useEffect(function () {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "initial", payload: data }))
      .catch(() => dispatch({ type: "error" }));
  }, []);

  return (
    <div className="app">
      <Main selectedLanguage={selectedLanguage}>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "initial" && <Home dispatch={dispatch} />}
        {status === "ready" && (
          <StartScreen
            dispatch={dispatch}
            questions={questions}
            selectedLanguage={selectedLanguage}
          />
        )}
        {status === "active" && (
          <>
            <Question
              questions={QuestionsSelectedLanguage}
              dispatch={dispatch}
              selectedLanguage={selectedLanguage}
              index={index}
              selectedAnswer={selectedAnswer}
            />
            <Footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
              ></Timer>
              <NextButton
                dispatch={dispatch}
                answer={selectedAnswer}
                index={index}
                numQuestions={QuestionsSelectedLanguage.length}
                selectedQuestions={QuestionsSelectedLanguage}
              ></NextButton>
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            dispatch={dispatch}
            points={points}
            numQuestions={QuestionsSelectedLanguage.length}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
