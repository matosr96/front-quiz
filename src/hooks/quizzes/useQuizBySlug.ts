import { useQuery } from "@tanstack/react-query";
import { getQuizBySlugApi } from "../../services";

export const useQuizBySlug = (slug: string) => {
  const { isLoading, data: quiz } = useQuery({
    queryKey: ["quiz"],
    queryFn: () => getQuizBySlugApi(slug),
  });

  return { isLoading, quiz };
};
