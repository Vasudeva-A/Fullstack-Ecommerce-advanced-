import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://127.0.0.1:8000/chatbot/";

export const sendMessage = createAsyncThunk(
    "chat/sendMessage",

    async (message) => {

        const response = await fetch(
            `${BASE_URL}`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    message,
                }),
            }
        );

        return await response.json();
    }
);

const chatSlice = createSlice({

    name: "chat",

    initialState: {

        messages: [],

        loading: false,

        error: null,

    },

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(sendMessage.pending, (state) => {

                state.loading = true;

            })

            .addCase(sendMessage.fulfilled, (state, action) => {

                state.loading = false;

                state.messages.push({

                    question: action.meta.arg,

                    answer: action.payload.answer,

                });

            })

            .addCase(sendMessage.rejected, (state) => {

                state.loading = false;

                state.error = "Something went wrong";

            });

    },

});

export default chatSlice.reducer;