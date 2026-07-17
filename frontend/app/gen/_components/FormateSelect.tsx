"use client";
import { Select } from "@/components/Select";
import { useSettings } from "@/lib/store/useSettings";
import { ResponsesFormats } from "@/lib/types";
import { LIST_RESPONSE } from "@/lib/utils";

export default function FormatResponse() {
  const {
    settings: { responseFormat },
    setSettings,
  } = useSettings();
  return (
    <div className="w-full">
      {" "}
      <p>Format Response</p>
      <Select
        onChange={(val) =>
          setSettings({ responseFormat: val as ResponsesFormats })
        }
        currentValue={responseFormat}
        list={LIST_RESPONSE}
      />
    </div>
  );
}
