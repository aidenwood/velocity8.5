import React from 'react';
import { AuthProvider } from './AuthProvider';
import { AuthForm } from './AuthForm';

export default function ForgotPasswordPage() {
  return (
    <AuthProvider>
      <AuthForm mode="forgot-password" />
    </AuthProvider>
  );
}
