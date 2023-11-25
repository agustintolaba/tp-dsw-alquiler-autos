import MenuAppBar from '@/components/MenuAppBar';
import { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MenuAppBar isAdmin={false} />
      {children}
    </>
  );
}
