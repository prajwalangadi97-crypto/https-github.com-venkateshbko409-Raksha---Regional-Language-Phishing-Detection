import type {
  CENStation,
  BankFreezeNotice,
  DistrictThreat,
  BaitPersona,
  SimulationScenario,
  QuizQuestion,
  TelemetryStats,
} from '../types';

/* ─── Telemetry Real-time Data ──────────────────────────── */
export const initialTelemetry: TelemetryStats = {
  threatsBlocked: 14892,
  scamsIntercepted: 3845,
  citizensProtected: 52410,
  muleTrapTriggers: 1120,
  phishingUrlsDetected: 8430,
  deepfakeCallsDetected: 512,
};

/* ─── Karnataka CEN Cyber Police Stations ───────────────── */
export const karnatakaCENStations: CENStation[] = [
  {
    district: 'Bengaluru Urban (City)',
    stationName: 'CEN Police Station, Bengaluru City CID',
    address: 'Carlton House, Palace Road, Ambedkar Veedhi, Bengaluru - 560001',
    phone: '080-22942346 / 080-22943225',
    email: 'cen-blrcity@ksp.gov.in',
  },
  {
    district: 'Bengaluru Rural',
    stationName: 'CEN Police Station, Bengaluru District',
    address: 'SP Office Compound, Cunningham Road, Bengaluru - 560052',
    phone: '080-22942600',
    email: 'cen-blrrural@ksp.gov.in',
  },
  {
    district: 'Mysuru City',
    stationName: 'CEN Police Station, Mysuru City',
    address: 'Police Bhavan, Nazarbad, Mysuru - 570010',
    phone: '0821-2418100 / 0821-2418339',
    email: 'cen-mysuru@ksp.gov.in',
  },
  {
    district: 'Mangaluru (Dakshina Kannada)',
    stationName: 'CEN Crime Police Station, Mangaluru City',
    address: 'Commissioner of Police Office, Pandeshwar, Mangaluru - 575001',
    phone: '0824-2220501 / 0824-2220800',
    email: 'cen-mangaluru@ksp.gov.in',
  },
  {
    district: 'Hubballi-Dharwad',
    stationName: 'CEN Police Station, Hubballi-Dharwad',
    address: 'Navanagar, Hubballi - 580025',
    phone: '0836-2233500 / 0836-2233555',
    email: 'cen-hubballi@ksp.gov.in',
  },
  {
    district: 'Belagavi City',
    stationName: 'CEN Police Station, Belagavi',
    address: 'Police Commissioner Office, Camp, Belagavi - 590001',
    phone: '0831-2405100',
    email: 'cen-belagavi@ksp.gov.in',
  },
  {
    district: 'Kalaburagi',
    stationName: 'CEN Police Station, Kalaburagi',
    address: 'SP Office, Station Bazaar, Kalaburagi - 585101',
    phone: '08472-278100',
    email: 'cen-kalaburagi@ksp.gov.in',
  },
  {
    district: 'Shivamogga',
    stationName: 'CEN Police Station, Shivamogga',
    address: 'DPO Compound, Kuvempu Road, Shivamogga - 577201',
    phone: '08182-261410',
    email: 'cen-shivamogga@ksp.gov.in',
  },
  {
    district: 'Tumakuru',
    stationName: 'CEN Police Station, Tumakuru',
    address: 'DPO Complex, BH Road, Tumakuru - 572102',
    phone: '0816-2272410',
    email: 'cen-tumakuru@ksp.gov.in',
  },
  {
    district: 'Udupi',
    stationName: 'CEN Police Station, Udupi',
    address: 'SP Office Compound, Manipal, Udupi - 576104',
    phone: '0820-2534777',
    email: 'cen-udupi@ksp.gov.in',
  },
];

