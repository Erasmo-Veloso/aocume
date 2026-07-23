import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { HowItWorks } from "@/components/home/how-it-works";
import { BusinessPackages } from "@/components/home/business-packages";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Benefits } from "@/components/home/benefits";
import { TestimonialsMedia } from "@/components/home/testimonials-media";
import { Gallery } from "@/components/home/gallery";
import { FinalCta } from "@/components/home/final-cta";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <BusinessPackages />
      <FeaturedProducts />
      <Benefits />
      <TestimonialsMedia />
      <Gallery />
      <FinalCta />
    </>
  );
}
