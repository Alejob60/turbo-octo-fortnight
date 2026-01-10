// Tipos de datos para Orbital Prime

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'active' | 'inactive' | 'training';
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  type: 'data-audit' | 'vision' | 'autonomous';
  status: 'active' | 'inactive' | 'processing';
  lastRun: string;
  metrics: {
    accuracy: number;
    efficiency: number;
    reliability: number;
  };
}

export interface AnalyticsData {
  totalAgents: number;
  activeAgents: number;
  modelsTrained: number;
  dataProcessed: number;
  efficiencyScore: number;
  lastUpdated: string;
}

export interface DataAuditResult {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'failed';
  startTime: string;
  endTime: string;
  findings: AuditFinding[];
  summary: string;
}

export interface AuditFinding {
  id: string;
  type: 'anomaly' | 'pattern' | 'opportunity' | 'risk';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendation: string;
  dataPoints: number;
}

export interface VisionData {
  id: string;
  name: string;
  type: 'logistics' | 'quality-control' | 'surveillance';
  status: 'processed' | 'processing' | 'failed';
  processedImages: number;
  insights: VisionInsight[];
  accuracy: number;
}

export interface VisionInsight {
  id: string;
  type: 'anomaly' | 'pattern' | 'trend' | 'optimization';
  description: string;
  confidence: number;
  location: string;
  metadata: Record<string, any>;
}

export interface OrbitalDashboardData {
  analytics: AnalyticsData;
  recentAgents: Agent[];
  recentModels: AIModel[];
  recentAudits: DataAuditResult[];
  recentVision: VisionData[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
  userId: string;
}