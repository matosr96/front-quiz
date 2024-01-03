import { useQuery } from "@tanstack/react-query";
import { getQuizzes } from "../../services";

export const useQuizzes = () => {
  const { isLoading, data: quizzes } = useQuery({
    queryKey: ["questions"],
    queryFn: () => getQuizzes(),
  });

  return { isLoading, quizzes };
};
