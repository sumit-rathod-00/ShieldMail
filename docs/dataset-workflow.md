# Dataset Workflow

## Upload Flow

```mermaid
flowchart TD
    A[Researcher uploads CSV/JSON] --> B[Format validation]
    B --> C[Schema detection]
    C --> D[Column mapping UI]
    D --> E[Label normalization]
    E --> F[Duplicate detection]
    F --> G[Class distribution check]
    G --> H[Leakage checks]
    H --> I[Dataset version created]
    I --> J[Stored in Supabase Storage]
    J --> K[Metadata in PostgreSQL]
```

## Column Mapping

Email datasets: `text`, `email`, `body`, `message`, `subject`, `sender`, `label`
URL datasets: `url`, `link`, `website`, `address`, `label`

## Label Normalization

| Input | Normalized |
|-------|-----------|
| `0`, `legitimate`, `benign`, `safe` | `0` (legitimate) |
| `1`, `phishing`, `malicious` | `1` (phishing) |
| Anything else | **Rejected** |

## Versioning

Each upload creates an immutable version:
- `phishing-email-v1`, `phishing-email-v2`, ...
- Never overwrites previous versions
- Stores: file hash, row count, label counts, validation result
