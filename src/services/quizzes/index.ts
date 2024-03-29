import axios from "axios";
import { Quiz, createQuizDto } from "../../types/quiz";
import slugify from "slugify";

export const createQuiz = async (quiz: createQuizDto) => {
  try {
    const { data } = await axios.post(
      `https://back-code-challenge-master-production.up.railway.app/api/v1/quizzes`,
      quiz
    );
    const slug = slugify(quiz.name, {
      replacement: "-",
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
    window.location.href = `/quiz?name=${slug}`;
    return data;
  } catch (error) {
    // window.location.href = "/login";
    // Manejar el error aquí, de acuerdo a tus necesidades.
    throw new Error("problema");
  }
};

export const getQuizzes = async () => {
  const { data } = await axios.get(
    `https://back-code-challenge-master-production.up.railway.app/api/v1/quizzes`
  );
  return data as Quiz[];
};

export const getQuizBySlugApi = async (slug: string) => {
  const { data } = await axios.get(
    `https://back-code-challenge-master-production.up.railway.app/api/v1/quiz-by-slug/${slug}`
  );
  return data as Quiz;
};
