import localFont from 'next/font/local';
import RootProvider from './providers/RootProvider';
import NavigationMenu from '@/shared/components/ui/NavigationMenu/NavigationMenu';
import './global.scss';
export const metadata = {
  title: {
    default: 'Food Project',
    template: '%s | Food Project'
  },
  description: 'Найдите  рецепты для любого случая',
  keywords: ['рецепты', 'кулинария', 'еда', 'готовка', 'блюда'],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: '/favicon.svg',
  },
};

export const roboto = localFont({
  src: [
    { path: '../Font/Roboto-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../Font/Roboto-Medium.woff2',  weight: '500', style: 'normal' },
    { path: '../Font/Roboto-Bold.woff2',    weight: '700', style: 'normal' },
  ],
  variable: '--font-roboto',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={roboto.variable}>
      <body>
        <RootProvider>
          <NavigationMenu />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
