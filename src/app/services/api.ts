const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'partner';
  name: string;
}

export interface Report {
  id: string;
  title: string;
  partnerId: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  content: any;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  reportFormatId: string;
  partners: string[];
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'archived';
  createdAt: string;
}

export interface ReportFormat {
  id: string;
  name: string;
  description: string;
  fields: Field[];
  createdAt: string;
}

export interface Field {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'textarea' | 'select';
  required: boolean;
  options?: string[];
}

export interface AIAnalysis {
  sentiment: string;
  keyPoints: string[];
  score: number;
  recommendations: string[];
  summary: string;
}

class ApiService {
  // Authentification
  async login(email: string, password: string): Promise<{ success: boolean; user?: User; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return await response.json();
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return { success: false, message: 'Erreur de connexion au serveur' };
    }
  }

  // Rapports
  async getReports(): Promise<Report[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reports`);
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des rapports:', error);
      return [];
    }
  }

  async createReport(reportData: Partial<Report>): Promise<Report | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData),
      });
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la création du rapport:', error);
      return null;
    }
  }

  async updateReport(id: string, reportData: Partial<Report>): Promise<Report | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reports/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData),
      });
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rapport:', error);
      return null;
    }
  }

  // Projets
  async getProjects(): Promise<Project[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`);
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
      return [];
    }
  }

  async createProject(projectData: Partial<Project>): Promise<Project | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
      return null;
    }
  }

  // Formats de rapports
  async getReportFormats(): Promise<ReportFormat[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/report-formats`);
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des formats:', error);
      return [];
    }
  }

  async createReportFormat(formatData: Partial<ReportFormat>): Promise<ReportFormat | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/report-formats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formatData),
      });
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la création du format:', error);
      return null;
    }
  }

  // Utilisateurs
  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`);
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      return [];
    }
  }

  // Services IA
  async analyzeReport(content: any): Promise<AIAnalysis | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/ai/analyze-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de l\'analyse IA:', error);
      return null;
    }
  }

  async generateReport(projectType: string, period: string, keyData: any): Promise<any | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/ai/generate-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectType, period, keyData }),
      });
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la génération IA:', error);
      return null;
    }
  }
}

export const apiService = new ApiService();
