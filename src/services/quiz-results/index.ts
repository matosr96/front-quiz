import axios from "axios";
import { QuizResults } from "../../types/quizResults";

export const createQuizResult = async (quiz: QuizResults) => {
  try {
    const { data } = await axios.post(
      `https://back-code-challenge-master-production.up.railway.app/api/v1/quiz-results`,
      quiz
    );
    return data;
  } catch (error) {
    // window.location.href = "/login";
    // Manejar el error aquí, de acuerdo a tus necesidades.
    throw new Error("problema");
  }
};
