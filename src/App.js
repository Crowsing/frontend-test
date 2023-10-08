import React, { useState } from 'react';
import './App.css';
import api from "./api";
import styles from './app.module.css';

function App() {
  const [input, setInput] = useState("");
  const [completedSentence, setCompletedSentence] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (input) => {
      const response = await api({
        method: "post",
        url: "/faq",
        data: {
          question: input,
        },
      });
      return response.data.answer;
};

  async function handleClick() {
    try {
      setIsLoading(true);
      const completedSentence = await fetchData(input);
      setCompletedSentence(completedSentence);
    } catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h2>Question</h2>
      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        rows={5}
        placeholder="Ask a Question about Forex Tester"
      />
      <button disabled={isLoading}  className={styles.button} onClick={handleClick}>Answer</button>
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        completedSentence && <p>Answer: {completedSentence}</p>
      )}
    </div>
  );
}

export default App;