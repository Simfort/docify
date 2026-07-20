import { ACTUALS } from "@/lib/utils";

export default function WhyIsCool() {
  return (
    <section
      id="reals"
      className="px-main text-center flex flex-col gap-10 py-20 bg-card max-lg:py-10">
      <h2>Why This Matters for Real Teams </h2>
      <ol className="w-full grid grid-cols-2 gap-2 max-lg:grid-cols-1 auto-rows-fr">
        {" "}
        {ACTUALS.map((item, index) => (
          <li
            className="w-full p-5 bg-background shadow text-start flex  flex-col justify-center    rounded-lg h-full"
            key={index}>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
