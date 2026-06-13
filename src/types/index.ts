export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface Issue {
  id: string;
  title: string;
  severity: Severity;
  category: string;
  description: string;
  line?: number;
  lineEnd?: number;
  codeSnippet?: string;
  recommendation: string;
  gasImpact?: string;
  mantleSpecific?: boolean;
}

export interface GasOptimization {
  id: string;
  title: string;
  description: string;
  line?: number;
  before?: string;
  after?: string;
  estimatedSavings: string;
  priority: 'high' | 'medium' | 'low';
}

export interface MantleInsight {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'warning' | 'info';
  recommendation: string;
}

export interface AuditReport {
  contractName: string;
  riskScore: number;
  overallSummary: string;
  issues: Issue[];
  gasOptimizations: GasOptimization[];
  mantleInsights: MantleInsight[];
  stats: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
    totalIssues: number;
    linesOfCode: number;
    gasOptCount: number;
  };
  onChain?: {
    auditId: string;
    txHash: string;
    contractHash: string;
    reportHash: string;
    blockNumber: string;
    explorerUrl: string;
    timestamp?: number;
    submitter?: string;
  };
  generatedAt: string;
  provider?: 'groq' | 'gemini' | 'nvidia';
}

export interface AnalysisState {
  status: 'idle' | 'analyzing' | 'done' | 'error';
  step?: number;
  progress?: string;
  report?: AuditReport | null;
  error?: string;
}

export interface OnChainAuditRecord {
  auditId: string;
  contractHash: string;
  reportHash: string;
  riskScore: number;
  issueCount: number;
  criticalCount: number;
  timestamp: number;
  submitter: string;
  blockNumber: string;
  txHash: string;
  explorerUrl: string;
}

export interface AuditHistoryItem {
  auditId: string;
  contractHash: string;
  riskScore: number;
  issueCount: number;
  criticalCount: number;
  timestamp: number;
  submitter: string;
  txHash: string;
}

export interface VerifyResult {
  found: boolean;
  record?: OnChainAuditRecord;
}

export interface LandingStats {
  totalAudits: number;
  totalVulnerabilities: number;
  avgRiskScore: number;
  totalCritical: number;
}
