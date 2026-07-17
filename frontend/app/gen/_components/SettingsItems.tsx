import ModeSelect from "./ModeSelect";
import FormatResponse from "./FormateSelect";
import RootInput from "./RootInput";
import CheckBoxAi from "./CheckBoxAI";

export default function SettingsItems() {
  return (
    <div className="py-5 absolute z-10 bg-card shadow shadow-secondary/10 flex flex-col gap-2 top-14 rounded-lg  p-5">
      {" "}
      <h6>Format</h6>
      <div className="flex items-center gap-5">
        <RootInput />
        <FormatResponse />
      </div>
      <div className="flex items-center">
        <ModeSelect />
      </div>
      <CheckBoxAi />
      <button className="bg-accent px-5 py-2 rounded-lg mt-2">Save</button>
    </div>
  );
}
