import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { User, Mail, Lock, Save, Shield, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AccountSettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  // États pour les informations du profil
  const [userInfo, setUserInfo] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@luxdev.org',
    phone: '+226 12 34 56 78',
    role: 'Administrateur',
  });

  // États pour les notifications
  const [notifications, setNotifications] = useState({
    emailReports: true,
    emailProjects: true,
    emailUpdates: false,
    pushReports: true,
    pushProjects: false,
  });

  const saveProfile = () => {
    // Logique de sauvegarde du profil
    console.log('Profil sauvegardé:', userInfo);
    // Ici, on ferait un appel API pour sauvegarder
  };

  const saveNotifications = () => {
    // Logique de sauvegarde des préférences de notification
    console.log('Notifications sauvegardées:', notifications);
    // Ici, on ferait un appel API pour sauvegarder
  };

  const changePassword = () => {
    // Logique de changement de mot de passe
    console.log('Changement de mot de passe');
    // Ici, on ferait un appel API pour changer le mot de passe
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Mon compte</h1>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Retour
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Sécurité
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>
                  Mettez à jour vos informations personnelles et professionnelles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      value={userInfo.firstName}
                      onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      value={userInfo.lastName}
                      onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Rôle</Label>
                  <Input
                    id="role"
                    value={userInfo.role}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={saveProfile}>
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Changer le mot de passe</CardTitle>
                <CardDescription>
                  Assurez la sécurité de votre compte en mettant à jour votre mot de passe
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <div className="flex justify-end">
                  <Button onClick={changePassword}>
                    <Lock className="w-4 h-4 mr-2" />
                    Changer le mot de passe
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Connexions actives</CardTitle>
                <CardDescription>
                  Gérez les appareils connectés à votre compte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Chrome - Windows</h4>
                      <p className="text-sm text-gray-600">Dernière connexion: Il y a 2 heures</p>
                    </div>
                    <Badge variant="default">Actuel</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Safari - iPhone</h4>
                      <p className="text-sm text-gray-600">Dernière connexion: Il y a 1 jour</p>
                    </div>
                    <Button variant="outline" size="sm">Déconnecter</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notification</CardTitle>
                <CardDescription>
                  Choisissez les notifications que vous souhaitez recevoir
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Notifications par email</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Nouveaux rapports</p>
                        <p className="text-sm text-gray-600">Soyez notifié quand de nouveaux rapports sont soumis</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.emailReports}
                        onChange={(e) => setNotifications({ ...notifications, emailReports: e.target.checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Nouveaux projets</p>
                        <p className="text-sm text-gray-600">Soyez notifié quand de nouveaux projets vous sont assignés</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.emailProjects}
                        onChange={(e) => setNotifications({ ...notifications, emailProjects: e.target.checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mises à jour système</p>
                        <p className="text-sm text-gray-600">Recevez les nouvelles fonctionnalités et améliorations</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.emailUpdates}
                        onChange={(e) => setNotifications({ ...notifications, emailUpdates: e.target.checked })}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Notifications push</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Rapports en attente</p>
                        <p className="text-sm text-gray-600">Soyez alerté des rapports nécessitant votre attention</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.pushReports}
                        onChange={(e) => setNotifications({ ...notifications, pushReports: e.target.checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Projets assignés</p>
                        <p className="text-sm text-gray-600">Soyez notifié des nouveaux projets</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.pushProjects}
                        onChange={(e) => setNotifications({ ...notifications, pushProjects: e.target.checked })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={saveNotifications}>
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder les préférences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
