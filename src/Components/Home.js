import React, { useState } from "react";

const languages = ["html", "css", "js", "react"];

function Home({ dispatch }) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleClick = (language) => {
    setSelectedLanguage(language);
    dispatch({ type: "languageChosen", payload: language });
  };

  return (
    <div className="home">
      <h1>Welcome to the Programming Quiz</h1>
      <div className="categories">
        {languages.map((language) => (
          <div
            key={language}
            className="category"
            onClick={() => handleClick(language)}
            id={language}
            style={{
              backgroundColor: selectedLanguage === language ? "#ccc" : "white",
            }}
          >
            <h4>{language}</h4>
            <img
              src={`../../images/${language}_logo.png`}
              alt={`${language} logo`}
            />
          </div>
        ))}
      </div>
      {selectedLanguage && <p>You selected: {selectedLanguage}</p>}
    </div>
  );
}

export default Home;
