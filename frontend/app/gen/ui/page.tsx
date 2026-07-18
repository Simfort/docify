import Header from "./_components/Header";
import Paths from "./_components/Paths";

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
