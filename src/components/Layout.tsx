import { Link, Outlet } from "react-router-dom";
import { useLogout } from "@/features/auth/api/auth.query";
import { AppErrorBoundary } from "./ErrorBoundary/AppErrorBoundary";

const Layout = () => {
  const { mutate: logout } = useLogout();

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={() => logout()}>Logout</button>
          </li>
        </ul>
      </nav>
      <main>
        <AppErrorBoundary>
          <Outlet />
        </AppErrorBoundary>
      </main>
    </div>
  );
};

export default Layout;