/* ─── Bank Nodal Officer Rapid Freeze Matrix ────────────── */
export const bankFreezeNotices: BankFreezeNotice[] = [
  {
    bankName: 'Canara Bank (Lead Bank Karnataka)',
    nodalOfficerEmail: 'nodalofficer@canarabank.com',
    nodalOfficerPhone: '1800-425-0018 / 080-25584040',
    smsCode: 'BLOCKUPI <UPI_ID> or FREEZE <ACC_NO> to 5607060',
    emailTemplate: `URGENT - CYBER FRAUD REVERSAL / ACCOUNT FREEZE REQUEST (1930 NCRP COMPLIANT)

To: Chief Nodal Officer - Cyber Fraud & AML, Canara Bank
Date: {timestamp}
Ref: Emergency Golden Hour Intercept

Respected Sir/Madam,

I am writing under the mandatory RBI Cyber Fraud Reversal Guidelines. A fraudulent transaction occurred from my account. Kindly FREEZE the beneficiary account / UPI handle immediately to stop cash withdrawal:

• Victim Name: {victimName}
• Victim Phone: {victimPhone}
• Victim Account: {accountNumber}
• Beneficiary / Fraud Account: {scammerUPI}
• Transaction UTR / Ref No: {utr}
• Disputed Amount: ₹{amount}
• Incident Summary: {description}

Please confirm lien marking / debit freeze on the beneficiary account within the Golden Hour window.

Regards,
{victimName}
Phone: {victimPhone}
Registered 1930 Acknowledgment Pending`,
  },
  {
    bankName: 'State Bank of India (SBI)',
    nodalOfficerEmail: 'nodal.officer@sbi.co.in',
    nodalOfficerPhone: '1800-111-109 / 1800-425-3800',
    smsCode: 'BLOCK <LAST4_DIGITS> to 567676 or call 1800111109',
    emailTemplate: `URGENT - CYBER FRAUD REVERSAL / ACCOUNT FREEZE REQUEST (1930 NCRP COMPLIANT)

To: Principal Nodal Officer, State Bank of India
Date: {timestamp}
Ref: Emergency Golden Hour Intercept

Respected Sir/Madam,

A cyber theft was executed against my SBI account. In accordance with RBI Circular on Customer Protection, please initiate an immediate LIEN/FREEZE on the following beneficiary details:

• Victim Name: {victimName}
• Victim Phone: {victimPhone}
• Victim Account: {accountNumber}
• Beneficiary / Fraud Account / UPI: {scammerUPI}
• Transaction UTR / Ref No: {utr}
• Disputed Amount: ₹{amount}
• Incident Summary: {description}

Kindly act swiftly within the 2-hour Golden Hour window to prevent further routing to mule networks.

Regards,
{victimName}
Phone: {victimPhone}`,
  },
  {
    bankName: 'Karnataka Bank Ltd',
    nodalOfficerEmail: 'cybercrime@ktkbank.com',
    nodalOfficerPhone: '1800-425-1444 / 0824-2228222',
    smsCode: 'KBL FREEZE <ACC_NO> to 9880654321',
    emailTemplate: `URGENT - CYBER FRAUD REVERSAL / ACCOUNT FREEZE REQUEST (1930 NCRP COMPLIANT)

To: Nodal Officer - Fraud Prevention & Monitoring, Karnataka Bank Ltd
Date: {timestamp}

Respected Sir/Madam,

An unauthorized debit took place. Under the National Cyber Crime Reporting Portal (NCRP) protocols, please freeze the beneficiary wallet/account:

• Victim Name: {victimName}
• Victim Phone: {victimPhone}
• Victim Account: {accountNumber}
• Beneficiary / Scammer UPI: {scammerUPI}
• Transaction UTR / Ref No: {utr}
• Disputed Amount: ₹{amount}
• Incident Summary: {description}

Thank you for immediate intervention.

Regards,
{victimName}`,
  },
  {
    bankName: 'HDFC Bank',
    nodalOfficerEmail: 'nodalofficer@hdfcbank.com',
    nodalOfficerPhone: '1800-266-4332 / 1800-202-6161',
    smsCode: 'FREEZE <LAST4_DIGITS> to 5676712',
    emailTemplate: `URGENT - CYBER FRAUD REVERSAL / ACCOUNT FREEZE REQUEST

To: Principal Nodal Officer, HDFC Bank
Date: {timestamp}

Dear Nodal Officer,

Please freeze the beneficiary account receiving fraudulent funds:
• Victim Name: {victimName} ({victimPhone})
• Account: {accountNumber}
• Beneficiary / UPI: {scammerUPI}
• UTR Number: {utr}
• Amount: ₹{amount}
• Description: {description}

Regards,
{victimName}`,
  },
  {
    bankName: 'ICICI Bank',
    nodalOfficerEmail: 'headoffice@icicibank.com',
    nodalOfficerPhone: '1800-200-3344',
    smsCode: 'BLOCK <ACC_NO> to 9215676766',
    emailTemplate: `URGENT - CYBER FRAUD REVERSAL / ACCOUNT FREEZE REQUEST

To: Head Office Cyber Security & Fraud Management, ICICI Bank
Date: {timestamp}

Please mark immediate debit freeze on beneficiary:
• Victim Name: {victimName} ({victimPhone})
• Beneficiary / Fraud UPI: {scammerUPI}
• UTR: {utr} | Amount: ₹{amount}

Regards,
{victimName}`,
  },
  {
    bankName: 'Axis Bank',
    nodalOfficerEmail: 'nodal.officer@axisbank.com',
    nodalOfficerPhone: '1800-209-5577',
    emailTemplate: `URGENT - CYBER FRAUD REVERSAL / ACCOUNT FREEZE REQUEST

To: Principal Nodal Officer, Axis Bank
Date: {timestamp}

Please freeze beneficiary account for UTR: {utr} (Amount: ₹{amount}) sent to {scammerUPI}.

Regards,
{victimName} ({victimPhone})`,
  },
  {
    bankName: 'Union Bank of India',
    nodalOfficerEmail: 'nodalofficer@unionbankofindia.co.in',
    nodalOfficerPhone: '1800-222-244',
    emailTemplate: `URGENT - CYBER FRAUD REVERSAL / ACCOUNT FREEZE REQUEST

To: Nodal Officer, Union Bank of India
Date: {timestamp}

Please freeze beneficiary account for UTR: {utr} (Amount: ₹{amount}) sent to {scammerUPI}.

Regards,
{victimName} ({victimPhone})`,
  },
];

/* ─── Karnataka District Threats ────────────────────────── */
export const karnatakaDistrictThreats: DistrictThreat[] = [
  {
    district: 'Bengaluru Urban',
    districtKn: 'ಬೆಂಗಳೂರು ನಗರ',
    totalCases: 4892,
    activeCampaigns: 14,
    topScamType: 'INVESTMENT_PONZI',
    trend: 'rising',
    recentSpike: true,
    description: 'Surge in fake Telegram VIP stock groups and FedEx Digital Arrest video calls impersonating Cyber Police.',
    descriptionKn: 'ಟೆಲಿಗ್ರಾಮ್ ವಿಐಪಿ ಸ್ಟಾಕ್ ಗ್ರೂಪ್‌ಗಳು ಮತ್ತು ನಕಲಿ ಸೈಬರ್ ಪೊಲೀಸ್ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಕರೆಗಳ ತೀವ್ರ ಹೆಚ್ಚಳ.',
  },
  {
    district: 'Mysuru',
    districtKn: 'ಮೈಸೂರು',
    totalCases: 1380,
    activeCampaigns: 6,
    topScamType: 'SBI_YONO_KYC',
    trend: 'stable',
    recentSpike: false,
    description: 'Active SMS campaigns with links targeting pension account holders claiming KYC expiry.',
    descriptionKn: 'ಪಿಂಚಣಿ ಖಾತೆದಾರರನ್ನು ಗುರಿಯಾಗಿಸಿ ನಕಲಿ SBI YONO KYC ಎಸ್‌ಎಂಎಸ್ ಲಿಂಕ್‌ಗಳ ಪ್ರಸಾರ.',
  },
  {
    district: 'Mangaluru (DK)',
    districtKn: 'ಮಂಗಳೂರು (ದ.ಕ)',
    totalCases: 980,
    activeCampaigns: 5,
    topScamType: 'FEDEX_DIGITAL_ARREST',
    trend: 'rising',
    recentSpike: true,
    description: 'Extortion calls targeting NRI families claiming illegal narcotics in foreign shipments.',
    descriptionKn: 'ಅನಿವಾಸಿ ಭಾರತೀಯ ಕುಟುಂಬಗಳನ್ನು ಗುರಿಯಾಗಿಸಿ ನಕಲಿ ಕಸ್ಟಮ್ಸ್ ಮತ್ತು ಕೊರಿಯರ್ ಬೆದರಿಕೆ ಕರೆಗಳು.',
  },
  {
    district: 'Hubballi-Dharwad',
    districtKn: 'ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ',
    totalCases: 745,
    activeCampaigns: 4,
    topScamType: 'LOAN_APP_BLACKMAIL',
    trend: 'declining',
    recentSpike: false,
    description: 'Sideloaded Instant Loan APKs demanding exorbitant daily interest and contact harassment.',
    descriptionKn: 'ಸೈಡ್‌ಲೋಡ್ ಮಾಡಿದ ಸಾಲ ಆ್ಯಪ್‌ಗಳಿಂದ ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ಕದ್ದು ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮಾಡುವ ಪ್ರಕರಣಗಳು.',
  },
  {
    district: 'Belagavi',
    districtKn: 'ಬೆಳಗಾವಿ',
    totalCases: 590,
    activeCampaigns: 3,
    topScamType: 'BESCOM_POWER_CUT',
    trend: 'stable',
    recentSpike: false,
    description: 'HESCOM / BESCOM electricity disconnection SMS threats during evening hours.',
    descriptionKn: 'ವಿದ್ಯುತ್ ಬಿಲ್ ಬಾಕಿ ನೆಪದಲ್ಲಿ ಸಂಜೆ ವೇಳೆ ಕರೆ ಮಾಡಿ ಹಣ ದೋಚುವ ಯತ್ನಗಳು.',
  },
  {
    district: 'Kalaburagi',
    districtKn: 'ಕಲಬುರಗಿ',
    totalCases: 440,
    activeCampaigns: 4,
    topScamType: 'UPI_REVERSE_PAYMENT',
    trend: 'rising',
    recentSpike: true,
    description: 'OLX & QR code fake buyer scams targeting local shopkeepers and farmers.',
    descriptionKn: 'ಸ್ಥಳೀಯ ವ್ಯಾಪಾರಿಗಳಿಗೆ ಹಣ ಕಳುಹಿಸುತ್ತಿದ್ದೇವೆ ಎಂದು ನಕಲಿ QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿಸುವ ವಂಚನೆ.',
  },
  {
    district: 'Shivamogga',
    districtKn: 'ಶಿವಮೊಗ್ಗ',
    totalCases: 215,
    activeCampaigns: 2,
    topScamType: 'AADHAAR_LINK_FRAUD',
    trend: 'stable',
    recentSpike: false,
    description: 'Fraudulent calls regarding Aadhaar pan card linkage biometric updates.',
    descriptionKn: 'ಆಧಾರ್ ಲಿಂಕ್ ಮಾಡುವ ನೆಪದಲ್ಲಿ ಬಯೋಮೆಟ್ರಿಕ್ ಮತ್ತು ಒಟಿಪಿ ಕದಿಯುವ ಯತ್ನ.',
  },
  {
    district: 'Tumakuru',
    districtKn: 'ತುಮಕೂರು',
    totalCases: 310,
    activeCampaigns: 2,
    topScamType: 'YOUTUBE_JOB',
    trend: 'declining',
    recentSpike: false,
    description: 'Work-from-home part-time YouTube like and subscribe prepaid tasks.',
    descriptionKn: 'ಯೂಟ್ಯೂಬ್ ವೀಡಿಯೊ ಲೈಕ್ ಮಾಡಿ ಗಳಿಸಿ ಎಂಬ ನಕಲಿ ಉದ್ಯೋಗ ಕಾರ್ಯಗಳು.',
  },
];

