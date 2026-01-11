import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  // Obtener la URL del backend desde las variables de entorno
  const backendUrl = process.env.NEXT_PUBLIC_MISYBOT_API_URL;
  
  if (!backendUrl) {
    return new Response(
      JSON.stringify({ error: 'Backend URL not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Obtener el cuerpo de la solicitud
    const body = await request.json();
    
    // Remover tenantId del cuerpo si existe, ya que el backend lo espera como header
    const { tenantId: _, ...cleanBody } = body;
    
    // Hacer la solicitud al backend real
    const response = await fetch(`${backendUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': '7ae71544-d143-4b8f-8ae9-42a8a8c3c6ba', // Usar el tenant ID predeterminado
      },
      body: JSON.stringify(cleanBody),
    });

    // Obtener los datos de la respuesta
    const data = await response.json();

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
    console.error('Error proxying login request:', error);
    return new Response(
      JSON.stringify({ error: 'Error connecting to backend service' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}