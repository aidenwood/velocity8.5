import React, { useState } from 'react';
import { AuthProvider, useAuth } from './AuthProvider';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardShell } from './DashboardShell';

function SettingsContent() {
  const { profile, updateProfile, updatePassword, user } = useAuth();

  const [fullName, setFullName] = useState(profile?.full_name ?? '');
  const [companyName, setCompanyName] = useState(profile?.company_name ?? '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? '');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg(null);

    const { error } = await updateProfile({
      full_name: fullName,
      company_name: companyName,
      avatar_url: avatarUrl || null,
    });

    if (error) {
      setProfileMsg({ type: 'error', text: error.message });
    } else {
      setProfileMsg({ type: 'success', text: 'Profile updated.' });
    }
    setSavingProfile(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword.length < 8) {
      setPasswordMsg({ type: 'error', text: 'Password must be at least 8 characters.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setSavingPassword(true);
    const { error } = await updatePassword(newPassword);

    if (error) {
      setPasswordMsg({ type: 'error', text: error.message });
    } else {
      setPasswordMsg({ type: 'success', text: 'Password changed successfully.' });
      setNewPassword('');
      setConfirmPassword('');
    }
    setSavingPassword(false);
  };

  const inputClass =
    'w-full rounded-xl border border-primary-500/20 bg-black/50 px-4 py-2.5 text-white placeholder-primary-500/40 outline-none transition focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30';

  return (
    <DashboardShell currentPath="/dashboard/settings">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <p className="mt-1 text-sm text-primary-400/60">Manage your profile and account.</p>
      </div>

      <div className="max-w-2xl space-y-8">
        {/* Profile Section */}
        <form
          onSubmit={handleProfileSave}
          className="rounded-2xl border border-primary-500/10 bg-primary-950/40 p-6 backdrop-blur-sm"
        >
          <h2 className="mb-4 text-base font-medium text-white">Profile</h2>

          {profileMsg && (
            <div
              className={`mb-4 rounded-lg px-4 py-3 text-sm border ${
                profileMsg.type === 'success'
                  ? 'bg-green-500/10 text-green-400 border-green-500/20'
                  : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}
            >
              {profileMsg.text}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-primary-200">Email</label>
              <input
                type="email"
                value={user?.email ?? ''}
                disabled
                className={`${inputClass} cursor-not-allowed opacity-50`}
              />
              <p className="mt-1 text-xs text-primary-500/40">Email cannot be changed here.</p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-primary-200">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={inputClass}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-primary-200">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={inputClass}
                placeholder="Your company"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-primary-200">Avatar URL</label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={savingProfile}
            className="mt-5 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {savingProfile ? 'Saving...' : 'Save profile'}
          </button>
        </form>

        {/* Password Section */}
        <form
          onSubmit={handlePasswordChange}
          className="rounded-2xl border border-primary-500/10 bg-primary-950/40 p-6 backdrop-blur-sm"
        >
          <h2 className="mb-4 text-base font-medium text-white">Change Password</h2>

          {passwordMsg && (
            <div
              className={`mb-4 rounded-lg px-4 py-3 text-sm border ${
                passwordMsg.type === 'success'
                  ? 'bg-green-500/10 text-green-400 border-green-500/20'
                  : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}
            >
              {passwordMsg.text}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-primary-200">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={inputClass}
                placeholder="Min. 8 characters"
                minLength={8}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-primary-200">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
                placeholder="Repeat password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={savingPassword}
            className="mt-5 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {savingPassword ? 'Changing...' : 'Change password'}
          </button>
        </form>
      </div>
    </DashboardShell>
  );
}

export default function SettingsPage() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <SettingsContent />
      </ProtectedRoute>
    </AuthProvider>
  );
}
