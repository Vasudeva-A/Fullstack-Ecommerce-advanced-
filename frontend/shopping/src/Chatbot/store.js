import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../Chatbot/chatSlice";

export const store = configureStore({
    reducer: {
        chat: chatReducer,
    },
});