import Header from "./_components/Header";
import Paths from "./_components/Paths";

export const metadata = {
  title: "Docify UI Open API",
  description: "UI to Open API",
  openGraph: {
    title: "Docify UI Open API",
    description: "UI to Open API",
    url: "https://docify-anaw.vercel.app/gen/ui",
    images: [{ url: "/logoKit.png" }],
  },
};

export default function Page() {
  return (
    <div>
      <Header />
      <main className="min-h-screen pb-10">
        <Paths />
      </main>
    </div>
  );
}
