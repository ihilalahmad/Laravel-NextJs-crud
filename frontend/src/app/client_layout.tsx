'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/navbar';
import { AppProvider } from '@/context/app_provider';

const ClientLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en'>
      <body>
        <AppProvider>
          <Toaster />
          <Navbar />
          <main className='flex-grow'>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
};

export default ClientLayout;
