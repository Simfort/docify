import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader className="text-accent size-20 animate-spin" />
    </div>
  );
}
