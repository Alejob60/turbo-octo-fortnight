// API configuration for MisYBot backend integration
// Using proxy route to avoid CORS issues
const API_BASE_URL = process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'http://localhost:8000/api';

// Tenant ID - In a real application, this would come from user's organization
const DEFAULT_TENANT_ID = '7ae71544-d143-4b8f-8ae9-42a8a8c3c6ba';

// API endpoints - using proxy to avoid CORS issues
const API_ENDPOINTS = {
  // Authentication
  login: '/api/proxy/auth/login',
  register: '/api/proxy/auth/register',
  logout: '/api/proxy/auth/logout',
  refreshToken: '/api/proxy/auth/refresh',
  
  // Orbital Prime specific endpoints
  dashboard: '/api/proxy/orbital/dashboard',
  analytics: '/api/proxy/orbital/analytics',
  aiModels: '/api/proxy/orbital/models',
  agents: '/api/proxy/orbital/agents',
  dataAudit: '/api/proxy/orbital/data-audit',
  vision: '/api/proxy/orbital/vision',
  
  // Content generation endpoints
  generatePromo: '/api/proxy/prompt-json/generate-promo',
  generateImage: '/api/proxy/api/v1/promo-image',
  gallery: '/api/proxy/gallery/my-images',
  credits: '/api/proxy/credits/balance',
  contentGenerate: '/api/proxy/content/generate',
  orders: '/api/proxy/orders/my-orders',
  
  // General endpoints
  users: '/api/proxy/users',
  settings: '/api/proxy/settings',
  notifications: '/api/proxy/notifications',
};

