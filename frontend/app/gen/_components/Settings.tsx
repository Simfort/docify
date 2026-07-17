"use client";

import { useEffect, useRef, useState } from "react";
import SettingsItems from "./SettingsItems";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Settings() {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const section = sectionRef.current;

      if (section && section.contains(target)) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-lg my-5 relative rounded-lg bg-card">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="flex w-full  px-5 py-3 items-center text-left">
        Settings{" "}
        {open ? (
          <ChevronUp className="pointer-events-none" />
        ) : (
          <ChevronDown className="pointer-events-none" />
        )}
      </button>

      {open && <SettingsItems />}
    </section>
  );
}