/* ─── Autonomous Honeypot Bait Personas ─────────────────── */
export const honeypotBaitPersonas: BaitPersona[] = [
  {
    id: 'pensioner',
    name: 'Mr. Ramamurthy (Retd. Bank Clerk, 72)',
    nameKn: 'ಶ್ರೀ ರಾಮಮೂರ್ತಿ (ನಿವೃತ್ತ ಬ್ಯಾಂಕ್ ನೌಕರ, 72)',
    role: 'Confused Pensioner Persona',
    avatar: '👴🏽',
    tactics: 'Asks repeated questions, types slowly, pretends eyesight is weak, forces scammer to give clear UPI IDs & phone numbers.',
    style: 'High Patience Drain • Max IOC Extraction',
  },
  {
    id: 'student',
    name: 'Ananya (Engineering Student, 20)',
    nameKn: 'ಅನನ್ಯಾ (ಇಂಜಿನಿಯರಿಂಗ್ ವಿದ್ಯಾರ್ಥಿನಿ, 20)',
    role: 'Eager Part-Timer Persona',
    avatar: '👩🏻‍💻',
    tactics: 'Pretends to need pocket money, asks for immediate initial UPI reward, traps Telegram channel links and coordinator numbers.',
    style: 'Fast Engagement • Task Scam Trap',
  },
  {
    id: 'businessman',
    name: 'Manjunath (Small Trader, Kalasipalya)',
    nameKn: 'ಮಂಜುನಾಥ್ (ಸಣ್ಣ ವ್ಯಾಪಾರಿ, ಕಲಾಸಿಪಾಳ್ಯ)',
    role: 'Busy Shopkeeper Persona',
    avatar: '👨🏽‍💼',
    tactics: 'Pretends to have low phone battery and slow internet, forces scammer to provide direct NEFT/RTGS bank accounts & IFSC.',
    style: 'Mule Account Harvester • Heavy Payload Capture',
  },
];

/* ─── Preset Analysis Samples (Multilingual Indic) ──────── */
export const presetPhishingSamples = [
  {
    title: 'BESCOM Power Cut SMS (Kannada)',
    titleKn: 'ಬೆಸ್ಕಾಂ ವಿದ್ಯುತ್ ಕಡಿತ SMS',
    language: 'kn',
    category: 'BESCOM_POWER_CUT',
    text: 'ಆತ್ಮೀಯ ಗ್ರಾಹಕರೇ, ನಿಮ್ಮ ₹3,450 ಬೆಸ್ಕಾಂ ವಿದ್ಯುತ್ ಬಿಲ್ ಬಾಕಿಯಿದೆ. ಇಂದು ರಾತ್ರಿ 9:30 ಕ್ಕೆ ವಿದ್ಯುತ್ ಕಡಿತ ಮಾಡಲಾಗುತ್ತದೆ. ತಕ್ಷಣ ನವೀಕರಿಸಲು ಸಂಪರ್ಕಿಸಿ: 98451-22990 ಅಥವಾ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿ: bescom-billpay.top/karnataka',
  },
  {
    title: 'FedEx Digital Arrest / CBI Notice (English)',
    titleKn: 'ಫೆಡೆಕ್ಸ್ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ನೋಟಿಸ್',
    language: 'en',
    category: 'FEDEX_DIGITAL_ARREST',
    text: 'URGENT: This is Inspector Ajay Kumar from Mumbai Cyber Crime & Narcotics Control Bureau. Parcel ID FX-90812 registered in your Aadhaar was seized containing 15 fake passports and 300g contraband. You are under immediate Digital Arrest. Connect to Skype video interrogation immediately or transfer verification fee to RBI nodal desk upi: clearing@sbi-arb.',
  },
  {
    title: 'SBI Yono KYC Expiry Alert (English/Hinglish)',
    titleKn: 'SBI YONO KYC ಎಚ್ಚರಿಕೆ',
    language: 'en',
    category: 'SBI_YONO_KYC',
    text: 'Dear SBI Customer, Your YONO Account has been suspended due to incomplete PAN KYC. Please update within 24 hrs to avoid permanent account block. Visit: http://sbi-yono-update.xyz/login and verify your OTP and ATM PIN.',
  },
  {
    title: 'YouTube Part-Time Job Telegram Scam (English)',
    titleKn: 'ಯೂಟ್ಯೂಬ್ ಉದ್ಯೋಗ ವಂಚನೆ',
    language: 'en',
    category: 'YOUTUBE_JOB',
    text: 'Hi! I am Pooja from Global Media Partner. We offer work from home. Earn ₹500 to ₹5,000 per day just by liking 5 YouTube videos. No investment needed initially. Send screenshot to Telegram @hr_pooja_earning and get instant ₹150 joining bonus to your UPI.',
  },
  {
    title: 'UPI Reverse Payment Refund Trick (Kannada)',
    titleKn: 'UPI ರಿವರ್ಸ್ ಪೇಮೆಂಟ್ ಟ್ರಿಕ್',
    language: 'kn',
    category: 'UPI_REVERSE_PAYMENT',
    text: 'ಸರ್, ನಿಮ್ಮ Google Pay ಖಾತೆಗೆ ತಪ್ಪಾಗಿ ₹12,000 ಕಳುಹಿಸಲಾಗಿದೆ. ದಯವಿಟ್ಟು ಈ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿ "PIN ಹಾಕಿ ಹಣ ಸ್ವೀಕರಿಸಿ" ಬಟನ್ ಒತ್ತಿ ಹಣ ಹಿಂತಿರುಗಿಸಿ: upi://pay?pa=refundscam@ibl&pn=Refund&am=12000',
  },
  {
    title: 'Instant Loan App Threat SMS (English)',
    titleKn: 'ತ್ವರಿತ ಸಾಲ ಆ್ಯಪ್ ಬೆದರಿಕೆ',
    language: 'en',
    category: 'LOAN_APP_BLACKMAIL',
    text: 'LAST WARNING! You have failed to repay QuickCash loan of ₹8,000. We have downloaded all your contact list, WhatsApp chats and photos. If you do not pay to upi: loanrecovery@ybl in 1 hour, we will circulate your morphed photos to your parents and friends.',
  },
];

