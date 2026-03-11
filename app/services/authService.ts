"use client";

import { authService as authImpl } from "@/di/container";
import { LoginCredentials } from "@/src/entities/models/User";
import { useAppStore } from "@/app/store/useAppStore";

export const authService = {
  async login(credentials: LoginCredentials) {
    const { setUser, showToast, setError } = useAppStore.getState();
    try {
      const { user, token } = await authImpl.login(credentials);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("crm_token", token);
      }
      setUser(user);
      showToast(`Welcome back, ${user.name.split(" ")[0]}!`);
    } catch (e: any) {
      setError(e.message);
      throw e;
    }
  },

  async logout() {
    const { setUser } = useAppStore.getState();
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("crm_token");
    }
    setUser(null);
  },
};
