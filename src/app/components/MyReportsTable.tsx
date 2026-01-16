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
import { Eye, Download, Edit, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export function MyReportsTable() {
  const myReports = [
    {
      id: 'RPT-2026-001',
      title: 'Rapport Q4 2025 - Projet Éducation',
      type: 'Trimestriel',
      submittedDate: '2026-01-10',
      deadline: '2026-01-15',
      status: 'review',
      compliance: 96,
      feedback: null,
    },
    {
      id: 'RPT-2025-245',
      title: 'Rapport Annuel 2025',
      type: 'Annuel',
      submittedDate: '2025-12-15',
      deadline: '2025-12-20',
      status: 'approved',
      compliance: 98,
      feedback: 'Rapport excellent, très complet.',
    },
    {
      id: 'RPT-2025-234',
      title: 'Rapport Q3 2025 - Activités',
      type: 'Trimestriel',
      submittedDate: '2025-10-08',
      deadline: '2025-10-10',
      status: 'approved',
      compliance: 94,
      feedback: null,
    },
    {
      id: 'RPT-2025-223',
      title: 'Rapport Mensuel Septembre 2025',
      type: 'Mensuel',
      submittedDate: '2025-10-02',
      deadline: '2025-10-05',
      status: 'approved',
      compliance: 92,
      feedback: null,
    },
    {
      id: 'RPT-2026-005',
      title: 'Rapport Projet Infrastructure',
      type: 'Projet',
      submittedDate: null,
      deadline: '2026-01-20',
      status: 'draft',
      compliance: 0,
      feedback: null,
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
      case 'review':
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            <Clock className="w-3 h-3 mr-1" />
            En révision
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="outline">
            <Edit className="w-3 h-3 mr-1" />
            Brouillon
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            À réviser
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date soumission</TableHead>
              <TableHead>Échéance</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Score IA</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.id}</TableCell>
                <TableCell className="max-w-xs">
                  <div>
                    <p className="font-medium">{report.title}</p>
                    {report.feedback && (
                      <p className="text-xs text-green-600 mt-1">{report.feedback}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>
                  {report.submittedDate ? (
                    new Date(report.submittedDate).toLocaleDateString('fr-FR')
                  ) : (
                    <span className="text-muted-foreground">Non soumis</span>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(report.deadline).toLocaleDateString('fr-FR')}
                </TableCell>
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
                    {report.status === 'draft' ? (
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Modifier
                      </Button>
                    ) : (
                      <>
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {report.submittedDate && (
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
