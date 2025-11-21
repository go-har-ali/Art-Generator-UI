import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type GenerationState = {
  imageUrl: string | null;
  prompt: string;
};

const initialState: GenerationState = {
  imageUrl: null,
  prompt: "",
};

const generationSlice = createSlice({
  name: "generation",
  initialState,
  reducers: {
    setGenerationResult: (
      state,
      action: PayloadAction<{ imageUrl: string; prompt: string }>
    ) => {
      state.imageUrl = action.payload.imageUrl;
      state.prompt = action.payload.prompt;
    },
    clearGenerationResult: (state) => {
      state.imageUrl = null;
      state.prompt = "";
    },
  },
});

export const { setGenerationResult, clearGenerationResult } =
  generationSlice.actions;
export default generationSlice.reducer;

