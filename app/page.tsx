import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Manifesto />
    </div>
  );
}
