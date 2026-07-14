import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex py-5 fixed w-full bg-background z-1 top-0 px-main justify-between  items-center max-sm:hidden">
      <Link href="/" className="text-lg flex items-center gap-2">
        <Image
          src={"/logoKit.png"}
          width={40}
          height={40}
          alt="Logo docify"
          className="max-w-lg "
        />{" "}
        Docify
      </Link>

      <nav className="flex items-center gap-8">
        <Link href="/how-it-works" className="hover:text-secondary">
          How it Works
        </Link>
        <Link href="/about" className="hover:text-secondary">
          About Project
        </Link>
      </nav>

      <div className="flex gap-4">
        <Link
          href={"/gen"}
          className="hover:opacity-70 active:opacity-50 bg-accent px-2 py-2  rounded-lg text-background">
          Demo
        </Link>
        <a
          title="Link on github"
          className="max-w-lg gap-2 flex items-center active:opacity-50 hover:opacity-70 justify-center"
          href="https://github.com/Simfort/docify">
          GitHub
        </a>
      </div>
    </header>
  );
}
