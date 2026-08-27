"""
Omnikon / Raksha AI — URL Threat Analyzer
Pure lexical feature extraction from URL strings — NO external network calls.
"""
from __future__ import annotations

import math
import re
from urllib.parse import urlparse, parse_qs

from config import SUSPICIOUS_TLDS, KNOWN_BRANDS, SUSPICIOUS_PATH_KEYWORDS, URL_SHORTENERS


def _shannon_entropy(s: str) -> float:
    """Calculate Shannon entropy of a string."""
    if not s:
        return 0.0
    freq: dict[str, int] = {}
    for ch in s:
        freq[ch] = freq.get(ch, 0) + 1
    length = len(s)
    return -sum((c / length) * math.log2(c / length) for c in freq.values())


def _is_punycode(domain: str) -> bool:
    """Check if domain contains Punycode (IDN homoglyph attack)."""
    return "xn--" in domain.lower()


def _is_ip_address(domain: str) -> bool:
    """Check if domain is an IP address instead of hostname."""
    return bool(re.match(r"^\d{1,3}(\.\d{1,3}){3}$", domain))


def _extract_tld(domain: str) -> str:
    """Extract TLD from domain."""
    parts = domain.rstrip(".").split(".")
    if len(parts) >= 2:
        return "." + parts[-1]
    return ""


def _detect_brand_impersonation(domain: str, path: str) -> list[str]:
    """Detect if URL impersonates known Indian brands."""
    flags = []
    full = (domain + path).lower()
    for brand in KNOWN_BRANDS:
        if brand in full:
            # Check if it's NOT on the official domain
            official_patterns = {
                "sbi": ["sbi.co.in", "onlinesbi.sbi", "yonosbi.sbi"],
                "hdfc": ["hdfcbank.com"],
                "icici": ["icicibank.com"],
                "bescom": ["bescom.co.in", "bescom.org"],
                "paytm": ["paytm.com"],
                "phonepe": ["phonepe.com"],
                "aadhaar": ["uidai.gov.in"],
                "rbi": ["rbi.org.in"],
            }
            officials = official_patterns.get(brand, [])
            if officials and not any(off in domain for off in officials):
                flags.append(f"BRAND_IMPERSONATION:{brand.upper()}")
    return flags


def analyze_url(url: str) -> dict:
    """
    Analyze a URL using only lexical features — no DNS lookups or HTTP requests.
    Returns a dict with domain, tld, riskScore, flags, threatLevel, etc.
    """
    flags: list[str] = []
    risk_score = 0

    # Ensure URL has scheme for parsing
    if not url.startswith(("http://", "https://")):
        url = "http://" + url

    parsed = urlparse(url)
    domain = parsed.netloc.lower().split(":")[0]  # Remove port
    path = parsed.path.lower()
    tld = _extract_tld(domain)
    query_params = parse_qs(parsed.query)

    # ── Feature 1: HTTPS Check ──────────────────────────────
    is_https = parsed.scheme == "https"
    if not is_https:
        flags.append("NO_HTTPS")
        risk_score += 10

    # ── Feature 2: Suspicious TLD ───────────────────────────
    if tld in SUSPICIOUS_TLDS:
        flags.append(f"SUSPICIOUS_TLD:{tld}")
        risk_score += 25

    # ── Feature 3: Punycode / IDN ───────────────────────────
    is_punycode = _is_punycode(domain)
    if is_punycode:
        flags.append("PUNYCODE_IDN_DETECTED")
        risk_score += 20

    # ── Feature 4: IP Address as Domain ─────────────────────
    if _is_ip_address(domain):
        flags.append("IP_ADDRESS_DOMAIN")
        risk_score += 20

    # ── Feature 5: URL Length ───────────────────────────────
    if len(url) > 75:
        flags.append("EXCESSIVE_URL_LENGTH")
        risk_score += 5
    if len(url) > 150:
        risk_score += 5

    # ── Feature 6: Subdomain Count ──────────────────────────
    subdomain_count = domain.count(".") - 1
    if subdomain_count >= 3:
        flags.append(f"EXCESSIVE_SUBDOMAINS:{subdomain_count}")
        risk_score += 10

    # ── Feature 7: Domain Entropy ───────────────────────────
    domain_entropy = _shannon_entropy(domain.replace(".", ""))
    if domain_entropy > 4.0:
        flags.append("HIGH_DOMAIN_ENTROPY")
        risk_score += 10

    # ── Feature 8: Hyphen/Digit Ratio ───────────────────────
    domain_no_tld = domain.rsplit(".", 1)[0] if "." in domain else domain
    hyphen_count = domain_no_tld.count("-")
    digit_count = sum(c.isdigit() for c in domain_no_tld)
    if hyphen_count >= 3:
        flags.append("EXCESSIVE_HYPHENS")
        risk_score += 10
    if digit_count >= 4:
        flags.append("EXCESSIVE_DIGITS_IN_DOMAIN")
        risk_score += 5

    # ── Feature 9: Suspicious Path Keywords ─────────────────
    for keyword in SUSPICIOUS_PATH_KEYWORDS:
        if keyword in path:
            flags.append(f"SUSPICIOUS_PATH:{keyword}")
            risk_score += 5
            break  # Don't double-count

    # ── Feature 10: Query Parameter Count ───────────────────
    if len(query_params) > 5:
        flags.append("EXCESSIVE_QUERY_PARAMS")
        risk_score += 5

    # ── Feature 11: URL Shortener ───────────────────────────
    is_shortened = any(shortener in domain for shortener in URL_SHORTENERS)
    if is_shortened:
        flags.append("URL_SHORTENER_DETECTED")
        risk_score += 15

    # ── Feature 12: Brand Impersonation ─────────────────────
    brand_flags = _detect_brand_impersonation(domain, path)
    flags.extend(brand_flags)
    risk_score += len(brand_flags) * 15

    # ── Feature 13: @ symbol in URL (credential phishing) ──
    if "@" in url:
        flags.append("AT_SYMBOL_IN_URL")
        risk_score += 15

    # ── Feature 14: Double slash redirect ───────────────────
    if "//" in path:
        flags.append("DOUBLE_SLASH_REDIRECT")
        risk_score += 10

    # ── Feature 15: Port in URL ─────────────────────────────
    if ":" in parsed.netloc and not parsed.netloc.endswith((":80", ":443")):
        flags.append("NON_STANDARD_PORT")
        risk_score += 10

    # ── Clamp risk score ────────────────────────────────────
    risk_score = min(100, risk_score)

    # ── Determine threat level ──────────────────────────────
    if risk_score >= 75:
        threat_level = "CRITICAL"
    elif risk_score >= 55:
        threat_level = "HIGH"
    elif risk_score >= 35:
        threat_level = "MEDIUM"
    elif risk_score >= 15:
        threat_level = "LOW"
    else:
        threat_level = "SAFE"

    return {
        "url": url,
        "domain": domain,
        "tld": tld,
        "isPunycode": is_punycode,
        "isHttps": is_https,
        "registrationAge": "Unknown (no DNS lookup -- lexical analysis only)",
        "threatLevel": threat_level,
        "riskScore": risk_score,
        "flags": flags,
    }
