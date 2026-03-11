"use client";

import { useCallback } from "react";
import { useAppStore } from "@/app/store/useAppStore";
import { authService } from "@/app/services/authService";
import { LoginCredentials } from "@/src/entities/models/User";

/**
 * useAuth
 * Provides auth state and actions to components.
 * Components never import authService or the store directly.
 */
export function useAuth() {
  const user      = useAppStore((s) => s.user);
  const isLoggedIn = useAppStore((s) => s.isLoggedIn);
  const isLoading  = useAppStore((s) => s.isLoading);
  const error      = useAppStore((s) => s.error);

  const login = useCallback(async (credentials: LoginCredentials) => {
    return authService.login(credentials);
  }, []);

  const logout = useCallback(async () => {
    return authService.logout();
  }, []);

  return { user, isLoggedIn, isLoading, error, login, logout };
}
