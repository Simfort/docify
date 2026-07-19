import { SwaggerIcon } from "@/components/Icons";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex p-6 items-center flex-wrap">
      <Link href={"/"} className="text-4xl flex items-center">
        Docify UI{" "}
        <div className="flex gap-2 items-center justify-center">
          {" "}
          <Image
            width={80}
            height={80}
            src={"/logoKit.png"}
            alt="Logo kit png"
          />
          <Plus />
          <SwaggerIcon width={50} height={50} />
        </div>
      </Link>

      <Link
        href={"/gen"}
        className="bg-accent px-5 py-2 max-sm:mr-auto rounded-lg ml-auto">
        GO Generator
      </Link>
    </header>
  );
}
