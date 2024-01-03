import axios from "axios";

const quizApi =
  "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

export const getQuestions = async () => {
  const { data } = await axios.get(quizApi);
  return data;
};
