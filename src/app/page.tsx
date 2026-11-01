import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Strap from "@/components/Strap";
import HomeStory from "@/components/HomeStory";
import HomeRange from "@/components/HomeRange";
import HomeFind from "@/components/HomeFind";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Intro />
      <Nav />
      <main>
        <Hero />
        {/* lime and grey straps crossing in an X over the seam below the hero */}
        <Strap />
        {/* the brand's promises, told over the can while scrolling */}
        <HomeStory />
        <HomeRange />
        <HomeFind />
      </main>
      <Footer />
    </>
  );
}
