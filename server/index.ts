import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Données mockées (remplacer par une vraie base de données)
let users = [
  { id: '1', email: 'admin@luxdev.org', password: 'admin123', role: 'admin', name: 'Admin User' },
  { id: '2', email: 'partner@luxdev.org', password: 'partner123', role: 'partner', name: 'Partner User' },
];

let reports = [
  {
    id: '1',
    title: 'Rapport mensuel - Janvier 2026',
    partnerId: '2',
    status: 'pending',
    submittedAt: '2026-01-15T10:00:00Z',
    content: { summary: 'Activités du mois...', kpis: [] }
  },
];

let projects = [
  {
    id: '1',
    name: 'Programme de développement rural',
    description: 'Projet pilote pour le développement rural',
    reportFormatId: '1',
    partners: ['2'],
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'active',
    createdAt: '2026-01-01T00:00:00Z'
  },
];

let reportFormats = [
  {
    id: '1',
    name: 'Rapport mensuel standard',
    description: 'Format de rapport mensuel pour tous les projets',
    fields: [
      { id: '1', name: 'Résumé', type: 'textarea', required: true },
      { id: '2', name: 'KPIs', type: 'number', required: true },
      { id: '3', name: 'Date', type: 'date', required: true }
    ],
    createdAt: '2026-01-01T00:00:00Z'
  }
];

// Routes d'authentification
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Retourner sans le mot de passe
    const { password, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } else {
    res.status(401).json({ success: false, message: 'Identifiants invalides' });
  }
});

// Routes pour les rapports
app.get('/api/reports', (req, res) => {
  res.json(reports);
});

app.post('/api/reports', (req, res) => {
  const newReport = {
    id: Date.now().toString(),
    ...req.body,
    submittedAt: new Date().toISOString(),
    status: 'pending'
  };
  reports.push(newReport);
  res.json(newReport);
});

app.put('/api/reports/:id', (req, res) => {
  const { id } = req.params;
  const reportIndex = reports.findIndex(r => r.id === id);
  
  if (reportIndex !== -1) {
    reports[reportIndex] = { ...reports[reportIndex], ...req.body };
    res.json(reports[reportIndex]);
  } else {
    res.status(404).json({ message: 'Rapport non trouvé' });
  }
});

// Routes pour les projets
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.post('/api/projects', (req, res) => {
  const newProject = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  projects.push(newProject);
  res.json(newProject);
});

// Routes pour les formats de rapports
app.get('/api/report-formats', (req, res) => {
  res.json(reportFormats);
});

app.post('/api/report-formats', (req, res) => {
  const newFormat = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  reportFormats.push(newFormat);
  res.json(newFormat);
});

// Routes pour les utilisateurs
app.get('/api/users', (req, res) => {
  // Retourner les utilisateurs sans les mots de passe
  const usersWithoutPasswords = users.map(({ password, ...user }) => user);
  res.json(usersWithoutPasswords);
});

// Route pour l'IA - Analyse de rapports
app.post('/api/ai/analyze-report', (req, res) => {
  const { content } = req.body;
  
  // Simulation d'analyse IA
  const analysis = {
    sentiment: 'positif',
    keyPoints: [
      'Progression satisfaisante des activités',
      'Objectifs partiels atteints',
      'Nécessite plus de détails sur les KPIs'
    ],
    score: 85,
    recommendations: [
      'Ajouter des données quantitatives précises',
      'Inclure des témoignages de bénéficiaires',
      'Préciser les défis rencontrés'
    ],
    summary: 'Le rapport montre une bonne progression mais nécessite plus de détails quantitatifs pour une évaluation complète.'
  };
  
  res.json(analysis);
});

// Route pour l'IA - Génération de rapports
app.post('/api/ai/generate-report', (req, res) => {
  const { projectType, period, keyData } = req.body;
  
  // Simulation de génération IA
  const generatedContent = {
    title: `Rapport ${period} - ${projectType}`,
    summary: `Ce rapport présente les activités réalisées durant la période ${period}. Les objectifs principaux ont été atteints avec un taux de réussite de 85%.`,
    sections: [
      {
        title: 'Introduction',
        content: 'Le projet a démarré selon le plan prévu avec les partenaires identifiés.'
      },
      {
        title: 'Activités principales',
        content: 'Formation des bénéficiaires, mise en place des infrastructures, suivi des indicateurs.'
      },
      {
        title: 'Résultats obtenus',
        content: `${keyData.beneficiaries} bénéficiaires formés, ${keyData.activities} activités complétées.`
      }
    ],
    conclusion: 'Les résultats sont encourageants et justifient la poursuite du projet selon le calendrier établi.'
  };
  
  res.json(generatedContent);
});

// Servir les fichiers statiques du frontend en production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
