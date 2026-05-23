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

    extracted_data = extract_interaction_data(message)

    return {
        "extractedData": extracted_data
    }