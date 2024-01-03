import axios from "axios";
import { Quiz, createQuizDto } from "../../types/quiz";

export const createQuiz = async (quiz: createQuizDto) => {
  try {
    const { data } = await axios.post(
      `http://localhost:8000/api/v1/quizzes`,
      quiz
    );
    window.location.href = "/quiz";
    return data;
  } catch (error) {
    // window.location.href = "/login";
    // Manejar el error aquí, de acuerdo a tus necesidades.
    throw new Error("problema");
  }
};

export const getQuizzes = async () => {
  const { data } = await axios.get(`http://localhost:8000/api/v1/quizzes`);
  return data as Quiz[];
};