// API service class
class MisYBotAPIService {
  private headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Get auth token from localStorage or cookies
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  // Get current user data
  private getCurrentUser(): any {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  // Generate client ID
  private generateClientId(): string {
    return `client-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Generate session ID
  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Build request payload with required metadata
  private buildPayload(requestData: any): any {
    const user = this.getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    return {
      userId: user.id,
      tenantId: DEFAULT_TENANT_ID,
      userData: {
        email: user.email,
        name: user.name,
        role: user.role || 'user',
      },
      requestMetadata: {
        timestamp: new Date().toISOString(),
        clientId: this.generateClientId(),
        sessionId: this.generateSessionId(),
      },
      ...requestData,
    };
  }

  // Generic request method with tenant headers
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getAuthToken();
    const headers = {
      ...this.headers,
      'x-tenant-id': DEFAULT_TENANT_ID,
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(endpoint, {
      ...options,
      headers,
    });

    if (!response.ok) {
      // Try to parse error response
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        // If response is not JSON, use status text
        errorData = { error: { message: response.statusText } };
      }
      
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Request method with payload building for authenticated endpoints
  private async authenticatedRequest<T>(endpoint: string, requestData: any, method: string = 'POST'): Promise<T> {
    // Verify user is authenticated
    if (!this.getAuthToken()) {
      throw new Error('User not authenticated');
    }

    const headers = {
      'Authorization': `Bearer ${this.getAuthToken()}`,
      'x-tenant-id': DEFAULT_TENANT_ID,
      'Content-Type': 'application/json',
    };

    // Para solicitudes GET, no se envía body
    if (method.toUpperCase() === 'GET') {
      const response = await fetch(endpoint, {
        method,
        headers,
      });

      if (!response.ok) {
        // Try to parse error response
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          // If response is not JSON, use status text
          errorData = { error: { message: response.statusText } };
        }
        
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    } else {
      // Para otros métodos (POST, PUT, etc.) se envía el payload
      const payload = this.buildPayload(requestData);
      
      const response = await fetch(endpoint, {
        method,
        headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Try to parse error response
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          // If response is not JSON, use status text
          errorData = { error: { message: response.statusText } };
        }
        
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    }
  }

  // Authentication methods
  async login(credentials: { email: string; password: string }) {
    // Para login, enviamos las credenciales y el tenantId como se especifica en la guía de integración
    // El proxy se encargará de redirigir al backend real
    const response = await fetch(API_ENDPOINTS.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': DEFAULT_TENANT_ID,
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login error response:', errorData);
      throw new Error(errorData.error?.message || errorData.message || 'Login failed');
    }

    const result = await response.json();
    
    // Manejar la respuesta según el formato especificado en la guía de integración
    if (result.success && result.data) {
      // Extraer información del usuario y credenciales de la respuesta
      const { user, credentials, tenant, navigation, resources } = result.data;
      
      // Almacenar token de autenticación
      if (credentials?.token) {
        localStorage.setItem('access_token', credentials.token);
      }
      
      // Almacenar datos del usuario
      if (user) {
        localStorage.setItem('user_data', JSON.stringify(user));
      }
      
      // Almacenar información del tenant
      if (tenant) {
        localStorage.setItem('tenant_data', JSON.stringify(tenant));
      }
      
      // Almacenar información de navegación
      if (navigation) {
        localStorage.setItem('user_navigation', JSON.stringify(navigation));
      }
      
      // Almacenar recursos
      if (resources) {
        localStorage.setItem('user_resources', JSON.stringify(resources));
      }
      
      return result.data; // Devolver el objeto completo como se espera
    } else {
      // Si la respuesta no tiene el formato esperado, devolver como antes
      return result;
    }
  }

  async register(userData: { email: string; password: string; name: string }) {
    const response = await fetch(API_ENDPOINTS.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': DEFAULT_TENANT_ID,
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        tenantId: DEFAULT_TENANT_ID,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Registration error response:', errorData);
      throw new Error(errorData.error?.message || errorData.message || 'Registration failed');
    }

    return response.json();
  }

  async logout() {
    const token = this.getAuthToken();
    if (!token) {
      // Si no hay token, solo limpiar el localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_data');
      }
      return { success: true, message: 'Logged out successfully' };
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'x-tenant-id': DEFAULT_TENANT_ID,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(API_ENDPOINTS.logout, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          tenantId: DEFAULT_TENANT_ID,
        }),
      });

      // Si el logout en el servidor falla (por ejemplo, 404 porque el endpoint no existe),
      // igualmente limpiar el localStorage local
      if (!response.ok) {
        console.warn('Logout API call failed, but proceeding with local logout:', response.status, response.statusText);
        
        // Intentar parsear la respuesta como JSON, pero manejar el caso de que no sea JSON
        try {
          const errorData = await response.json();
          console.error('Logout error response:', errorData);
        } catch (e) {
          console.error('Logout response is not JSON:', await response.text());
        }
      } else {
        // Si la respuesta es exitosa, parsearla como JSON
        const result = await response.json();
        console.log('Logout successful on server:', result);
      }
    } catch (error) {
      console.error('Network error during logout:', error);
    }

    // Siempre limpiar el localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_data');
    }

    return { success: true, message: 'Logged out successfully' };
  }

  // Orbital Prime specific methods
  async getDashboardData() {
    return this.authenticatedRequest(API_ENDPOINTS.dashboard, {}, 'GET');
  }

  async getAnalyticsData() {
    return this.authenticatedRequest(API_ENDPOINTS.analytics, {}, 'GET');
  }

  async getAIModels() {
    return this.authenticatedRequest(API_ENDPOINTS.aiModels, {}, 'GET');
  }

  async getAgents() {
    return this.authenticatedRequest(API_ENDPOINTS.agents, {}, 'GET');
  }

  async performDataAudit(auditParams: any) {
    return this.authenticatedRequest(API_ENDPOINTS.dataAudit, auditParams);
  }

  async getVisionData() {
    return this.authenticatedRequest(API_ENDPOINTS.vision, {}, 'GET');
  }

  // Content generation methods
  async generatePromoImage(contentRequest: any) {
    return this.authenticatedRequest(API_ENDPOINTS.generatePromo, { contentRequest });
  }

  async generateImage(contentRequest: any) {
    return this.authenticatedRequest(API_ENDPOINTS.generateImage, { contentRequest });
  }

  async getGallery() {
    return this.authenticatedRequest(API_ENDPOINTS.gallery, {}, 'GET');
  }

  async getCredits() {
    return this.authenticatedRequest(API_ENDPOINTS.credits, {}, 'GET');
  }

  async generateContent(contentRequest: any) {
    return this.authenticatedRequest(API_ENDPOINTS.contentGenerate, { contentRequest });
  }

  async getOrders() {
    return this.authenticatedRequest(API_ENDPOINTS.orders, {}, 'GET');
  }

  // General methods
  async getUsers() {
    return this.authenticatedRequest(API_ENDPOINTS.users, {}, 'GET');
  }

  async getUserSettings() {
    return this.authenticatedRequest(API_ENDPOINTS.settings, {}, 'GET');
  }

  async updateSettings(settings: any) {
    return this.authenticatedRequest(API_ENDPOINTS.settings, settings, 'PUT');
  }

  async getNotifications() {
    return this.authenticatedRequest(API_ENDPOINTS.notifications, {}, 'GET');
  }
}

export const misybotAPI = new MisYBotAPIService();
export default MisYBotAPIService;