import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { sendMessage } from "../Chatbot/chatSlice";

export default function Chatbot() {
  const dispatch = useDispatch();

  const { messages, loading } = useSelector((state) => state.chat);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    dispatch(sendMessage(input));

    setInput("");
  };

  return (
    <div>
      <h2>AI Chatbot</h2>

      <div>
        {messages.map((chat, index) => (
          <div key={index}>
            <p>
              <b>You:</b>

              {chat.question}
            </p>

            <p>
              <b>Bot:</b>

              {chat.answer}
            </p>

            <hr />
          </div>
        ))}
      </div>

      <input value={input} onChange={(e) => setInput(e.target.value)} />

      <button onClick={handleSend}>Send</button>

      {loading && <p>Thinking...</p>}
    </div>
  );
}
