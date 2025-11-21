import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PromptState = {
  value: string;
};

const initialState: PromptState = {
  value: "",
};

const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    setPrompt: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    resetPrompt: (state) => {
      state.value = "";
    },
  },
});

export const { setPrompt, resetPrompt } = promptSlice.actions;
export default promptSlice.reducer;

