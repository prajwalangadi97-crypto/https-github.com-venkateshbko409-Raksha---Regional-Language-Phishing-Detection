"""
Omnikon / Raksha AI — Static Data Endpoints
Serves IOCs, telemetry, district threats, stations, bank notices, personas, etc.
"""
from __future__ import annotations

import json
import random
from datetime import datetime, timezone, timedelta
from pathlib import Path

from fastapi import APIRouter, HTTPException

router = APIRouter(tags=["Data"])

# ── IOC Database ────────────────────────────────────────────────
IOCS = [
    {"id": "ioc-1", "type": "PHONE", "value": "+91-98456-XXXXX", "firstSeen": "2026-07-12", "lastSeen": "2026-08-20", "riskScore": 92, "linkedScamArchetype": "FEDEX_DIGITAL_ARREST", "reportCount": 47},
    {"id": "ioc-2", "type": "UPI", "value": "scammer@ybl", "firstSeen": "2026-06-03", "lastSeen": "2026-08-18", "riskScore": 88, "linkedScamArchetype": "UPI_REVERSE_PAYMENT", "reportCount": 31},
    {"id": "ioc-3", "type": "URL", "value": "http://sbi-yono-verify.top/kyc", "firstSeen": "2026-08-01", "lastSeen": "2026-08-22", "riskScore": 95, "linkedScamArchetype": "SBI_YONO_KYC", "reportCount": 156},
    {"id": "ioc-4", "type": "BANK_ACCOUNT", "value": "XXXX-XXXX-4521", "firstSeen": "2026-05-15", "lastSeen": "2026-08-19", "riskScore": 78, "linkedScamArchetype": "LOAN_APP_BLACKMAIL", "reportCount": 22},
    {"id": "ioc-5", "type": "PHONE", "value": "+91-77609-XXXXX", "firstSeen": "2026-08-10", "lastSeen": "2026-08-23", "riskScore": 85, "linkedScamArchetype": "BESCOM_POWER_CUT", "reportCount": 63},
    {"id": "ioc-6", "type": "EMAIL", "value": "customs.officer@gov-india.xyz", "firstSeen": "2026-07-20", "lastSeen": "2026-08-21", "riskScore": 90, "linkedScamArchetype": "CUSTOMS_IMPERSONATION", "reportCount": 38},
    {"id": "ioc-7", "type": "TELEGRAM", "value": "@invest_guru_returns", "firstSeen": "2026-06-28", "lastSeen": "2026-08-22", "riskScore": 82, "linkedScamArchetype": "INVESTMENT_PONZI", "reportCount": 94},
    {"id": "ioc-8", "type": "IP", "value": "103.25.XX.XX", "firstSeen": "2026-08-05", "lastSeen": "2026-08-23", "riskScore": 76, "linkedScamArchetype": "AADHAAR_LINK_FRAUD", "reportCount": 15},
]

# ── Telemetry ───────────────────────────────────────────────────
TELEMETRY = {
    "threatsBlocked": 14892,
    "scamsIntercepted": 3845,
    "citizensProtected": 52410,
    "muleTrapTriggers": 1120,
    "phishingUrlsDetected": 8430,
    "deepfakeCallsDetected": 512,
}

