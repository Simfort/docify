import { GitHubIcon, TelegramIcon } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="bg-[#1e293b] text-[#f0f4ff]   flex justify-between px-main py-5 max-sm:flex-col">
      <h6 className="max-w-lg">
        Docify – An end‑to‑end personal project: Next.js UI, Express backend,
        Spectral validation.
      </h6>
      <div className="flex items-center gap-5">
        {" "}
        <a
          href="https://github.com/Simfort"
          className="flex gap-2 hover:opacity-50 active:opacity-40">
          <GitHubIcon width={20} className="fill-white" />
          Github
        </a>{" "}
        <a
          href="https://t.me/simfart"
          className="flex gap-2 hover:opacity-50 active:opacity-40">
          <TelegramIcon width={20} />
          Telegram
        </a>
      </div>
    </footer>
  );
}
