import React from 'react'
function StartScreen({ dispatch, questions, selectedLanguage}) {
  console.log(selectedLanguage)
  let QuestionsSelectedLanguage = questions.filter(
    (question) => question.language === selectedLanguage
  )
  return (
    <div className='home'>
      <h1>Welcome to {selectedLanguage} Quiz</h1>
      <h2 className='secondary-title'>{QuestionsSelectedLanguage.length} Questions to test your {selectedLanguage} knowledge</h2>
      <button className='btn' onClick={() => dispatch({type: "start"})}>Start Quiz</button>
    </div>
  )
}

export default StartScreen
