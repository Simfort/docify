import CodeScreen from "./_components/CodeScreen";

export const metadata = {
  title: "Generator Open API | Docify",
  description: "Generate Open API from express",
  openGraph: {
    title: "Generator Open API | Docify",
    description: "Generate Open API from express",
    url: "https://docify-anaw.vercel.app/gen",
    images: [{ url: "/logoKit.png" }],
  },
};

export default function Page() {
  return (
    <div className="pb-30  lg:min-h-screen">
      <main>
        <CodeScreen />
      </main>
    </div>
  );
}
