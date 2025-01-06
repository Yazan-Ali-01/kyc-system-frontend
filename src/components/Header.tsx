import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useLogout } from "@/features/auth/api/auth.query";
import { Menu } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { mutate: logout } = useLogout();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const navigationLinks = isAdmin
    ? [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/admin/kyc-reviews", label: "KYC Reviews" },
        { to: "/admin/reports", label: "Reports" },
      ]
    : [
        { to: "/dashboard", label: "Home" },
        { to: "/profile", label: "Profile" },
      ];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 transition-all duration-500 w-full",
        scrolled ? "h-auto" : "h-24"
      )}
    >
      <div
        className={cn(
          "transition-all duration-300 h-full",
          scrolled
            ? "bg-white shadow-lg lg:rounded-full py-2 px-4 lg:w-[70%] mx-auto lg:mt-4"
            : "w-full px-4 sm:px-6 lg:px-8"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between h-full",
            scrolled ? "max-w-none" : "max-w-7xl mx-auto"
          )}
        >
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.jpeg"
              alt="Logo"
              width={36}
              height={36}
              className="w-9 h-9"
            />
            <span
              className={cn(
                "font-semibold text-lg",
                scrolled ? "text-gray-700" : ""
              )}
            >
              KYC Assessment
            </span>
          </Link>

          <nav
            className={cn(
              "hidden md:flex items-center",
              scrolled ? "gap-4" : "gap-8"
            )}
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "text-sm font-medium hover:text-primary transition-colors px-4 py-2 hover:bg-slate-200 rounded-2xl",
                  scrolled ? "text-gray-700" : ""
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button
              asChild
              className={cn(
                "transition-all duration-300",
                scrolled
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-primary/90 hover:bg-primary"
              )}
              onClick={() => logout()}
            >
              <Link to="/logout">Logout</Link>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className={cn("h-6 w-6", scrolled ? "text-black" : "")} />
              <span className="sr-only">Open main menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`
    md:hidden 
    fixed 
    inset-x-0 
    transform 
    transition-all
    duration-150 
    ease-in-out
    ${
      mobileMenuOpen
        ? "translate-y-0 opacity-100 visible"
        : "-translate-y-full opacity-0 invisible"
    }
  `}
        >
          <div className="bg-gray-100 rounded-b-lg shadow-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
