import os
import json
from typing import TypedDict

from dotenv import load_dotenv

from langgraph.graph import StateGraph, END

from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage

load_dotenv()

llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama-3.1-8b-instant"
)

class GraphState(TypedDict):
    user_message: str
    extracted_data: dict
    sentiment_result: str
    followup_suggestion: str
    interaction_summary: str
    compliance_status: str

def extract_interaction_node(state: GraphState):

    user_message = state["user_message"]
    prompt = f"""
        You are an information extraction assistant.

        Extract information from the HCP interaction note.

        Return ONLY a valid JSON object.
        Do not include markdown.
        Do not include explanation.
        Do not wrap JSON in ```.

        Use this exact JSON structure:

        {{
        "hcpName": "",
        "interactionType": "",
        "topicsDiscussed": "",
        "sentiment": "",
        "followUpActions": ""
        }}

        Rules:
        - hcpName should contain doctor name if available.
        - interactionType should be Meeting, Call, Email, or Other.
        - sentiment should be Positive, Neutral, or Negative.
        - topicsDiscussed should summarize what was discussed.
        - followUpActions should include follow-up if mentioned.

        Message:
        {user_message}
        """

    response = llm.invoke([
        HumanMessage(content=prompt)
    ])

    ai_text = response.content.strip()
    try:
        extracted_data = json.loads(ai_text)
    except:
        extracted_data = {
            "hcpName": "",
            "interactionType": "",
            "topicsDiscussed": user_message,
            "sentiment": "",
            "followUpActions": ""
        }

    return {
        "extracted_data": extracted_data
    }

def extract_interaction_data(user_message: str):

    result = workflow.invoke({
        "user_message": user_message
    })

    return result["extracted_data"]

def sentiment_analysis_node(state: GraphState):
    extracted_data = state["extracted_data"]

    sentiment = extracted_data.get("sentiment", "Neutral")

    return {
        "sentiment_result": sentiment
    }


def followup_generation_node(state: GraphState):
    extracted_data = state["extracted_data"]

    followup = extracted_data.get(
        "followUpActions",
        "No follow-up needed"
    )

    return {
        "followup_suggestion": followup
    }


def interaction_summary_node(state: GraphState):
    extracted_data = state["extracted_data"]

    summary = f"""
HCP: {extracted_data.get("hcpName", "")}
Topic: {extracted_data.get("topicsDiscussed", "")}
Sentiment: {extracted_data.get("sentiment", "")}
Follow-up: {extracted_data.get("followUpActions", "")}
"""

    return {
        "interaction_summary": summary
    }


def compliance_check_node(state: GraphState):
    extracted_data = state["extracted_data"]

    if extracted_data.get("hcpName") and extracted_data.get("topicsDiscussed"):
        status = "Compliant"
    else:
        status = "Incomplete interaction details"

    return {
        "compliance_status": status
    }

graph = StateGraph(GraphState)

graph.add_node("extract_interaction", extract_interaction_node)
graph.add_node("sentiment_analysis", sentiment_analysis_node)
graph.add_node("followup_generation", followup_generation_node)
graph.add_node("interaction_summary", interaction_summary_node)
graph.add_node("compliance_check", compliance_check_node)

graph.set_entry_point("extract_interaction")

graph.add_edge("extract_interaction", "sentiment_analysis")
graph.add_edge("sentiment_analysis", "followup_generation")
graph.add_edge("followup_generation", "interaction_summary")
graph.add_edge("interaction_summary", "compliance_check")
graph.add_edge("compliance_check", END)

workflow = graph.compile()


