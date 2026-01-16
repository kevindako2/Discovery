import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (userType: 'admin' | 'partner') => {
    setError('');
    setIsLoading(true);

    // Simuler une vérification des identifiants
    setTimeout(() => {
      const validCredentials = {
        admin: { email: 'admin@luxdev.org', password: 'admin123' },
        partner: { email: 'partner@luxdev.org', password: 'partner123' }
      };

      const expectedCredentials = validCredentials[userType];

      if (email === expectedCredentials.email && password === expectedCredentials.password) {
        // Sauvegarder l'utilisateur dans localStorage
        localStorage.setItem('currentUser', JSON.stringify({
          id: userType === 'admin' ? '1' : '2',
          email: expectedCredentials.email,
          role: userType,
          name: userType === 'admin' ? 'Admin User' : 'Partner User'
        }));
        
        // Rediriger vers le dashboard approprié
        navigate(userType === 'admin' ? '/admin' : '/partner');
      } else {
        setError('Identifiants incorrects. Veuillez réessayer.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickLogin = (userType: 'admin' | 'partner') => {
    const credentials = {
      admin: { email: 'admin@luxdev.org', password: 'admin123' },
      partner: { email: 'partner@luxdev.org', password: 'partner123' }
    };
    
    setEmail(credentials[userType].email);
    setPassword(credentials[userType].password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003d7a] to-[#002850] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-[#003d7a] rounded-full flex items-center justify-center">
              <span className="text-white text-3xl font-bold">L</span>
            </div>
          </div>
          <CardTitle className="text-center text-2xl">Plateforme Luxdev</CardTitle>
          <CardDescription className="text-center">
            Système intelligent de reporting et gestion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre.email@exemple.com"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="•••••••"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              onKeyPress={(e: any) => {
                if (e.key === 'Enter') {
                  handleLogin('admin'); // Par défaut, essayer admin
                }
              }}
            />
          </div>
          
          <div className="flex flex-col gap-3 pt-4">
            <Button
              onClick={() => handleLogin('admin')}
              disabled={isLoading}
              className="w-full bg-[#003d7a] hover:bg-[#002850]"
            >
              {isLoading ? 'Connexion...' : 'Connexion Admin'}
            </Button>
            <Button
              onClick={() => handleLogin('partner')}
              disabled={isLoading}
              className="w-full bg-[#e94e1b] hover:bg-[#d13d0f]"
            >
              {isLoading ? 'Connexion...' : 'Connexion Partenaire'}
            </Button>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-xs text-center text-muted-foreground mb-3">
              Accès rapide démo :
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin('admin')}
                className="flex-1"
              >
                Admin
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin('partner')}
                className="flex-1"
              >
                Partenaire
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
