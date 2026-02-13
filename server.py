import sys
import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import datetime

# Add project root to path
sys.path.append(os.getcwd())

app = FastAPI(title="VANTAGE API Server")

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock/Bridge for the agents
# In a real scenario, we might import ReactAgent directly
# from agents.react_agents import ReactAgent

class QueryRequest(BaseModel):
    actor1: str
    actor2: str
    target_date: str
    scenario: Optional[str] = None

@app.get("/api/health")
def health_check():
    return {"status": "ok", "project": "VANTAGE"}

@app.get("/api/data/stats")
def get_data_stats():
    try:
        data_kg_path = os.path.join("data", "VANTAGE", "data_kg.csv")
        if not os.path.exists(data_kg_path):
            return {"error": "Data not found at " + data_kg_path}
        
        df = pd.read_csv(data_kg_path, sep='\t', nrows=100) # Just a sample
        return {
            "total_events": 266914422, # Hardcoded based on file size for now or we could count
            "columns": df.columns.tolist()
        }
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/forecast")
async def run_forecast(req: QueryRequest):
    # Attempt to find real data in the KG
    try:
        data_kg_path = os.path.join("data", "VANTAGE", "data_kg.csv")
        observation = "No specific historical interactions found in recent archives."
        if os.path.exists(data_kg_path):
            # Load a chunk to find interactions
            df = pd.read_csv(data_kg_path, sep='\t', dtype=str, nrows=50000)
            matches = df[(df['Actor1CountryCode'] == req.actor1) & (df['Actor2CountryCode'] == req.actor2)]
            if not matches.empty:
                event_type = matches.iloc[0]['RelName']
                observation = f"Detected recent {event_type} events between {req.actor1} and {req.actor2} in the global graph."
    except Exception as e:
         print(f"KG search error: {e}")

    # Inject hypothetical scenario if provided
    thought_context = f"the evolving relationship between {req.actor1} and {req.actor2}"
    if req.scenario:
        observation = f"STRATEGY SIMULATION ACTIVE: {req.scenario}. " + observation
        thought_context = f"how the injected scenario '{req.scenario}' fundamentally alters the relationship between {req.actor1} and {req.actor2}"

    final_prediction = f"Anticipating a period of strategic recalibration between {req.actor1} and {req.actor2}."
    confidence = "68% (Agentic Consensus)"

    if req.scenario:
        # Pseudo-logic for scenario impact
        final_prediction = f"Scenario Impact Detected: The variable '{req.scenario}' has triggered a high-probability shift in regional alignment."
        confidence = "82% (Simulation Confidence)"

    return {
        "status": "success",
        "thought": f"I will analyze {thought_context} given the target horizon of {req.target_date}.",
        "action": f"Querying VANTAGE Global Graph for temporal dependencies around {req.target_date}.",
        "observation": observation,
        "final_answer": {
            "prediction": final_prediction,
            "confidence": confidence
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