# ── District Threats ────────────────────────────────────────────
DISTRICT_THREATS = [
    {"district": "Bengaluru Urban", "districtKn": "ಬೆಂಗಳೂರು ನಗರ", "totalCases": 4892, "activeCampaigns": 14, "topScamType": "INVESTMENT_PONZI", "trend": "rising", "recentSpike": True, "description": "Surge in fake Telegram VIP stock groups and FedEx Digital Arrest video calls.", "descriptionKn": "ಟೆಲಿಗ್ರಾಮ್ ವಿಐಪಿ ಸ್ಟಾಕ್ ಗ್ರೂಪ್‌ಗಳು ಮತ್ತು ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಕರೆಗಳ ಹೆಚ್ಚಳ."},
    {"district": "Mysuru", "districtKn": "ಮೈಸೂರು", "totalCases": 1380, "activeCampaigns": 6, "topScamType": "SBI_YONO_KYC", "trend": "stable", "recentSpike": False, "description": "Active SMS campaigns targeting pension account holders.", "descriptionKn": "ಪಿಂಚಣಿ ಖಾತೆದಾರರನ್ನು ಗುರಿಯಾಗಿಸಿ ನಕಲಿ KYC SMS ಪ್ರಸಾರ."},
    {"district": "Mangaluru (DK)", "districtKn": "ಮಂಗಳೂರು (ದ.ಕ)", "totalCases": 980, "activeCampaigns": 5, "topScamType": "FEDEX_DIGITAL_ARREST", "trend": "rising", "recentSpike": True, "description": "Extortion calls targeting NRI families.", "descriptionKn": "ಅನಿವಾಸಿ ಕುಟುಂಬಗಳನ್ನು ಗುರಿಯಾಗಿಸಿ ನಕಲಿ ಕಸ್ಟಮ್ಸ್ ಕರೆಗಳು."},
    {"district": "Hubballi-Dharwad", "districtKn": "ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ", "totalCases": 745, "activeCampaigns": 4, "topScamType": "LOAN_APP_BLACKMAIL", "trend": "declining", "recentSpike": False, "description": "Sideloaded loan APKs with contact harassment.", "descriptionKn": "ಸಾಲ ಆ್ಯಪ್‌ಗಳಿಂದ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಪ್ರಕರಣಗಳು."},
    {"district": "Belagavi", "districtKn": "ಬೆಳಗಾವಿ", "totalCases": 590, "activeCampaigns": 3, "topScamType": "BESCOM_POWER_CUT", "trend": "stable", "recentSpike": False, "description": "HESCOM electricity disconnection SMS threats.", "descriptionKn": "ವಿದ್ಯುತ್ ಬಿಲ್ ಬಾಕಿ ನೆಪದಲ್ಲಿ ಹಣ ದೋಚುವ ಯತ್ನಗಳು."},
    {"district": "Kalaburagi", "districtKn": "ಕಲಬುರಗಿ", "totalCases": 440, "activeCampaigns": 4, "topScamType": "UPI_REVERSE_PAYMENT", "trend": "rising", "recentSpike": True, "description": "OLX & QR code fake buyer scams.", "descriptionKn": "ನಕಲಿ QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿಸುವ ವಂಚನೆ."},
    {"district": "Shivamogga", "districtKn": "ಶಿವಮೊಗ್ಗ", "totalCases": 215, "activeCampaigns": 2, "topScamType": "AADHAAR_LINK_FRAUD", "trend": "stable", "recentSpike": False, "description": "Aadhaar biometric update fraud calls.", "descriptionKn": "ಆಧಾರ್ ಬಯೋಮೆಟ್ರಿಕ್ ಅಪ್‌ಡೇಟ್ ವಂಚನೆ."},
    {"district": "Tumakuru", "districtKn": "ತುಮಕೂರು", "totalCases": 310, "activeCampaigns": 2, "topScamType": "YOUTUBE_JOB", "trend": "declining", "recentSpike": False, "description": "Work-from-home YouTube like tasks.", "descriptionKn": "ಯೂಟ್ಯೂಬ್ ಲೈಕ್ ಮಾಡಿ ಗಳಿಸಿ ನಕಲಿ ಉದ್ಯೋಗ."},
]

