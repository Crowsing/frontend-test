import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [input, setInput] = useState("");
  const [completedSentence, setCompletedSentence] = useState("");

  const fetchData = async (input: string) => {
      const response = await axios.post(
        "http://localhost:5000/faq",
        {
          question: input,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      return response.data.answer;
};

  async function handleClick() {
    try {
      const completedSentence = await fetchData(input);
      setCompletedSentence(completedSentence);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <h2>Question</h2>
      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        rows={5}
        placeholder="Type in some words and I'll finish the rest..."
      />
      <button className="button" onClick={handleClick}>Complete Sentence</button>
      {completedSentence && <p>Answer: {completedSentence}</p>}
    </div>
  );
}

export default App;