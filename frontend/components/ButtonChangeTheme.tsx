"use client";
import { useTheme } from "@/lib/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export default function ButtonChangeTheme() {
  const { theme, setTheme } = useTheme();
  const handleClick = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <button onClick={handleClick} aria-label="Change theme">
      {theme === "light" ? <Sun size={30} /> : <Moon size={30} />}
    </button>
  );
}
