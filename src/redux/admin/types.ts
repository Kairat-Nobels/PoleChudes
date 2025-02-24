import { Question } from '../game/types';

export interface AdminState {
  questions: Question[];
  loading: boolean;
  error: string | null;
}
