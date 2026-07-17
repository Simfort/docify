"use client";
import { ClickIcon } from "@/components/Icons";
import { useRouter } from "next/navigation";

export default function SecondRe() {
  const router = useRouter();
  return (
    <>
      <ClickIcon className="size-full order-3 max-sm:order-4" />
      <div className="reflie order-4 max-sm:order-3">
        <h4>2.Click “Generate.”</h4>
        <p>
          Next.js sends the code to your Express service; no extra config, no
          new decorators.
        </p>
        <button
          onClick={() => router.push("/gen")}
          className=" px-5 py-2 text-background bg-accent rounded-lg">
          Let`s Go
        </button>
      </div>
    </>
  );
}
