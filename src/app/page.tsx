import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Lineup from "@/components/Lineup";
import Ingredients from "@/components/Ingredients";
import Distributors from "@/components/Distributors";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Intro />
      <Nav />
      <ScrollReveal />
      <main>
        <Hero />
        <Lineup />
        <Ingredients />
        <Distributors />
        <About />
      </main>
      <Footer />
    </>
  );
}
