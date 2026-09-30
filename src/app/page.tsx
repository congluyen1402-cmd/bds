import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import Services from "@/components/Services";
import Storytelling from "@/components/Storytelling";
import TrustAndAgents from "@/components/TrustAndAgents";
import MortgageCalculator from "@/components/MortgageCalculator";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { getSiteImages } from "@/lib/data/site-images";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  const siteImages = await getSiteImages();
  
  // Fetch up to 6 featured listings
  const listings = await prisma.listing.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <SmoothScroll>
      <Preloader />
      <Navigation />
      
      <main className="min-h-screen">
        <Hero siteImages={siteImages} />
        <FeaturedListings listings={listings} />
        <Services siteImages={siteImages} />
        <Storytelling siteImages={siteImages} />
        <TrustAndAgents />
        <MortgageCalculator />
        <ContactForm siteImages={siteImages} />
      </main>
      
      <Footer />
    </SmoothScroll>
  );
}
