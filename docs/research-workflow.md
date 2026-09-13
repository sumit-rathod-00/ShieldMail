# Research Workflow

## Continuous Improvement Loop

```mermaid
flowchart TD
    A[Upload Dataset] --> B[Validate]
    B --> C[Create Version]
    C --> D[Configure Training]
    D --> E[Start Training Job]
    E --> F[Monitor Progress]
    F --> G[Evaluation Complete]
    G --> H[Compare with Production]
    H --> I{Researcher Approves?}
    I -->|Yes| J[Promote to Production]
    I -->|No| K[Archive Candidate]
    J --> L[Collect Predictions]
    L --> M[User Feedback]
    M --> N[Review Samples]
    N --> O[Approve Samples]
    O --> P[Improve Dataset V2]
    P --> D
```

## Model Lifecycle

`experimental` → `validated` → `production` → `archived`

A model can only be promoted to production by a Researcher or Admin with explicit confirmation after reviewing evaluation metrics.
