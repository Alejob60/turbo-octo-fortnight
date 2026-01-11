import { NextRequest } from 'next/server';

// Datos mock para evitar dependencias de backend durante build
const MOCK_DASHBOARD_DATA = {
  success: true,
  data: {
    kpis: [
      { id: 1, title: 'Usuarios Activos', value: '1,248', trend: '+12%' },
      { id: 2, title: 'Ingresos', value: '$45,230', trend: '+8%' },
      { id: 3, title: 'Tareas Completadas', value: '89%', trend: '+3%' }
    ],
    chartData: [
      { name: 'Ene', value: 400 },
      { name: 'Feb', value: 300 },
      { name: 'Mar', value: 600 },
      { name: 'Abr', value: 800 },
      { name: 'May', value: 500 }
    ]
  }
};

export async function GET(request: NextRequest) {
  // Durante el build, devolver datos mock
  // En producción, se puede conectar al backend real
  
  const isBuildProcess = process.env.NODE_ENV === 'production' && 
                         !process.env.VERCEL_ENV && 
                         !request.headers.get('x-vercel-id');
  
  if (isBuildProcess) {
    // Devolver datos mock durante el build para evitar errores
    return new Response(
      JSON.stringify(MOCK_DASHBOARD_DATA),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
  
  // Obtener la URL del backend desde las variables de entorno
  const backendUrl = process.env.NEXT_PUBLIC_MISYBOT_API_URL;

  if (!backendUrl) {
    // Si no hay backend configurado, devolver datos mock
    return new Response(
      JSON.stringify(MOCK_DASHBOARD_DATA),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }

  try {
    // Valores estáticos para evitar uso de headers
    const authHeader = null; // eslint-disable-line @typescript-eslint/no-unused-vars
    const tenantId = '7ae71544-d143-4b8f-8ae9-42a8a8c3c6ba';
    
    // Definir posibles rutas para el dashboard
    const possibleRoutes = [
      '/auth/dashboard',
      '/api/dashboard',
      '/dashboard',
      '/api/auth/dashboard',
      '/api/v1/dashboard',
      '/api/orbital/dashboard',
      '/api/data/dashboard',
      '/api/analytics'
    ];
    
    let response;
    let data;
    let lastError;
    
    // Intentar cada ruta posible hasta que una funcione
    for (const route of possibleRoutes) {
      try {
        console.log(`Intentando ruta: ${backendUrl}${route}`);
        
        response = await fetch(`${backendUrl}${route}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-tenant-id': tenantId,
          },
        });
        
        // Si la respuesta es exitosa, salir del bucle
        if (response.status !== 404 && response.status !== 405) {
          data = await response.json();
          break;
        } else {
          lastError = `Ruta ${route} no encontrada`;
        }
      } catch (error: unknown) {
        lastError = `Error con ruta ${route}: ${error instanceof Error ? error.message : String(error)}`;
        console.log(lastError);
        continue;
      }
    }
    
    // Si ninguna ruta funcionó, devolver datos mock
    if (!response || response.status === 404 || response.status === 405) {
      console.warn('Backend no disponible, usando datos mock:', lastError);
      return new Response(
        JSON.stringify(MOCK_DASHBOARD_DATA),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    // Devolver la respuesta del backend con el mismo estado
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-tenant-id',
      },
    });
  } catch (error: unknown) {
    console.warn('Error conectando al backend, usando datos mock:', error instanceof Error ? error.message : String(error));
    // En caso de error, devolver datos mock
    return new Response(
      JSON.stringify(MOCK_DASHBOARD_DATA),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}