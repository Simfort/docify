import Image from "next/image";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import ButtonChangeTheme from "@/components/ButtonChangeTheme";

export default function Header() {
  return (
    <header>
      <BurgerMenu />
      <div className="flex py-5 fixed w-full bg-background z-10 top-0 px-main justify-between  items-center max-lg:hidden">
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
          <Link
            href="#pains"
            className="hover:text-secondary active:text-secondary flex items-center px-2 gap-2">
            Pains
          </Link>
          <Link
            href="#different"
            className="hover:text-secondary active:text-secondary flex items-center px-2 gap-2">
            How It Feels Different
          </Link>{" "}
          <Link
            href="#reals"
            className="hover:text-secondary active:text-secondary flex items-center px-2 gap-2">
            Real Teams
          </Link>{" "}
          <Link
            href="#example"
            className="hover:text-secondary active:text-secondary flex items-center px-2 gap-2">
            Example
          </Link>{" "}
          <Link
            href="#faq"
            className="hover:text-secondary active:text-secondary flex items-center px-2 gap-2">
            FAQ
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
          <ButtonChangeTheme />
        </div>
      </div>
    </header>
  );
}
