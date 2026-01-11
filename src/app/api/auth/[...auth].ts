import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { pathname, searchParams } = new URL(request.url);
    const path = pathname.replace('/api/auth', '');
    const queryString = searchParams.toString();
    const backendUrl = `${process.env.NEXT_PUBLIC_MISYBOT_API_URL}${path}${queryString ? `?${queryString}` : ''}`;
    
    const body = await request.json();
    
    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...request.headers,
      },
      body: JSON.stringify(body),
    });
    
    const data = await backendResponse.json();
    
    return NextResponse.json(data, {
      status: backendResponse.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Error de conexión con el backend' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { pathname, searchParams } = new URL(request.url);
    const path = pathname.replace('/api/auth', '');
    const queryString = searchParams.toString();
    const backendUrl = `${process.env.NEXT_PUBLIC_MISYBOT_API_URL}${path}${queryString ? `?${queryString}` : ''}`;
    
    const backendResponse = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        ...request.headers,
      },
    });
    
    const data = await backendResponse.json();
    
    return NextResponse.json(data, {
      status: backendResponse.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Error de conexión con el backend' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}