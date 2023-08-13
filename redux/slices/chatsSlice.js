import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const chats = createSlice({
  name: "currentChat",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChats } = chats.actions;

export default chats.reducer;
