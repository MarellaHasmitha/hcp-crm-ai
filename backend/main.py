from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from ai_service import extract_interaction_data
from database import engine, SessionLocal, Base
from models import Interaction as InteractionModel

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                  "https://hcp-crm-ai.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class InteractionCreate(BaseModel):
    hcpName: str
    interactionType: str
    date: Optional[str] = None
    time: Optional[str] = None
    attendees: Optional[str] = None
    topicsDiscussed: str
    materialsShared: Optional[str] = None
    samplesDistributed: Optional[str] = None
    sentiment: str
    outcomes: Optional[str] = None
    followUpActions: Optional[str] = None


@app.get("/")
def home():
    return {"message": "AI CRM Backend is running"}


@app.post("/api/interactions/log")
def log_interaction(interaction: InteractionCreate):
    db = SessionLocal()

    db_interaction = InteractionModel(**interaction.model_dump())

    db.add(db_interaction)
    db.commit()
    db.refresh(db_interaction)

    db.close()

    return {
        "message": "Interaction saved to PostgreSQL",
        "data": interaction
    }


@app.get("/api/interactions")
def get_interactions():
    db = SessionLocal()

    interactions = db.query(InteractionModel).all()

    db.close()

    return interactions


@app.post("/api/ai/extract")
def extract_ai_data(payload: dict):
    message = payload.get("message", "")

    result = extract_interaction_data(message)

    return {
        "extractedData": result["extracted_data"],
        "sentimentResult": result["sentiment_result"],
        "followupSuggestion": result["followup_suggestion"],
        "interactionSummary": result["interaction_summary"],
        "complianceStatus": result["compliance_status"]
    }


@app.delete("/api/interactions/{interaction_id}")
def delete_interaction(interaction_id: int):
    db = SessionLocal()

    interaction = db.query(InteractionModel).filter(
        InteractionModel.id == interaction_id
    ).first()

    if not interaction:
        db.close()
        return {"message": "Interaction not found"}

    db.delete(interaction)
    db.commit()
    db.close()

    return {"message": "Interaction deleted successfully"}