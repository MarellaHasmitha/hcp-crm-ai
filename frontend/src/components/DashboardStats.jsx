import { useSelector } from "react-redux";

export default function DashboardStats() {

  const interactions = useSelector(
    (state) => state.interaction.interactions
  );

  const totalInteractions = interactions.length;

  const positiveCount = interactions.filter(
    (interaction) =>
      interaction.sentiment?.toLowerCase() === "positive"
  ).length;

  const neutralCount = interactions.filter(
    (interaction) =>
      interaction.sentiment?.toLowerCase() === "neutral"
  ).length;

  const negativeCount = interactions.filter(
    (interaction) =>
      interaction.sentiment?.toLowerCase() === "negative"
  ).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 ">

      <div className="bg-white shadow rounded-xl p-4 text-center">
        <h2 className="text-gray-500 text-sm">
          Total Interactions
        </h2>

        <p className="text-2xl font-bold">
          {totalInteractions}
        </p>
      </div>

      <div className="bg-green-100 shadow rounded-xl p-4 text-center">
        <h2 className="text-green-700 text-sm">
          Positive
        </h2>

        <p className="text-2xl font-bold">
          {positiveCount}
        </p>
      </div>

      <div className="bg-yellow-100 shadow rounded-xl p-4 text-center">
        <h2 className="text-yellow-700 text-sm">
          Neutral
        </h2>

        <p className="text-2xl font-bold">
          {neutralCount}
        </p>
      </div>

      <div className="bg-red-100 shadow rounded-xl p-4 text-center">
        <h2 className="text-red-700 text-sm">
          Negative
        </h2>

        <p className="text-2xl font-bold">
          {negativeCount}
        </p>
      </div>

    </div>
  );
}