import Image from "next/image";
import Settings from "./Settings";
import Link from "next/link";
import CodeContainer from "./CodeContainer";
import { CircleAlert } from "lucide-react";

export default function CodeScreen() {
  return (
    <section className="h-full p-5">
      <div className="flex justify-between items-center ">
        {" "}
        <h2>Write code</h2>
        <h1>
          <Link href={"/"} className="flex items-center">
            <Image
              src={"/logoKit.png"}
              width={70}
              height={70}
              alt="Logo docify"
            />
            Docify
          </Link>
        </h1>
        <h2>Response</h2>
      </div>{" "}
      <hr className="text-accent" />
      <Settings />{" "}
      <div className="bg-card max-w-lg p-5 text-secondary  items-startshadow rounded-lg flex gap-2 my-2">
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
