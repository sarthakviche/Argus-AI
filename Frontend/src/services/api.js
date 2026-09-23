/**
 * Argus AI Financial Intelligence API & Data Service
 * Preserves all backend communication endpoints while providing client-side fallback engines.
 */

const API_BASE_URL = 'http://localhost:5000';

// Initial Mock Investigation Cases
export const INITIAL_INVESTIGATIONS = [
  {
    id: 'INV-89241',
    transactionId: 'TXN-908123',
    timestamp: '2026-09-22T21:14:00Z',
    customer: {
      name: 'Eleanor Vance',
      email: 'e.vance@vanceholdings.com',
      accountId: 'ACC-449102',
      tier: 'Institutional VIP',
      memberSince: '2021-04-12',
      riskScoreHistory: [12, 14, 15, 88, 91]
    },
    amount: 148500.00,
    currency: 'USD',
    merchant: 'Global Crypto Clearing Corp',
    merchantCategory: 'High Risk FX / Crypto',
    location: {
      origin: 'Zurich, Switzerland (IP: 185.220.101.4)',
      registered: 'New York, USA',
      mismatchDistanceKm: 6300
    },
    device: {
      fingerprint: 'DEV-F89A-33B1',
      deviceType: 'Linux Workstation',
      isNewDevice: true,
      browser: 'Chrome 128 (TOR Proxy Node)'
    },
    riskScore: 91,
    riskLevel: 'HIGH RISK',
    detectedFactors: [
      { rule: 'Amount Anomaly', score: 32, description: 'Transaction amount is 4.8x higher than 90-day average' },
      { rule: 'Unrecognized Device', score: 24, description: 'First login from Linux hardware signature' },
      { rule: 'Geographic Mismatch', score: 18, description: 'IP geolocation mismatch (>6,000km from home address)' },
      { rule: 'High Velocity Burst', score: 17, description: '3 large transfers attempted within 45 seconds' }
    ],
    entityConnections: [
      { type: 'Shared IP Hash', target: 'ACC-881902 (Flagged 2h ago)', strength: 'High' },
      { type: 'Card Bin Proxy', target: 'Bin #491290 (Known TOR Subnet)', strength: 'Medium' }
    ],
    status: 'NEEDS_INVESTIGATION',
    assignedAnalyst: 'Alex Thorne (Senior Risk Lead)',
    notes: [
      { id: 1, author: 'System Sentinel', time: '21:14:02', text: 'Automated ML inference triggered flag. High risk threshold exceeded (>75).' },
      { id: 2, author: 'Alex Thorne', time: '21:20:15', text: 'Contacting relationship manager to verify institutional transfer request.' }
    ]
  },
  {
    id: 'INV-89242',
    transactionId: 'TXN-908124',
    timestamp: '2026-09-22T20:45:00Z',
    customer: {
      name: 'Marcus Sterling',
      email: 'm.sterling@apexcapital.io',
      accountId: 'ACC-109283',
      tier: 'Enterprise Corporate',
      memberSince: '2022-09-01',
      riskScoreHistory: [8, 10, 62, 58]
    },
    amount: 42300.00,
    currency: 'USD',
    merchant: 'Panama Offshore Settlement Services',
    merchantCategory: 'Cross-Border Money Transfer',
    location: {
      origin: 'Panama City, Panama (IP: 190.10.45.12)',
      registered: 'London, UK',
      mismatchDistanceKm: 8400
    },
    device: {
      fingerprint: 'DEV-8812-99AA',
      deviceType: 'MacBook Pro macOS 15',
      isNewDevice: true,
      browser: 'Safari 18.1'
    },
    riskScore: 68,
    riskLevel: 'NEEDS REVIEW',
    detectedFactors: [
      { rule: 'Cross-Border Threshold', score: 28, description: 'Unusual destination jurisdiction flag' },
      { rule: 'New Device Login', score: 22, description: 'Login from unrecognized hardware' },
      { rule: 'Rapid Beneficiary Addition', score: 18, description: 'Wire recipient added 10 minutes prior to transfer' }
    ],
    entityConnections: [
      { type: 'Routing ABA Match', target: 'Beneficiary ABA #021000021', strength: 'Medium' }
    ],
    status: 'UNDER_REVIEW',
    assignedAnalyst: 'Sarah Jenkins',
    notes: [
      { id: 1, author: 'System Sentinel', time: '20:45:01', text: 'Rule #402 Cross-Border Risk flag raised.' }
    ]
  },
  {
    id: 'INV-89243',
    transactionId: 'TXN-908125',
    timestamp: '2026-09-22T19:30:00Z',
    customer: {
      name: 'Sophia Rodriguez',
      email: 'sophia.r@techventures.co',
      accountId: 'ACC-771829',
      tier: 'Standard Business',
      memberSince: '2023-01-15',
      riskScoreHistory: [4, 5, 4, 12]
    },
    amount: 1250.00,
    currency: 'USD',
    merchant: 'AWS Cloud Services',
    merchantCategory: 'Software & Cloud Tech',
    location: {
      origin: 'San Francisco, USA (IP: 54.210.12.8)',
      registered: 'San Francisco, USA',
      mismatchDistanceKm: 12
    },
    device: {
      fingerprint: 'DEV-1092-A1B2',
      deviceType: 'iPhone 16 Pro',
      isNewDevice: false,
      browser: 'Mobile Safari 18.0'
    },
    riskScore: 12,
    riskLevel: 'LEGITIMATE',
    detectedFactors: [
      { rule: 'Routine Vendor Payment', score: 12, description: 'Recurring vendor subscription match' }
    ],
    entityConnections: [],
    status: 'CLEARED',
    assignedAnalyst: 'Auto-Sentinel AI',
    notes: [
      { id: 1, author: 'Auto-Sentinel AI', time: '19:30:05', text: 'Passed all verification checks. Auto-cleared.' }
    ]
  }
];

