import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import PortfolioSection from '@/components/PortfolioSection'
import ExperienceSection from '@/components/ExperienceSection'
import SkillsSection from '@/components/SkillsSection'
import TechnicalSection from '@/components/TechnicalSection'
import ContactSection from '@/components/ContactSection'
import InteractiveDashboard from '@/components/InteractiveDashboard'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ExperienceSection />
        <SkillsSection />
        <TechnicalSection />
        <ContactSection />
        <InteractiveDashboard />
      </main>
    </>
  )
}
