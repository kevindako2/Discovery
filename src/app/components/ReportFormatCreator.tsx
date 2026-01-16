import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Plus, X, Save, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Field {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'textarea' | 'select';
  required: boolean;
  options?: string[];
}

export function ReportFormatCreator() {
  const navigate = useNavigate();
  const [formatName, setFormatName] = useState('');
  const [formatDescription, setFormatDescription] = useState('');
  const [fields, setFields] = useState<Field[]>([]);
  const [newField, setNewField] = useState<Partial<Field>>({
    name: '',
    type: 'text',
    required: false,
  });

  const addField = () => {
    if (newField.name) {
      const field: Field = {
        id: Date.now().toString(),
        name: newField.name,
        type: newField.type as Field['type'],
        required: newField.required || false,
        options: newField.type === 'select' ? [] : undefined,
      };
      setFields([...fields, field]);
      setNewField({ name: '', type: 'text', required: false });
    }
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const saveFormat = () => {
    const format = {
      id: Date.now().toString(),
      name: formatName,
      description: formatDescription,
      fields,
      createdAt: new Date().toISOString(),
    };
    
    // Sauvegarder dans le localStorage pour l'instant
    const existingFormats = JSON.parse(localStorage.getItem('reportFormats') || '[]');
    localStorage.setItem('reportFormats', JSON.stringify([...existingFormats, format]));
    
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Créer un format de rapport</h1>
          <Button variant="outline" onClick={() => navigate('/admin')}>
            Retour
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Informations du format
            </CardTitle>
            <CardDescription>
              Définissez les informations générales du format de rapport
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="formatName">Nom du format</Label>
              <Input
                id="formatName"
                value={formatName}
                onChange={(e) => setFormatName(e.target.value)}
                placeholder="Ex: Rapport mensuel d'activités"
              />
            </div>
            <div>
              <Label htmlFor="formatDescription">Description</Label>
              <Textarea
                id="formatDescription"
                value={formatDescription}
                onChange={(e) => setFormatDescription(e.target.value)}
                placeholder="Décrivez l'objectif de ce format de rapport"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Ajouter un champ</CardTitle>
            <CardDescription>
              Définissez les champs qui composeront ce format de rapport
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="fieldName">Nom du champ</Label>
                <Input
                  id="fieldName"
                  value={newField.name}
                  onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                  placeholder="Ex: Titre"
                />
              </div>
              <div>
                <Label htmlFor="fieldType">Type</Label>
                <Select
                  value={newField.type}
                  onValueChange={(value) => setNewField({ ...newField, type: value as Field['type'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Texte</SelectItem>
                    <SelectItem value="number">Nombre</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="textarea">Texte long</SelectItem>
                    <SelectItem value="select">Sélection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="fieldRequired"
                  checked={newField.required}
                  onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                />
                <Label htmlFor="fieldRequired">Obligatoire</Label>
              </div>
              <div className="flex items-end">
                <Button onClick={addField} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {fields.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Champs du format</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {fields.map((field) => (
                  <div key={field.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{field.name}</span>
                      <Badge variant="secondary">{field.type}</Badge>
                      {field.required && <Badge variant="destructive">Obligatoire</Badge>}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeField(field.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => navigate('/admin')}>
            Annuler
          </Button>
          <Button onClick={saveFormat} disabled={!formatName || fields.length === 0}>
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder le format
          </Button>
        </div>
      </div>
    </div>
  );
}