# ── Threat Feed Events ──────────────────────────────────────────
THREAT_EVENT_TYPES = [
    ("PHISHING_BLOCKED", "CRITICAL", "Phishing SMS campaign blocked targeting {district} residents", "ಫಿಶಿಂಗ್ SMS ಪ್ರಚಾರ ತಡೆಹಿಡಿಯಲಾಗಿದೆ"),
    ("DEEPFAKE_INTERCEPTED", "HIGH", "AI voice clone call intercepted — impersonating family member", "AI ಧ್ವನಿ ಕ್ಲೋನ್ ಕರೆ ತಡೆಹಿಡಿಯಲಾಗಿದೆ"),
    ("MULE_FROZEN", "CRITICAL", "Mule bank account frozen via 1930 Golden Hour protocol", "1930 ಗೋಲ್ಡನ್ ಅವರ್ ಮೂಲಕ ಮ್ಯೂಲ್ ಖಾತೆ ಫ್ರೀಜ್"),
    ("BANK_FREEZE", "HIGH", "Emergency bank freeze initiated for suspected fraud transaction", "ವಂಚನೆ ವಹಿವಾಟಿಗೆ ಬ್ಯಾಂಕ್ ಫ್ರೀಜ್ ಆರಂಭ"),
    ("HONEYPOT_TRIGGERED", "MEDIUM", "Honeypot trap triggered — scammer IOCs harvested", "ಹನಿಪಾಟ್ ಟ್ರ್ಯಾಪ್ ಪ್ರಚೋದಿತ — IOC ಹೊರತೆಗೆಯಲಾಗಿದೆ"),
    ("APK_QUARANTINED", "CRITICAL", "Malicious loan APK quarantined — C2 server identified", "ಮಾಲ್‌ವೇರ್ ಸಾಲ APK ಕ್ವಾರಂಟೈನ್ ಮಾಡಲಾಗಿದೆ"),
    ("UPI_FRAUD_STOPPED", "HIGH", "UPI reverse payment fraud stopped in real-time", "UPI ರಿವರ್ಸ್ ಪೇಮೆಂಟ್ ವಂಚನೆ ನಿಲ್ಲಿಸಲಾಗಿದೆ"),
    ("IOC_DISCOVERED", "MEDIUM", "New IOC discovered and added to threat intelligence database", "ಹೊಸ IOC ಪತ್ತೆ ಮತ್ತು ಡೇಟಾಬೇಸ್‌ಗೆ ಸೇರಿಸಲಾಗಿದೆ"),
]

DISTRICTS = ["Bengaluru Urban", "Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Kalaburagi", "Tumakuru", "Shivamogga"]


def _generate_threat_feed(count: int = 15) -> list[dict]:
    """Generate simulated threat feed events."""
    events = []
    now = datetime.now(timezone.utc)
    for i in range(count):
        evt_type, severity, desc_template, desc_kn = random.choice(THREAT_EVENT_TYPES)
        district = random.choice(DISTRICTS)
        ts = (now - timedelta(minutes=random.randint(1, 1440))).isoformat()
        events.append({
            "id": f"evt-{i+1:03d}",
            "type": evt_type,
            "severity": severity,
            "district": district,
            "description": desc_template.format(district=district),
            "descriptionKn": desc_kn,
            "timestamp": ts,
            "iocValue": random.choice([None, "+91-XXXXX-XXXXX", "scam@ybl", "phishing.top/kyc"]),
        })
    return sorted(events, key=lambda e: e["timestamp"], reverse=True)


# ══════════════════════════════════════════════════════════════
#  ENDPOINTS
# ══════════════════════════════════════════════════════════════

@router.get("/telemetry/stats")
async def get_telemetry():
    return TELEMETRY


@router.get("/districts/threats")
async def get_district_threats():
    return DISTRICT_THREATS


@router.get("/threats/feed")
async def get_threat_feed():
    return _generate_threat_feed()


@router.get("/ioc")
async def get_all_iocs():
    return IOCS


@router.get("/ioc/{ioc_id}")
async def get_ioc(ioc_id: str):
    for ioc in IOCS:
        if ioc["id"] == ioc_id:
            return ioc
    raise HTTPException(status_code=404, detail=f"IOC '{ioc_id}' not found")


