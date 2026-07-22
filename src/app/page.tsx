import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { HowItWorks } from "@/components/home/how-it-works";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Benefits } from "@/components/home/benefits";
import { Testimonials } from "@/components/home/testimonials";
import { Gallery } from "@/components/home/gallery";
import { FinalCta } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <FeaturedProducts />
      <Benefits />
      <Testimonials />
      <Gallery />
      <FinalCta />
    </>
  );
}
