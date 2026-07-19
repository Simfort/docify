import "./reflies.css";
import FirstRe from "./Reflies/FirstRe";
import SecondRe from "./Reflies/SecondRe";
import ThirdRe from "./Reflies/ThirdRe";
import FourRe from "./Reflies/FourRe";
import FifthRe from "./Reflies/FifthRe";

export default function HowItFeelsDifferentScreen() {
  return (
    <section id="different" className="px-main py-10 gap-20 flex flex-col ">
      <h2 className="text-center">How It Feels Different</h2>
      <div className="grid grid-cols-2 gap-5 auto-rows-50 relative z-2  max-sm:grid-cols-1">
        <FirstRe />
        <SecondRe />
        <ThirdRe />
        <FourRe />
        <FifthRe />
      </div>
    </section>
  );
}
