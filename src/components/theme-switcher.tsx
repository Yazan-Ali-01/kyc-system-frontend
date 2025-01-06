import { useState, useEffect } from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { Theme, useTheme } from "@/components/theme-provider";

const themes = [
  { name: "light", icon: Sun },
  { name: "dark", icon: Moon },
  { name: "system", icon: Laptop },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg flex space-x-2">
      {themes.map((t) => (
        <button
          key={t.name}
          onClick={() => setTheme(t.name as Theme)}
          className={`p-2 rounded-full transition-all duration-300 ease-in-out ${
            theme === t.name
              ? "bg-primary text-primary-foreground scale-110"
              : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          }`}
          aria-label={`Switch to ${t.name} theme`}
        >
          <t.icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
}
