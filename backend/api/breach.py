"""
Omnikon / Raksha AI — Dark Web Breach Check API
POST /api/v1/breach/check
"""
from fastapi import APIRouter
from schemas import BreachCheckRequest, BreachCheckResponse, BreachRecord

router = APIRouter(prefix="/breach", tags=["Breach Check"])

# In-memory breach database (simulated)
BREACH_DATABASE: list[dict] = [
    {
        "breachName": "BigBasket Data Breach",
        "breachDate": "2024-11-15",
        "dataExposed": ["Email", "Phone", "Name", "Address", "Password Hash"],
        "severity": "HIGH",
        "recordCount": 20000000,
        "description": "Major Indian e-commerce grocery platform breach exposing 20M user records.",
        "descriptionKn": "ಪ್ರಮುಖ ಭಾರತೀಯ ಇ-ಕಾಮರ್ಸ್ ಡೇಟಾ ಉಲ್ಲಂಘನೆ — 2 ಕೋಟಿ ಬಳಕೆದಾರರ ದಾಖಲೆಗಳು.",
    },
    {
        "breachName": "MobiKwik Leak",
        "breachDate": "2024-03-22",
        "dataExposed": ["Phone", "Email", "KYC Documents", "Aadhaar"],
        "severity": "CRITICAL",
        "recordCount": 3500000,
        "description": "Fintech platform leak with KYC and Aadhaar data of 3.5M users on dark web forums.",
        "descriptionKn": "ಫಿನ್‌ಟೆಕ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ — KYC ಮತ್ತು ಆಧಾರ್ ಡೇಟಾ 35 ಲಕ್ಷ ಬಳಕೆದಾರರ.",
    },
    {
        "breachName": "Dominos India",
        "breachDate": "2023-06-10",
        "dataExposed": ["Email", "Phone", "Name", "Order History", "GPS Location"],
        "severity": "MEDIUM",
        "recordCount": 18000000,
        "description": "Food delivery platform breach with order history and location data.",
        "descriptionKn": "ಫುಡ್ ಡೆಲಿವರಿ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ — ಆರ್ಡರ್ ಮತ್ತು ಸ್ಥಳ ಡೇಟಾ.",
    },
    {
        "breachName": "Air India SITA Breach",
        "breachDate": "2023-01-05",
        "dataExposed": ["Email", "Passport", "Credit Card", "Name"],
        "severity": "CRITICAL",
        "recordCount": 4500000,
        "description": "Aviation data breach exposing passport and credit card info of 4.5M passengers.",
        "descriptionKn": "ವಿಮಾನಯಾನ ಡೇಟಾ — ಪಾಸ್‌ಪೋರ್ಟ್ ಮತ್ತು ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಮಾಹಿತಿ.",
    },
    {
        "breachName": "JusPay Payment Gateway",
        "breachDate": "2024-08-18",
        "dataExposed": ["Phone", "Email", "Masked Card Numbers"],
        "severity": "HIGH",
        "recordCount": 35000000,
        "description": "Payment gateway breach affecting 35M card holders across Indian banks.",
        "descriptionKn": "ಪಾವತಿ ಗೇಟ್‌ವೇ ಉಲ್ಲಂಘನೆ — 3.5 ಕೋಟಿ ಕಾರ್ಡ್ ಹೊಂದಿರುವವರ ಡೇಟಾ.",
    },
]


@router.post("/check", response_model=BreachCheckResponse)
async def check_breach(req: BreachCheckRequest):
    """
    Check if email/phone appears in known data breaches.
    Simulates against in-memory breach database.
    """
    query = req.query.strip()
    has_content = len(query) > 3

    if has_content:
        # Simulate: return 2-4 breaches for any query with content
        import random
        random.seed(hash(query) % 2**32)
        count = random.randint(2, min(4, len(BREACH_DATABASE)))
        shuffled = random.sample(BREACH_DATABASE, count)
    else:
        shuffled = []

    breaches = [BreachRecord(**b) for b in shuffled]
    risk_score = min(100, len(breaches) * 28 + (
        20 if any(b.severity == "CRITICAL" for b in breaches) else 0
    ))

    return BreachCheckResponse(
        query=query,
        totalBreaches=len(breaches),
        riskScore=risk_score,
        breaches=breaches,
    )
