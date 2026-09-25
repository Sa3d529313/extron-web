import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Lineup from "@/components/Lineup";
import Ingredients from "@/components/Ingredients";
import About from "@/components/About";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <Intro />
      <Nav />
      <main>
        <Hero />
        <Lineup />
        {/* Shared wrapper — unified dark bg + organic lime glow bridging both sections */}
        <div className="ingredients-about-bridge relative" style={{ background: "linear-gradient(180deg, #0b0d13 0%, #06080e 50%, #05060a 100%)" }}>
          {/* Organic gradient blobs bridging across the Ingredients→About junction */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Large lime glow — left side, straddles the junction */}
            <div className="absolute left-[-10%] w-[75%]" style={{
              top: "8%",
              height: "40%",
              background: "radial-gradient(ellipse 80% 55% at 35% 55%, rgba(166,236,47,0.10), transparent 70%)",
            }} />
            {/* Offset accent glow — right side, slightly lower */}
            <div className="absolute right-[-8%] w-[55%]" style={{
              top: "14%",
              height: "30%",
              background: "radial-gradient(ellipse 65% 50% at 65% 50%, rgba(166,236,47,0.07), transparent 65%)",
            }} />
            {/* Subtle diffused fill near center */}
            <div className="absolute left-[10%] w-[80%]" style={{
              top: "12%",
              height: "25%",
              background: "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(166,236,47,0.04), transparent 60%)",
            }} />
          </div>
          <Ingredients />
          <About />
        </div>
      </main>
      <Footer />
    </>
  );
}
