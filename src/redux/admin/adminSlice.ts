import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AdminState } from './types';
import { Question } from '../game/types';
import { showToast } from '@ui/toast';
import { fetchQuestions, postQuestion, patchQuestion, deleteQuestionById } from '@hooks/admin';

const initialState: AdminState = {
  questions: [],
  loading: false,
  error: null,
};

const handleAsyncThunk = async (action: () => Promise<any>, successMessage?: string) => {
  try {
    const data = await action();
    if (successMessage) showToast.success(successMessage);
    return data;
  } catch (error: any) {
    showToast.error(error.message || 'Произошла ошибка');
    throw error;
  }
};

export const adminFetchQuestions = createAsyncThunk('admin/fetchQuestions', async (_, { rejectWithValue }) => {
  try {
    return await fetchQuestions();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const createQuestion = createAsyncThunk('admin/createQuestion', async (newQuestion: Omit<Question, 'id'>, { rejectWithValue }) => {
  return handleAsyncThunk(() => postQuestion(newQuestion), 'Вопрос успешно создан').catch((error) => rejectWithValue(error.message));
});

export const updateQuestion = createAsyncThunk('admin/updateQuestion', async (updatedQuestion: Question, { rejectWithValue }) => {
  return handleAsyncThunk(() => patchQuestion(updatedQuestion), 'Вопрос успешно обновлён').catch((error) => rejectWithValue(error.message));
});

export const deleteQuestion = createAsyncThunk('admin/deleteQuestion', async (questionId: number, { rejectWithValue }) => {
  return handleAsyncThunk(() => deleteQuestionById(questionId), 'Вопрос успешно удалён').catch((error) => rejectWithValue(error.message));
});

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminFetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminFetchQuestions.fulfilled, (state, action: PayloadAction<Question[]>) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(adminFetchQuestions.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createQuestion.fulfilled, (state, action: PayloadAction<Question>) => {
        state.questions.push(action.payload);
      })
      .addCase(updateQuestion.fulfilled, (state, action: PayloadAction<Question>) => {
        const index = state.questions.findIndex((q) => q.id === action.payload.id);
        if (index !== -1) state.questions[index] = action.payload;
      })
      .addCase(deleteQuestion.fulfilled, (state, action: PayloadAction<number>) => {
        state.questions = state.questions.filter((q) => Number(q.id) !== action.payload);
      });
  },
});

export default adminSlice.reducer;