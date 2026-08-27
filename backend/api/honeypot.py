"""
Omnikon / Raksha AI — Honeypot Engagement API
POST /api/v1/honeypot/engage
"""
from fastapi import APIRouter, HTTPException
from schemas import HoneypotEngageRequest, HoneypotEngageResponse, HoneypotMessage, ExtractedIOC

router = APIRouter(prefix="/honeypot", tags=["Honeypot"])

# Pre-scripted honeypot conversation (migrated from mockData.ts)
HONEYPOT_SCRIPT = [
    {"id": "h1", "sender": "SCAMMER", "text": "Hello sir, this is from SBI bank. Your KYC has expired. Please update immediately or account will be blocked.", "timestamp": "14:23:01", "extracted": None},
    {"id": "h2", "sender": "AGENT", "text": "Oh no! My KYC expired? What should I do sir? I have my salary coming next week, please don't block!", "timestamp": "14:23:15", "extracted": None},
    {"id": "h3", "sender": "SCAMMER", "text": "Don't worry sir. Just click this link and enter your details: sbi-yono-verify.top/kyc", "timestamp": "14:23:32", "extracted": {"type": "URL", "value": "sbi-yono-verify.top/kyc"}},
    {"id": "h4", "sender": "AGENT", "text": "Okay sir I am opening. But it is asking for my ATM card number. Is that safe?", "timestamp": "14:23:55", "extracted": None},
    {"id": "h5", "sender": "SCAMMER", "text": "Yes sir fully safe. This is official SBI process. Enter card number, expiry, CVV, and OTP. I will guide you. My supervisor ID is SBI/KYC/2026.", "timestamp": "14:24:18", "extracted": None},
    {"id": "h6", "sender": "AGENT", "text": "Okay sir typing now... Can you also give me your phone number in case call drops? I want to make sure I can reach you.", "timestamp": "14:24:45", "extracted": None},
    {"id": "h7", "sender": "SCAMMER", "text": "Yes sure. Call me on 98456-XXXXX or send on WhatsApp. You can also pay pending KYC fee of ₹299 to this UPI: scammer@ybl", "timestamp": "14:25:02", "extracted": {"type": "PHONE", "value": "+91-98456-XXXXX"}},
    {"id": "h8", "sender": "AGENT", "text": "Got it sir! One moment, transferring now...", "timestamp": "14:25:20", "extracted": None},
    {"id": "h9", "sender": "SCAMMER", "text": "Good. Also share the OTP you received. It is for verification only.", "timestamp": "14:25:38", "extracted": None},
    {"id": "h10", "sender": "AGENT", "text": "🛡️ TRAP COMPLETE — All IOCs extracted. Phone: +91-98456-XXXXX, UPI: scammer@ybl, URL: sbi-yono-verify.top/kyc. Forwarding to CEN.", "timestamp": "14:25:55", "extracted": {"type": "UPI", "value": "scammer@ybl"}},
]


@router.post("/engage", response_model=HoneypotEngageResponse)
async def engage_honeypot(req: HoneypotEngageRequest):
    """
    Get the next message in the honeypot conversation script.
    """
    total_steps = len(HONEYPOT_SCRIPT)

    if req.stepIndex >= total_steps:
        return HoneypotEngageResponse(
            message=None,
            totalSteps=total_steps,
            isComplete=True,
        )

    step = HONEYPOT_SCRIPT[req.stepIndex]
    extracted = None
    if step["extracted"]:
        extracted = ExtractedIOC(**step["extracted"])

    return HoneypotEngageResponse(
        message=HoneypotMessage(
            id=step["id"],
            sender=step["sender"],
            text=step["text"],
            timestamp=step["timestamp"],
            extracted=extracted,
        ),
        totalSteps=total_steps,
        isComplete=False,
    )


@router.get("/script")
async def get_full_script():
    """Return the full honeypot script for bulk loading."""
    return {"script": HONEYPOT_SCRIPT, "totalSteps": len(HONEYPOT_SCRIPT)}
