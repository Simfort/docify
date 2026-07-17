"use client";
import Input from "@/components/Input";
import { useSettings } from "@/lib/store/useSettings";

export default function RootInput() {
  const {
    settings: { root },
    setSettings,
  } = useSettings();
  return (
    <div className="flex flex-col">
      <label htmlFor="root">Root name</label>
      <Input
        defaultValue={root}
        name="root"
        onChange={(e) => setSettings({ root: e.target.value })}
        placeholder="app"
        className="max-w-2xs"
      />
    </div>
  );
}
