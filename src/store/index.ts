import { configureStore } from "@reduxjs/toolkit";
import promptReducer from "@/features/prompt/promptSlice";
import generationReducer from "@/features/generation/generationSlice";

export const store = configureStore({
  reducer: {
    prompt: promptReducer,
    generation: generationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

