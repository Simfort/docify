import { PAINS } from "@/lib/utils";
import PainItem from "./PainItem";

export default function WhereThePainScreen() {
  return (
    <section
      id="pains"
      className="min-h-screen py-20 bg-secondary/5 gap-10 flex flex-col items-center justify-center px-main">
      <h2 className="leading-6">
        The Pain <div className="bg-accent h-2  w-full" />
      </h2>

      <div className="flex perspective-distant transform-3d justify-center flex-wrap  gap-5">
        {PAINS.map((item, index) => (
          <PainItem index={index} key={index}>
            {item}
          </PainItem>
        ))}
      </div>
      <p className="text-secondary bg-background shadow p-5 rounded-lg">
        Docify flips this: the source of truth stays in your Express code; the
        spec is generated, not written.
      </p>
    </section>
  );
}
