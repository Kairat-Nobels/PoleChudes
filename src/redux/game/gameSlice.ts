import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GameState, Question } from './types';

const initialState: GameState = {
  questions: [],
  currentQuestion: null,
  playerAnswer: '',
  progress: {},
  guessedLetters: [],
  solved: false,
  loading: false,
  error: null,
};

export const fetchQuestions = createAsyncThunk(
  'game/fetchQuestions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://1b5d06015405786e.mokky.dev/questions');
      if (!response.ok) {
        throw new Error('Ошибка сети');
      }
      const data: Question[] = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    selectRandomQuestion(state) {
      const unresolved = state.questions.filter(q => {
        const pr = state.progress[q.id];
        return !pr || !pr.solved;
      });
      if (unresolved.length > 0) {
        const randomIndex = Math.floor(Math.random() * unresolved.length);
        state.currentQuestion = unresolved[randomIndex];
        state.guessedLetters = [];
        state.solved = false;
        state.playerAnswer = '';
      } else {
        state.currentQuestion = null;
      }
    },
    guessLetter(state, action: PayloadAction<string>) {
      const letter = action.payload.toLowerCase();
      if (!state.currentQuestion || state.solved) return;

      if (!state.guessedLetters.includes(letter)) {
        state.guessedLetters.push(letter);
      }

      const answer = state.currentQuestion.answer.toLowerCase();
      const uniqueLetters = Array.from(new Set(answer.split('')));
      const isAllGuessed = uniqueLetters.every((l) => state.guessedLetters.includes(l));

      if (isAllGuessed) {
        state.solved = true;
        if (!state.progress[state.currentQuestion.id]) {
          state.progress[state.currentQuestion.id] = { guessedLetters: [], solved: false };
        }
        state.progress[state.currentQuestion.id].solved = true;
      }
    },
    guessWord(state, action: PayloadAction<string>) {
      if (!state.currentQuestion || state.solved) return;

      const userWord = action.payload.toLowerCase().trim();
      const correctWord = state.currentQuestion.answer.toLowerCase();

      if (userWord === correctWord) {
        state.solved = true;
        if (!state.progress[state.currentQuestion.id]) {
          state.progress[state.currentQuestion.id] = { guessedLetters: [], solved: false };
        }
        state.progress[state.currentQuestion.id].solved = true;
        state.guessedLetters = Array.from(new Set(correctWord.split('')));
      }
    },
    nextQuestion(state) {
      state.currentQuestion = null;
      state.guessedLetters = [];
      state.solved = false;
      state.playerAnswer = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<Question[]>) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  selectRandomQuestion,
  guessLetter,
  guessWord,
  nextQuestion,
} = gameSlice.actions;

export default gameSlice.reducer;
