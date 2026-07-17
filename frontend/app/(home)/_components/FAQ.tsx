import Dialog from "@/components/Dialog";
import { QUESTIONS } from "@/lib/utils";

export default function FAQ() {
  return (
    <section className="px-main flex flex-col items-center">
      <h2>FAQ</h2>
      <div className="flex flex-col gap-5">
        {" "}
        {QUESTIONS.map((question, index) => (
          <Dialog key={index} item={question} />
        ))}
      </div>
    </section>
  );
}
