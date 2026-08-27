"""
Omnikon / Raksha AI — Incident Report API
POST /api/v1/incident/report
"""
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter
from schemas import IncidentReportRequest, IncidentReportResponse

router = APIRouter(prefix="/incident", tags=["Incident Report"])


@router.post("/report", response_model=IncidentReportResponse)
async def submit_incident_report(req: IncidentReportRequest):
    """
    Submit a cyber fraud incident report.
    Stateless MVP — validates and returns a reference ID (no DB persistence).
    """
    ref_id = f"RAKSHA-{datetime.now(timezone.utc).strftime('%Y%m%d')}-{uuid.uuid4().hex[:8].upper()}"
    timestamp = datetime.now(timezone.utc).isoformat()

    return IncidentReportResponse(
        success=True,
        referenceId=ref_id,
        message=f"Incident report submitted successfully. Reference: {ref_id}. "
                f"Please also file a complaint on cybercrime.gov.in and call 1930 immediately.",
        messageKn=f"ಘಟನೆ ವರದಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ. ಉಲ್ಲೇಖ: {ref_id}. "
                  f"ದಯವಿಟ್ಟು cybercrime.gov.in ನಲ್ಲಿ ದೂರು ನೀಡಿ ಮತ್ತು 1930 ಗೆ ಕರೆ ಮಾಡಿ.",
        timestamp=timestamp,
    )
