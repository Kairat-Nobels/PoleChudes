import { questionsApi } from "@api/api";
import { Question } from "@redux/game/types";

export const fetchQuestions = async () => {
  const response = await fetch(questionsApi);
  if (!response.ok) throw new Error('Ошибка сети');
  return response.json();
};

export const postQuestion = async (newQuestion: Omit<Question, 'id'>) => {
  const response = await fetch(questionsApi, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newQuestion),
  });
  if (!response.ok) throw new Error('Не удалось создать вопрос');
  return response.json();
};

export const patchQuestion = async (updatedQuestion: Question) => {
  const response = await fetch(`${questionsApi}/${updatedQuestion.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedQuestion),
  });
  if (!response.ok) throw new Error('Не удалось обновить вопрос');
  return response.json();
};

export const deleteQuestionById = async (questionId: number) => {
  const response = await fetch(`${questionsApi}/${questionId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Не удалось удалить вопрос');
  return questionId;
};
