"""
Omnikon / Raksha AI — Pydantic Schemas
All request/response models for the API, mirroring the TypeScript types.
"""
from __future__ import annotations
from typing import Optional
from pydantic import BaseModel, Field


# ══════════════════════════════════════════════════════════════
#  ENUM-LIKE LITERALS (matching TypeScript union types)
# ══════════════════════════════════════════════════════════════

ThreatLevel = str   # CRITICAL | HIGH | MEDIUM | LOW | SAFE
ScamArchetype = str # BESCOM_POWER_CUT | SBI_YONO_KYC | ... | UNKNOWN
IOCType = str       # PHONE | UPI | BANK_ACCOUNT | URL | EMAIL | TELEGRAM | IP


# ══════════════════════════════════════════════════════════════
#  PHISHING ANALYSIS
# ══════════════════════════════════════════════════════════════

class PhishingAnalysisRequest(BaseModel):
    text: str = Field(..., min_length=1, description="SMS / message / link text to analyze")
    language: Optional[str] = Field(None, description="Hint language code (en, kn, hi)")


class SuspiciousEntities(BaseModel):
    urls: list[str] = []
    phones: list[str] = []
    upiIds: list[str] = []


class PhishingAnalysisResponse(BaseModel):
    inputText: str
    language: str
    threatLevel: ThreatLevel
    overallScore: int = Field(..., ge=0, le=100)
    scamArchetype: ScamArchetype
    coercionTriggers: list[str] = []
    suspiciousEntities: SuspiciousEntities
    explanation: str
    explanationKn: str
    recommendations: list[str] = []
    recommendationsKn: list[str] = []


# ══════════════════════════════════════════════════════════════
#  URL ANALYSIS
# ══════════════════════════════════════════════════════════════

class UrlAnalysisRequest(BaseModel):
    url: str = Field(..., min_length=1)


class UrlAnalysisResponse(BaseModel):
    url: str
    domain: str
    tld: str
    isPunycode: bool
    isHttps: bool
    registrationAge: str
    threatLevel: ThreatLevel
    riskScore: int = Field(..., ge=0, le=100)
    flags: list[str] = []


# ══════════════════════════════════════════════════════════════
#  VOICE FORENSICS
# ══════════════════════════════════════════════════════════════

class VoiceAnalysisRequest(BaseModel):
    sampleId: Optional[str] = Field(None, description="ID of the preset voice sample")
    audioBase64: Optional[str] = Field(None, description="Base64 encoded audio recorded from mic or uploaded")
    audioDurationSec: Optional[float] = Field(None, description="Duration in seconds")
    recordedMimeType: Optional[str] = Field(None, description="MIME type of recorded audio")


class VoiceForensicResponse(BaseModel):
    isDeepfake: bool
    confidence: float
    spectralJitter: float
    respirationDetected: bool
    vocoderArtifacts: bool
    biologicalScore: float
    flags: list[str] = []
    transcription: Optional[str] = None
    transcriptionKn: Optional[str] = None
    detectedArchetype: Optional[str] = None
    recommendation: Optional[str] = None
    recommendationKn: Optional[str] = None


# ══════════════════════════════════════════════════════════════
#  BREACH CHECK
# ══════════════════════════════════════════════════════════════

class BreachCheckRequest(BaseModel):
    query: str = Field(..., min_length=1)
    type: str = Field("email", description="email or phone")


class BreachRecord(BaseModel):
    breachName: str
    breachDate: str
    dataExposed: list[str]
    severity: ThreatLevel
    recordCount: int
    description: str
    descriptionKn: str


class BreachCheckResponse(BaseModel):
    query: str
    totalBreaches: int
    riskScore: int
    breaches: list[BreachRecord]


# ══════════════════════════════════════════════════════════════
#  HONEYPOT
# ══════════════════════════════════════════════════════════════

class HoneypotEngageRequest(BaseModel):
    personaId: str
    stepIndex: int = Field(..., ge=0)


class ExtractedIOC(BaseModel):
    type: IOCType
    value: str


class HoneypotMessage(BaseModel):
    id: str
    sender: str  # AGENT | SCAMMER
    text: str
    timestamp: str
    extracted: Optional[ExtractedIOC] = None


class HoneypotEngageResponse(BaseModel):
    message: Optional[HoneypotMessage] = None
    totalSteps: int
    isComplete: bool


# ══════════════════════════════════════════════════════════════
#  INCIDENT REPORT
# ══════════════════════════════════════════════════════════════

class IncidentReportRequest(BaseModel):
    victimName: str
    victimPhone: str
    victimEmail: str = ""
    victimDistrict: str = ""
    victimBank: str = ""
    accountNumber: str = ""
    amountLost: float = 0
    transactionUTR: str = ""
    transactionDate: str = ""
    scammerUPI: str = ""
    scammerPhone: str = ""
    scammerApp: str = ""
    scammerLinks: str = ""
    description: str = ""


class IncidentReportResponse(BaseModel):
    success: bool
    referenceId: str
    message: str
    messageKn: str
    timestamp: str


# ══════════════════════════════════════════════════════════════
#  IOC
# ══════════════════════════════════════════════════════════════

class IOCResponse(BaseModel):
    id: str
    type: IOCType
    value: str
    firstSeen: str
    lastSeen: str
    riskScore: int
    linkedScamArchetype: ScamArchetype
    reportCount: int


# ══════════════════════════════════════════════════════════════
#  TELEMETRY / STATS
# ══════════════════════════════════════════════════════════════

class TelemetryResponse(BaseModel):
    threatsBlocked: int
    scamsIntercepted: int
    citizensProtected: int
    muleTrapTriggers: int
    phishingUrlsDetected: int
    deepfakeCallsDetected: int


# ══════════════════════════════════════════════════════════════
#  DISTRICT THREATS
# ══════════════════════════════════════════════════════════════

class DistrictThreatResponse(BaseModel):
    district: str
    districtKn: Optional[str] = None
    totalCases: int
    activeCampaigns: int
    topScamType: ScamArchetype
    trend: str  # rising | stable | declining
    recentSpike: bool
    description: Optional[str] = None
    descriptionKn: Optional[str] = None


# ══════════════════════════════════════════════════════════════
#  THREAT FEED EVENT
# ══════════════════════════════════════════════════════════════

class ThreatEventResponse(BaseModel):
    id: str
    type: str
    severity: ThreatLevel
    district: str
    description: str
    descriptionKn: str
    timestamp: str
    iocValue: Optional[str] = None


# ══════════════════════════════════════════════════════════════
#  GENERIC
# ══════════════════════════════════════════════════════════════

class HealthResponse(BaseModel):
    status: str
    version: str
    model_loaded: bool
