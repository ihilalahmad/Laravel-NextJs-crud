import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/navbar';
import { AppProvider } from '@/context/app_provider';
import ClientLayout from '@/app/client_layout';

export const metadata: Metadata = {
  title: 'Laravel + NextJs Crud',
  description: 'CRUD app built using NextJs and Laravel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayout>{children}</ClientLayout>;
}
