// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  requiredRole: 'student' | 'professor';
  children: React.ReactElement;
}

export default function ProtectedRoute({ requiredRole, children }: Props) {
  const raw = localStorage.getItem('user');
  if (!raw) return <Navigate to="/login/student" replace />;
  const { role } = JSON.parse(raw) as { role: string };

  if (role !== requiredRole) {
    // if a professor tries to view student page or vice‑versa
    return <Navigate to="/" replace />;
  }
  return children;
}
