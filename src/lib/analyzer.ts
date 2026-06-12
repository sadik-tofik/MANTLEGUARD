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

export async function analyzeContract(sourceCode: string): Promise<AuditReport> {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured');
  }

  try {
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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch from Groq');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const report = JSON.parse(content) as AuditReport;
      // Ensure generatedAt is set
      report.generatedAt = new Date().toISOString();
      return report;
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('AI returned invalid JSON structure');
    }
  } catch (error: any) {
    console.error('Groq Analysis Error:', error);
    throw new Error(error.message || 'Failed to analyze contract with Groq');
  }
}
