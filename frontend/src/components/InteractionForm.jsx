import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInteraction,clearExtractedData} from "../store/interactionSlice";
import { saveInteraction } from "../api/interactionApi";

function InteractionForm() {
   const initialFormData = {
        hcpName: "",
        interactionType: "",
        date: "",
        time: "",
        attendees: "",
        topicsDiscussed: "",
        materialsShared: "",
        samplesDistributed: "",
        sentiment: "",
        outcomes: "",
        followUpActions: "",
        };
    const [formData, setFormData] = useState(initialFormData);

    const [errors, setErrors] = useState({});

    function validateForm() {
          const newErrors = {};

          if (!formData.hcpName.trim()) {
            newErrors.hcpName = "HCP name is required";
          }

          if (!formData.interactionType) {
            newErrors.interactionType = "Interaction type is required";
          }

          if (!formData.topicsDiscussed.trim()) {
            newErrors.topicsDiscussed = "Topics discussed is required";
          }

          if (!formData.sentiment) {
            newErrors.sentiment = "Sentiment is required";
          }

          setErrors(newErrors);

          return Object.keys(newErrors).length === 0;
        }
    
    const dispatch=useDispatch();

    const interactions = useSelector(
        (state) => state.interaction.interactions
      );

    const extractedData = useSelector(
        (state) => state.interaction.extractedData
      );


  useEffect(() => {
        if (extractedData) {
          setFormData((prevData) => ({
            ...prevData,
            ...extractedData,
          }));
          setErrors({});
        }
    }, [extractedData]);

    
    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
        ...formData,
        [name]: value,
        });
    }

async function handleSubmit(e) {
        e.preventDefault();
          if (!validateForm()) {
              return;
            }

        try {
          const response = await saveInteraction(formData);

          console.log("Backend response:", response);

          dispatch(addInteraction(formData));
          dispatch(clearExtractedData());

          setFormData(initialFormData);
          setErrors({});
          alert("Interaction saved successfully!");
        } catch (error) {
          console.error("Failed to save interaction:", error);
          alert("Failed to save interaction. Please check backend.");
        }
    }
    
    
  return (
     <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="font-bold text-center text-lg">HCP Interaction Form</h2>
      <p className="font-bold text-center">Log doctor interaction details here.</p>

     <form onSubmit={handleSubmit}>

      <input
        type="text"
        name="hcpName"
        placeholder="HCP Name"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 m-2"
        value={formData.hcpName}
        onChange={handleChange}
      />
      {errors.hcpName && (
          <p className="mt-1 text-xs text-red-600">{errors.hcpName}</p>
        )}


      <select
        name="interactionType"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 m-2"
        value={formData.interactionType}
        onChange={handleChange}
      >
        <option value="">Select Interaction Type</option>
        <option value="Meeting">Meeting</option>
        <option value="Call">Call</option>
        <option value="Email">Email</option>
      </select>

      {errors.interactionType && (
          <p className="mt-1 text-xs text-red-600">{errors.interactionType}</p>
        )}



      <input
        type="date"
        name="date"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 m-2"
        value={formData.date}
        onChange={handleChange}
      />

      <input
        type="time"
        name="time"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 m-2"
        value={formData.time}
        onChange={handleChange}
      />

      <input
        type="text"
        name="attendees"
        placeholder="Attendees"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 m-2"
        value={formData.attendees}
        onChange={handleChange}
      />

      <textarea
        name="topicsDiscussed"
        placeholder="Topics Discussed"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 m-2"
        value={formData.topicsDiscussed}
        onChange={handleChange}
      />

      {errors.topicsDiscussed && (
          <p className="mt-1 text-xs text-red-600">{errors.topicsDiscussed}</p>
        )}

      <textarea
        name="materialsShared"
        placeholder="Materials Shared"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 m-2"
        value={formData.materialsShared}
        onChange={handleChange}
      />

      <textarea
        name="samplesDistributed"
        placeholder="Samples Distributed"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 m-2"
        value={formData.samplesDistributed}
        onChange={handleChange}
      />

      <select
        name="sentiment"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 m-2"
        value={formData.sentiment}
        onChange={handleChange}
      >
        <option value="">Select Sentiment</option>
        <option value="Positive">Positive</option>
        <option value="Neutral">Neutral</option>
        <option value="Negative">Negative</option>
      </select>

      {errors.sentiment && (
          <p className="mt-1 text-xs text-red-600">{errors.sentiment}</p>
        )}


      <textarea
        name="outcomes"
        placeholder="Outcomes"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 m-2"
        value={formData.outcomes}
        onChange={handleChange}
      />

      <textarea
        name="followUpActions"
        placeholder="Follow-up Actions"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 m-2"
        value={formData.followUpActions}
        onChange={handleChange}
      />

      <button type="submit"
      className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 m-2">
        Save Interaction</button>

      </form>


  <div className="mt-8">
        <h3 className="mb-4 text-xl font-semibold text-slate-800">
          Saved Interactions
        </h3>

        {interactions.length === 0 ? (
          <p className="text-sm text-slate-500">
            No interactions saved yet.
          </p>
        ) : (
          <div className="space-y-4">
            {interactions.map((interaction, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-slate-800">
                    {interaction.hcpName}
                  </h4>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {interaction.sentiment}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-600 md:grid-cols-2">
                  <p>
                    <span className="font-medium">Type:</span>{" "}
                    {interaction.interactionType}
                  </p>

                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {interaction.date || "Not provided"}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-700">
                    Topics Discussed
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {interaction.topicsDiscussed}
                  </p>
                </div>

              </div>
        ))}
    </div>
  )}
</div>
    </div>
  );
}

export default InteractionForm;