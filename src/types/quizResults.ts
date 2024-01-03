interface QuestionResult {
  question_id: string;
  user_answer: string;
  correct_answer: string;
}

export interface QuizResults {
  quiz_id: string;
  email: string;
  results: QuestionResult[];
}
