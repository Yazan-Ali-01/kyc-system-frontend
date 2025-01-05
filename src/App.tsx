import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { AppRoutes } from "./routes";
import { AppErrorBoundary } from "@/components/ErrorBoundary/AppErrorBoundary";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { ModeToggle } from "@/components/mode-toggle";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
});

function App() {
  return (
    <AppErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Suspense fallback={<p>loading...</p>}>
                <div className="min-h-screen relative">
                  <div className="absolute top-4 right-4 z-50">
                    <ModeToggle />
                  </div>
                  <Suspense fallback={<p>loading...</p>}>
                    <AppRoutes />
                  </Suspense>
                </div>
              </Suspense>
            </AuthProvider>
          </QueryClientProvider>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </AppErrorBoundary>
  );
}

export default App;
