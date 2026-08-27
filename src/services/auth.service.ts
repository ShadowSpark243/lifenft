import { API_ENDPOINTS } from '../config/api';

export class AuthService {
  static async login(userId: string, password: string): Promise<any> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include', // Needed for CORS/cookies if added later
        body: JSON.stringify({ userId, password })
      });

      const data = await response.json();

      if (response.ok && data.user) {
        localStorage.setItem('userData', JSON.stringify(data.user));
        return {
          success: true,
          role: data.user.Role || 'user',
          message: data.message
        };
      }

      return {
        success: false,
        message: data.message || "Invalid credentials"
      };
    } catch (error) {
      console.error("AuthService Login Error:", error);
      return {
        success: false,
        message: "Network error. Please try again."
      };
    }
  }

  static async register(registrationData: any): Promise<any> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      const data = await response.json();
      
      if (response.ok) {
        return { success: true, message: data.message };
      }
      
      return { success: false, message: data.message || "Registration failed" };
    } catch (error) {
      console.error("AuthService Registration Error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  }

  static logout() {
    localStorage.removeItem('userData');
  }
}
