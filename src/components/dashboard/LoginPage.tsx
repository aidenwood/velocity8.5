import React from 'react';
import { AuthProvider } from './AuthProvider';
import { AuthForm } from './AuthForm';

export default function LoginPage() {
  return (
    <AuthProvider>
      <AuthForm mode="login" />
    </AuthProvider>
  );
}
