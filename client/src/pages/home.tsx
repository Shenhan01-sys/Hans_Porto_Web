import { SiteNav } from "@/components/site/site-nav";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Work } from "@/components/site/work";
import { Recognition } from "@/components/site/recognition";
import { Experience } from "@/components/site/experience";
import { Stack } from "@/components/site/stack";
import { McpSection } from "@/components/site/mcp-section";
import { Updates } from "@/components/site/updates";
import { Contact } from "@/components/site/contact";
import { SiteFooter } from "@/components/site/site-footer";
import MusicPlayer from "@/components/music-player";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Work />
        <Recognition />
        <Experience />
        <Stack />
        <McpSection />
        <Updates />
        <Contact />
      </main>
      <SiteFooter />
      <MusicPlayer audioSrc="/music/background.mp3" defaultVolume={0.3} />
    </>
  );
}
