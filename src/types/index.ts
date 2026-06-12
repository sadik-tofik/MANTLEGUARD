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
  };
  generatedAt: string;
}

export interface AnalysisState {
  status: 'idle' | 'analyzing' | 'done' | 'error';
  step?: number;
  progress?: string;
  report?: AuditReport | null;
  error?: string;
}
