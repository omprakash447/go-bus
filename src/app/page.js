"use client";

import { Button } from "@/components/ui/button";
import EmblaCarousel from "embla-carousel-react"; // Import Embla Carousel
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function HomePage() {
  const features = [
    {
      title: "Easy Booking",
      description: "Book tickets in just a few clicks.",
    },
    {
      title: "Live Tracking",
      description: "Track buses in real-time.",
    },
    {
      title: "Secure Payments",
      description: "100% safe & secure transactions.",
    },
  ];

  const [emblaRef, emblaApi] = EmblaCarousel({
    loop: true, // Enables infinite looping
    slidesToScroll: 1,
    align: "center",
  });

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <section className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Seamless Bus Booking & Tracking</h1>
        <p className="text-lg text-gray-600 mb-8">
          Travel with ease. Book tickets, track buses, and enjoy your journey hassle-free.
        </p>
        <Button asChild className="bg-black text-white hover:bg-gray-800">
          <Link href="/services">Explore</Link>
        </Button>
      </section>

      {/* Features Carousel Section */}
      <section className="mt-16 text-center w-full max-w-4xl">
        <h2 className="text-3xl font-semibold mb-8">Why Choose GoBus?</h2>
        <div className="relative">
          {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex-[0_0_80%] min-w-0 mx-4 p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300" // Modern card styling
                >
                  <h3 className="text-2xl font-semibold text-black mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border-gray-300 hover:bg-gray-100"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border-gray-300 hover:bg-gray-100"
            onClick={scrollNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500">
        <p>© 2025 GoBus. All rights reserved.</p>
      </footer>
    </div>
  );
}