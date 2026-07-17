"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function Select({
  className,
  onChange,
  currentValue,
  defaultValue,
  list,
  ...props
}: {
  onChange?: (currentValue: number) => void;
  defaultValue?: string;
  currentValue: number;
  list: (string | React.ReactNode)[];
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState(false);

  return (
    <div
      {...props}
      className={`${className} relative px-5 py-2  rounded-lg shadow outline-0 bg-background`}>
      <button
        className="flex items-center w-full justify-between"
        aria-expanded={open}
        onClick={() => setOpen(!open)}>
        {defaultValue || list[currentValue]}
        <span>
          {open ? (
            <ChevronUp className="pointer-events-none" />
          ) : (
            <ChevronDown className="pointer-events-none" />
          )}
        </span>
      </button>

      {open && (
        <ul className="absolute w-full left-0 mt-2 top-9   z-5 bg-background shadow rounded-lg ">
          {list.map((item, index) => (
            <Option
              current={currentValue}
              key={index}
              content={item}
              index={index}
              onChange={onChange}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
export function Option({
  content,
  onChange,
  current,
  index,
}: {
  content: string | React.ReactNode;
  index: number;
  current: number;
  onChange?: (currentValue: number) => void;
}) {
  const handleChange = () => {
    if (onChange) onChange(index);
  };
  return (
    <li
      onClick={handleChange}
      className={`${current === index ? "border-l" : ""}  py-1  `}>
      <button className="w-full text-start hover:bg-secondary/20  px-5 rounded-lg">
        {content}
      </button>
    </li>
  );
}
