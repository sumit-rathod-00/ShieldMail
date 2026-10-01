// Admin credentials & state — kept in module scope (no external dep)
// In production, replace with Supabase auth.
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'ShieldMail@2026',
};

export interface AdminUser {
  username: string;
  role: 'admin';
  loginTime: string;
}

const STORAGE_KEY = 'shieldmail_admin_session';

export const adminAuth = {
  login(username: string, password: string): AdminUser | null {
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const user: AdminUser = {
        username,
        role: 'admin',
        loginTime: new Date().toISOString(),
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return user;
    }
    return null;
  },

  logout() {
    sessionStorage.removeItem(STORAGE_KEY);
  },

  getSession(): AdminUser | null {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AdminUser) : null;
    } catch {
      return null;
    }
  },

  isLoggedIn(): boolean {
    return Boolean(adminAuth.getSession());
  },
};