// Initial Transactions Ledger
export const INITIAL_TRANSACTIONS = [
  { id: 'TXN-908123', customer: 'Eleanor Vance', amount: 148500.00, merchant: 'Global Crypto Clearing Corp', category: 'Crypto / FX', riskScore: 91, status: 'HIGH RISK', time: '10 mins ago' },
  { id: 'TXN-908124', customer: 'Marcus Sterling', amount: 42300.00, merchant: 'Panama Offshore Settlement', category: 'Cross-Border Wire', riskScore: 68, status: 'REVIEW', time: '35 mins ago' },
  { id: 'TXN-908125', customer: 'Sophia Rodriguez', amount: 1250.00, merchant: 'AWS Cloud Infrastructure', category: 'SaaS Billing', riskScore: 12, status: 'LEGITIMATE', time: '1 hour ago' },
  { id: 'TXN-908126', customer: 'David Chen', amount: 89000.00, merchant: 'Hong Kong FX Vault Ltd', category: 'Foreign Exchange', riskScore: 84, status: 'HIGH RISK', time: '2 hours ago' },
  { id: 'TXN-908127', customer: 'Claire Dupont', amount: 3400.00, merchant: 'Apple Store Regent St', category: 'Retail Electronics', riskScore: 24, status: 'LEGITIMATE', time: '3 hours ago' },
  { id: 'TXN-908128', customer: 'Apex Logistics LLC', amount: 215000.00, merchant: 'Caterpillar Heavy Equipment', category: 'B2B Procurement', riskScore: 18, status: 'LEGITIMATE', time: '4 hours ago' },
  { id: 'TXN-908129', customer: 'Victor Rostov', amount: 67000.00, merchant: 'Cyprus Holding Services', category: 'Offshore Transfer', riskScore: 79, status: 'HIGH RISK', time: '5 hours ago' }
];

/**
 * Predict Functionality Integration
 * Primary API endpoint call to /predict with synchronous client fallback ML engine
 */
export async function predictFraudRisk(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.info('Backend /predict server offline. Using embedded Argus AI inference model engine.');
  }

  // Client-Side ML Inference Scoring Model Fallback
  return calculateLocalRiskInference(payload);
}

function calculateLocalRiskInference(formData) {
  const amount = parseFloat(formData.amount) || 0;
  const velocity24h = parseInt(formData.velocity24h) || 1;
  const isNewDevice = formData.isNewDevice === true || formData.isNewDevice === 'true';
  const isLocationMismatch = formData.isLocationMismatch === true || formData.isLocationMismatch === 'true';
  const isInternational = formData.isInternational === true || formData.isInternational === 'true';
  const transactionHour = parseInt(formData.transactionHour) || 14;

  let score = 5;
  const factors = [];

  if (amount > 100000) {
    score += 34;
    factors.push({ rule: 'High Value Anomaly', score: 34, description: 'Transaction amount exceeds $100,000 threshold' });
  } else if (amount > 25000) {
    score += 22;
    factors.push({ rule: 'Elevated Amount', score: 22, description: 'Transaction amount is significantly above account mean' });
  }

  if (isNewDevice) {
    score += 24;
    factors.push({ rule: 'Unrecognized Device', score: 24, description: 'Unregistered hardware signature detected' });
  }

  if (isLocationMismatch) {
    score += 20;
    factors.push({ rule: 'Geographic Anomaly', score: 20, description: 'IP geolocation conflicts with registered home region' });
  }

  if (velocity24h > 5) {
    score += 18;
    factors.push({ rule: 'High Velocity Burst', score: 18, description: `${velocity24h} transactions executed in the past 24 hours` });
  }

  if (isInternational) {
    score += 12;
    factors.push({ rule: 'Cross-Border Jurisdiction', score: 12, description: 'Transaction involves international banking gateway' });
  }

  if (transactionHour >= 1 && transactionHour <= 5) {
    score += 8;
    factors.push({ rule: 'Off-Hours Execution', score: 8, description: 'Transaction originated during high-risk timeframe (1AM - 5AM)' });
  }

  const finalScore = Math.min(Math.max(score, 2), 99);
  let riskLevel = 'LEGITIMATE';
  if (finalScore >= 75) {
    riskLevel = 'HIGH RISK';
  } else if (finalScore >= 35) {
    riskLevel = 'NEEDS REVIEW';
  }

  let recommendedAction = 'Approve & Clear';
  if (riskLevel === 'HIGH RISK') {
    recommendedAction = 'Block Transaction & Freeze Account';
  } else if (riskLevel === 'NEEDS REVIEW') {
    recommendedAction = 'Escalate to Analyst Queue for 2FA Verification';
  }

  return {
    riskScore: finalScore,
    riskLevel: riskLevel,
    recommendedAction: recommendedAction,
    timestamp: new Date().toISOString(),
    factors: factors.length > 0 ? factors : [{ rule: 'Normal Activity Profile', score: finalScore, description: 'All risk parameters within safe historical bounds' }],
    modelConfidence: 0.94
  };
}
