import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Bot, 
  Send, 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  Lightbulb,
  FileText
} from 'lucide-react';
import { apiService, AIAnalysis } from '../services/api';

interface AIAssistantProps {
  type: 'admin' | 'partner';
  reportData?: any;
}

export function AIAssistant({ type, reportData }: AIAssistantProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [prompt, setPrompt] = useState('');

  const analyzeReport = async () => {
    if (!reportData) return;
    
    setIsAnalyzing(true);
    try {
      const result = await apiService.analyzeReport(reportData);
      setAnalysis(result);
    } catch (error) {
      console.error('Erreur lors de l\'analyse:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      const result = await apiService.generateReport(
        'Projet de développement',
        'Janvier 2026',
        { beneficiaries: 150, activities: 12, budget: 50000 }
      );
      setGeneratedContent(result);
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const askAI = async () => {
    if (!prompt.trim()) return;
    
    // Simulation de réponse IA
    const response = `Voici une suggestion basée sur votre demande: "${prompt}". Je vous recommande de considérer les points suivants...`;
    console.log('Réponse IA:', response);
    setPrompt('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Assistant IA
          </CardTitle>
          <CardDescription>
            {type === 'admin' 
              ? 'Analysez les rapports et obtenez des insights intelligents'
              : 'Générez des rapports et obtenez de l\'aide pour votre travail'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Analyse de rapport */}
          {type === 'admin' && reportData && (
            <div className="space-y-3">
              <Button 
                onClick={analyzeReport} 
                disabled={isAnalyzing}
                className="w-full"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isAnalyzing ? 'Analyse en cours...' : 'Analyser ce rapport'}
              </Button>
              
              {isAnalyzing && (
                <div className="space-y-2">
                  <Progress value={66} className="w-full" />
                  <p className="text-sm text-gray-600">Analyse IA en cours...</p>
                </div>
              )}
              
              {analysis && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium">Résultats de l'analyse</h4>
                    <Badge variant="secondary">Score: {analysis.score}/100</Badge>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-2">Sentiment: {analysis.sentiment}</p>
                    <p className="text-sm text-gray-700">{analysis.summary}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Points clés:</h5>
                    <ul className="text-sm space-y-1">
                      {analysis.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Recommandations:</h5>
                    <ul className="text-sm space-y-1">
                      {analysis.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Génération de rapport */}
          {type === 'partner' && (
            <div className="space-y-3">
              <Button 
                onClick={generateReport} 
                disabled={isGenerating}
                className="w-full"
              >
                <FileText className="w-4 h-4 mr-2" />
                {isGenerating ? 'Génération en cours...' : 'Générer un rapport automatiquement'}
              </Button>
              
              {isGenerating && (
                <div className="space-y-2">
                  <Progress value={80} className="w-full" />
                  <p className="text-sm text-gray-600">Génération IA en cours...</p>
                </div>
              )}
              
              {generatedContent && (
                <div className="space-y-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <h4 className="font-medium">Rapport généré</h4>
                  </div>
                  
                  <div>
                    <h5 className="font-medium">{generatedContent.title}</h5>
                    <p className="text-sm text-gray-700 mt-2">{generatedContent.summary}</p>
                  </div>
                  
                  <div className="space-y-3">
                    {generatedContent.sections.map((section: any, index: number) => (
                      <div key={index} className="border-l-4 border-green-400 pl-3">
                        <h6 className="font-medium text-sm">{section.title}</h6>
                        <p className="text-sm text-gray-600 mt-1">{section.content}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <h6 className="font-medium text-sm">Conclusion</h6>
                    <p className="text-sm text-gray-600 mt-1">{generatedContent.conclusion}</p>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    Utiliser ce contenu
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Chat avec l'IA */}
          <div className="space-y-3">
            <h4 className="font-medium">Posez une question à l'IA</h4>
            <div className="flex gap-2">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  type === 'admin' 
                    ? "Comment améliorer ce rapport ? Quels sont les points d'attention ?"
                    : "Comment structurer mon rapport ? Quelles données inclure ?"
                }
                className="flex-1"
                rows={3}
              />
            </div>
            <Button onClick={askAI} disabled={!prompt.trim()}>
              <Send className="w-4 h-4 mr-2" />
              Envoyer
            </Button>
          </div>

          {/* Suggestions rapides */}
          <div className="space-y-3">
            <h4 className="font-medium">Suggestions rapides</h4>
            <div className="grid grid-cols-1 gap-2">
              {type === 'admin' ? [
                'Analyser la qualité des données',
                'Identifier les tendances',
                'Vérifier la conformité',
                'Générer un résumé'
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => setPrompt(suggestion)}
                  className="text-left justify-start"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {suggestion}
                </Button>
              )) : [
                'Améliorer la structure',
                'Ajouter des KPIs',
                'Formater le texte',
                'Vérifier la complétude'
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => setPrompt(suggestion)}
                  className="text-left justify-start"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
