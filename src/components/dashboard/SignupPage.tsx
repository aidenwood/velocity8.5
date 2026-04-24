import React from 'react';
import { AuthProvider } from './AuthProvider';
import { AuthForm } from './AuthForm';

export default function SignupPage() {
  return (
    <AuthProvider>
      <AuthForm mode="signup" />
    </AuthProvider>
  );
}
