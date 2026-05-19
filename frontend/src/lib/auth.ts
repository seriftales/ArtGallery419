// Token ve kullanıcı bilgisini localStorage üzerinde yönetir.
// Frontend baştan localStorage kullanıyordu — anahtar isimlerini koruduk,
// böylece App.tsx ve diğer sayfalardaki mevcut `localStorage.getItem("user")`
// okumaları aynen çalışmaya devam eder.

const TOKEN_KEY = "token";
const USER_KEY = "user";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "Customer" | "Admin" | "Artist" | string;
}

export const auth = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getUser(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  },

  setUser(user: AuthUser): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  isLoggedIn(): boolean {
    return !!this.getToken();
  },

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
