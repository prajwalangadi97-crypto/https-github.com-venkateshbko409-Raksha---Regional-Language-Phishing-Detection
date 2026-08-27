/**
 * Omnikon / Raksha AI — Centralized API Client
 * All backend API calls go through this module.
 */

const API_BASE = '/api/v1';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const errorBody = await res.text().catch(() => 'Unknown error');
    throw new Error(`API Error ${res.status}: ${errorBody}`);
  }
  return res.json();
}

export async function apiGet<T>(path: string): Promise<T> {
  return request<T>(path);
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

// ── Typed API Functions ────────────────────────────────────

export const api = {
  // Phishing analysis
  analyzePhishing: (text: string, language?: string) =>
    apiPost<any>('/phishing/analyze', { text, language }),

  // URL scanning
  scanUrl: (url: string) =>
    apiPost<any>('/url/scan', { url }),

  // Voice forensics
  analyzeVoice: (sampleId: string) =>
    apiPost<any>('/voice/analyze', { sampleId }),

  analyzeVoiceLive: (audioBase64: string, durationSec: number, mimeType: string) =>
    apiPost<any>('/voice/analyze', { audioBase64, audioDurationSec: durationSec, recordedMimeType: mimeType }),

  // OCR Screenshot Analysis
  scanOcr: (imageBase64?: string, fileName?: string, fallbackText?: string) =>
    apiPost<any>('/ocr/scan', { image_base64: imageBase64, file_name: fileName, fallback_text: fallbackText }),

  // APK Sandbox Inspector
  inspectApk: (packageName?: string, fileName?: string, fileSizeKb?: number) =>
    apiPost<any>('/apk/inspect', { package_name: packageName, file_name: fileName, file_size_kb: fileSizeKb }),

  // Breach check
  checkBreach: (query: string, type: string = 'email') =>
    apiPost<any>('/breach/check', { query, type }),

  // Honeypot
  engageHoneypot: (personaId: string, stepIndex: number) =>
    apiPost<any>('/honeypot/engage', { personaId, stepIndex }),

  getHoneypotScript: () =>
    apiGet<any>('/honeypot/script'),

  // Incident report
  submitIncidentReport: (data: any) =>
    apiPost<any>('/incident/report', data),

  // Data endpoints
  getTelemetry: () => apiGet<any>('/telemetry/stats'),
  getDistrictThreats: () => apiGet<any>('/districts/threats'),
  getThreatFeed: () => apiGet<any>('/threats/feed'),
  getIOCs: () => apiGet<any>('/ioc'),
  getStations: () => apiGet<any>('/stations'),
  getBankFreezeNotices: () => apiGet<any>('/banks/freeze-notices'),
  getPersonas: () => apiGet<any>('/personas'),
  getPhishingPresets: () => apiGet<any>('/presets/phishing'),
};