/* ─── Preset Audio Samples for Voice Clone Lab ─────────── */
export const voiceCloneAudioSamples = [
  {
    id: 'sample-1',
    title: 'AI Voice Clone: "Grandson in Police Lockup" (Distress Scam)',
    titleKn: 'AI ಧ್ವನಿ ಕ್ಲೋನ್: "ಪೊಲೀಸ್ ಕಸ್ಟಡಿಯಲ್ಲಿರುವ ಮೊಮ್ಮಗ"',
    isDeepfake: true,
    language: 'kn',
    duration: '0:14',
    speaker: 'Synthetic Voice (Vocoder Pitch Modified)',
    script: 'ತಾತಾ, ನಾನು ರಾಹುಲ್... ಕಾಲೇಜು ಹತ್ತಿರ ಪೊಲೀಸರು ನನ್ನನ್ನು ಹಿಡಿದುಕೊಂಡಿದ್ದಾರೆ... ನನ್ನ ಫೋನ್ ಕಿತ್ತುಕೊಂಡಿದ್ದಾರೆ... ಇನ್ಸ್ಪೆಕ್ಟರ್‌ಗೆ ತಕ್ಷಣ ₹50,000 ಕಳುಹಿಸಬೇಕು, ಇಲ್ಲದಿದ್ದರೆ ಜೈಲಿಗೆ ಕಳಿಸ್ತಾರೆ... ಯಾರಿಗೂ ಹೇಳ್ಬೇಡಿ ಪ್ಲೀಸ್!',
    scriptEn: 'Grandpa, I am Rahul... Police caught me near college... they took my phone... Need to send ₹50,000 to inspector immediately or they will jail me... Please don\'t tell anyone!',
    metrics: {
      jitter: 0.142,
      respiration: false,
      vocoderBand: 'High (3.2 kHz harmonic spike)',
      biologicalScore: 18,
      confidence: 96,
    },
  },
  {
    id: 'sample-2',
    title: 'AI Deepfake: "CBI Officer Digital Arrest Order"',
    titleKn: 'AI ಡೀಪ್‌ಫೇಕ್: "CBI ಅಧಿಕಾರಿ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಆದೇಶ"',
    isDeepfake: true,
    language: 'en',
    duration: '0:18',
    speaker: 'Cloned Authority Voice (Zero Pitch Micro-Tremor)',
    script: 'This is DSP Vijay from CBI Cyber Cell New Delhi. You are under live digital surveillance. If you disconnect this call, a non-bailable warrant will be executed at your home address in Bangalore within 30 minutes.',
    metrics: {
      jitter: 0.168,
      respiration: false,
      vocoderBand: 'Robotic Cadence Detected',
      biologicalScore: 12,
      confidence: 98,
    },
  },
  {
    id: 'sample-3',
    title: 'Authentic Human Voice: Family Member Check-in',
    titleKn: 'ನೈಜ ಮಾನವ ಧ್ವನಿ: ಕುಟುಂಬದ ಸದಸ್ಯರ ಸಹಜ ಕರೆ',
    isDeepfake: false,
    language: 'kn',
    duration: '0:12',
    speaker: 'Natural Human Voice (With Natural Breathing & Harmonics)',
    script: 'ಅಮ್ಮಾ, ನಾನು ಆಫೀಸ್ ಮುಗಿಸಿ ಹೊರಟೆ. ಟ್ರಾಫಿಕ್ ಜಾಸ್ತಿ ಇದೆ, ಬರಲು 45 ನಿಮಿಷ ಆಗುತ್ತೆ. ಏನಾದ್ರೂ ಅಂಗಡಿಯಿಂದ ತರಬೇಕಾ?',
    scriptEn: 'Amma, I just left office. Traffic is heavy, will take 45 mins to reach home. Should I buy anything from the store?',
    metrics: {
      jitter: 0.024,
      respiration: true,
      vocoderBand: 'Natural Biological Spectrum',
      biologicalScore: 94,
      confidence: 92,
    },
  },
];

