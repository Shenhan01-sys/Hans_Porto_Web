import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import EducationSection from "@/components/education-section";
import SkillsSection from "@/components/skills-section";
import ExperienceSection from "@/components/experience-section";
import AchievementsSection from "@/components/achievements-section";
import ProjectsSection from "@/components/projects-section";
import NewsSection from "@/components/news-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import MusicPlayer from "@/components/music-player";
import BackgroundAnimation from "@/components/ui/BackgroundAnimation";

export default function Home() {
  return (
    <div className="text-foreground relative min-h-screen">
      {/* Interactive AI Background Animation */}
      <BackgroundAnimation />
      <Navigation />
      {/* Background Music Player - Place your audio file in /public/music/ */}
      <MusicPlayer audioSrc="/music/background.mp3" defaultVolume={0.3} />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ExperienceSection />
        <AchievementsSection />
        <ProjectsSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
