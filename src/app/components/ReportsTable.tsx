import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { Eye, Download, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface ReportsTableProps {
  viewMode?: 'compact' | 'full';
}

export function ReportsTable({ viewMode = 'full' }: ReportsTableProps) {
  const reports = [
    {
      id: 'RPT-2026-001',
      partner: 'ONG Action Développement',
      title: 'Rapport Q4 2025 - Éducation',
      submittedDate: '2026-01-10',
      deadline: '2026-01-15',
      status: 'pending',
      compliance: 92,
    },
    {
      id: 'RPT-2026-002',
      partner: 'Association Santé Plus',
      title: 'Rapport Annuel 2025 - Santé',
      submittedDate: '2026-01-08',
      deadline: '2026-01-12',
      status: 'approved',
      compliance: 98,
    },
    {
      id: 'RPT-2025-245',
      partner: 'Initiative Environnement',
      title: 'Rapport Trimestriel Q3 2025',
      submittedDate: '2025-10-15',
      deadline: '2025-10-20',
      status: 'approved',
      compliance: 95,
    },
    {
      id: 'RPT-2026-003',
      partner: 'Fondation Éducation Avenir',
      title: 'Rapport Mensuel Décembre 2025',
      submittedDate: '2026-01-05',
      deadline: '2026-01-10',
      status: 'review',
      compliance: 88,
    },
    {
      id: 'RPT-2026-004',
      partner: 'Réseau Développement Rural',
      title: 'Rapport Projet Agriculture',
      submittedDate: null,
      deadline: '2026-01-25',
      status: 'overdue',
      compliance: 0,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Approuvé
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            <Clock className="w-3 h-3 mr-1" />
            En attente
          </Badge>
        );
      case 'review':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            <Eye className="w-3 h-3 mr-1" />
            En révision
          </Badge>
        );
      case 'overdue':
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            En retard
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const displayReports = viewMode === 'compact' ? reports.slice(0, 5) : reports;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Partenaire</TableHead>
            <TableHead>Titre</TableHead>
            <TableHead>Date soumission</TableHead>
            <TableHead>Échéance</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Conformité IA</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayReports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.id}</TableCell>
              <TableCell>{report.partner}</TableCell>
              <TableCell className="max-w-xs truncate">{report.title}</TableCell>
              <TableCell>
                {report.submittedDate ? (
                  new Date(report.submittedDate).toLocaleDateString('fr-FR')
                ) : (
                  <span className="text-muted-foreground">Non soumis</span>
                )}
              </TableCell>
              <TableCell>{new Date(report.deadline).toLocaleDateString('fr-FR')}</TableCell>
              <TableCell>{getStatusBadge(report.status)}</TableCell>
              <TableCell>
                {report.compliance > 0 ? (
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          report.compliance >= 95
                            ? 'bg-green-500'
                            : report.compliance >= 85
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${report.compliance}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{report.compliance}%</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">N/A</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="ghost">
                    <Eye className="w-4 h-4" />
                  </Button>
                  {report.submittedDate && (
                    <Button size="sm" variant="ghost">
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
