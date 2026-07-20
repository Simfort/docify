"use client";
import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light" | "">("");

  useEffect(() => {
    const handleChangeTheme = () => {
      if (window) {
        if (theme) {
          localStorage.setItem("theme", theme);
          document.body.setAttribute("data-theme", theme);
        } else {
          const themeLoc = localStorage.getItem("theme") as "dark" | "light";
          if (themeLoc) {
            setTheme(themeLoc);
          }
        }
      }
    };
    handleChangeTheme();
  }, [theme]);
  return { theme, setTheme };
}