/* ─── Sideload APK Threat Samples ───────────────────────── */
export const presetApkSamples = [
  {
    fileName: 'QuickCash_Instant_Loan_v4.1.apk',
    appName: 'QuickCash Instant Loan',
    packageName: 'com.finance.quickcash.instant',
    threatLevel: 'CRITICAL' as const,
    riskScore: 96,
    c2Servers: [
      { ip: '103.145.22.84', port: 8443, country: 'Myanmar', hosting: 'ShweSecure Hosting' },
      { ip: '45.114.78.12', port: 443, country: 'Cambodia', hosting: 'CloudMule VPS' },
    ],
    exfiltrationNumbers: ['+86-138-1122-XXXX', '+91-98712-XXXXX'],
    dangerousPermissions: [
      'READ_SMS (Reads bank OTPs)',
      'RECEIVE_SMS (Intercepts login codes)',
      'READ_CONTACTS (Exfiltrates all family & work numbers)',
      'CAMERA (Steals private gallery photos)',
      'RECORD_AUDIO (Background eavesdropping)',
      'BIND_ACCESSIBILITY_SERVICE (Keylogger & auto-clicks)',
      'SYSTEM_ALERT_WINDOW (Fake banking overlays)',
    ],
    removalSteps: [
      '1. Immediately turn on Airplane Mode to stop ongoing photo/contact exfiltration.',
      '2. Boot phone in Android Safe Mode (Hold Power → Long press Power Off → Tap Safe Mode).',
      '3. Navigate to Settings → Security → Device Admin Apps and deactivate QuickCash.',
      '4. Go to Settings → Apps → QuickCash → Clear Storage & Uninstall.',
      '5. Change all net banking and UPI PINs from a secondary clean device.',
      '6. File complaint on 1930 / cybercrime.gov.in with APK package name.',
    ],
  },
  {
    fileName: 'SBI_Yono_Mandatory_Update.apk',
    appName: 'YONO SBI Security Patch',
    packageName: 'com.sbi.yono.patch2026',
    threatLevel: 'CRITICAL' as const,
    riskScore: 98,
    c2Servers: [
      { ip: '194.26.29.110', port: 9001, country: 'Russia', hosting: 'Hostkey B.V.' },
    ],
    exfiltrationNumbers: ['+91-77890-XXXXX'],
    dangerousPermissions: [
      'RECEIVE_SMS (Steals bank OTPs)',
      'BIND_ACCESSIBILITY_SERVICE (Steals username and password as you type)',
      'READ_PHONE_STATE (Clones SIM IMSI)',
      'SYSTEM_ALERT_WINDOW (Draws fake SBI login screen over real app)',
    ],
    removalSteps: [
      '1. Disconnect WiFi and mobile data immediately.',
      '2. Revoke Accessibility permissions granted in Settings → Accessibility.',
      '3. Uninstall the malicious APK immediately.',
      '4. Contact SBI at 1800-11-2211 to temporarily freeze internet banking access.',
    ],
  },
];

/* ─── Scam DNA IOC Graph Nodes & Edges ──────────────────── */
export const initialScamDnaNodes = [
  { id: 'n-camp-1', label: 'Syndicate: Digital Arrest Extortion', type: 'SCAM_CAMPAIGN' as const, risk: 'CRITICAL' as const, x: 420, y: 200, details: 'Transnational racket posing as Mumbai Customs & CBI' },
  { id: 'n-phone-1', label: '+91-98451-22990', type: 'PHONE' as const, risk: 'HIGH' as const, x: 200, y: 110, details: 'VoIP gateway spoofed SIM from Mewat cluster' },
  { id: 'n-upi-1', label: 'clearing@sbi-arb', type: 'UPI' as const, risk: 'CRITICAL' as const, x: 640, y: 110, details: 'Mule UPI handle tied to cloned current account' },
  { id: 'n-bank-1', label: 'Canara A/C XXXX-9821', type: 'BANK_ACCOUNT' as const, risk: 'CRITICAL' as const, x: 650, y: 320, details: 'Laundered ₹1.8 Cr within 48 hours' },
  { id: 'n-url-1', label: 'sbi-yono-update.xyz', type: 'URL' as const, risk: 'CRITICAL' as const, x: 190, y: 320, details: 'Phishing portal hosted on offshore bulletproof server' },
  { id: 'n-tg-1', label: '@hr_pooja_earning', type: 'TELEGRAM' as const, risk: 'HIGH' as const, x: 300, y: 440, details: 'Recruiting channel for prepaid task scams' },
  { id: 'n-ip-1', label: '103.145.22.84', type: 'IP' as const, risk: 'CRITICAL' as const, x: 550, y: 440, details: 'Command & Control socket routing stolen SMS OTPs' },
  { id: 'n-camp-2', label: 'Syndicate: Karnataka Smishing Mesh', type: 'SCAM_CAMPAIGN' as const, risk: 'HIGH' as const, x: 420, y: 340, details: 'Bulk SMS gateway sending BESCOM & Electricity fraud messages' },
];

export const initialScamDnaEdges = [
  { source: 'n-phone-1', target: 'n-camp-1', relation: 'Originating Caller' },
  { source: 'n-upi-1', target: 'n-camp-1', relation: 'Extortion Escrow' },
  { source: 'n-bank-1', target: 'n-upi-1', relation: 'Settlement Mule' },
  { source: 'n-url-1', target: 'n-camp-2', relation: 'Phishing Domain' },
  { source: 'n-ip-1', target: 'n-url-1', relation: 'C2 Host' },
  { source: 'n-tg-1', target: 'n-camp-2', relation: 'Bait Channel' },
  { source: 'n-phone-1', target: 'n-camp-2', relation: 'Shared SIM Pool' },
  { source: 'n-bank-1', target: 'n-camp-2', relation: 'Cross-Syndicate Mule' },
];

