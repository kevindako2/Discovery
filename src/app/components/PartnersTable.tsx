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
import { Mail, Phone, Edit, CheckCircle2 } from 'lucide-react';

export function PartnersTable() {
  const partners = [
    {
      id: 'PTR-001',
      name: 'ONG Action Développement',
      country: 'Burkina Faso',
      contact: 'Marie Ouédraogo',
      email: 'marie.ouedraogo@actiondev.org',
      phone: '+226 70 12 34 56',
      activeReports: 12,
      compliance: 96,
      status: 'active',
    },
    {
      id: 'PTR-002',
      name: 'Association Santé Plus',
      country: 'Sénégal',
      contact: 'Amadou Diallo',
      email: 'a.diallo@santeplus.sn',
      phone: '+221 77 123 45 67',
      activeReports: 8,
      compliance: 98,
      status: 'active',
    },
    {
      id: 'PTR-003',
      name: 'Initiative Environnement',
      country: 'Rwanda',
      contact: 'Jean-Paul Mugisha',
      email: 'jp.mugisha@enviro-initiative.rw',
      phone: '+250 78 123 45 67',
      activeReports: 15,
      compliance: 94,
      status: 'active',
    },
    {
      id: 'PTR-004',
      name: 'Fondation Éducation Avenir',
      country: 'Mali',
      contact: 'Fatoumata Traoré',
      email: 'f.traore@education-avenir.ml',
      phone: '+223 76 12 34 56',
      activeReports: 10,
      compliance: 92,
      status: 'active',
    },
    {
      id: 'PTR-005',
      name: 'Réseau Développement Rural',
      country: 'Niger',
      contact: 'Ibrahim Moussa',
      email: 'i.moussa@rdr.ne',
      phone: '+227 96 12 34 56',
      activeReports: 6,
      compliance: 88,
      status: 'pending',
    },
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Organisation</TableHead>
            <TableHead>Pays</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Coordonnées</TableHead>
            <TableHead>Rapports actifs</TableHead>
            <TableHead>Conformité</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partners.map((partner) => (
            <TableRow key={partner.id}>
              <TableCell className="font-medium">{partner.id}</TableCell>
              <TableCell className="font-medium">{partner.name}</TableCell>
              <TableCell>{partner.country}</TableCell>
              <TableCell>{partner.contact}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs">{partner.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs">{partner.phone}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{partner.activeReports}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        partner.compliance >= 95
                          ? 'bg-green-500'
                          : partner.compliance >= 85
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${partner.compliance}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{partner.compliance}%</span>
                </div>
              </TableCell>
              <TableCell>
                {partner.status === 'active' ? (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Actif
                  </Badge>
                ) : (
                  <Badge variant="outline">En attente</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
