import { Outlet } from "react-router-dom";
import { AppErrorBoundary } from "./ErrorBoundary/AppErrorBoundary";
import { Header } from "@/components/Header";
import { YazanDock } from "@/components/YazanDock";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="pt-24">
        <AppErrorBoundary>
          <Outlet />
        </AppErrorBoundary>
      </main>
      <footer className="mb-8">
        <YazanDock />
      </footer>
    </>
  );
};

export default Layout;
