import { useState } from "react";
import styles from "./Quiz.module.css";
import { useQuizBySlug, useQuizzes } from "../../hooks";
import { Question } from "../../types";
import { createQuizResult } from "../../services";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const QuizScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const slug = searchParams.get("name");
  const { quiz } = useQuizBySlug(slug || "");

  const { quizzes } = useQuizzes();
  const [email, setEmail] = useState("");
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});

  if (!quizzes || quizzes.length === 0) {
    return <div>No quizzes available</div>;
  }

  const randomIndex = Math.floor(Math.random() * quizzes?.length);
  const randomQuiz = quizzes[randomIndex];

  const handleAnswer = (questionId: string, userAnswer: string) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: userAnswer,
    }));
  };
  const handleSubmit = async () => {
    const quizResults = {
      quiz_id: randomQuiz.quiz_id,
      email: email,
      results: randomQuiz.results.map((question: Question) => ({
        question_id: question.question_id,
        user_answer: userAnswers[question.question_id] || "",
        correct_answer: question.correct_answer,
      })),
    };

    createQuizResult(quizResults)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Quiz Completed!",
          text: "Thank you for completing the quiz.",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        console.error("Error creating quiz result:", error);
      });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>{quiz?.name}</h1>
        </div>

        <div className={styles.input}>
          <span>Enter your email and press begin</span>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.questionsContainer}>
          {quiz?.results?.map((question: Question, index: number) => (
            <div key={index} className={styles.question}>
              <span className={styles.category}>
                Category: {question.category}
              </span>
              <span className={styles.question_}>{question.question}</span>
              <div className={styles.answerButtons}>
                <button
                  onClick={() => handleAnswer(question.question_id, "True")}
                  className={styles.true}
                >
                  True
                </button>
                <button
                  className={styles.false}
                  onClick={() => handleAnswer(question.question_id, "False")}
                >
                  False
                </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleSubmit}>Submit Answers</button>
      </div>
    </>
  );
};

export default QuizScreen;
