/**
 * Zustand Auth Store
 * Manages user authentication state globally
 */

import { create } from "zustand";
import { User, AuthContext } from "@/lib/types";

interface AuthStore extends AuthContext {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // TODO: Call your auth API
      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   body: JSON.stringify({ email, password }),
      // });
      // const user = await response.json();
      // set({ user, isAuthenticated: true });
      console.log("Login:", email);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (email: string, password: string, name: string) => {
    set({ isLoading: true });
    try {
      // TODO: Call your auth API
      // const response = await fetch("/api/auth/register", {
      //   method: "POST",
      //   body: JSON.stringify({ email, password, name }),
      // });
      // const user = await response.json();
      // set({ user, isAuthenticated: true });
      console.log("Register:", email, name);
    } catch (error) {
      console.error("Register failed:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