@router.get("/stations")
async def get_stations():
    """Return Karnataka CEN cyber police stations."""
    return [
        {"district": "Bengaluru Urban (City)", "stationName": "CEN Police Station, Bengaluru City CID", "address": "Carlton House, Palace Road, Bengaluru - 560001", "phone": "080-22942346", "email": "cen-blrcity@ksp.gov.in"},
        {"district": "Mysuru City", "stationName": "CEN Police Station, Mysuru City", "address": "Police Bhavan, Nazarbad, Mysuru - 570010", "phone": "0821-2418100", "email": "cen-mysuru@ksp.gov.in"},
        {"district": "Mangaluru (DK)", "stationName": "CEN Police Station, Mangaluru City", "address": "Pandeshwar, Mangaluru - 575001", "phone": "0824-2220501", "email": "cen-mangaluru@ksp.gov.in"},
        {"district": "Hubballi-Dharwad", "stationName": "CEN Police Station, Hubballi", "address": "Navanagar, Hubballi - 580025", "phone": "0836-2233500", "email": "cen-hubballi@ksp.gov.in"},
        {"district": "Belagavi City", "stationName": "CEN Police Station, Belagavi", "address": "Camp, Belagavi - 590001", "phone": "0831-2405100", "email": "cen-belagavi@ksp.gov.in"},
        {"district": "Kalaburagi", "stationName": "CEN Police Station, Kalaburagi", "address": "Station Bazaar, Kalaburagi - 585101", "phone": "08472-278100", "email": "cen-kalaburagi@ksp.gov.in"},
    ]


@router.get("/banks/freeze-notices")
async def get_bank_freeze_notices():
    """Return bank nodal officer freeze notice templates."""
    return [
        {"bankName": "State Bank of India (SBI)", "nodalOfficerEmail": "nodal.officer@sbi.co.in", "nodalOfficerPhone": "1800-111-109"},
        {"bankName": "Canara Bank", "nodalOfficerEmail": "nodalofficer@canarabank.com", "nodalOfficerPhone": "1800-425-0018"},
        {"bankName": "HDFC Bank", "nodalOfficerEmail": "nodalofficer@hdfcbank.com", "nodalOfficerPhone": "1800-266-4332"},
        {"bankName": "ICICI Bank", "nodalOfficerEmail": "headoffice@icicibank.com", "nodalOfficerPhone": "1800-200-3344"},
        {"bankName": "Axis Bank", "nodalOfficerEmail": "nodal.officer@axisbank.com", "nodalOfficerPhone": "1800-209-5577"},
        {"bankName": "Karnataka Bank", "nodalOfficerEmail": "cybercrime@ktkbank.com", "nodalOfficerPhone": "1800-425-1444"},
    ]


@router.get("/personas")
async def get_bait_personas():
    """Return honeypot bait personas."""
    return [
        {"id": "pensioner", "name": "Mr. Ramamurthy (Retd. Bank Clerk, 72)", "nameKn": "ಶ್ರೀ ರಾಮಮೂರ್ತಿ (ನಿವೃತ್ತ ಬ್ಯಾಂಕ್ ನೌಕರ, 72)", "role": "Confused Pensioner Persona", "avatar": "👴🏽", "tactics": "Asks repeated questions, types slowly", "style": "High Patience Drain"},
        {"id": "student", "name": "Ananya (Engineering Student, 20)", "nameKn": "ಅನನ್ಯಾ (ಇಂಜಿನಿಯರಿಂಗ್ ವಿದ್ಯಾರ್ಥಿನಿ, 20)", "role": "Eager Part-Timer Persona", "avatar": "👩🏻‍💻", "tactics": "Pretends to need pocket money", "style": "Fast Engagement"},
        {"id": "businessman", "name": "Manjunath (Small Trader, Kalasipalya)", "nameKn": "ಮಂಜುನಾಥ್ (ಸಣ್ಣ ವ್ಯಾಪಾರಿ, ಕಲಾಸಿಪಾಳ್ಯ)", "role": "Busy Shopkeeper Persona", "avatar": "👨🏽‍💼", "tactics": "Pretends low battery, forces bank details", "style": "Mule Account Harvester"},
    ]


