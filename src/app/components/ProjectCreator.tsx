import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Calendar, Plus, X, Save, Users, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Partner {
  id: string;
  name: string;
  email: string;
}

interface Project {
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

export function ProjectCreator() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);
  
  // Mock partners - dans une vraie app, ça viendrait de l'API
  const [partners] = useState<Partner[]>([
    { id: '1', name: 'ONG A', email: 'contact@onga.org' },
    { id: '2', name: 'Association B', email: 'info@associationb.org' },
    { id: '3', name: 'Organisation C', email: 'hello@organisationc.org' },
  ]);

  // Récupérer les formats de rapports depuis le localStorage
  const [reportFormats] = useState(() => {
    const formats = JSON.parse(localStorage.getItem('reportFormats') || '[]');
    return formats;
  });

  const togglePartner = (partnerId: string) => {
    setSelectedPartners(prev =>
      prev.includes(partnerId)
        ? prev.filter(id => id !== partnerId)
        : [...prev, partnerId]
    );
  };

  const saveProject = () => {
    const project: Project = {
      id: Date.now().toString(),
      name: projectName,
      description: projectDescription,
      reportFormatId: selectedFormat,
      partners: selectedPartners,
      startDate,
      endDate,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    // Sauvegarder dans le localStorage pour l'instant
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    localStorage.setItem('projects', JSON.stringify([...existingProjects, project]));

    navigate('/admin');
  };

  const selectedFormatName = reportFormats.find((f: any) => f.id === selectedFormat)?.name || '';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Créer un projet</h1>
          <Button variant="outline" onClick={() => navigate('/admin')}>
            Retour
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Informations du projet
            </CardTitle>
            <CardDescription>
              Définissez les informations générales du projet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="projectName">Nom du projet</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Ex: Programme de développement rural"
              />
            </div>
            <div>
              <Label htmlFor="projectDescription">Description</Label>
              <Textarea
                id="projectDescription"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Décrivez l'objectif et le périmètre du projet"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Date de début</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="endDate">Date de fin</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Format de rapport</CardTitle>
            <CardDescription>
              Sélectionnez le format de rapport que les partenaires devront utiliser
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Choisissez un format de rapport" />
              </SelectTrigger>
              <SelectContent>
                {reportFormats.map((format: any) => (
                  <SelectItem key={format.id} value={format.id}>
                    {format.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedFormatName && (
              <div className="mt-2">
                <Badge variant="secondary">{selectedFormatName}</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Partenaires assignés
            </CardTitle>
            <CardDescription>
              Sélectionnez les partenaires qui participeront à ce projet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPartners.includes(partner.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => togglePartner(partner.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{partner.name}</h4>
                      <p className="text-sm text-gray-600">{partner.email}</p>
                    </div>
                    {selectedPartners.includes(partner.id) && (
                      <Badge variant="default">Sélectionné</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {selectedPartners.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  {selectedPartners.length} partenaire(s) sélectionné(s)
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => navigate('/admin')}>
            Annuler
          </Button>
          <Button 
            onClick={saveProject} 
            disabled={!projectName || !selectedFormat || selectedPartners.length === 0}
          >
            <Save className="w-4 h-4 mr-2" />
            Créer le projet
          </Button>
        </div>
      </div>
    </div>
  );
}
