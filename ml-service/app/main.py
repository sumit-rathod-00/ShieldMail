from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from .preprocessing.email import preprocess_email
from .features.url import extract_url_features

app = FastAPI(title="ShieldMail ML Service")

class EmailScanRequest(BaseModel):
    sender: str
    subject: str
    body: str

class URLScanRequest(BaseModel):
    url: str

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/predict/email")
async def predict_email(request: EmailScanRequest):
    processed_text = preprocess_email(request.subject, request.body)
    # Placeholder: In final implementation, load model and predict here
    return {
        "prediction": "legitimate",
        "phishing_probability": 0.05,
        "processed_text": processed_text
    }

@app.post("/predict/url")
async def predict_url(request: URLScanRequest):
    features = extract_url_features(request.url)
    # Placeholder: In final implementation, load model and predict here
    return {
        "prediction": "legitimate",
        "phishing_probability": 0.02,
        "features": features
    }
