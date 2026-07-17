import {
  ExpressIcon,
  GitHubIcon,
  NodeIcon,
  SwaggerIcon,
} from "@/components/Icons";
import Image from "next/image";

export default function HomeScreen() {
  return (
    <section className="overflow-hidden z-2 h-screen  pt-10 max-md:mt-10 relative px-main pb-20 ">
      <div className="justify-between max-lg:flex-wrap max-lg:justify-center flex items-center h-full  ">
        <div className="max-w-2xl gap-10 flex flex-col max-lg:items-center ">
          {" "}
          <h1 className="leading-20  max-sm:leading-15 max-lg:text-center max-sm:text-start">
            <span className=" text-accent">Docify </span>– OpenAPI Generator &
            Validator for Express
          </h1>
          <p className="max-lg:text-center max-sm:text-start">
            A personal project where I built the full stack from scratch:
            Next.js UI, Express backend, and Spectral validation. No AI. Just
            your code.
          </p>
          <div className="flex flex-col gap-2">
            <button className="bg-accent text-background max-w-sm py-2 rounded-lg ">
              Try the Demo
            </button>
            <a
              title="Link on github"
              className=" max-w-sm  gap-2 flex items-center active:opacity-50 hover:opacity-70 justify-center"
              href="https://github.com/Simfort/docify">
              <GitHubIcon width={30} height={30} className="fill-foreground" />
              View on GitHub
            </a>
          </div>
        </div>
        <Image
          loading="eager"
          src={"/logoKit.png"}
          width={500}
          height={500}
          alt="Logo docify"
          className="max-w-lg w-full "
        />
      </div>
      <div className="flex justify-center   gap-10">
        {" "}
        <NodeIcon width={50} height={50} />
        <ExpressIcon width={50} height={50} className="fill-foreground" />
        <SwaggerIcon width={50} height={50} />
      </div>
      <div
        aria-hidden
        className="absolute w-1 top-0 -z-1 bg-accent rotate-z-45  h-full"></div>
      <div
        aria-hidden
        className="absolute w-1 top-0 -right-50 -z-1 bg-accent rotate-z-45  h-full"></div>
    </section>
  );
}
