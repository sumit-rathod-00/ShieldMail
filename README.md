# ShieldMail 🛡️

**AI-Powered Phishing Email & URL Detection Research Platform**

ShieldMail is a research-grade cybersecurity platform for detecting phishing emails and malicious URLs using machine learning. It supports continuous dataset-driven model improvement and is designed for academic research and live demonstration.

---

## Architecture

```text
User → ShieldMail Web App → Supabase (Auth + DB + Storage)
                          → Python ML Service (FastAPI)
                               ├── Email Pipeline (DistilBERT)
                               └── URL Pipeline (RF / LR / XGBoost)
```

## User Roles

| Role | Capabilities |
|------|-------------|
| **User** | Scan emails/URLs, view history, submit feedback |
| **Researcher** | + Upload datasets, train models, run experiments, compare models |
| **Admin** | + Manage users, promote models to production, manage system |

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Storage + RLS)
- **ML Service**: Python 3.11+ + FastAPI + scikit-learn + PyTorch + HuggingFace Transformers

## Quick Start

### 1. Clone & configure
```bash
git clone https://github.com/sumit-rathod-00/ShieldMail.git
cd ShieldMail
cp .env.example .env
# Fill in your Supabase credentials in .env
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. ML Service
```bash
cd ml-service
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 4. Docker (all services)
```bash
docker-compose up --build
```

## Documentation

- [Architecture](docs/architecture.md)
- [Dataset Workflow](docs/dataset-workflow.md)
- [Training Workflow](docs/training-workflow.md)
- [Model Management](docs/model-management.md)
- [API Reference](docs/api.md)
- [Research Workflow](docs/research-workflow.md)

## Research Integrity

ShieldMail never fabricates metrics. All accuracy, F1, ROC-AUC, and other values are calculated from actual trained models evaluated on held-out test sets.

## License

Academic / Research use. See LICENSE.

---

> Built for NTPC 2026 Presentation — Cybersecurity Research Track
