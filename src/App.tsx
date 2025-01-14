import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { AppRoutes } from "./routes";
import { AppErrorBoundary } from "@/components/ErrorBoundary/AppErrorBoundary";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import ThemeSwitcher from "@/components/theme-switcher";
import LoadingSpinner from "@/components/ui/loading-spinner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      refetchInterval: 10 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
});

function App() {
  return (
    <AppErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Suspense fallback={<LoadingSpinner />}>
                <div className="min-h-screen relative">
                  <div className="absolute top-4 right-4 z-50">
                    <ThemeSwitcher />
                  </div>
                  <Suspense fallback={<LoadingSpinner />}>
                    <AppRoutes />
                  </Suspense>
                </div>
              </Suspense>
            </AuthProvider>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </AppErrorBoundary>
  );
}

export default App;
