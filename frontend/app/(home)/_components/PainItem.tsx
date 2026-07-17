"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowDown, X } from "lucide-react";
import { PAINS } from "@/lib/utils";

export default function PainItem({
  children,
  index,
}: React.PropsWithChildren<{ index: number }>) {
  const itemRef = useRef<HTMLDivElement | null>(null);

  const inView = useInView(itemRef, { once: true });

  return (
    <motion.div
      className="p-5 bg-card  hover:rotate-y-12 transition-transform duration-200 shadow rounded-lg flex items-center"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: 0.5 * index }}
      ref={itemRef}>
      <div className="flex flex-col gap-5">
        {" "}
        <h4>{index + 1}.Stage</h4>
        <p>{children}</p>{" "}
        {PAINS.length === index + 1 ? (
          <X size={30} className="text-error" />
        ) : (
          <ArrowDown size={30} />
        )}
      </div>
    </motion.div>
  );
}
