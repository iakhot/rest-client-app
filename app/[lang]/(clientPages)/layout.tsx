import PrivateRoute from '@/components/common/PrivateRoute';
import { ReactNode } from 'react';

function ClientLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <PrivateRoute>
      <nav>Sidebar links</nav>
      <main>
        <h2>Using client layout</h2>
        {children}
      </main>
    </PrivateRoute>
  );
}

export default ClientLayout;
