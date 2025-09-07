import { ReactNode } from 'react';

function ClientLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <nav>Sidebar links</nav>
      <main>
        <h2>Using client layout</h2>
        {children}
      </main>
    </>
  );
}

export default ClientLayout;
