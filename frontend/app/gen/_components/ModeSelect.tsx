"use client";

import { Select } from "@/components/Select";
import { useSettings } from "@/lib/store/useSettings";
import { Modes } from "@/lib/types";
import { MODES } from "@/lib/utils";

export default function ModeSelect() {
  const {
    settings: { mode },
    setSettings,
  } = useSettings();
  return (
    <div className="w-full flex flex-col gap-2">
      <h6> Mode</h6>
      <Select
        onChange={(mode) => setSettings({ mode: mode as Modes })}
        list={MODES}
        className="w-full z-1"
        aria-label="Select mode"
        currentValue={mode}></Select>
    </div>
  );
}
