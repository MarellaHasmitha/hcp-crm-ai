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

     deleteInteraction: (state, action) => {
      state.interactions = state.interactions.filter(
          (interaction) => interaction.id !== action.payload
        );
      }, 

  },
});

export const {
   addInteraction,
   setExtractedData,
   setInteractions,
   clearExtractedData, 
    deleteInteraction,
  } = interactionSlice.actions;

export default interactionSlice.reducer;