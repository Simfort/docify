import { OpenApiIcon } from "@/components/Icons";

export default function ThirdRe() {
  return (
    <>
      <div className="reflie order-5">
        <h4>
          3.Get a live <span className="text-emerald-700">OpenAPI 3.0 </span>{" "}
          spec.
        </h4>
        <p>It reflects exactly what your server actually implements.</p>
      </div>{" "}
      <OpenApiIcon className="size-full order-6" />
    </>
  );
}
