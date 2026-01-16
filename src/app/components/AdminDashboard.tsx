import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import {
  BarChart3,
  Users,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Bell,
  LogOut,
  Settings,
  Download,
  Send,
  Plus,
  Bot,
} from 'lucide-react';
import { ReportsTable } from '@/app/components/ReportsTable';
import { PartnersTable } from '@/app/components/PartnersTable';
import { StatisticsPanel } from '@/app/components/StatisticsPanel';
import { AIAssistant } from '@/app/components/AIAssistant';
import { ProjectsTable } from '@/app/components/ProjectsTable';
import { ReportFormatsTable } from '@/app/components/ReportFormatsTable';
import { useNavigate } from 'react-router-dom';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalReports: 248,
    pendingReports: 32,
    completedReports: 216,
    activePartners: 45,
    complianceRate: 94,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003d7a] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#003d7a] text-xl font-bold">L</span>
              </div>
              <div>
                <h1 className="text-xl">Luxdev Reporting Platform</h1>
                <p className="text-sm text-blue-200">Administration</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-white hover:bg-[#002850]" onClick={() => navigate('/admin/report-formats')}>
                <Plus className="w-5 h-5 mr-2" />
                Formats
              </Button>
              <Button variant="ghost" className="text-white hover:bg-[#002850]" onClick={() => navigate('/settings')}>
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" className="text-white hover:bg-[#002850]" onClick={() => navigate('/account')}>
                <Users className="w-5 h-5" />
              </Button>
              <Button variant="ghost" className="text-white hover:bg-[#002850]">
                <Bell className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-[#002850]"
                onClick={onLogout}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white shadow-sm p-1">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="reports" className="relative">
              Rapports
              {stats.pendingReports > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {stats.pendingReports}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="partners">Partenaires</TabsTrigger>
            <TabsTrigger value="projects">Projets</TabsTrigger>
            <TabsTrigger value="formats">Formats</TabsTrigger>
            <TabsTrigger value="statistics">Statistiques</TabsTrigger>
            <TabsTrigger value="ai">Assistant IA</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-[#003d7a]">
                <CardHeader className="pb-3">
                  <CardDescription>Total Rapports</CardDescription>
                  <CardTitle className="text-3xl">{stats.totalReports}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12% ce mois</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[#e94e1b]">
                <CardHeader className="pb-3">
                  <CardDescription>En attente</CardDescription>
                  <CardTitle className="text-3xl">{stats.pendingReports}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#e94e1b]" />
                    <span className="text-sm text-muted-foreground">Action requise</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-3">
                  <CardDescription>Complétés</CardDescription>
                  <CardTitle className="text-3xl">{stats.completedReports}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-muted-foreground">Validés</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <CardDescription>Partenaires actifs</CardDescription>
                  <CardTitle className="text-3xl">{stats.activePartners}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-muted-foreground">Organisations</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Compliance and AI Verification */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Taux de conformité IA</CardTitle>
                  <CardDescription>
                    Vérification intelligente des données
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Conformité globale</span>
                      <span className="font-medium">{stats.complianceRate}%</span>
                    </div>
                    <Progress value={stats.complianceRate} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Données complètes</p>
                      <p className="text-2xl font-semibold text-green-600">96%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Formats validés</p>
                      <p className="text-2xl font-semibold text-green-600">92%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alertes et rappels</CardTitle>
                  <CardDescription>Gestion automatique du cycle</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">8 rapports en retard</p>
                      <p className="text-xs text-muted-foreground">Échéance dépassée</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Send className="w-4 h-4 mr-2" />
                      Relancer
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">15 rappels envoyés</p>
                      <p className="text-xs text-muted-foreground">Dernières 24h</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">24 rapports soumis</p>
                      <p className="text-xs text-muted-foreground">Cette semaine</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Rapports récents</CardTitle>
                    <CardDescription>
                      Dernières soumissions et validations
                    </CardDescription>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Exporter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ReportsTable viewMode="compact" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gestion des rapports</CardTitle>
                    <CardDescription>
                      Tous les rapports du système
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Exporter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ReportsTable viewMode="full" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Partners Tab */}
          <TabsContent value="partners">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des partenaires</CardTitle>
                <CardDescription>
                  Organisations et points de contact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PartnersTable />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gestion des projets</CardTitle>
                    <CardDescription>
                      Créez et gérez les projets pour les partenaires
                    </CardDescription>
                  </div>
                  <Button onClick={() => navigate('/admin/projects')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau projet
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ProjectsTable 
                  onView={(project: any) => console.log('View project:', project)}
                  onEdit={(project: any) => console.log('Edit project:', project)}
                  onDelete={(projectId: any) => console.log('Delete project:', projectId)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Formats Tab */}
          <TabsContent value="formats">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gestion des formats de rapport</CardTitle>
                    <CardDescription>
                      Créez et gérez les formats de rapport pour les projets
                    </CardDescription>
                  </div>
                  <Button onClick={() => navigate('/admin/report-formats')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau format
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ReportFormatsTable 
                  onView={(format: any) => console.log('View format:', format)}
                  onEdit={(format: any) => console.log('Edit format:', format)}
                  onDelete={(formatId: any) => console.log('Delete format:', formatId)}
                  onDuplicate={(format: any) => console.log('Duplicate format:', format)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="ai">
            <AIAssistant type="admin" />
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics">
            <StatisticsPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
