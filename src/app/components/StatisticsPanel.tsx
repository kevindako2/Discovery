import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function StatisticsPanel() {
  const monthlyData = [
    { month: 'Juil', soumis: 32, approuvés: 28, retard: 4 },
    { month: 'Août', soumis: 38, approuvés: 35, retard: 3 },
    { month: 'Sept', soumis: 42, approuvés: 38, retard: 4 },
    { month: 'Oct', soumis: 45, approuvés: 42, retard: 3 },
    { month: 'Nov', soumis: 48, approuvés: 45, retard: 3 },
    { month: 'Déc', soumis: 52, approuvés: 48, retard: 4 },
  ];

  const complianceData = [
    { category: 'Excellent (95-100%)', value: 45, color: '#22c55e' },
    { category: 'Bon (85-94%)', value: 35, color: '#eab308' },
    { category: 'Moyen (75-84%)', value: 15, color: '#f97316' },
    { category: 'Faible (<75%)', value: 5, color: '#ef4444' },
  ];

  const partnerPerformance = [
    { name: 'ONG Action Dév.', score: 96 },
    { name: 'Assoc. Santé Plus', score: 98 },
    { name: 'Init. Environnement', score: 94 },
    { name: 'Fond. Éducation', score: 92 },
    { name: 'Réseau Dév. Rural', score: 88 },
    { name: 'Groupe Santé', score: 91 },
    { name: 'Alliance Jeunesse', score: 87 },
    { name: 'Forum Agriculture', score: 93 },
  ];

  const aiVerificationData = [
    { month: 'Juil', complétude: 94, format: 92, cohérence: 90 },
    { month: 'Août', complétude: 95, format: 93, cohérence: 91 },
    { month: 'Sept', complétude: 96, format: 94, cohérence: 93 },
    { month: 'Oct', complétude: 97, format: 95, cohérence: 94 },
    { month: 'Nov', complétude: 97, format: 96, cohérence: 95 },
    { month: 'Déc', complétude: 98, format: 96, cohérence: 96 },
  ];

  return (
    <div className="space-y-6">
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Submissions */}
        <Card>
          <CardHeader>
            <CardTitle>Soumissions mensuelles</CardTitle>
            <CardDescription>
              Évolution des rapports sur les 6 derniers mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="soumis" fill="#003d7a" name="Soumis" />
                <Bar dataKey="approuvés" fill="#22c55e" name="Approuvés" />
                <Bar dataKey="retard" fill="#ef4444" name="En retard" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Compliance Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribution de conformité</CardTitle>
            <CardDescription>
              Répartition des scores de conformité IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={complianceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {complianceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Partner Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Performance des partenaires</CardTitle>
            <CardDescription>
              Score de conformité moyen par partenaire
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={partnerPerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="score" fill="#e94e1b" name="Score %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Verification Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Tendances de vérification IA</CardTitle>
            <CardDescription>
              Évolution des critères de validation intelligente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={aiVerificationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[85, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="complétude"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="Complétude"
                />
                <Line
                  type="monotone"
                  dataKey="format"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Format"
                />
                <Line
                  type="monotone"
                  dataKey="cohérence"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name="Cohérence"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-[#003d7a] to-[#002850] text-white">
          <CardHeader>
            <CardTitle>Taux de soumission à temps</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">87%</p>
            <p className="text-sm text-blue-200 mt-2">+5% vs mois précédent</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#e94e1b] to-[#d13d0f] text-white">
          <CardHeader>
            <CardTitle>Score moyen de conformité</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">94%</p>
            <p className="text-sm text-orange-200 mt-2">+2% vs trimestre précédent</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white">
          <CardHeader>
            <CardTitle>Temps moyen de traitement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">3.2 jours</p>
            <p className="text-sm text-green-200 mt-2">-1.5 jours grâce à l'IA</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