@router.get("/presets/phishing")
async def get_phishing_presets():
    """Return preset phishing samples for 1-click analysis."""
    return [
        {"title": "BESCOM Power Cut SMS (Kannada)", "titleKn": "ಬೆಸ್ಕಾಂ ವಿದ್ಯುತ್ ಕಡಿತ SMS", "language": "kn", "category": "BESCOM_POWER_CUT", "text": "ಆತ್ಮೀಯ ಗ್ರಾಹಕರೇ, ನಿಮ್ಮ ₹3,450 ಬೆಸ್ಕಾಂ ವಿದ್ಯುತ್ ಬಿಲ್ ಬಾಕಿಯಿದೆ. ಇಂದು ರಾತ್ರಿ 9:30 ಕ್ಕೆ ವಿದ್ಯುತ್ ಕಡಿತ ಮಾಡಲಾಗುತ್ತದೆ. ತಕ್ಷಣ ನವೀಕರಿಸಲು ಸಂಪರ್ಕಿಸಿ: 98451-22990 ಅಥವಾ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿ: bescom-billpay.top/karnataka"},
        {"title": "FedEx Digital Arrest (English)", "titleKn": "ಫೆಡೆಕ್ಸ್ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್", "language": "en", "category": "FEDEX_DIGITAL_ARREST", "text": "URGENT: This is Inspector Ajay Kumar from Mumbai Cyber Crime. Parcel ID FX-90812 in your Aadhaar was seized containing fake passports and contraband. You are under Digital Arrest. Transfer verification fee to RBI nodal desk upi: clearing@sbi-arb."},
        {"title": "SBI Yono KYC (English)", "titleKn": "SBI YONO KYC ಎಚ್ಚರಿಕೆ", "language": "en", "category": "SBI_YONO_KYC", "text": "Dear SBI Customer, Your YONO Account has been suspended due to incomplete PAN KYC. Please update within 24 hrs: http://sbi-yono-update.xyz/login and verify your OTP and ATM PIN."},
        {"title": "YouTube Job Scam (English)", "titleKn": "ಯೂಟ್ಯೂಬ್ ಉದ್ಯೋಗ ವಂಚನೆ", "language": "en", "category": "YOUTUBE_JOB", "text": "Hi! I am Pooja from Global Media Partner. Earn ₹500 to ₹5,000 per day by liking YouTube videos. Send screenshot to Telegram @hr_pooja_earning for ₹150 joining bonus."},
        {"title": "UPI Reverse Payment (Kannada)", "titleKn": "UPI ರಿವರ್ಸ್ ಪೇಮೆಂಟ್", "language": "kn", "category": "UPI_REVERSE_PAYMENT", "text": "ಸರ್, ನಿಮ್ಮ Google Pay ಖಾತೆಗೆ ತಪ್ಪಾಗಿ ₹12,000 ಕಳುಹಿಸಲಾಗಿದೆ. PIN ಹಾಕಿ ಹಣ ಸ್ವೀಕರಿಸಿ ಬಟನ್ ಒತ್ತಿ: upi://pay?pa=refundscam@ibl&am=12000"},
        {"title": "Loan App Threat (English)", "titleKn": "ಸಾಲ ಆ್ಯಪ್ ಬೆದರಿಕೆ", "language": "en", "category": "LOAN_APP_BLACKMAIL", "text": "LAST WARNING! Failed to repay QuickCash ₹8,000. We downloaded your contacts and photos. Pay to loanrecovery@ybl in 1 hour or morphed photos go to parents."},
    ]
