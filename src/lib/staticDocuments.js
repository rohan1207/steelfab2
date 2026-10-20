const CERT_BASE = '/Certificates-20261012T061751Z-1-001/Certificates'
const DATA_BASE = '/Datasheet-20261012T061830Z-1-001/Datasheet'
const POLICY_BASE = '/Policy-20261012T061849Z-1-001/Policy'

/** Local public documents — Certificates, Datasheet, Policy only (no brochure/catalog). */
export const STATIC_DOCUMENTS = [
  // Certificates (PDF)
  { id: 'cert-asme', type: 'Certificate', title: 'ASME Certificate — 2025', file: `${CERT_BASE}/ASME CERTIFICATE - 2025.pdf`, format: 'pdf' },
  { id: 'cert-incorporation', type: 'Certificate', title: 'Certificate of Incorporation', file: `${CERT_BASE}/CERTIFICATE OF INCORPORATION.pdf`, format: 'pdf' },
  { id: 'cert-gst', type: 'Certificate', title: 'GST Registration Certificate', file: `${CERT_BASE}/GST Registration Certificate - update new.pdf`, format: 'pdf' },
  { id: 'cert-iec', type: 'Certificate', title: 'IEC Updated Certificate', file: `${CERT_BASE}/IEC UPDATED CERTIFICATE.pdf`, format: 'pdf' },
  { id: 'cert-iso', type: 'Certificate', title: 'ISO Certificate (valid to 24.02.2027)', file: `${CERT_BASE}/ISO CERTIFICATE 24.02.2027.pdf`, format: 'pdf' },
  { id: 'cert-mpcb', type: 'Certificate', title: 'MPCB Consent Certificate (up to 2029)', file: `${CERT_BASE}/MPCB CONSENT CERTIFICATE UP TO 2029.pdf`, format: 'pdf' },
  { id: 'cert-msme', type: 'Certificate', title: 'MSME — Udyam Registration Certificate', file: `${CERT_BASE}/MSME - Udyam Registration Certificate 26-27.pdf`, format: 'pdf' },
  { id: 'cert-nb', type: 'Certificate', title: 'National Board Certificate', file: `${CERT_BASE}/National Board Certificate.pdf`, format: 'pdf' },
  { id: 'cert-nsic', type: 'Certificate', title: 'NSIC Renewal Certificate 2024–26', file: `${CERT_BASE}/NSIC RENEWAL CERTIFICATE  -2024-26.pdf`, format: 'pdf' },
  { id: 'cert-wm-dealer', type: 'Certificate', title: 'Weights & Measures — Dealer (Prover Tanks, to 2035)', file: `${CERT_BASE}/WEIGHTS & MEASURE - DEALER 2035.pdf`, format: 'pdf' },
  { id: 'cert-wm-mfg', type: 'Certificate', title: 'Weights & Measures — Manufacture (Prover Tanks, to 2035)', file: `${CERT_BASE}/WEIGHTS & MEASURE - MANUFACTURE 2035.pdf`, format: 'pdf' },
  { id: 'cert-wm-repair', type: 'Certificate', title: 'Weights & Measures — Repair (Prover Tanks, to 2035)', file: `${CERT_BASE}/WEIGHTS & MEASURE - REPAIR 2035.pdf`, format: 'pdf' },

  // Datasheets (PDF previews)
  { id: 'ds-prover', type: 'Datasheet', title: 'Data Sheet — Prover Tank', file: `${DATA_BASE}/S&S F 11 REV.01 Data Sheet -Prover Tank.pdf`, format: 'pdf' },
  { id: 'ds-rotary', type: 'Datasheet', title: 'Data Sheet — Rotary Joint', file: `${DATA_BASE}/S&S F 13 REV.01 Data Sheet- Rotary Joint.pdf`, format: 'pdf' },
  { id: 'ds-loading', type: 'Datasheet', title: 'Data Sheet — Loading Arm', file: `${DATA_BASE}/SS F 03 REV. 01 Data Sheet - Loading Arm.pdf`, format: 'pdf' },
  { id: 'ds-floating', type: 'Datasheet', title: 'Data Sheet — Floating Suction', file: `${DATA_BASE}/SS F 12 REV.01 Data Sheet -Floating Suction.pdf`, format: 'pdf' },
  { id: 'ds-swivel', type: 'Datasheet', title: 'Data Sheet — Swivel Joint', file: `${DATA_BASE}/SS F 13 REV.01 Data Sheet- Swivel  Joint.pdf`, format: 'pdf' },
  { id: 'ds-storage', type: 'Datasheet', title: 'Data Sheet — Storage Tank', file: `${DATA_BASE}/SS F 14 REV.01 Data Sheet -StorageTank.pdf`, format: 'pdf' },

  // Policy (images + PDF) — skip Word originals / Client Logos
  { id: 'pol-hr', type: 'Policy', title: 'HR Policy', file: `${POLICY_BASE}/HR Policy.png`, format: 'image' },
  { id: 'pol-quality', type: 'Policy', title: 'Quality Policy', file: `${POLICY_BASE}/Quality Policy.png`, format: 'image' },
  { id: 'pol-vision', type: 'Policy', title: 'Vision, Mission & Core Values', file: `${POLICY_BASE}/Vision-Mission-Core Value.png`, format: 'image' },
  { id: 'pol-visitor', type: 'Policy', title: 'Visitor Safety Policy', file: `${POLICY_BASE}/Visitor Safety Policy.png`, format: 'image' },
  { id: 'pol-ehs', type: 'Policy', title: 'EHS Policy', file: `${POLICY_BASE}/EHS Policy.pdf`, format: 'pdf' },
  { id: 'pol-1', type: 'Policy', title: 'Company Policy', file: `${POLICY_BASE}/1.png`, format: 'image' },
  { id: 'pol-6', type: 'Policy', title: 'Company Policy (continued)', file: `${POLICY_BASE}/6.png`, format: 'image' },
]

export const DOC_FILTERS = ['All', 'Certificate', 'Datasheet', 'Policy']

export function encodeDocUrl(path) {
  return path
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/')
    .replace(/%2F/gi, '/')
}
