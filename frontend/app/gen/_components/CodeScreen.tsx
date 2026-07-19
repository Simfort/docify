import Image from "next/image";
import Settings from "./Settings";
import Link from "next/link";
import CodeContainer from "./CodeContainer";
import { CircleAlert } from "lucide-react";

export default function CodeScreen() {
  return (
    <section className=" px-main">
      <div className="flex justify-between py-2 items-center max-lg:flex-col ">
        <Link href={"/"} className="flex items-center">
          <Image
            src={"/logoKit.png"}
            width={50}
            height={50}
            alt="Logo docify"
          />
          Docify
        </Link>
      </div>{" "}
      <hr className="text-accent" />{" "}
      <h2 className="text-center flex items-center flex-col">
        <div className="w-max relative max-sm:text-3xl ">
          Welcome to converter{" "}
          <div
            aria-hidden
            className="bg-accent h-2 w-full top-15 absolute"></div>
        </div>
      </h2>
      <Settings />{" "}
      <div className="bg-card max-w-lg p-5 text-secondary text-sm items-startshadow rounded-lg flex gap-2 my-2">
        <CircleAlert />
        <p className=" leading-7">
          Start writing code,what save code and see openapi press on keyboard{" "}
          <span className="bg-background p-2 rounded-lg ">Ctrl+S</span>
        </p>
      </div>
      <CodeContainer />
    </section>
  );
}
