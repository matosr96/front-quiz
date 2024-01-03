import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../../services";

export const useQuestion = () => {
  const { isLoading, data: questions } = useQuery({
    queryKey: ["questions"],
    queryFn: () => getQuestions(),
  });

  return { isLoading, questions };
};
