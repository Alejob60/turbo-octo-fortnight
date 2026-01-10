import { NextRequest } from 'next/server';

export async function GET() {
  // Obtener la URL del backend desde las variables de entorno
  const backendUrl = process.env.NEXT_PUBLIC_MISYBOT_API_URL;

  if (!backendUrl) {
    return new Response(
      JSON.stringify({ error: 'Backend URL not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Valores estáticos para evitar uso de headers
    const authHeader = null;
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
      } catch (error: any) {
        lastError = `Error con ruta ${route}: ${error.message || error}`;
        console.log(lastError);
        continue;
      }
    }
    
    // Si ninguna ruta funcionó, devolver un error
    if (!response || response.status === 404 || response.status === 405) {
      console.error('Todas las rutas de dashboard fallaron:', lastError);
      return new Response(
        JSON.stringify({ 
          error: 'Dashboard endpoint not found in backend', 
          attemptedRoutes: possibleRoutes,
          lastError: lastError
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
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
  } catch (error) {
    console.error('Error proxying dashboard request:', error);
    return new Response(
      JSON.stringify({ error: 'Error connecting to backend service' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}