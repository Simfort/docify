import { ExpressIcon } from "@/components/Icons";

export default function FirstRe() {
  return (
    <>
      {" "}
      <div className="reflie order-1">
        <h4>
          1.Paste your <span className="text-green-500">Express</span> code with
          JSDoc.
        </h4>
        <p>
          You’re not rewriting anything. Just use the comments you already have.
        </p>
      </div>
      <ExpressIcon className="size-full fill-foreground order-2" />
    </>
  );
}
