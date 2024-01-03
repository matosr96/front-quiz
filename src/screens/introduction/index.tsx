import { useCallback, useState } from "react";
import styles from "./Quiz.module.css";
import { useQuestion } from "../../hooks";
import { createQuiz } from "../../services/quizzes";

const IntroductionScreen = () => {
  const { questions } = useQuestion();
  const [quiz, setQuiz] = useState({
    name: "",
    response_code: 0,
    results: [],
  });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setQuiz((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const submitCreateHandler = async () => {
    const newData = { ...quiz, results: questions.results };
    try {
      await createQuiz(newData);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Welcome to the Trivia Challenge</h1>
      <div>
        <p>You will be presented with 10 True or False questions.</p>
      </div>
      <div>
        <p>Can you score 100%?</p>
      </div>

      <div>
        <div className={styles.input}>
          <span>ENTER THE NAME OF THE NEW FORM AND PRESS BEGIN</span>
          <input
            type="text"
            name="name"
            value={quiz.name}
            onChange={handleChange}
          />
        </div>
      </div>
      <button onClick={submitCreateHandler}>BEGIN</button>
    </div>
  );
};

export default IntroductionScreen;
