import React, { useState, useEffect } from 'react';
import { Clock, Shield, AlertTriangle, ChevronDown } from 'lucide-react';
import type { Language, ScamTimelineStage } from '../types';

interface ScamPatternTimelineProps {
  language: Language;
}

const TIMELINE_DATA: Record<string, { label: string; labelKn: string; stages: ScamTimelineStage[] }> = {
  FEDEX_DIGITAL_ARREST: {
    label: 'FedEx / Digital Arrest Scam',
    labelKn: 'ಫೆಡೆಕ್ಸ್ / ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ವಂಚನೆ',
    stages: [
      { stage: 1, title: 'Initial IVR Call', titleKn: 'ಆರಂಭಿಕ IVR ಕರೆ', description: 'Automated call claiming to be from FedEx/customs about a seized parcel containing contraband.', descriptionKn: 'ನಿಷೇಧಿತ ವಸ್ತುಗಳನ್ನು ಹೊಂದಿರುವ ಪಾರ್ಸೆಲ್ ಬಗ್ಗೆ FedEx/ಕಸ್ಟಮ್ಸ್‌ನಿಂದ ಸ್ವಯಂಚಾಲಿತ ಕರೆ.', icon: '📞', redFlags: ['Automated IVR voice', 'Asks to "Press 1"', 'No specific parcel details'], redFlagsKn: ['ಸ್ವಯಂಚಾಲಿತ IVR ಧ್ವನಿ', '"1 ಒತ್ತಿ" ಎಂದು ಕೇಳುತ್ತದೆ', 'ನಿರ್ದಿಷ್ಟ ಪಾರ್ಸೆಲ್ ವಿವರಗಳಿಲ್ಲ'], counterAction: 'HANG UP immediately. FedEx never calls about parcels.', counterActionKn: 'ತಕ್ಷಣ ಕರೆ ಕಡಿತಗೊಳಿಸಿ. FedEx ಎಂದಿಗೂ ಪಾರ್ಸೆಲ್ ಬಗ್ಗೆ ಕರೆ ಮಾಡುವುದಿಲ್ಲ.', isInterventionPoint: true },
      { stage: 2, title: 'Fake Officer Transfer', titleKn: 'ನಕಲಿ ಅಧಿಕಾರಿ ವರ್ಗಾವಣೆ', description: 'Call transferred to "CBI Inspector" or "Narcotics Officer" who threatens arrest.', descriptionKn: '"CBI ಇನ್ಸ್ಪೆಕ್ಟರ್" ಅಥವಾ "ನಾರ್ಕೋಟಿಕ್ಸ್ ಅಧಿಕಾರಿ"ಗೆ ಕರೆ ವರ್ಗಾವಣೆ, ಬಂಧನ ಬೆದರಿಕೆ.', icon: '👮', redFlags: ['Claims to be from CBI/NIA/NCB', 'Uses aggressive tone', 'Mentions "FIR" and "Aadhaar"'], redFlagsKn: ['CBI/NIA/NCB ಯಿಂದ ಎಂದು ಹೇಳಿಕೊಳ್ಳುತ್ತಾರೆ', 'ಆಕ್ರಮಣಕಾರಿ ಧ್ವನಿ', '"FIR" ಮತ್ತು "ಆಧಾರ್" ಉಲ್ಲೇಖ'], counterAction: 'Real police never call to threaten. Hang up.', counterActionKn: 'ನಿಜವಾದ ಪೊಲೀಸರು ಎಂದಿಗೂ ಬೆದರಿಸಲು ಕರೆ ಮಾಡುವುದಿಲ್ಲ.', isInterventionPoint: true },
      { stage: 3, title: '"Digital Arrest" on Video', titleKn: 'ವಿಡಿಯೋ "ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್"', description: 'Victim forced to stay on video call. Told not to speak to anyone. Shown fake police backgrounds.', descriptionKn: 'ಬಲಿಪಶುವನ್ನು ವಿಡಿಯೋ ಕಾಲ್‌ನಲ್ಲಿ ಇರಿಸಲಾಗುತ್ತದೆ. ಯಾರೊಂದಿಗೂ ಮಾತನಾಡಬೇಡಿ ಎಂದು ಹೇಳಲಾಗುತ್ತದೆ.', icon: '📹', redFlags: ['Forced video call isolation', '"Do not tell anyone"', 'Fake police station background'], redFlagsKn: ['ಬಲವಂತದ ವಿಡಿಯೋ ಕಾಲ್ ಏಕಾಂತ', '"ಯಾರಿಗೂ ಹೇಳಬೇಡಿ"', 'ನಕಲಿ ಪೊಲೀಸ್ ಹಿನ್ನೆಲೆ'], counterAction: '"Digital Arrest" does not exist in Indian law. End the call.', counterActionKn: '"ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್" ಭಾರತೀಯ ಕಾನೂನಿನಲ್ಲಿ ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲ. ಕರೆ ಕೊನೆಗೊಳಿಸಿ.', isInterventionPoint: true },
      { stage: 4, title: 'Financial Extraction', titleKn: 'ಹಣಕಾಸು ವಂಚನೆ', description: 'Victim asked to transfer money to "RBI verification account" or "security deposit". Multiple transactions.', descriptionKn: '"RBI ಪರಿಶೀಲನಾ ಖಾತೆ" ಅಥವಾ "ಭದ್ರತಾ ಠೇವಣಿ"ಗೆ ಹಣ ವರ್ಗಾಯಿಸಲು ಕೇಳಲಾಗುತ್ತದೆ.', icon: '💰', redFlags: ['RBI never has "verification accounts"', 'Multiple transfers demanded', 'Amounts keep increasing'], redFlagsKn: ['RBI ಗೆ "ಪರಿಶೀಲನಾ ಖಾತೆ" ಇಲ್ಲ', 'ಹಲವಾರು ವರ್ಗಾವಣೆ ಬೇಡಿಕೆ', 'ಮೊತ್ತ ಹೆಚ್ಚುತ್ತಲೇ ಇರುತ್ತದೆ'], counterAction: 'NEVER transfer money. Call 1930 immediately.', counterActionKn: 'ಎಂದಿಗೂ ಹಣ ವರ್ಗಾಯಿಸಬೇಡಿ. ತಕ್ಷಣ 1930 ಗೆ ಕರೆ ಮಾಡಿ.', isInterventionPoint: false },
      { stage: 5, title: 'Continued Exploitation', titleKn: 'ಮುಂದುವರಿದ ಶೋಷಣೆ', description: 'After first payment, scammers demand more money for "court fees", "bail", "clearance". Cycle continues.', descriptionKn: 'ಮೊದಲ ಪಾವತಿ ನಂತರ "ನ್ಯಾಯಾಲಯ ಶುಲ್ಕ", "ಜಾಮೀನು" ಗೆ ಹೆಚ್ಚು ಹಣ ಬೇಡಿಕೆ. ಚಕ್ರ ಮುಂದುವರಿಯುತ್ತದೆ.', icon: '🔄', redFlags: ['Demands never stop', 'New "charges" invented', 'Threats of family arrest'], redFlagsKn: ['ಬೇಡಿಕೆ ನಿಲ್ಲುವುದಿಲ್ಲ', 'ಹೊಸ "ಶುಲ್ಕಗಳು" ಆವಿಷ್ಕರಿಸಲಾಗಿದೆ', 'ಕುಟುಂಬ ಬಂಧನ ಬೆದರಿಕೆ'], counterAction: 'Stop all communication. File FIR at nearest police station.', counterActionKn: 'ಎಲ್ಲಾ ಸಂವಹನ ನಿಲ್ಲಿಸಿ. ಹತ್ತಿರದ ಪೊಲೀಸ್ ಠಾಣೆಯಲ್ಲಿ FIR ದಾಖಲಿಸಿ.', isInterventionPoint: false },
    ],
  },
  BESCOM_POWER_CUT: {
    label: 'BESCOM Power Cut Scam',
    labelKn: 'ಬೆಸ್ಕಾಂ ಕರೆಂಟ್ ಕಟ್ ವಂಚನೆ',
    stages: [
      { stage: 1, title: 'Fake SMS / Call', titleKn: 'ನಕಲಿ SMS / ಕರೆ', description: 'SMS or call claiming overdue BESCOM bill with power disconnection threat in 2 hours.', descriptionKn: 'ಬಾಕಿ BESCOM ಬಿಲ್ ಎಂದು SMS ಅಥವಾ ಕರೆ, 2 ಗಂಟೆಯಲ್ಲಿ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಕಡಿತ ಬೆದರಿಕೆ.', icon: '⚡', redFlags: ['2-hour deadline', 'Asks to pay via link/UPI', 'Not from official BESCOM number'], redFlagsKn: ['2 ಗಂಟೆ ಗಡುವು', 'ಲಿಂಕ್/UPI ಮೂಲಕ ಪಾವತಿಸಲು ಕೇಳುತ್ತದೆ', 'ಅಧಿಕೃತ BESCOM ಸಂಖ್ಯೆಯಿಂದ ಅಲ್ಲ'], counterAction: 'BESCOM sends bills to registered email. Visit the nearest BESCOM office to verify.', counterActionKn: 'BESCOM ನೋಂದಾಯಿತ ಇಮೇಲ್‌ಗೆ ಬಿಲ್ ಕಳುಹಿಸುತ್ತದೆ. ಪರಿಶೀಲಿಸಲು ಹತ್ತಿರದ BESCOM ಕಚೇರಿಗೆ ಭೇಟಿ ನೀಡಿ.', isInterventionPoint: true },
      { stage: 2, title: 'Phishing Link', titleKn: 'ಫಿಶಿಂಗ್ ಲಿಂಕ್', description: 'Link sent leads to fake BESCOM website asking for UPI PIN or card details.', descriptionKn: 'ಕಳುಹಿಸಿದ ಲಿಂಕ್ ನಕಲಿ BESCOM ವೆಬ್‌ಸೈಟ್‌ಗೆ, UPI PIN ಅಥವಾ ಕಾರ್ಡ್ ವಿವರ ಕೇಳುತ್ತದೆ.', icon: '🔗', redFlags: ['URL is not bescom.co.in', 'Asks for UPI PIN / CVV', 'Urgency messaging'], redFlagsKn: ['URL bescom.co.in ಅಲ್ಲ', 'UPI PIN / CVV ಕೇಳುತ್ತದೆ', 'ತುರ್ತು ಸಂದೇಶ'], counterAction: 'Never enter credentials on links from SMS. Only use official bescom.co.in', counterActionKn: 'SMS ಲಿಂಕ್‌ಗಳಲ್ಲಿ ಎಂದಿಗೂ ರುಜುವಾತುಗಳನ್ನು ನಮೂದಿಸಬೇಡಿ.', isInterventionPoint: true },
      { stage: 3, title: 'OTP Extraction', titleKn: 'OTP ಕಳ್ಳತನ', description: 'Scammer calls back asking for the OTP received to "cancel disconnection".', descriptionKn: 'ವಂಚಕ ಮತ್ತೆ ಕರೆ ಮಾಡಿ "ಸಂಪರ್ಕ ಕಡಿತ ರದ್ದುಗೊಳಿಸಲು" ಬಂದ OTP ಕೇಳುತ್ತಾರೆ.', icon: '🔑', redFlags: ['OTP requested over phone', 'Claims it will "cancel" action', 'Creates panic'], redFlagsKn: ['ಫೋನ್ ಮೂಲಕ OTP ಕೇಳಲಾಗುತ್ತಿದೆ', '"ರದ್ದುಗೊಳಿಸುತ್ತದೆ" ಎಂದು ಹೇಳಿಕೊಳ್ಳುತ್ತಾರೆ', 'ಭಯ ಹುಟ್ಟಿಸುತ್ತಾರೆ'], counterAction: 'NEVER share OTP. OTP is for YOUR transactions only.', counterActionKn: 'ಎಂದಿಗೂ OTP ಹಂಚಿಕೊಳ್ಳಬೇಡಿ. OTP ನಿಮ್ಮ ವಹಿವಾಟುಗಳಿಗೆ ಮಾತ್ರ.', isInterventionPoint: false },
      { stage: 4, title: 'Account Drained', titleKn: 'ಖಾತೆ ಖಾಲಿ', description: 'Money debited from bank account using the stolen OTP. Multiple transactions possible.', descriptionKn: 'ಕಳುವಾದ OTP ಬಳಸಿ ಬ್ಯಾಂಕ್ ಖಾತೆಯಿಂದ ಹಣ ಡೆಬಿಟ್.', icon: '💸', redFlags: ['Unexpected debits', 'Multiple small transactions', 'SMS alerts for transfers you did not make'], redFlagsKn: ['ಅನಿರೀಕ್ಷಿತ ಡೆಬಿಟ್', 'ಹಲವಾರು ಸಣ್ಣ ವಹಿವಾಟುಗಳು', 'ನೀವು ಮಾಡದ ವರ್ಗಾವಣೆಗೆ SMS ಎಚ್ಚರಿಕೆ'], counterAction: 'Call 1930 IMMEDIATELY. Contact bank nodal officer for Golden Hour freeze.', counterActionKn: 'ತಕ್ಷಣ 1930 ಗೆ ಕರೆ ಮಾಡಿ. ಗೋಲ್ಡನ್ ಅವರ್ ಫ್ರೀಜ್‌ಗೆ ಬ್ಯಾಂಕ್ ನೋಡಲ್ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.', isInterventionPoint: false },
    ],
  },
  UPI_REVERSE_PAYMENT: {
    label: 'UPI Reverse Payment / Collect Request Scam',
    labelKn: 'UPI ರಿವರ್ಸ್ ಪಾವತಿ / ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್ ವಂಚನೆ',
    stages: [
      { stage: 1, title: 'OLX / Marketplace Contact', titleKn: 'OLX / ಮಾರುಕಟ್ಟೆ ಸಂಪರ್ಕ', description: 'Scammer contacts you on OLX/Quikr pretending to be a buyer and agrees to pay full price.', descriptionKn: 'ವಂಚಕ OLX/Quikr ನಲ್ಲಿ ಖರೀದಿದಾರ ನೆಪದಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ ಪೂರ್ಣ ಬೆಲೆ ಪಾವತಿಸಲು ಒಪ್ಪುತ್ತಾರೆ.', icon: '🛒', redFlags: ['Agrees to price without negotiation', 'Insists on UPI only', 'Claims to be army/police officer'], redFlagsKn: ['ಚೌಕಾಶಿ ಇಲ್ಲದೆ ಬೆಲೆಗೆ ಒಪ್ಪುತ್ತಾರೆ', 'UPI ಮಾತ್ರ ಬಳಸಲು ಒತ್ತಾಯಿಸುತ್ತಾರೆ', 'ಸೇನಾ/ಪೊಲೀಸ್ ಅಧಿಕಾರಿ ಎಂದು ಹೇಳಿಕೊಳ್ಳುತ್ತಾರೆ'], counterAction: 'Be suspicious of too-eager buyers. Never enter PIN to receive money.', counterActionKn: 'ಅತಿ ಉತ್ಸುಕ ಖರೀದಿದಾರರ ಬಗ್ಗೆ ಅನುಮಾನ ಪಡಿ. ಹಣ ಸ್ವೀಕರಿಸಲು PIN ನಮೂದಿಸಬೇಡಿ.', isInterventionPoint: true },
      { stage: 2, title: 'Collect Request Sent', titleKn: 'ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್ ಕಳುಹಿಸಲಾಗಿದೆ', description: 'Instead of sending money, scammer sends a COLLECT REQUEST. Victim sees a UPI notification.', descriptionKn: 'ಹಣ ಕಳುಹಿಸುವ ಬದಲು ವಂಚಕ COLLECT REQUEST ಕಳುಹಿಸುತ್ತಾರೆ.', icon: '📲', redFlags: ['"Pay ₹X to Y?" is a COLLECT request', 'Scammer says "Accept to receive money"', 'Asks you to enter PIN'], redFlagsKn: ['"₹X ಪಾವತಿಸಿ?" ಎಂಬುದು COLLECT ರಿಕ್ವೆಸ್ಟ್', '"ಹಣ ಸ್ವೀಕರಿಸಲು ಒಪ್ಪಿ" ಎಂದು ಹೇಳುತ್ತಾರೆ', 'PIN ನಮೂದಿಸಲು ಕೇಳುತ್ತಾರೆ'], counterAction: 'You NEVER need to enter PIN to receive money. Decline the request.', counterActionKn: 'ಹಣ ಸ್ವೀಕರಿಸಲು ನೀವು PIN ನಮೂದಿಸುವ ಅಗತ್ಯವಿಲ್ಲ. ವಿನಂತಿಯನ್ನು ನಿರಾಕರಿಸಿ.', isInterventionPoint: true },
      { stage: 3, title: 'Money Deducted', titleKn: 'ಹಣ ಕಡಿತ', description: 'If victim enters PIN, money is DEBITED from their account instead of being received.', descriptionKn: 'ಬಲಿಪಶು PIN ನಮೂದಿಸಿದರೆ, ಹಣ ಸ್ವೀಕರಿಸುವ ಬದಲು ಖಾತೆಯಿಂದ ಡೆಬಿಟ್ ಆಗುತ್ತದೆ.', icon: '💸', redFlags: ['Money gone from your account', 'Scammer becomes unreachable', 'Fake "failed" screens shown'], redFlagsKn: ['ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣ ಹೋಗಿದೆ', 'ವಂಚಕ ಸಂಪರ್ಕಕ್ಕೆ ಸಿಗುವುದಿಲ್ಲ', 'ನಕಲಿ "ವಿಫಲ" ಪರದೆ ತೋರಿಸಲಾಗುತ್ತದೆ'], counterAction: 'Call 1930 within the Golden Hour. Block the UPI ID.', counterActionKn: 'ಗೋಲ್ಡನ್ ಅವರ್‌ನಲ್ಲಿ 1930 ಗೆ ಕರೆ ಮಾಡಿ. UPI ID ಬ್ಲಾಕ್ ಮಾಡಿ.', isInterventionPoint: false },
    ],
  },
  LOAN_APP_BLACKMAIL: {
    label: 'Predatory Loan App Blackmail',
    labelKn: 'ಸಾಲ ಆ್ಯಪ್ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ವಂಚನೆ',
    stages: [
      { stage: 1, title: 'Attractive Loan Ad', titleKn: 'ಆಕರ್ಷಕ ಸಾಲ ಜಾಹೀರಾತು', description: 'Ads on social media or SMS offering instant loans of ₹5,000-50,000 with "no documents needed".', descriptionKn: '₹5,000-50,000 "ದಾಖಲೆಗಳಿಲ್ಲದೆ" ತ್ವರಿತ ಸಾಲ ನೀಡುವ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಜಾಹೀರಾತು.', icon: '📢', redFlags: ['"No documents needed"', 'APK download from WhatsApp', 'Not on Play Store'], redFlagsKn: ['"ದಾಖಲೆಗಳ ಅಗತ್ಯವಿಲ್ಲ"', 'WhatsApp ನಿಂದ APK ಡೌನ್‌ಲೋಡ್', 'Play Store ನಲ್ಲಿ ಇಲ್ಲ'], counterAction: 'Only use RBI-registered lending apps. Never sideload APKs.', counterActionKn: 'RBI-ನೋಂದಾಯಿತ ಸಾಲ ಆ್ಯಪ್‌ಗಳನ್ನು ಮಾತ್ರ ಬಳಸಿ. APK ಸೈಡ್‌ಲೋಡ್ ಮಾಡಬೇಡಿ.', isInterventionPoint: true },
      { stage: 2, title: 'Permission Theft', titleKn: 'ಅನುಮತಿ ಕಳ್ಳತನ', description: 'App asks for Contacts, Camera, Gallery, SMS access. All data exfiltrated to servers.', descriptionKn: 'ಆ್ಯಪ್ ಸಂಪರ್ಕ, ಕ್ಯಾಮೆರಾ, ಗ್ಯಾಲರಿ, SMS ಪ್ರವೇಶ ಕೇಳುತ್ತದೆ. ಎಲ್ಲಾ ಡೇಟಾ ಸರ್ವರ್‌ಗಳಿಗೆ ಕಳುಹಿಸಲಾಗುತ್ತದೆ.', icon: '📱', redFlags: ['Excessive permissions requested', 'Asks for Accessibility access', 'Background data upload'], redFlagsKn: ['ಅತಿಯಾದ ಅನುಮತಿಗಳ ಬೇಡಿಕೆ', 'ಪ್ರವೇಶಿಸುವಿಕೆ ಪ್ರವೇಶ ಕೇಳುತ್ತದೆ', 'ಹಿನ್ನೆಲೆ ಡೇಟಾ ಅಪ್‌ಲೋಡ್'], counterAction: 'Never grant Accessibility or SMS permissions to loan apps.', counterActionKn: 'ಸಾಲ ಆ್ಯಪ್‌ಗಳಿಗೆ ಪ್ರವೇಶಿಸುವಿಕೆ ಅಥವಾ SMS ಅನುಮತಿ ನೀಡಬೇಡಿ.', isInterventionPoint: true },
      { stage: 3, title: 'Small Loan Disbursed', titleKn: 'ಸಣ್ಣ ಸಾಲ ಬಿಡುಗಡೆ', description: 'Small loan (₹3,000-10,000) credited with massive hidden processing fee (30-50%).', descriptionKn: 'ಭಾರಿ ಮರೆಮಾಚಿದ ಪ್ರಕ್ರಿಯಾ ಶುಲ್ಕದೊಂದಿಗೆ (30-50%) ಸಣ್ಣ ಸಾಲ ಜಮಾ.', icon: '💰', redFlags: ['Amount received less than promised', 'Repayment much higher', '7-day repayment deadline'], redFlagsKn: ['ಭರವಸೆಗಿಂತ ಕಡಿಮೆ ಮೊತ್ತ', 'ಮರುಪಾವತಿ ಹೆಚ್ಚು', '7 ದಿನದ ಮರುಪಾವತಿ ಗಡುವು'], counterAction: 'Report to RBI and cybercrime.gov.in if trapped in such a loan.', counterActionKn: 'ಇಂತಹ ಸಾಲದಲ್ಲಿ ಸಿಕ್ಕಿಹಾಕಿಕೊಂಡರೆ RBI ಮತ್ತು cybercrime.gov.in ಗೆ ದೂರು ನೀಡಿ.', isInterventionPoint: false },
      { stage: 4, title: 'Blackmail & Harassment', titleKn: 'ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮತ್ತು ಕಿರುಕುಳ', description: 'Stolen photos morphed into explicit images and sent to all contacts with threatening messages.', descriptionKn: 'ಕಳುವಾದ ಫೋಟೋಗಳನ್ನು ಅಶ್ಲೀಲ ಚಿತ್ರಗಳಾಗಿ ರೂಪಾಂತರಿಸಿ ಎಲ್ಲಾ ಸಂಪರ್ಕಗಳಿಗೆ ಬೆದರಿಕೆ ಸಂದೇಶಗಳೊಂದಿಗೆ ಕಳುಹಿಸಲಾಗುತ್ತದೆ.', icon: '⚠️', redFlags: ['Threats to send morphed photos', 'Messages to your contacts', 'Demands for more money'], redFlagsKn: ['ರೂಪಾಂತರಿತ ಫೋಟೋ ಕಳುಹಿಸುವ ಬೆದರಿಕೆ', 'ನಿಮ್ಮ ಸಂಪರ್ಕಗಳಿಗೆ ಸಂದೇಶ', 'ಹೆಚ್ಚು ಹಣಕ್ಕೆ ಬೇಡಿಕೆ'], counterAction: 'Do NOT pay. File police complaint. Uninstall app. Run APK inspector.', counterActionKn: 'ಪಾವತಿಸಬೇಡಿ. ಪೊಲೀಸ್ ದೂರು ನೀಡಿ. ಆ್ಯಪ್ ಅನ್‌ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ.', isInterventionPoint: false },
    ],
  },
  SBI_YONO_KYC: {
    label: 'SBI YONO KYC Update Scam',
    labelKn: 'SBI YONO KYC ಅಪ್‌ಡೇಟ್ ವಂಚನೆ',
    stages: [
      { stage: 1, title: 'Fake Bank SMS', titleKn: 'ನಕಲಿ ಬ್ಯಾಂಕ್ SMS', description: 'SMS with SBI branding: "Your YONO account will be suspended. Update KYC immediately."', descriptionKn: 'SBI ಬ್ರ್ಯಾಂಡಿಂಗ್‌ನೊಂದಿಗೆ SMS: "ನಿಮ್ಮ YONO ಖಾತೆ ಸ್ಥಗಿತಗೊಳ್ಳುತ್ತದೆ. ತಕ್ಷಣ KYC ಅಪ್‌ಡೇಟ್ ಮಾಡಿ."', icon: '📱', redFlags: ['Urgency language', 'Shortened/fake URL', 'Not from SBI-YONO sender ID'], redFlagsKn: ['ತುರ್ತು ಭಾಷೆ', 'ಕಡಿಮೆ/ನಕಲಿ URL', 'SBI-YONO ಕಳುಹಿಸುವವರ ID ಅಲ್ಲ'], counterAction: 'SBI never sends KYC update links via SMS. Visit your branch directly.', counterActionKn: 'SBI ಎಂದಿಗೂ SMS ಮೂಲಕ KYC ಅಪ್‌ಡೇಟ್ ಲಿಂಕ್ ಕಳುಹಿಸುವುದಿಲ್ಲ. ನೇರವಾಗಿ ಶಾಖೆಗೆ ಭೇಟಿ ನೀಡಿ.', isInterventionPoint: true },
      { stage: 2, title: 'Credential Harvest', titleKn: 'ರುಜುವಾತು ಕಳ್ಳತನ', description: 'Fake SBI website collects username, password, ATM PIN, and card details.', descriptionKn: 'ನಕಲಿ SBI ವೆಬ್‌ಸೈಟ್ ಬಳಕೆದಾರ ಹೆಸರು, ಪಾಸ್‌ವರ್ಡ್, ATM PIN ಸಂಗ್ರಹಿಸುತ್ತದೆ.', icon: '🎣', redFlags: ['Asks for ATM PIN online', 'URL does not end in sbi.co.in', 'No padlock/certificate'], redFlagsKn: ['ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ATM PIN ಕೇಳುತ್ತದೆ', 'URL sbi.co.in ನಲ್ಲಿ ಕೊನೆಗೊಳ್ಳುವುದಿಲ್ಲ', 'ಪ್ಯಾಡ್‌ಲಾಕ್/ಪ್ರಮಾಣಪತ್ರ ಇಲ್ಲ'], counterAction: 'Check the URL carefully. Only use onlinesbi.sbi or the official app.', counterActionKn: 'URL ಎಚ್ಚರಿಕೆಯಿಂದ ಪರಿಶೀಲಿಸಿ. onlinesbi.sbi ಅಥವಾ ಅಧಿಕೃತ ಆ್ಯಪ್ ಮಾತ್ರ ಬಳಸಿ.', isInterventionPoint: true },
      { stage: 3, title: 'Account Takeover', titleKn: 'ಖಾತೆ ವಶ', description: 'Scammer logs into real SBI account with stolen credentials and changes registered mobile number.', descriptionKn: 'ವಂಚಕ ಕಳುವಾದ ರುಜುವಾತುಗಳೊಂದಿಗೆ ನಿಜವಾದ SBI ಖಾತೆಗೆ ಲಾಗಿನ್ ಆಗಿ ನೋಂದಾಯಿತ ಮೊಬೈಲ್ ಬದಲಾಯಿಸುತ್ತಾರೆ.', icon: '🔓', redFlags: ['Unable to login to YONO', 'Mobile number changed notification', 'Unauthorized transactions begin'], redFlagsKn: ['YONO ಗೆ ಲಾಗಿನ್ ಆಗಲು ಸಾಧ್ಯವಿಲ್ಲ', 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಬದಲಾಯಿಸಿದ ಅಧಿಸೂಚನೆ', 'ಅನಧಿಕೃತ ವಹಿವಾಟು ಆರಂಭ'], counterAction: 'Visit bank branch immediately. Call 1930. Block net banking.', counterActionKn: 'ತಕ್ಷಣ ಬ್ಯಾಂಕ್ ಶಾಖೆಗೆ ಭೇಟಿ ನೀಡಿ. 1930 ಗೆ ಕರೆ ಮಾಡಿ. ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್ ಬ್ಲಾಕ್ ಮಾಡಿ.', isInterventionPoint: false },
    ],
  },
};

const ARCHETYPE_OPTIONS: { value: string; label: string; labelKn: string }[] = Object.entries(TIMELINE_DATA).map(([key, data]) => ({
  value: key,
  label: data.label,
  labelKn: data.labelKn,
}));

export const ScamPatternTimeline: React.FC<ScamPatternTimelineProps> = ({ language }) => {
  const [selectedArchetype, setSelectedArchetype] = useState(ARCHETYPE_OPTIONS[0].value);
  const [visibleStages, setVisibleStages] = useState(0);

  const timeline = TIMELINE_DATA[selectedArchetype];

  // Animate stages appearing one by one
  useEffect(() => {
    let count = 0;
    const stages = timeline.stages.length;
    const interval = setInterval(() => {
      count++;
      setVisibleStages(count);
      if (count >= stages) clearInterval(interval);
    }, 400);
    return () => clearInterval(interval);
  }, [selectedArchetype, timeline.stages.length]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400">
            <Clock className="h-4 w-4" />
          </span>
          <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
            {language === 'kn' ? 'ವಂಚನೆ ಹಂತ-ಹಂತ ಟೈಮ್‌ಲೈನ್' : 'Scam Pattern Investigation Timeline'}
          </h2>
        </div>
        <p className="mt-1 text-xs text-slate-400 sm:text-sm">
          {language === 'kn'
            ? 'ವಂಚನೆ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ಹಂತ-ಹಂತವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ'
            : 'Understand how scams unfold stage-by-stage with defense intervention points'}
        </p>
      </div>

      {/* Archetype Selector */}
      <div className="mb-6 relative">
        <select
          value={selectedArchetype}
          onChange={e => setSelectedArchetype(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 pr-10 text-sm font-semibold text-slate-200 focus:border-orange-500 focus:outline-none cursor-pointer"
        >
          {ARCHETYPE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {language === 'kn' ? opt.labelKn : opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
      </div>

      {/* Timeline */}
      <div className="relative pl-8 sm:pl-10">
        {/* Vertical line */}
        <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500/60 via-slate-700 to-slate-800" />

        {timeline.stages.map((stage, idx) => (
          <div
            key={`${selectedArchetype}-${stage.stage}`}
            className={`relative mb-6 last:mb-0 transition-all duration-500 ${idx < visibleStages ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {/* Node dot */}
            <div className={`absolute -left-5 sm:-left-[18px] top-3 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
              stage.isInterventionPoint
                ? 'border-emerald-500 bg-emerald-500/20'
                : 'border-slate-700 bg-slate-900'
            }`}>
              <span className="text-xs">{stage.icon}</span>
            </div>

            {/* Intervention marker */}
            {stage.isInterventionPoint && (
              <div className="absolute -left-[82px] sm:-left-[92px] top-2.5 hidden sm:flex items-center gap-1 rounded-md bg-emerald-500/20 px-1.5 py-0.5 text-[8px] font-bold text-emerald-400 border border-emerald-500/40">
                <Shield className="h-2.5 w-2.5" />
                DEFEND
              </div>
            )}

            {/* Card */}
            <div className={`rounded-xl border p-4 backdrop-blur-sm transition-all ${
              stage.isInterventionPoint
                ? 'border-emerald-500/30 bg-emerald-950/10 hover:border-emerald-500/50'
                : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-slate-100">
                  <span className="font-mono text-orange-400 mr-2">#{stage.stage}</span>
                  {language === 'kn' ? stage.titleKn : stage.title}
                </h4>
                {stage.isInterventionPoint && (
                  <span className="sm:hidden rounded-md bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/40">
                    🛡️ DEFEND
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {language === 'kn' ? stage.descriptionKn : stage.description}
              </p>

              {/* Red Flags */}
              <div className="mb-3">
                <div className="flex items-center gap-1 text-[10px] font-bold text-red-400 mb-1.5">
                  <AlertTriangle className="h-3 w-3" />
                  <span>{language === 'kn' ? 'ಎಚ್ಚರಿಕೆ ಚಿಹ್ನೆಗಳು:' : 'Red Flags:'}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(language === 'kn' ? stage.redFlagsKn : stage.redFlags).map((flag, i) => (
                    <span key={i} className="rounded-md border border-red-500/20 bg-red-950/20 px-2 py-0.5 text-[10px] text-red-300">
                      {flag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Counter Action */}
              <div className={`rounded-lg border p-2.5 text-[11px] font-semibold leading-relaxed ${
                stage.isInterventionPoint
                  ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300'
                  : 'border-slate-700 bg-slate-950/50 text-slate-300'
              }`}>
                <span className="font-bold">{language === 'kn' ? '✅ ರಕ್ಷಣಾ ಕ್ರಮ: ' : '✅ Counter-Action: '}</span>
                {language === 'kn' ? stage.counterActionKn : stage.counterAction}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
