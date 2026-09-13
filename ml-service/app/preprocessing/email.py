import re
import string

def preprocess_email(subject: str, body: str) -> str:
    # Combine subject and body
    text = f"{subject} {body}"
    # Lowercase
    text = text.lower()
    # Remove URLs
    text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
    # Remove HTML
    text = re.sub(r'<.*?>', '', text)
    # Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))
    # Simple whitespace normalization
    text = " ".join(text.split())
    return text
