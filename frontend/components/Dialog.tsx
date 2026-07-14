"use client";
import { Question } from "@/lib/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Dialog({ item }: { item: Question }) {
  const [openFlag, setOpenFlag] = useState(false);
  const id = `faq-${item.question}`; // или лучше использовать стабильный ID из item.id

  return (
    <button
      className="max-w-lg cursor-pointer bg-card relative z-2 shadow text-start rounded-lg p-5 w-full"
      onClick={() => setOpenFlag(!openFlag)}
      aria-expanded={openFlag}
      aria-controls={id}>
      <div className="flex justify-between ">
        <h6>{item.question}</h6>
        {openFlag ? <ChevronUp /> : <ChevronDown />}
      </div>
      <AnimatePresence mode="wait">
        {" "}
        {openFlag && (
          <motion.p
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            id={id}
            className="text-secondary  overflow-hidden ">
            {item.answer}
          </motion.p>
        )}
      </AnimatePresence>
    </button>
  );
}
