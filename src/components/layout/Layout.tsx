import { Navbar } from './Navbar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Navbar />
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
};