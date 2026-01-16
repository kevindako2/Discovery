import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Progress } from '@/app/components/ui/progress';
import { Upload, FileText, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export function SubmitReportForm() {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    period: '',
    description: '',
    file: null as File | null,
  });
  const [aiValidation, setAiValidation] = useState({
    completeness: 0,
    format: 0,
    consistency: 0,
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, file });
      // Simulate AI analysis
      setIsAnalyzing(true);
      setTimeout(() => {
        setAiValidation({
          completeness: Math.floor(Math.random() * 10) + 90,
          format: Math.floor(Math.random() * 10) + 90,
          consistency: Math.floor(Math.random() * 10) + 90,
        });
        setIsAnalyzing(false);
        toast.success('Analyse IA terminée avec succès!');
      }, 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Rapport soumis avec succès!', {
      description: 'Votre rapport est en cours de révision par l\'équipe Luxdev.',
    });
    // Reset form
    setFormData({
      title: '',
      type: '',
      period: '',
      description: '',
      file: null,
    });
    setAiValidation({ completeness: 0, format: 0, consistency: 0 });
  };

  const overallScore =
    (aiValidation.completeness + aiValidation.format + aiValidation.consistency) / 3;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Soumettre un nouveau rapport</CardTitle>
          <CardDescription>
            Remplissez le formulaire ci-dessous. L'IA vérifiera automatiquement la conformité.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titre du rapport *</Label>
                <Input
                  id="title"
                  placeholder="Ex: Rapport Trimestriel Q4 2025"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type de rapport *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Mensuel</SelectItem>
                    <SelectItem value="quarterly">Trimestriel</SelectItem>
                    <SelectItem value="annual">Annuel</SelectItem>
                    <SelectItem value="project">Projet spécifique</SelectItem>
                    <SelectItem value="final">Rapport final</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="period">Période couverte *</Label>
                <Input
                  id="period"
                  type="text"
                  placeholder="Ex: Octobre - Décembre 2025"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Document (PDF, DOCX, XLSX) *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.docx,.xlsx,.doc,.xls"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                {formData.file && (
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {formData.file.name}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description / Notes</Label>
              <Textarea
                id="description"
                placeholder="Ajoutez des informations complémentaires sur ce rapport..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#e94e1b] hover:bg-[#d13d0f]"
              disabled={!formData.file}
            >
              <Upload className="w-4 h-4 mr-2" />
              Soumettre le rapport
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* AI Validation Panel */}
      {(formData.file || isAnalyzing) && (
        <Card className="border-2 border-[#003d7a]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#e94e1b]" />
              <CardTitle>Vérification IA en cours</CardTitle>
            </div>
            <CardDescription>
              Analyse intelligente de la conformité et de la complétude
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isAnalyzing ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003d7a]"></div>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        Complétude des données
                      </span>
                      <span className="font-medium">{aiValidation.completeness}%</span>
                    </div>
                    <Progress value={aiValidation.completeness} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        Conformité du format
                      </span>
                      <span className="font-medium">{aiValidation.format}%</span>
                    </div>
                    <Progress value={aiValidation.format} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        Cohérence des données
                      </span>
                      <span className="font-medium">{aiValidation.consistency}%</span>
                    </div>
                    <Progress value={aiValidation.consistency} className="h-2" />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    {overallScore >= 90 ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600 mt-1" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-yellow-600 mt-1" />
                    )}
                    <div>
                      <p className="font-semibold text-lg">
                        Score global: {overallScore.toFixed(0)}%
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {overallScore >= 95
                          ? 'Excellent! Votre rapport est parfaitement conforme.'
                          : overallScore >= 90
                          ? 'Très bien! Quelques améliorations mineures possibles.'
                          : 'Bon score. Vérifiez les sections signalées pour améliorer la conformité.'}
                      </p>
                    </div>
                  </div>
                </div>

                {overallScore < 90 && (
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-sm mb-2">Suggestions d'amélioration:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      {aiValidation.completeness < 90 && (
                        <li>Vérifiez que tous les champs obligatoires sont remplis</li>
                      )}
                      {aiValidation.format < 90 && (
                        <li>Assurez-vous d'utiliser le template officiel 2026</li>
                      )}
                      {aiValidation.consistency < 90 && (
                        <li>Vérifiez la cohérence des données financières et statistiques</li>
                      )}
                    </ul>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
