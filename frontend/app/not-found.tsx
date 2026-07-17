import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pb-20">
      <main className="h-screen flex flex-col items-center justify-center">
        <h1>
          NOT FOUND <span className="text-accent">404</span>
        </h1>
        <Link href={"/"} className="hover:opacity-50">
          Home
        </Link>
      </main>
    </div>
  );
}
