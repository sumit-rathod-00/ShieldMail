# ShieldMail — ML Service API Reference

Base URL: `http://localhost:8000`

## Health

### GET /health
Returns service and model status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "email_model": {
    "loaded": true,
    "version": "ShieldMail-Email-v1.0"
  },
  "url_model": {
    "loaded": true,
    "version": "ShieldMail-URL-v1.0"
  }
}
```

## Prediction

### POST /predict/email
Classify an email as phishing or legitimate.

**Request:**
```json
{
  "sender": "alerts@secure-bank-update.com",
  "subject": "Urgent: Verify your account",
  "body": "Dear customer, click here to verify...",
  "urls": ["https://secure-bank-update.com/verify"]
}
```

**Response:**
```json
{
  "prediction": "phishing",
  "phishing_probability": 0.93,
  "legitimate_probability": 0.07,
  "risk_score": 93,
  "risk_level": "HIGH",
  "model_version": "ShieldMail-Email-v1.0",
  "indicators": ["suspicious_sender_domain", "urgency_language"],
  "explanation": "High confidence phishing detected based on sender domain and email content patterns.",
  "request_id": "req_abc123"
}
```

### POST /predict/url
Classify a URL as phishing or legitimate.

**Request:**
```json
{
  "url": "https://secure-paypal-update.xyz/login"
}
```

**Response:**
```json
{
  "prediction": "phishing",
  "phishing_probability": 0.88,
  "legitimate_probability": 0.12,
  "risk_score": 88,
  "risk_level": "HIGH",
  "model_version": "ShieldMail-URL-v1.0",
  "features": {
    "url_length": 42,
    "has_ip": false,
    "subdomain_count": 1,
    "suspicious_tld": true
  },
  "explanation": "URL exhibits multiple phishing indicators: suspicious TLD, brand name in path.",
  "request_id": "req_def456"
}
```

## Training

### POST /training/start
Start a training job (background).

### GET /training/{job_id}/status
Get training job status.

### GET /models
List registered models.

## Errors

All errors follow:
```json
{
  "error": "model_not_loaded",
  "message": "No production model available for email classification.",
  "request_id": "req_xxx"
}
```
