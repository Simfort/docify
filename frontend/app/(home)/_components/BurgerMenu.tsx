"use client";
import { GitHubIcon } from "@/components/Icons";
import { FlaskConical, Info, Menu, Pickaxe, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function BurgerMenu() {
  const [openFlag, setOpenFlag] = useState(false);
  return (
    <div className="h-full   right-0 fixed w-full justify-end flex z-10 top-0  lg:hidden ">
      <button
        aria-expanded={openFlag}
        aria-label="Open Menu"
        aria-controls="burger-aside"
        className="absolute m-5 z-10"
        onClick={() => setOpenFlag(!openFlag)}>
        {openFlag ? <X /> : <Menu />}
      </button>
      <AnimatePresence mode="wait">
        {openFlag && (
          <motion.aside
            role="polite"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5 }}
            id="burger-aside"
            className="p-10 bg-background w-full h-full ">
            {" "}
            <nav className="flex gap-5 flex-col  ">
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

              <Link
                href="/how-it-works"
                className="hover:text-secondary active:text-secondary flex items-center px-2 gap-2">
                <Pickaxe size={30} /> How it Works
              </Link>
              <Link
                href="/about"
                className="hover:text-secondary active:text-secondary flex items-center px-2 gap-2">
                <Info size={30} /> About Project
              </Link>

              <Link
                href={"/gen"}
                className="hover:opacity-70 active:opacity-50 bg-accent px-2 py-2 w-full rounded-lg text-background flex items-center">
                <FlaskConical size={30} /> Demo
              </Link>
              <a
                title="Link on github"
                className="max-w-lg gap-2 flex items-center active:opacity-50 hover:opacity-70 w-full  px-2"
                href="https://github.com/Simfort/docify">
                <GitHubIcon width={30} className="fill-foreground" /> GitHub
              </a>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
