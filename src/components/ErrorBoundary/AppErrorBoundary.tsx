import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

export const AppErrorBoundary = ({ children }: AppErrorBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={reset}
      onError={(error: unknown) => {
        // Log to your error reporting service
        console.error("Error caught by boundary:", error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
