"""
Omnikon / Raksha AI — Indic Language Processor
Handles script detection, code-mix normalization, and transliteration for
multilingual phishing text analysis across Indian languages.
"""
from __future__ import annotations
import re
import unicodedata


# ── Unicode Block Ranges for Indic Scripts ──────────────────────
SCRIPT_RANGES = {
    "kannada":    (0x0C80, 0x0CFF),
    "devanagari": (0x0900, 0x097F),
    "telugu":     (0x0C00, 0x0C7F),
    "tamil":      (0x0B80, 0x0BFF),
    "malayalam":  (0x0D00, 0x0D7F),
    "bengali":    (0x0980, 0x09FF),
    "gujarati":   (0x0A80, 0x0AFF),
    "gurmukhi":   (0x0A00, 0x0A7F),
    "odia":       (0x0B00, 0x0B7F),
}


def detect_script(text: str) -> str:
    """
    Detect the dominant script in the text.
    Returns: 'latin', 'kannada', 'devanagari', etc., or 'mixed' for code-mix.
    """
    if not text:
        return "latin"

    script_counts: dict[str, int] = {"latin": 0}
    for script_name in SCRIPT_RANGES:
        script_counts[script_name] = 0

    for ch in text:
        cp = ord(ch)
        if ch.isascii() and ch.isalpha():
            script_counts["latin"] += 1
        else:
            for script_name, (low, high) in SCRIPT_RANGES.items():
                if low <= cp <= high:
                    script_counts[script_name] += 1
                    break

    total_alpha = sum(script_counts.values())
    if total_alpha == 0:
        return "latin"

    sorted_scripts = sorted(script_counts.items(), key=lambda x: -x[1])
    dominant = sorted_scripts[0]
    second = sorted_scripts[1] if len(sorted_scripts) > 1 else ("none", 0)

    # If the dominant script has < 70% share and another script has > 15%, it's code-mixed
    if total_alpha > 0:
        dominant_ratio = dominant[1] / total_alpha
        second_ratio = second[1] / total_alpha if second[1] > 0 else 0

        if dominant_ratio < 0.70 and second_ratio > 0.15:
            return "mixed"

    return dominant[0]


def detect_language(text: str) -> str:
    """
    Detect the language code of the input text.
    Returns: 'en', 'kn', 'hi', or 'code-mixed'.
    """
    script = detect_script(text)
    mapping = {
        "latin": "en",
        "kannada": "kn",
        "devanagari": "hi",
        "telugu": "te",
        "tamil": "ta",
        "malayalam": "ml",
        "bengali": "bn",
        "gujarati": "gu",
        "gurmukhi": "pa",
        "odia": "or",
        "mixed": "code-mixed",
    }
    return mapping.get(script, "en")


def normalize_indic_text(text: str) -> str:
    """
    Normalize Indic text for ML processing:
    - Unicode NFC normalization
    - Collapse whitespace
    - Lowercase Latin characters (preserve Indic case-less scripts)
    - Strip diacritics from Latin transliterations
    """
    # NFC normalization
    text = unicodedata.normalize("NFC", text)

    # Lowercase only Latin characters
    result = []
    for ch in text:
        if ch.isascii():
            result.append(ch.lower())
        else:
            result.append(ch)
    text = "".join(result)

    # Collapse whitespace
    text = re.sub(r"\s+", " ", text).strip()

    return text


def extract_entities(text: str) -> dict:
    """
    Extract suspicious entities from text using regex patterns.
    Returns dict with 'urls', 'phones', 'upiIds' lists.
    """
    # URLs — including suspicious TLD patterns
    url_pattern = r'https?://[^\s<>\"\']+|[a-z0-9][a-z0-9._-]*\.(top|xyz|click|link|info|online|site|club|buzz|icu|live|store)/[^\s<>\"\']*'
    urls = re.findall(url_pattern, text, re.IGNORECASE)
    # The regex returns tuples for groups, flatten
    full_urls = re.findall(
        r'(?:https?://[^\s<>\"\']+|[a-z0-9][a-z0-9._-]*\.(?:top|xyz|click|link|info|online|site|club|buzz|icu|live|store)/[^\s<>\"\']*)',
        text,
        re.IGNORECASE,
    )

    # Phone numbers (Indian format)
    phone_pattern = r'(?:\+91[-\s]?)?[6-9]\d{4}[-\s]?\d{5}'
    phones = re.findall(phone_pattern, text)

    # UPI IDs
    upi_pattern = r'[a-zA-Z0-9._-]+@(?:ybl|upi|paytm|okicici|oksbi|apl|ibl|axl|sbi|icici|hdfcbank|kotak|freecharge|okhdfcbank)'
    upi_ids = re.findall(upi_pattern, text, re.IGNORECASE)

    return {
        "urls": full_urls,
        "phones": phones,
        "upiIds": upi_ids,
    }


# ── Coercion Trigger Detection ──────────────────────────────────

COERCION_PATTERNS: dict[str, str] = {
    # ARTIFICIAL_URGENCY
    "urgent": "ARTIFICIAL_URGENCY",
    "immediately": "ARTIFICIAL_URGENCY",
    "last warning": "ARTIFICIAL_URGENCY",
    "expire": "ARTIFICIAL_URGENCY",
    "2 hours": "ARTIFICIAL_URGENCY",
    "24 hrs": "ARTIFICIAL_URGENCY",
    "within 1 hour": "ARTIFICIAL_URGENCY",
    "tatkshan": "ARTIFICIAL_URGENCY",      # Kannada transliteration of "immediately"
    "ತಕ್ಷಣ": "ARTIFICIAL_URGENCY",          # Kannada: immediately

    # PANIC
    "disconnect": "PANIC",
    "block": "PANIC",
    "arrest": "PANIC",
    "fir": "PANIC",
    "jail": "PANIC",
    "suspend": "PANIC",
    "ಕಡಿತ": "PANIC",                       # Kannada: cut/disconnect
    "ಬಂಧಿಸ": "PANIC",                      # Kannada: arrest

    # AUTHORITY_IMPERSONATION
    "police": "AUTHORITY_IMPERSONATION",
    "officer": "AUTHORITY_IMPERSONATION",
    "inspector": "AUTHORITY_IMPERSONATION",
    "cbi": "AUTHORITY_IMPERSONATION",
    "rbi": "AUTHORITY_IMPERSONATION",
    "customs": "AUTHORITY_IMPERSONATION",
    "uidai": "AUTHORITY_IMPERSONATION",
    "ಪೊಲೀಸ": "AUTHORITY_IMPERSONATION",     # Kannada: police

    # FALSE_EXCLUSIVITY
    "exclusive": "FALSE_EXCLUSIVITY",
    "selected": "FALSE_EXCLUSIVITY",
    "lucky": "FALSE_EXCLUSIVITY",
    "congratulations": "FALSE_EXCLUSIVITY",

    # GREED
    "earn": "GREED",
    "profit": "GREED",
    "return": "GREED",
    "lakh": "GREED",
    "bonus": "GREED",
    "ಗಳಿಸಿ": "GREED",                      # Kannada: earn

    # SHAME_THREAT
    "morphed photo": "SHAME_THREAT",
    "video leak": "SHAME_THREAT",
    "contacts": "SHAME_THREAT",
    "blackmail": "SHAME_THREAT",
}


def detect_coercion_triggers(text: str) -> list[str]:
    """Detect psychological coercion patterns in the text."""
    lower = text.lower()
    triggers: set[str] = set()
    for pattern, trigger in COERCION_PATTERNS.items():
        if pattern.lower() in lower or pattern in text:
            triggers.add(trigger)
    return sorted(triggers)
