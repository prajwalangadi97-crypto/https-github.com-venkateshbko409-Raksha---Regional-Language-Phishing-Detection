"""
Omnikon / Raksha AI — URL Threat Analysis API
POST /api/v1/url/scan
"""
from fastapi import APIRouter
from schemas import UrlAnalysisRequest, UrlAnalysisResponse
from ml.url_analyzer import analyze_url

router = APIRouter(prefix="/url", tags=["URL Analysis"])


@router.post("/scan", response_model=UrlAnalysisResponse)
async def scan_url(req: UrlAnalysisRequest):
    """
    Analyze a URL using lexical features only — no external network calls.
    Returns risk score, threat level, and detailed flags.
    """
    result = analyze_url(req.url)
    return UrlAnalysisResponse(**result)
