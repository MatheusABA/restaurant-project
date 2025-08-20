import api from "./api";

class AuthService {
  async login(email: string, password: string): Promise<string> {
    const response = await api.post("/auth/login", { email, password });
    return response.data.token;
  }

  async logout(): Promise<void> {
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await api.get("/auth/validate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: () => true,
      });
      if (response.status === 401) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }
}

export default new AuthService();