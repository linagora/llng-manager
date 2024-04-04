import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CreationAssistantState {
  selectedType: string;
}

const initialState: CreationAssistantState = {
  selectedType: "None",
};

const creationAssistantSlice = createSlice({
  name: "creationAssistant",
  initialState,
  reducers: {
    changeType(state, action: PayloadAction<string>) {
      state.selectedType = action.payload;
    },
    resetType(state) {
      state.selectedType = initialState.selectedType;
    },
  },
});

export const { changeType, resetType } = creationAssistantSlice.actions;
export default creationAssistantSlice.reducer;
