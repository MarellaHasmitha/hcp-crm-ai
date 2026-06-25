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
  const [aiInsights, setAiInsights] = useState(null);

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

dispatch(setExtractedData(response.extractedData));

setAiInsights({
  extractedData: response.extractedData,
  sentimentResult: response.sentimentResult,
  followupSuggestion: response.followupSuggestion,
  interactionSummary: response.interactionSummary,
  complianceStatus: response.complianceStatus,
});
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


      {aiInsights && (
  <div className="mt-6 space-y-3">
    <h3 className="text-lg font-semibold text-slate-800">
      AI Workflow Results
    </h3>

    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-700">
        1. Extracted Interaction
      </p>
      <p className="mt-1 text-sm text-slate-600">
        HCP: {aiInsights.extractedData.hcpName || "Not detected"}
      </p>
      <p className="text-sm text-slate-600">
        Topic: {aiInsights.extractedData.topicsDiscussed || "Not detected"}
      </p>
    </div>

    <div className="rounded-xl border border-green-200 bg-green-50 p-4">
      <p className="text-sm font-semibold text-green-700">
        2. Sentiment Analysis
      </p>
      <p className="mt-1 text-sm text-green-700">
        {aiInsights.sentimentResult}
      </p>
    </div>

    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
      <p className="text-sm font-semibold text-blue-700">
        3. Follow-up Suggestion
      </p>
      <p className="mt-1 text-sm text-blue-700">
        {aiInsights.followupSuggestion}
      </p>
    </div>

    <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
      <p className="text-sm font-semibold text-purple-700">
        4. Interaction Summary
      </p>
      <p className="mt-1 text-sm text-purple-700 whitespace-pre-line">
        {aiInsights.interactionSummary}
      </p>
    </div>

    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
      <p className="text-sm font-semibold text-amber-700">
        5. Compliance Check
      </p>
      <p className="mt-1 text-sm text-amber-700">
        {aiInsights.complianceStatus}
      </p>
    </div>
  </div>
)}
    </div>


     
  );
}