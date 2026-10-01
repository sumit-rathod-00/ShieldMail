# Copyright (c) 2026 ShieldMail Research Team. All rights reserved.
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from .preprocessing.email import preprocess_email
from .features.url import extract_url_features

app = FastAPI(
    title="ShieldMail ML Service",
    description="AI-Powered Phishing Email & URL Detection Research Platform API",
    version="2.4.1"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class EmailScanRequest(BaseModel):
    sender: str
    subject: str
    body: str

class URLScanRequest(BaseModel):
    url: str

@app.get("/")
async def root():
    return {
        "service": "ShieldMail ML Service",
        "status": "online",
        "version": "v2.4.1",
        "documentation": "/docs",
        "health": "/health",
        "endpoints": {
            "predict_email": "/predict/email",
            "predict_url": "/predict/url"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ShieldMail ML Engine", "version": "v2.4.1"}

@app.post("/predict/email")
async def predict_email(request: EmailScanRequest):
    processed_text = preprocess_email(request.subject, request.body)

    # Simple rule-based detector (Heuristics)
    suspicious_keywords = ["verify", "password", "bank", "account", "login", "update"]
    score = 0
    for kw in suspicious_keywords:
        if kw in processed_text:
            score += 0.2

    is_phishing = score > 0.5

    return {
        "prediction": "phishing" if is_phishing else "legitimate",
        "phishing_probability": round(min(score, 1.0), 2),
        "processed_text": processed_text
    }

@app.post("/predict/url")
async def predict_url(request: URLScanRequest):
    features = extract_url_features(request.url)
    # Simple rule-based detector
    is_phishing = features["digit_count"] > 5 or not features["has_https"]

    return {
        "prediction": "phishing" if is_phishing else "legitimate",
        "phishing_probability": 0.8 if is_phishing else 0.1,
        "features": features
    }
