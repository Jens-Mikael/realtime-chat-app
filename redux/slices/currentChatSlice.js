import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const currentChat = createSlice({
  name: "currentChat",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentChat } = currentChat.actions;

export default currentChat.reducer;