/* ─── Simulation Lab Roleplay Scenarios ─────────────────── */
export const simulationScenarios: SimulationScenario[] = [
  {
    id: 'sim-bescom',
    title: 'BESCOM Power Cut Threat at 9 PM',
    titleKn: 'ರಾತ್ರಿ 9 ಗಂಟೆಗೆ ಬೆಸ್ಕಾಂ ಕರೆಂಟ್ ಕಟ್ ಬೆದರಿಕೆ',
    description: 'You receive an urgent message at 8 PM stating your power will be disconnected in 60 minutes due to unpaid bill.',
    descriptionKn: 'ಬಾಕಿ ಬಿಲ್ ಪಾವತಿಸದಿದ್ದರೆ 60 ನಿಮಿಷದಲ್ಲಿ ವಿದ್ಯುತ್ ಕಡಿತ ಮಾಡುವುದಾಗಿ ಬೆದರಿಕೆ ಸಂದೇಶ ಬರುತ್ತದೆ.',
    scamType: 'BESCOM_POWER_CUT',
    difficulty: 'BEGINNER',
    steps: [
      {
        message: 'Dear Customer, Your electricity will be disconnected tonight at 9:30 PM. Bill pending ₹3,450. Call BESCOM Nodal Officer Mr. Ramesh at 98451-22990 immediately.',
        messageKn: 'ಆತ್ಮೀಯ ಗ್ರಾಹಕರೇ, ಇಂದು ರಾತ್ರಿ 9:30 ಕ್ಕೆ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಕಡಿತಗೊಳ್ಳಲಿದೆ. ಬಾಕಿ ₹3,450. ತಕ್ಷಣ 98451-22990 ಗೆ ಕರೆ ಮಾಡಿ.',
        isScammer: true,
        correctAction: 'IGNORE',
        hint: 'BESCOM never sends personal mobile numbers or disconnects power without formal written notice.',
        hintKn: 'ಬೆಸ್ಕಾಂ ಎಂದಿಗೂ ವೈಯಕ್ತಿಕ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗಳನ್ನು ನೀಡುವುದಿಲ್ಲ ಅಥವಾ ಲಿಖಿತ ನೋಟಿಸ್ ಇಲ್ಲದೆ ರಾತ್ರಿ ವಿದ್ಯುತ್ ಕಡಿತ ಮಾಡುವುದಿಲ್ಲ.',
      },
      {
        message: 'Hello sir, this is Ramesh from BESCOM helpline. To avoid immediate cut, install our QuickSupport bill viewer app and send ₹10 verification fee via Google Pay.',
        messageKn: 'ಸರ್, ಬೆಸ್ಕಾಂ ಸಹಾಯವಾಣಿಯಿಂದ ರಮೇಶ್ ಮಾತನಾಡುತ್ತಿದ್ದೇನೆ. ಸಂಪರ್ಕ ಉಳಿಸಲು QuickSupport ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ ₹10 ಕಳುಹಿಸಿ.',
        isScammer: true,
        correctAction: 'BLOCK',
        hint: 'QuickSupport is a remote screen sharing tool that allows scammers to view your banking screen!',
        hintKn: 'QuickSupport ಎಂಬುದು ರಿಮೋಟ್ ಸ್ಕ್ರೀನ್ ಹಂಚಿಕೆ ಸಾಧನವಾಗಿದ್ದು, ವಂಚಕರಿಗೆ ನಿಮ್ಮ ಬ್ಯಾಂಕಿಂಗ್ ಪರದೆಯನ್ನು ನೋಡಲು ಅನುಮತಿಸುತ್ತದೆ!',
      },
      {
        message: 'Sir I will give you my supervisor personal phone number. Please approve the collect request on your PhonePe right now!',
        messageKn: 'ಸರ್ PhonePe ನಲ್ಲಿ ಬಂದಿರುವ ರಿಕ್ವೆಸ್ಟ್ ಅಪ್ರೂವ್ ಮಾಡಿ.',
        isScammer: true,
        correctAction: 'REPORT',
        hint: 'Approving a collect request transfers money OUT of your bank account.',
        hintKn: 'ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್ ಅಪ್ರೂವ್ ಮಾಡುವುದು ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣವನ್ನು ಕಡಿತಗೊಳಿಸುತ್ತದೆ.',
      },
    ],
  },
  {
    id: 'sim-digital-arrest',
    title: 'CBI / FedEx Digital Arrest Extortion Call',
    titleKn: 'CBI / ಫೆಡೆಕ್ಸ್ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಸುಲಿಗೆ ಕರೆ',
    description: 'A robotic voice claims your Aadhaar is linked to illegal narcotics discovered in a FedEx courier.',
    descriptionKn: 'ಫೆಡೆಕ್ಸ್ ಪಾರ್ಸೆಲ್‌ನಲ್ಲಿ ಮಾದಕ ದ್ರವ್ಯ ಪತ್ತೆಯಾಗಿದೆ ಎಂದು ನಕಲಿ ಸಿಬಿಐ ಅಧಿಕಾರಿ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಮಾಡುವುದಾಗಿ ಹೆದರಿಸುತ್ತಾರೆ.',
    scamType: 'FEDEX_DIGITAL_ARREST',
    difficulty: 'ADVANCED',
    steps: [
      {
        message: 'This is FedEx IVR alert. Parcel FX-90812 registered with your Aadhaar contains forged passports. Press 9 to transfer to Mumbai Cyber Crime.',
        messageKn: 'ಇದು ಫೆಡೆಕ್ಸ್ ಸಂದೇಶ. ನಿಮ್ಮ ಆಧಾರ್ ಹೆಸರಿನ ಪಾರ್ಸೆಲ್‌ನಲ್ಲಿ ನಕಲಿ ಪಾಸ್‌ಪೋರ್ಟ್‌ಗಳಿವೆ. ಮುಂಬೈ ಸೈಬರ್ ಕ್ರೈಂಗೆ ಸಂಪರ್ಕಿಸಲು 9 ಒತ್ತಿರಿ.',
        isScammer: true,
        correctAction: 'BLOCK',
        hint: 'Courier companies do not transfer calls to police. Hang up immediately.',
        hintKn: 'ಕೊರಿಯರ್ ಕಂಪನಿಗಳು ಎಂದಿಗೂ ಪೊಲೀಸರಿಗೆ ಕರೆಗಳನ್ನು ವರ್ಗಾಯಿಸುವುದಿಲ್ಲ. ತಕ್ಷಣ ಕಟ್ ಮಾಡಿ.',
      },
      {
        message: 'I am DSP Sharma. You are on confidential camera surveillance under Section 41 CrPC. Do not tell your family or disconnect, or our Bangalore patrol will arrest you in 20 minutes.',
        messageKn: 'ನಾನು ಡಿಎಸ್‌ಪಿ ಶರ್ಮಾ. ನೀವು ವಿಡಿಯೋ ಕರೆಯಲ್ಲಿ ಇರಬೇಕು, ಕುಟುಂಬಕ್ಕೆ ತಿಳಿಸಿದರೆ ತಕ್ಷಣ ಬಂಧಿಸಲಾಗುವುದು.',
        isScammer: true,
        correctAction: 'REPORT',
        hint: 'Indian Law has NO concept of "Digital Arrest". No police officer interrogates over Skype/WhatsApp video.',
        hintKn: 'ಭಾರತೀಯ ಕಾನೂನಿನಲ್ಲಿ "ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್" ಎಂಬ ಯಾವುದೇ ನಿಯಮವಿಲ್ಲ. ಪೊಲೀಸರು ವಿಡಿಯೋ ಕರೆ ಮೂಲಕ ವಿಚಾರಣೆ ನಡೆಸುವುದಿಲ್ಲ.',
      },
      {
        message: 'Transfer your savings of ₹2,50,000 to RBI Clearance Escrow account. It will be refunded after automated ledger verification in 2 hours.',
        messageKn: 'ನಿಮ್ಮ ಉಳಿತಾಯದ ₹2,50,000 ಹಣವನ್ನು ಪರಿಶೀಲನೆಗಾಗಿ ಆರ್‌ಬಿಐ ಎಸ್ಕ್ರೋ ಖಾತೆಗೆ ವರ್ಗಾಯಿಸಿ.',
        isScammer: true,
        correctAction: 'BLOCK',
        hint: 'RBI does not maintain individual clearance accounts. Call 1930 immediately.',
        hintKn: 'ಆರ್‌ಬಿಐ ಎಂದಿಗೂ ವೈಯಕ್ತಿಕ ಹಣ ವರ್ಗಾವಣೆ ಕೇಳುವುದಿಲ್ಲ. ತಕ್ಷಣ 1930 ಗೆ ಕರೆ ಮಾಡಿ.',
      },
    ],
  },
  {
    id: 'sim-youtube-job',
    title: 'YouTube Like & Earn Task Trap',
    titleKn: 'ಯೂಟ್ಯೂಬ್ ಲೈಕ್ ಮಾಡಿ ಗಳಿಸುವ ಪಾರ್ಟ್-ಟೈಮ್ ಟ್ರ್ಯಾಪ್',
    description: 'Work from home message offering ₹150 for liking 3 videos, progressing into a high-stakes crypto task trap.',
    descriptionKn: 'ವೀಡಿಯೊ ಲೈಕ್ ಮಾಡಿ ಸುಲಭವಾಗಿ ಹಣ ಗಳಿಸಿ ಎಂದು ಆರಂಭಿಸಿ ನಂತರ ದೊಡ್ಡ ಹಣ ಹೂಡಿಕೆ ಮಾಡಿಸುವ ವಂಚನೆ.',
    scamType: 'YOUTUBE_JOB',
    difficulty: 'INTERMEDIATE',
    steps: [
      {
        message: 'Hello! Earn ₹3,000 daily from home by liking YouTube videos for digital brands. Join our Telegram channel to claim ₹150 instant bonus.',
        messageKn: 'ಹಲೋ! ಯೂಟ್ಯೂಬ್ ವೀಡಿಯೊ ಲೈಕ್ ಮಾಡುವ ಮೂಲಕ ದಿನಕ್ಕೆ ₹3,000 ಗಳಿಸಿ. ₹150 ಬೋನಸ್ ಪಡೆಯಲು ಟೆಲಿಗ್ರಾಮ್‌ಗೆ ಬನ್ನಿ.',
        isScammer: true,
        correctAction: 'IGNORE',
        hint: 'Legitimate marketing agencies never hire via unsolicited WhatsApp/Telegram texts.',
        hintKn: 'ಯಾವ ಅಧಿಕೃತ ಕಂಪನಿಯೂ ಅಪರಿಚಿತ ಟೆಲಿಗ್ರಾಮ್ ಮೂಲಕ ಇಂತಹ ಉದ್ಯೋಗಗಳನ್ನು ನೀಡುವುದಿಲ್ಲ.',
      },
      {
        message: 'Congratulations! We sent ₹150 to your UPI. Now to unlock Level 2 VIP Merchant Task, deposit ₹5,000 to wallet. You will withdraw ₹8,500 in 15 minutes!',
        messageKn: 'ಅಭಿನಂದನೆಗಳು! ನಿಮಗೆ ₹150 ಕಳುಹಿಸಲಾಗಿದೆ. ಈಗ ₹5,000 ಠೇವಣಿ ಮಾಡಿ ₹8,500 ಹಿಂಪಡೆಯಿರಿ!',
        isScammer: true,
        correctAction: 'REPORT',
        hint: 'Small initial payouts are bait to gain psychological trust before taking large deposits.',
        hintKn: 'ಆರಂಭಿಕ ಸಣ್ಣ ಪಾವತಿಗಳು ಕೇವಲ ನಿಮ್ಮ ನಂಬಿಕೆ ಗಳಿಸಲು ಹಾಕುವ ಗಾಳ.',
      },
    ],
  },
];

