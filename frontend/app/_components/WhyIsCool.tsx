import { ACTUALS } from "@/lib/utils";

export default function WhyIsCool() {
  return (
    <section className="px-main text-center flex flex-col gap-10 py-20 bg-card max-sm:py-10">
      <h2>Why This Matters for Real Teams </h2>
      <ol className="flex flex-wrap items-center gap-5 w-full justify-center">
        {" "}
        {ACTUALS.map((item, index) => (
          <li
            className="max-w-lg p-2 bg-background shadow   max-sm:p-10 rounded-lg h-full"
            key={index}>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
