import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <ModeToggle />
      <Button>Test</Button>
      <p>Welcome to your dashboard!</p>
    </div>
  );
};

export default DashboardPage;