/* ─── Cyber Tutor Interactive Quiz ─────────────────────── */
export const cyberTutorQuiz: QuizQuestion[] = [
  {
    id: 'quiz-1',
    question: 'A caller claims to be a police officer on WhatsApp video call and says you are placed under "Digital Arrest". What is the reality?',
    questionKn: 'ವಾಟ್ಸಾಪ್ ವಿಡಿಯೋ ಕರೆಯಲ್ಲಿ ಪೊಲೀಸರೆಂದು ಹೇಳಿಕೊಂಡು "ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್" ಮಾಡಲಾಗಿದೆ ಎನ್ನುತ್ತಾರೆ. ಇದರ ನೈಜತೆ ಏನು?',
    options: [
      { text: 'Stay on the video call and pay the clearance bond', textKn: 'ವಿಡಿಯೋ ಕರೆಯಲ್ಲಿಯೇ ಇದ್ದು ಹಣ ಪಾವತಿಸುವುದು', isCorrect: false },
      { text: '"Digital Arrest" does not exist in Indian law; hang up and dial 1930', textKn: 'ಭಾರತೀಯ ಕಾನೂನಿನಲ್ಲಿ "ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್" ಇಲ್ಲ; ಕರೆ ಕಟ್ ಮಾಡಿ 1930 ಗೆ ಕರೆ ಮಾಡಿ', isCorrect: true },
      { text: 'Share your Aadhaar copy to prove innocence', textKn: 'ಆಧಾರ್ ಪ್ರತಿಯನ್ನು ಕಳುಹಿಸಿ ನಿರಪರಾಧಿ ಎಂದು ಸಾಬೀತುಪಡಿಸುವುದು', isCorrect: false },
      { text: 'Transfer 50% of the demanded amount', textKn: 'ಅರ್ಧ ಹಣವನ್ನು ಮಾತ್ರ ವರ್ಗಾಯಿಸುವುದು', isCorrect: false },
    ],
    explanation: 'There is NO provision for "Digital Arrest" in the Code of Criminal Procedure. Police never conduct trials or extort money over video calls.',
    explanationKn: 'ಭಾರತೀಯ ಅಪರಾಧ ದಂಡ ಸಂಹಿತೆಯಲ್ಲಿ "ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್" ಎಂಬ ಪರಿಕಲ್ಪನೆಯೇ ಇಲ್ಲ. ಪೊಲೀಸರು ಎಂದಿಗೂ ವಿಡಿಯೋ ಕರೆ ಮೂಲಕ ಹಣ ಕೇಳುವುದಿಲ್ಲ.',
    difficulty: 'EASY',
  },
  {
    id: 'quiz-2',
    question: 'What is the "Golden Hour" in cyber fraud response and why is it critical?',
    questionKn: 'ಸೈಬರ್ ವಂಚನೆಯಲ್ಲಿ "ಗೋಲ್ಡನ್ ಅವರ್" ಎಂದರೇನು ಮತ್ತು ಇದು ಏಕೆ ನಿರ್ಣಾಯಕ?',
    options: [
      { text: 'The first 2 hours after fraud to freeze funds in beneficiary mule accounts', textKn: 'ವಂಚನೆ ನಡೆದ ಮೊದಲ 2 ಗಂಟೆಗಳಲ್ಲಿ ಹಣವನ್ನು ತಡೆಹಿಡಿಯಲು ಬ್ಯಾಂಕ್‌ಗಳಿಗೆ ಸೂಚಿಸುವ ಸಮಯ', isCorrect: true },
      { text: 'The best time of day to invest in stock markets', textKn: 'ಸ್ಟಾಕ್ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಹೂಡಿಕೆ ಮಾಡಲು ಸೂಕ್ತ ಸಮಯ', isCorrect: false },
      { text: 'The time taken by police to issue an FIR copy', textKn: 'ಪೊಲೀಸರು ಎಫ್‌ಐಆರ್ ದಾಖಲಿಸಲು ತೆಗೆದುಕೊಳ್ಳುವ ಸಮಯ', isCorrect: false },
      { text: 'Banking hours when ATMs are open', textKn: 'ಬ್ಯಾಂಕ್ ಕೆಲಸದ ಸಮಯ', isCorrect: false },
    ],
    explanation: 'The Golden Hour (first 60-120 minutes) is the crucial window when 1930 and bank nodal desks can freeze illicit fund transfers before scammers withdraw via ATMs or crypto gateways.',
    explanationKn: 'ವಂಚನೆ ನಡೆದ ಮೊದಲ 1-2 ಗಂಟೆಗಳಲ್ಲಿ 1930 ಅಥವಾ ಬ್ಯಾಂಕ್‌ಗೆ ಮಾಹಿತಿ ನೀಡಿದರೆ ವಂಚಕರು ಹಣವನ್ನು ಎಟಿಎಂ ಮೂಲಕ ಡ್ರಾ ಮಾಡುವ ಮೊದಲೇ ತಡೆಹಿಡಿಯಬಹುದು.',
    difficulty: 'EASY',
  },
  {
    id: 'quiz-3',
    question: 'To receive money on Google Pay / PhonePe / Paytm, do you ever need to enter your UPI PIN?',
    questionKn: 'Google Pay / PhonePe ನಲ್ಲಿ ಹಣ ಸ್ವೀಕರಿಸಲು ನೀವು ಎಂದಾದರೂ UPI PIN ನಮೂದಿಸಬೇಕೇ?',
    options: [
      { text: 'Yes, PIN is always required for both sending and receiving', textKn: 'ಹೌದು, ಕಳುಹಿಸಲು ಮತ್ತು ಸ್ವೀಕರಿಸಲು ಪಿನ್ ಬೇಕು', isCorrect: false },
      { text: 'NEVER! UPI PIN is ONLY entered when money is leaving your account', textKn: 'ಎಂದಿಗೂ ಇಲ್ಲ! ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣ ಕಡಿತವಾಗುವಾಗ ಮಾತ್ರ PIN ಬೇಕು', isCorrect: true },
      { text: 'Only when receiving amounts above ₹10,000', textKn: '₹10,000 ಕ್ಕಿಂತ ಹೆಚ್ಚು ಹಣ ಸ್ವೀಕರಿಸುವಾಗ ಮಾತ್ರ', isCorrect: false },
      { text: 'Only for merchant refund vouchers', textKn: 'ರೀಫಂಡ್ ಪಡೆಯುವಾಗ ಮಾತ್ರ', isCorrect: false },
    ],
    explanation: 'UPI PIN is strictly an authorization for debit (sending money). Receiving money requires ZERO authentication from the recipient.',
    explanationKn: 'UPI PIN ಕೇವಲ ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣ ಕಳುಹಿಸಲು ಮಾತ್ರ. ಹಣ ಸ್ವೀಕರಿಸಲು ಯಾವುದೇ ಪಿನ್ ನಮೂದಿಸುವ ಅಗತ್ಯವಿಲ್ಲ.',
    difficulty: 'MEDIUM',
  },
  {
    id: 'quiz-4',
    question: 'How can you protect your family against AI voice clone kidnapping / emergency extortion scams?',
    questionKn: 'AI ಧ್ವನಿ ಕ್ಲೋನ್ ನಕಲಿ ತುರ್ತು ಕರೆಗಳಿಂದ ನಿಮ್ಮ ಕುಟುಂಬವನ್ನು ಹೇಗೆ ರಕ್ಷಿಸಬಹುದು?',
    options: [
      { text: 'Immediately transfer money to save the family member', textKn: 'ತಕ್ಷಣ ಹಣ ಕಳುಹಿಸಿ ರಕ್ಷಿಸುವುದು', isCorrect: false },
      { text: 'Establish a secret offline "Family Safe Word" to verify true identity', textKn: 'ಕುಟುಂಬದ ನಡುವೆ ರಹಸ್ಯ "ಫ್ಯಾಮಿಲಿ ಸೇಫ್ ವರ್ಡ್" ಇಟ್ಟುಕೊಂಡು ಪರಿಶೀಲಿಸುವುದು', isCorrect: true },
      { text: 'Never answer phone calls from unknown numbers', textKn: 'ಅಪರಿಚಿತ ಕರೆಗಳನ್ನು ಎಂದಿಗೂ ಸ್ವೀಕರಿಸದಿರುವುದು', isCorrect: false },
      { text: 'Ask the caller to send an email instead', textKn: 'ಇಮೇಲ್ ಕಳುಹಿಸಲು ಹೇಳುವುದು', isCorrect: false },
    ],
    explanation: 'A secret Family Safe Word known only offline to your trusted family members foils voice cloning tools because synthetic AI models cannot guess private safe words.',
    explanationKn: 'ಕುಟುಂಬದ ನಡುವಿನ ರಹಸ್ಯ ಪದ (Safe Word) AI ಕ್ಲೋನಿಂಗ್ ತಂತ್ರಜ್ಞಾನವನ್ನು ಸುಲಭವಾಗಿ ವಿಫಲಗೊಳಿಸುತ್ತದೆ.',
    difficulty: 'MEDIUM',
  },
  {
    id: 'quiz-5',
    question: 'An unknown loan APK requests "Accessibility Service" and "SMS" permissions. Why is this dangerous?',
    questionKn: 'ಅಪರಿಚಿತ ಸಾಲದ ಆ್ಯಪ್ "Accessibility" ಮತ್ತು "SMS" ಅನುಮತಿ ಕೇಳಿದರೆ ಅದು ಏಕೆ ಅಪಾಯಕಾರಿ?',
    options: [
      { text: 'It speeds up your phone performance', textKn: 'ಇದು ಫೋನ್ ವೇಗವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ', isCorrect: false },
      { text: 'It can silently read all bank OTPs and capture netbanking keystrokes', textKn: 'ಇದು ಎಲ್ಲಾ ಬ್ಯಾಂಕ್ OTP ಗಳನ್ನು ಕದ್ದು ಪಾಸ್‌ವರ್ಡ್‌ಗಳನ್ನು ಕದಿಯಬಲ್ಲದು', isCorrect: true },
      { text: 'It is a mandatory Google Play requirement', textKn: 'ಇದು ಗೂಗಲ್ ಪ್ಲೇ ನ ಕಡ್ಡಾಯ ನಿಯಮ', isCorrect: false },
      { text: 'It only checks network signal strength', textKn: 'ಕೇವಲ ನೆಟ್‌ವರ್ಕ್ ಸಿಗ್ನಲ್ ಪರೀಕ್ಷಿಸುತ್ತದೆ', isCorrect: false },
    ],
    explanation: 'Accessibility services give rogue malware complete control over your screen, allowing automated reading of incoming OTPs and silent fund transfers.',
    explanationKn: 'ಅಕ್ಸೆಸಿಬಿಲಿಟಿ ಅನುಮತಿಯು ಮಾಲ್‌ವೇರ್‌ಗೆ ನಿಮ್ಮ ಪರದೆಯ ಸಂಪೂರ್ಣ ನಿಯಂತ್ರಣ ನೀಡುತ್ತದೆ ಮತ್ತು ಬ್ಯಾಂಕ್ ಒಟಿಪಿಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಕದಿಯುತ್ತದೆ.',
    difficulty: 'HARD',
  },
];
