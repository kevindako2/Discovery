import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Moon, Sun, Palette, Globe, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AppSettings() {
  const navigate = useNavigate();
  
  // État pour le thème
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  
  // État pour la langue
  const [language, setLanguage] = useState('fr');
  
  // Autres préférences
  const [preferences, setPreferences] = useState({
    autoSave: true,
    compactMode: false,
    showNotifications: true,
    soundEnabled: true,
  });

  // Charger les préférences au démarrage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system';
    const savedLanguage = localStorage.getItem('language') || 'fr';
    const savedPreferences = JSON.parse(localStorage.getItem('appPreferences') || '{}');
    
    setTheme(savedTheme);
    setLanguage(savedLanguage);
    setPreferences({ ...preferences, ...savedPreferences });
    
    // Appliquer le thème
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else if (newTheme === 'light') {
      root.classList.remove('dark');
    } else {
      // System: utiliser la préférence du navigateur
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    localStorage.setItem('appPreferences', JSON.stringify(newPreferences));
  };

  const saveAllSettings = () => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('language', language);
    localStorage.setItem('appPreferences', JSON.stringify(preferences));
    
    // Ici, on pourrait aussi sauvegarder sur le serveur
    console.log('Paramètres sauvegardés:', { theme, language, preferences });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Paramètres</h1>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Retour
          </Button>
        </div>

        <div className="space-y-6">
          {/* Thème */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Apparence
              </CardTitle>
              <CardDescription>
                Personnalisez l'apparence de l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-base font-medium">Thème</Label>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    onClick={() => handleThemeChange('light')}
                    className="flex items-center gap-2"
                  >
                    <Sun className="w-4 h-4" />
                    Clair
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    onClick={() => handleThemeChange('dark')}
                    className="flex items-center gap-2"
                  >
                    <Moon className="w-4 h-4" />
                    Sombre
                  </Button>
                  <Button
                    variant={theme === 'system' ? 'default' : 'outline'}
                    onClick={() => handleThemeChange('system')}
                    className="flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    Auto
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Langue */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Langue
              </CardTitle>
              <CardDescription>
                Choisissez la langue de l'interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Préférences générales */}
          <Card>
            <CardHeader>
              <CardTitle>Préférences générales</CardTitle>
              <CardDescription>
                Configurez le comportement de l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sauvegarde automatique</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Sauvegarde automatiquement votre travail toutes les 30 secondes
                  </p>
                </div>
                <Switch
                  checked={preferences.autoSave}
                  onCheckedChange={(checked) => handlePreferenceChange('autoSave', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mode compact</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Réduit l'espacement entre les éléments pour afficher plus de contenu
                  </p>
                </div>
                <Switch
                  checked={preferences.compactMode}
                  onCheckedChange={(checked) => handlePreferenceChange('compactMode', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Afficher les notifications du système
                  </p>
                </div>
                <Switch
                  checked={preferences.showNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange('showNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Effets sonores</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Jouer des sons pour les actions importantes
                  </p>
                </div>
                <Switch
                  checked={preferences.soundEnabled}
                  onCheckedChange={(checked) => handlePreferenceChange('soundEnabled', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* À propos */}
          <Card>
            <CardHeader>
              <CardTitle>À propos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Version</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Dernière mise à jour</span>
                <span className="font-medium">15 Janvier 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Développeur</span>
                <span className="font-medium">Luxdev Platform</span>
              </div>
            </CardContent>
          </Card>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Annuler
            </Button>
            <Button onClick={saveAllSettings}>
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder les paramètres
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
