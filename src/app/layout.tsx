import './globals.css'
import { LanguageProvider } from '@/i18n/LanguageContext';
import AuthProviderWrapper from '@/components/AuthProviderWrapper';
import { metadata as layoutMetadata } from './metadata';

export const metadata = layoutMetadata;

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