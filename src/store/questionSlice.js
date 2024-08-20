import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  questions: [],
  currentQuestion: 0,
  answers: {},
  status: 'idle', // To track loading status for fetching questions
  submitStatus: 'idle', // To track loading status for submitting answers
  error: null, // To store any error that occurs
};

// Async thunk to fetch questions from the backend
export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async (testId) => {
  const response = await axios.get(`https://cipherschools-etest-backend.onrender.com/test/${testId}`); // Adjust the URL as needed
  return response.data.Questions; // Assuming the data is under the "Questions" key
});

// Async thunk to submit answers to the backend
export const submitAnswers = createAsyncThunk('questions/submitAnswers', async ({email, testId, answers }) => {
  const response = await axios.post(`https://cipherschools-etest-backend.onrender.com/test/submit?email=${email}&testId=${testId}`, 
    {answers }); // Adjust the URL as needed
  return response.data;
});

export const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    markAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    navigateToQuestion: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.questions.length) {
        state.currentQuestion = index;
      }
    },
    resetTest: (state) => {
      state.questions = [];
      state.currentQuestion = 0;
      state.answers = {};
      state.status = 'idle';
      state.submitStatus = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Questions Thunk
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Submit Answers Thunk
      .addCase(submitAnswers.pending, (state) => {
        state.submitStatus = 'loading';
      })
      .addCase(submitAnswers.fulfilled, (state) => {
        state.submitStatus = 'succeeded';
      })
      .addCase(submitAnswers.rejected, (state, action) => {
        state.submitStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { markAnswer, navigateToQuestion, resetTest } = questionSlice.actions;

export default questionSlice.reducer;
