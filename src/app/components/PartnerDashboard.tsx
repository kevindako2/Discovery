import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import {
  FileText,
  Upload,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  LogOut,
  Bell,
  Download,
  Plus,
  Bot,
  Settings,
  User,
} from 'lucide-react';
import { SubmitReportForm } from '@/app/components/SubmitReportForm';
import { MyReportsTable } from '@/app/components/MyReportsTable';
import { AIAssistant } from '@/app/components/AIAssistant';
import { useNavigate } from 'react-router-dom';

interface PartnerDashboardProps {
  onLogout: () => void;
}

export function PartnerDashboard({ onLogout }: PartnerDashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  // Mock data
  const partnerStats = {
    pendingReports: 3,
    submittedReports: 28,
    approvedReports: 24,
    nextDeadline: '25 Janvier 2026',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#e94e1b] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#e94e1b] text-xl font-bold">L</span>
              </div>
              <div>
                <h1 className="text-xl">Luxdev Reporting Platform</h1>
                <p className="text-sm text-orange-100">Espace Partenaire</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-white hover:bg-[#d13d0f]">
                <Bell className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-[#d13d0f]"
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
            <TabsTrigger value="submit">Soumettre un rapport</TabsTrigger>
            <TabsTrigger value="myreports">Mes rapports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-[#e94e1b]">
                <CardHeader className="pb-3">
                  <CardDescription>En attente</CardDescription>
                  <CardTitle className="text-3xl">{partnerStats.pendingReports}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#e94e1b]" />
                    <span className="text-sm text-muted-foreground">À compléter</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <CardDescription>Soumis</CardDescription>
                  <CardTitle className="text-3xl">{partnerStats.submittedReports}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-muted-foreground">En révision</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-3">
                  <CardDescription>Approuvés</CardDescription>
                  <CardTitle className="text-3xl">{partnerStats.approvedReports}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-muted-foreground">Validés</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader className="pb-3">
                  <CardDescription>Prochaine échéance</CardDescription>
                  <CardTitle className="text-lg">{partnerStats.nextDeadline}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-muted-foreground">5 jours restants</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notifications and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications et rappels</CardTitle>
                  <CardDescription>Alertes automatiques du système</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Rapport Q4 2025 à soumettre</p>
                      <p className="text-xs text-muted-foreground">
                        Échéance dans 5 jours - 25 Janvier 2026
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Nouveau template disponible</p>
                      <p className="text-xs text-muted-foreground">
                        Format harmonisé 2026 disponible au téléchargement
                      </p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Rapport Q3 2025 approuvé</p>
                      <p className="text-xs text-muted-foreground">
                        Validation complète - Conforme à 98%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                  <CardDescription>Gérer vos rapports efficacement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start bg-[#e94e1b] hover:bg-[#d13d0f]"
                    onClick={() => setActiveTab('submit')}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Soumettre un nouveau rapport
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-5 h-5 mr-2" />
                    Télécharger le template
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-5 h-5 mr-2" />
                    Voir mes rapports en attente
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* AI Compliance Check */}
            <Card>
              <CardHeader>
                <CardTitle>Vérification IA de conformité</CardTitle>
                <CardDescription>
                  Analyse intelligente de vos dernières soumissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Score de conformité moyen</span>
                    <span className="font-medium">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Données complètes</p>
                    <p className="text-2xl font-semibold text-green-600">98%</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tous les champs requis remplis
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Format validé</p>
                    <p className="text-2xl font-semibold text-blue-600">94%</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Conforme aux standards
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Cohérence</p>
                    <p className="text-2xl font-semibold text-yellow-600">96%</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Données vérifiées
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submit Report Tab */}
          <TabsContent value="submit">
            <SubmitReportForm />
          </TabsContent>

          {/* My Reports Tab */}
          <TabsContent value="myreports">
            <Card>
              <CardHeader>
                <CardTitle>Mes rapports</CardTitle>
                <CardDescription>
                  Historique complet de vos soumissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MyReportsTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
