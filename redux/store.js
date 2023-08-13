import { configureStore } from "@reduxjs/toolkit";
import currentChatReducer from "./slices/currentChatSlice";
import chatsReducer from "./slices/chatsSlice";

export const store = configureStore({
  reducer: {
    currentChat: currentChatReducer,
    chats: chatsReducer,
  },
});
