import InteractionForm from "../components/InteractionForm";
import ChatPanel from "../components/ChatPanel";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getInteractions } from "../api/interactionApi";
import { setInteractions } from "../store/interactionSlice";
import DashboardStats from "../components/DashboardStats";

function InteractionPage() {
  const dispatch = useDispatch();

    useEffect(() => {
      async function fetchInteractions() {
        try {
          const data = await getInteractions();
          dispatch(setInteractions(data));
        } catch (error) {
          console.error("Failed to fetch interactions:", error);
        }
      }

      fetchInteractions();
    }, [dispatch]);
    
  return (
    <div className="min-h-screen bg-slate-100 px-6 py-8">
      <DashboardStats />
      <h1 className="mb-8 text-center text-3xl font-bold text-slate-800">
        AI CRM - HCP Interaction Logger
      </h1>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        
        <InteractionForm />
        <ChatPanel />
       
      </div>
       
    </div>
  );
}

export default InteractionPage;