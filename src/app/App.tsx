import { useState } from 'react';
import { LoginPage } from '@/app/components/LoginPage';
import { AdminDashboard } from '@/app/components/AdminDashboard';
import { PartnerDashboard } from '@/app/components/PartnerDashboard';
import { Toaster } from '@/app/components/ui/sonner';

type UserType = 'admin' | 'partner' | null;

export default function App() {
  const [userType, setUserType] = useState<UserType>(null);

  const handleLogin = (type: 'admin' | 'partner') => {
    setUserType(type);
  };

  const handleLogout = () => {
    setUserType(null);
  };

  return (
    <>
      {userType === null && <LoginPage onLogin={handleLogin} />}
      {userType === 'admin' && <AdminDashboard onLogout={handleLogout} />}
      {userType === 'partner' && <PartnerDashboard onLogout={handleLogout} />}
      <Toaster />
    </>
  );
}
