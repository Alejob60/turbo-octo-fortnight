import './globals.css'
import { LanguageProvider } from '@/i18n/LanguageContext';
import AuthProviderWrapper from '@/components/AuthProviderWrapper';

export const metadata = {
  title: 'Orbital Prime',
  description: 'Infraestructura de Inteligencia Artificial para operaciones críticas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body>
        <AuthProviderWrapper>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProviderWrapper>
      </body>
    </html>
  )
}