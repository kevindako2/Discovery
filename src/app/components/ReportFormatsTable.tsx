import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  FileText, 
  Eye,
  Copy
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface ReportFormat {
  id: string;
  name: string;
  description: string;
  fields: Field[];
  createdAt: string;
}

interface Field {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'textarea' | 'select';
  required: boolean;
  options?: string[];
}

interface ReportFormatsTableProps {
  onEdit?: (format: ReportFormat) => void;
  onDelete?: (formatId: string) => void;
  onView?: (format: ReportFormat) => void;
  onDuplicate?: (format: ReportFormat) => void;
}

export function ReportFormatsTable({ onEdit, onDelete, onView, onDuplicate }: ReportFormatsTableProps) {
  const [formats] = useState<ReportFormat[]>(() => {
    // Récupérer les formats depuis le localStorage ou utiliser des données mock
    const savedFormats = JSON.parse(localStorage.getItem('reportFormats') || '[]');
    
    if (savedFormats.length === 0) {
      // Données mock si aucun format n'existe
      return [
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
        },
        {
          id: '2',
          name: 'Rapport trimestriel détaillé',
          description: 'Format complet pour les rapports trimestriels avec indicateurs détaillés',
          fields: [
            { id: '1', name: 'Résumé exécutif', type: 'textarea', required: true },
            { id: '2', name: 'Objectifs atteints', type: 'textarea', required: true },
            { id: '3', name: 'Défis rencontrés', type: 'textarea', required: true },
            { id: '4', name: 'Budget utilisé', type: 'number', required: true },
            { id: '5', name: 'Bénéficiaires', type: 'number', required: true },
            { id: '6', name: 'Prochain trimestre', type: 'textarea', required: false }
          ],
          createdAt: '2026-01-05T00:00:00Z'
        },
        {
          id: '3',
          name: 'Rapport financier',
          description: 'Format spécialisé pour les rapports financiers',
          fields: [
            { id: '1', name: 'Période', type: 'date', required: true },
            { id: '2', name: 'Revenus', type: 'number', required: true },
            { id: '3', name: 'Dépenses', type: 'number', required: true },
            { id: '4', name: 'Solde', type: 'number', required: true },
            { id: '5', name: 'Commentaires', type: 'textarea', required: false }
          ],
          createdAt: '2026-01-10T00:00:00Z'
        }
      ];
    }
    
    return savedFormats;
  });

  const getFieldTypeText = (type: string) => {
    switch (type) {
      case 'text':
        return 'Texte';
      case 'number':
        return 'Nombre';
      case 'date':
        return 'Date';
      case 'textarea':
        return 'Texte long';
      case 'select':
        return 'Sélection';
      default:
        return type;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des formats de rapport</CardTitle>
        <CardDescription>
          Gérez tous les formats de rapport disponibles pour les projets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom du format</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Champs</TableHead>
              <TableHead>Créé le</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formats.map((format) => (
              <TableRow key={format.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <div className="font-medium">{format.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                    {format.description}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{format.fields.length} champ(s)</span>
                    <div className="flex gap-1">
                      {format.fields.slice(0, 3).map((field, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {getFieldTypeText(field.type)}
                        </Badge>
                      ))}
                      {format.fields.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{format.fields.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-600">
                    {new Date(format.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView?.(format)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Voir les détails
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit?.(format)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDuplicate?.(format)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Dupliquer
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete?.(format.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {formats.length === 0 && (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Aucun format de rapport créé</p>
            <p className="text-sm text-gray-500">
              Créez votre premier format de rapport pour commencer
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
