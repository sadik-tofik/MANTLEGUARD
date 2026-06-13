import { AuditReport } from '@/types';

const SYSTEM_PROMPT = `
You are MantleGuard, a world-class smart contract security auditor specializing in the Mantle Network ecosystem.
Your task is to perform a deep security audit of the provided Solidity source code.

GUIDELINES:
1. Be extremely thorough. Identify Reentrancy, Overflow, Access Control issues, Front-running, etc.
2. Provide Mantle-specific optimizations (mETH, USDY, gas efficiency).
3. YOU MUST RESPOND ONLY WITH A VALID JSON OBJECT.
4. If there are no issues, return an empty issues array but complete the rest of the object.

THE JSON STRUCTURE MUST BE EXACTLY:
{
  "contractName": "string",
  "overallSummary": "string",
  "riskScore": number (0-100),
  "stats": {
    "critical": number,
    "high": number,
    "medium": number,
    "low": number,
    "totalIssues": number,
    "gasOptCount": number,
    "linesOfCode": number
  },
  "issues": [
    {
      "id": "string",
      "severity": "critical" | "high" | "medium" | "low",
      "title": "string",
      "description": "string",
      "recommendation": "string",
      "category": "string",
      "line": number,
      "codeSnippet": "string",
      "mantleSpecific": boolean
    }
  ],
  "gasOptimizations": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "estimatedSavings": "string",
      "priority": "high" | "medium" | "low",
      "before": "string",
      "after": "string"
    }
  ],
  "mantleInsights": [
    {
      "id": "string",
      "type": "opportunity" | "warning" | "info",
      "title": "string",
      "description": "string",
      "recommendation": "string"
    }
  ],
  "generatedAt": "ISO Date String"
}
`;

async function tryGroq(sourceCode: string): Promise<AuditReport> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY not set');

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Audit this contract:\n\n${sourceCode}` }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    }),
  });

  if (!response.ok) throw new Error('Groq failed');
  const data = await response.json();
  const report = JSON.parse(data.choices[0].message.content) as AuditReport;
  report.provider = 'groq';
  return report;
}

async function tryGemini(sourceCode: string): Promise<AuditReport> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not set');

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts: [{ text: "Audit this contract: " + sourceCode }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.2 }
    }),
  });

  if (!response.ok) throw new Error('Gemini failed');
  const data = await response.json();
  const report = JSON.parse(data.candidates[0].content.parts[0].text) as AuditReport;
  report.provider = 'gemini';
  return report;
}

async function tryNvidia(sourceCode: string): Promise<AuditReport> {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) throw new Error('NVIDIA_API_KEY not set');

  const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meta/llama-3.1-70b-instruct',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Audit this contract:\n\n${sourceCode}` }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    }),
  });

  if (!response.ok) throw new Error('Nvidia failed');
  const data = await response.json();
  const report = JSON.parse(data.choices[0].message.content) as AuditReport;
  report.provider = 'nvidia';
  return report;
}

export async function analyzeContract(sourceCode: string): Promise<AuditReport> {
  try {
    return await tryGroq(sourceCode);
  } catch (e) {
    console.warn('Groq failed, trying Gemini...', e);
    try {
      return await tryGemini(sourceCode);
    } catch (e2) {
      console.warn('Gemini failed, trying Nvidia...', e2);
      try {
        return await tryNvidia(sourceCode);
      } catch (e3) {
        console.error('All AI providers failed');
        throw new Error('All AI providers (Groq, Gemini, NVIDIA) failed. Please try again later.');
      }
    }
  }
}
