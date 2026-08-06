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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg mx-auto" style={{ maxWidth: "700px" }}>
        {/* Header */}
        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0">🤖 AI Chatbot</h4>
        </div>

        {/* Chat Body */}
        <div
          className="card-body"
          style={{ height: "500px", overflowY: "auto" }}
        >
          {messages.length === 0 && (
            <div className="text-center text-muted mt-5">
              <h5>Start a conversation</h5>
              <p>Ask anything about your products.</p>
            </div>
          )}

          {messages.map((chat, index) => (
            <div key={index} className="mb-4">
              {/* User */}
              <div className="d-flex justify-content-end mb-2">
                <div className="bg-primary text-white rounded-3 p-3 w-75">
                  <strong>You</strong>
                  <div>{chat.question}</div>
                </div>
              </div>

              {/* Bot */}
              <div className="d-flex justify-content-start">
                <div className="bg-light border rounded-3 p-3 w-75">
                  <strong>🤖 Vasu</strong>
                  <div>{chat.answer}</div>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="d-flex justify-content-start">
              <div className="alert alert-secondary py-2 px-3 mb-0">
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Answering The question Takes little time please wait .....
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="card-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            <button
              className="btn btn-primary"
              onClick={handleSend}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
