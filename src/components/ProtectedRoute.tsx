// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// Props expected by the ProtectedRoute component
interface Props {
  requiredRole: 'student' | 'professor'; // allowed user role
  children: React.ReactElement;         // the protected content to render
}

// Component that guards access to routes based on user role
export default function ProtectedRoute({ requiredRole, children }: Props) {
  // Attempt to retrieve the user from localStorage
  const raw = localStorage.getItem('user');

  // If no user is found in localStorage, redirect to student login page
  if (!raw) return <Navigate to="/login/student" replace />;

  // Parse user object to check role
  const { role } = JSON.parse(raw) as { role: string };

  // If the user's role does not match the required role, redirect to homepage
  if (role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // If role matches, allow rendering of the protected component
  return children;
}
