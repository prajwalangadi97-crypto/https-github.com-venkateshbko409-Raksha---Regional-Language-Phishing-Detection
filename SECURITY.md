# 🛡️ Security Policy — Omnikon / Raksha AI (ರಕ್ಷಾ AI)

Omnikon / Raksha AI is committed to maintaining the highest standards of data security, privacy, and responsible AI deployment to protect citizens and security infrastructure across India.

---

## 📋 Supported Versions

We actively maintain and provide security patches for the following versions:

| Version | Status | Security Patches |
|---|---|---|
| **v1.0.x (Current / Main)** | 🟢 Active Support | Full Security & Vulnerability Updates |
| **v0.9.x (Beta / Pilot)** | 🟡 Deprecated | Critical Security Fixes Only |
| **< v0.9.0** | 🔴 End-of-Life | Unsupported — Please Upgrade |

---

## 🚨 Reporting a Vulnerability (Responsible Disclosure)

If you discover a security vulnerability, data leakage issue, or model jailbreak vector within Raksha AI, **please do NOT open a public GitHub issue.**

Instead, please report it through one of the following secure channels:

1. **GitHub Security Advisories (Recommended)**:
   - Navigate to the [Security Tab](https://github.com/prajwalangadi97-crypto/https-github.com-venkateshbko409-Raksha---Regional-Language-Phishing-Detection/security/advisories) on GitHub and click **"Report a vulnerability"**.
2. **Dedicated Security Email**:
   - 📧 Email: **`security-raksha@ksp.gov.in`** (or **`pushkar.aids24@cmrit.ac.in`**)
   - Subject format: `[SECURITY VULNERABILITY] <Component Name> - <Short Summary>`

### ⏱️ Vulnerability Response SLA
- **Initial Acknowledgment**: Within **24 hours**
- **Assessment & Triage**: Within **48 to 72 hours**
- **Resolution & Patch Deployment**: Within **7 business days** (for Critical/High severity issues)
- **Public Disclosure / CVE Assignment**: Coordinated disclosure after patch verification.

---

## 🎯 Scope of Security Policy

### ✅ In-Scope
- **Indic NLP & Threat Engine**: Prompt injection, classifier evasion, denial-of-service via malformed Unicode / Indic script payloads.
- **FastAPI Backend**: Remote code execution, SQL/Command injection, authentication bypass, unhandled exceptions leading to memory leaks.
- **Frontend & Client Application**: Cross-Site Scripting (XSS), insecure storage of sensitive artifacts, Cross-Origin Resource Sharing (CORS) misconfigurations.
- **AI Honeypot Engine**: Uncontrolled autonomous execution, unintended outbound network requests, leakage of real environment credentials.
- **Data Privacy & PII**: Accidental logging or persistence of unmasked citizen credentials (UPI PINs, passwords, Aadhaar, full account numbers).

### ❌ Out-of-Scope
- Vulnerabilities requiring physical access to an unlocked victim device.
- Distributed Denial of Service (DDoS) attacks against public endpoints (unless caused by algorithmic complexity flaws in regex/NLP vectorizers).
- Social engineering attacks targeting maintainers or contributors.
- Reports from automated scanners without verifiable proof-of-concept (PoC).

---

## 🔒 Data Privacy & Zero-Log Architecture

Raksha AI processes sensitive citizen data (including phishing SMS messages, call audio, and payment URIs). To safeguard citizen privacy:

1. **Zero Persistent PII Storage**:
   - User inputs submitted for phishing analysis, OCR extraction, or voice forensics are processed **in-memory** and discarded immediately after scoring.
2. **Automated PII Masking & Redaction**:
   - Phone numbers, bank account numbers, and Aadhaar references are masked (e.g., `XXXX-XXXX-1234`) before passing to external telemetry or radar logging.
3. **No Storage of UPI PINs or Passwords**:
   - The platform **never requests, logs, or stores** banking passwords, OTPs, or UPI PINs.
4. **Local Audio Forensics**:
   - Voice forensics analyzes acoustic features (spectral centroid, zero-crossing rate, jitter) extracted ephemerally without storing raw victim biometric voiceprints.

---

## 🤖 AI & Machine Learning Safety Safeguards

- **Adversarial Input Sanitization**: All incoming text is sanitized to neutralize Unicode obfuscation, RTL override attacks, zero-width characters, and homoglyph spoofing.
- **Deterministic Heuristic Overrides**: Rule-based heuristic safety gates override probabilistic ML outputs whenever known high-risk threat indicators (e.g., `upi://pay` debit requests with `refund` transaction notes) are detected.
- **Sandboxed Honeypot Personas**: Autonomous honeypot bots operate within an isolated, state-controlled sandbox with synthetic mock credentials to prevent accidental interaction with genuine user accounts.

---

## ⚖️ Safe Harbor Policy

We consider security research conducted under this policy to be:
- **Authorized** and in compliance with the Information Technology Act, 2000 (India).
- **Exempt** from legal action, provided researchers:
  - Act in good faith to avoid privacy violations, data destruction, and service disruption.
  - Give maintainers reasonable time to remediate issues before making any public disclosure.
  - Do not exploit a security issue beyond the minimum necessary to prove its existence.

---

## 🏛️ Regulatory & Law Enforcement Compliance

Raksha AI aligns with national cybersecurity frameworks and advisories established by:
- **CERT-In** (Indian Computer Emergency Response Team)
- **NCRP** (National Cyber Crime Reporting Portal — 1930 Helpline)
- **Karnataka State Cyber Police (CEN Crime Division)**
- **Reserve Bank of India (RBI)** Guidelines on Digital Payment Security & Fraud Mitigation

---

*Thank you for helping keep Raksha AI and millions of Indian citizens safe.*
