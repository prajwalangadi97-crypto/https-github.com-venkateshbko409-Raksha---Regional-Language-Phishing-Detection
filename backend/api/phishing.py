"""
Omnikon / Raksha AI — Phishing Analysis API
POST /api/v1/phishing/analyze
"""
from fastapi import APIRouter, HTTPException
from schemas import PhishingAnalysisRequest, PhishingAnalysisResponse, SuspiciousEntities
from ml.phishing_classifier import classifier

router = APIRouter(prefix="/phishing", tags=["Phishing"])


@router.post("/analyze", response_model=PhishingAnalysisResponse)
async def analyze_phishing(req: PhishingAnalysisRequest):
    """
    Analyze SMS / message / link text for phishing using TF-IDF + Logistic Regression.
    Returns scam archetype, threat level, coercion triggers, and extracted IOCs.
    """
    if not classifier.is_loaded:
        raise HTTPException(
            status_code=503,
            detail="ML model not loaded. Run `python -m ml.train_baseline` first.",
        )

    result = classifier.predict(req.text)

    return PhishingAnalysisResponse(
        inputText=result["inputText"],
        language=result["language"],
        threatLevel=result["threatLevel"],
        overallScore=result["overallScore"],
        scamArchetype=result["scamArchetype"],
        coercionTriggers=result["coercionTriggers"],
        suspiciousEntities=SuspiciousEntities(**result["suspiciousEntities"]),
        explanation=result["explanation"],
        explanationKn=result["explanationKn"],
        recommendations=result["recommendations"],
        recommendationsKn=result["recommendationsKn"],
    )
