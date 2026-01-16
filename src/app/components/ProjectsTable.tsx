import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Users, 
  Calendar, 
  Target,
  Eye
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

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

interface ProjectsTableProps {
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
  onView?: (project: Project) => void;
}

export function ProjectsTable({ onEdit, onDelete, onView }: ProjectsTableProps) {
  const [projects] = useState<Project[]>(() => {
    // Récupérer les projets depuis le localStorage ou utiliser des données mock
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    if (savedProjects.length === 0) {
      // Données mock si aucun projet n'existe
      return [
        {
          id: '1',
          name: 'Programme de développement rural',
          description: 'Projet pilote pour le développement rural dans la région du centre',
          reportFormatId: '1',
          partners: ['ONG A', 'Association B'],
          startDate: '2026-01-01',
          endDate: '2026-12-31',
          status: 'active',
          createdAt: '2026-01-01T00:00:00Z'
        },
        {
          id: '2',
          name: 'Initiative éducation numérique',
          description: 'Déploiement d\'outils numériques dans les écoles primaires',
          reportFormatId: '2',
          partners: ['Organisation C'],
          startDate: '2026-02-01',
          endDate: '2026-11-30',
          status: 'active',
          createdAt: '2026-01-15T00:00:00Z'
        },
        {
          id: '3',
          name: 'Projet santé communautaire',
          description: 'Amélioration des services de santé de base',
          reportFormatId: '1',
          partners: ['ONG A', 'Association B', 'Organisation C'],
          startDate: '2025-06-01',
          endDate: '2025-12-31',
          status: 'completed',
          createdAt: '2025-05-01T00:00:00Z'
        }
      ];
    }
    
    return savedProjects;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'completed':
        return 'Terminé';
      case 'archived':
        return 'Archivé';
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des projets</CardTitle>
        <CardDescription>
          Gérez tous les projets et leur assignation aux partenaires
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom du projet</TableHead>
              <TableHead>Partenaires</TableHead>
              <TableHead>Période</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{project.name}</div>
                    <div className="text-sm text-gray-600 line-clamp-1">
                      {project.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{project.partners.length} partenaire(s)</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{new Date(project.startDate).toLocaleDateString('fr-FR')} - {new Date(project.endDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(project.status)}>
                    {getStatusText(project.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView?.(project)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Voir les détails
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit?.(project)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete?.(project.id)}
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
        
        {projects.length === 0 && (
          <div className="text-center py-8">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Aucun projet créé</p>
            <p className="text-sm text-gray-500">
              Créez votre premier projet pour commencer
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
