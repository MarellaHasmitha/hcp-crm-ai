import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  interactions: [],
};

const interactionSlice = createSlice({
  name: "interaction",

  initialState,

  reducers: {
    addInteraction: (state, action) => {
      state.interactions.push(action.payload);
    },

    setInteractions: (state, action) => {
        state.interactions = action.payload;
    },

    setExtractedData: (state, action) => {
      state.extractedData = action.payload;
    },

    clearExtractedData: (state) => {
        state.extractedData = null;
      },

  },
});

export const {
   addInteraction,
   setExtractedData,
   setInteractions,
   clearExtractedData, 
  } = interactionSlice.actions;

export default interactionSlice.reducer;