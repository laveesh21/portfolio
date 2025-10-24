import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps {
  children?: React.ReactNode;
}

// We keep the children prop for backwards compatibility
const MainLayout = ({ children }: MainLayoutProps = { children: null }) => {
  return (
    <div className="flex flex-col min-h-screen bg-dark text-light">
      <Header />
      <main className="flex-grow bg-dark">
        <div className="w-full mx-auto">
          {children || <Outlet />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
