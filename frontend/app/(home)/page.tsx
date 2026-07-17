import BeforeAfter from "./_components/BeforeAfter";
import FAQ from "./_components/FAQ";
import HomeScreen from "./_components/HomeScreen";
import HowItFeelsDifferentScreen from "./_components/HowItFeelsDifferentScreen";
import WhereThePainScreen from "./_components/WhereThePainScreen";
import WhyIsCool from "./_components/WhyIsCool";

export default function Home() {
  return (
    <div className="pb-20">
      <main>
        <HomeScreen />
        <WhereThePainScreen />
        <HowItFeelsDifferentScreen />
        <WhyIsCool />
        <BeforeAfter />
        <FAQ />
      </main>
    </div>
  );
}
