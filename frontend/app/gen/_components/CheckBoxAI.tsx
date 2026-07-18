import { useSettings } from "@/lib/store/useSettings";
import { Check, Star } from "lucide-react";

export default function CheckBoxAi() {
  const { settings, setSettings } = useSettings();

  return (
    <div className="flex gap-2 ">
      <p className="bg-linear-to-r from-accent to-success w-max flex gap-2 items-center bg-clip-text text-transparent">
        <Star className="text-yellow-300" /> With AI
      </p>
      <button
        onClick={() => setSettings({ ai: !settings.ai })}
        className={`bg-background rounded-lg p-1 size-7`}>
        {settings.ai && (
          <div className="bg-success size-full flex items-center justify-center rounded-lg pointer-events-none">
            <Check className="text-background" />
          </div>
        )}
      </button>
    </div>
  );
}
