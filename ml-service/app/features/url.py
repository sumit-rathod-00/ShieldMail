from urllib.parse import urlparse

def extract_url_features(url: str) -> dict:
    parsed = urlparse(url)
    return {
        "url_length": len(url),
        "hostname_length": len(parsed.netloc),
        "path_length": len(parsed.path),
        "subdomain_count": len(parsed.netloc.split('.')) - 2,
        "has_https": 1 if parsed.scheme == 'https' else 0,
        "digit_count": sum(c.isdigit() for c in url),
    }
