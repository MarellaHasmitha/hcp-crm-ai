import { useState } from "react";
import { useDispatch } from "react-redux";
import { setExtractedData } from "../store/interactionSlice";
import { extractAIData } from "../api/ai//aiApi";

export default function ChatPanel() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

 async function handleSend() {

  if (!message.trim()) return;

  const userMessage = {
    text: message,
    sender: "user",
  };

  setMessages((prevMessages) => [...prevMessages, userMessage]);

  setLoading(true);
  setError("");

  try {
    const response = await extractAIData(message);

    dispatch(setExtractedData(response.extractedData));

    const aiMessage = {
      text: "AI extracted interaction details and filled the form.",
      sender: "ai",
    };

    setMessages((prevMessages) => [...prevMessages, aiMessage]);
  } catch (error) {
    console.error("AI extraction failed:", error);

    setError("AI extraction failed. Please try again.");
  } finally {
    setLoading(false);
    setMessage("");
  }
}
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="text-xl font-semibold text-slate-800">
        AI Chat Assistant
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Ask AI to extract and summarize interaction details.
      </p>

      <div className="mt-6 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="rounded-lg bg-slate-100 p-3 text-sm"
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
        />

        <button
          disabled={loading}
          onClick={handleSend}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {loading ? "Analyzing..." : ""}
          Send
        </button>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      </div>
    </div>
  );
}