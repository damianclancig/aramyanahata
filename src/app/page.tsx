import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { Products } from "@/components/landing/Products";
import { About } from "@/components/landing/About";
import { Testimonials } from "@/components/landing/Testimonials";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";
import { SectionSeparator } from "@/components/landing/SectionSeparator";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <SectionSeparator invisible />
        <Services />
        <SectionSeparator />
        <Products />
        <SectionSeparator />
        <About />
        <SectionSeparator />
        <Testimonials />
        <SectionSeparator />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
