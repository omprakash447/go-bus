"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BusFront, Calendar, Clock, CreditCard, MapPin, PhoneCall, Shield, Star, Ticket, TrainFront, Users, Wifi } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AboutUs() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <h1 className="text-5xl font-bold text-gray-900">
          About <span className="text-blue-600">Go-Bus</span>
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
          Go-Bus is a next-generation transportation service designed to provide real-time tracking, seamless booking, and comfortable travel. Our mission is to make your daily commute **fast, secure, and stress-free.**
        </p>
      </section>

      {/* Our Services */}
      <section className="py-12 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-center text-gray-900">🚍 Our Services</h2>
        <p className="text-gray-600 text-center mt-3">
          We offer a variety of services to enhance your journey. Explore what makes Go-Bus the best choice for your travel needs.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: BusFront, title: "Real-Time Bus Tracking", desc: "Track your bus in real-time and never miss your ride again." },
            { icon: Clock, title: "Accurate Schedules", desc: "Plan your trip with up-to-date bus schedules and timely departures." },
            { icon: MapPin, title: "Multiple Routes", desc: "Navigate through the best routes with seamless connectivity." },
            { icon: Users, title: "Easy Online Booking", desc: "Book your tickets instantly through our website and mobile app." },
            { icon: Shield, title: "Safe & Secure Rides", desc: "Your safety is our priority with GPS tracking and verified drivers." },
            { icon: Star, title: "Affordable Pricing", desc: "Enjoy cost-effective and comfortable travel with Go-Bus." },
            { icon: Wifi, title: "Free Wi-Fi", desc: "Stay connected on the go with our high-speed onboard Wi-Fi." },
            { icon: Calendar, title: "Flexible Bookings", desc: "Change or cancel your tickets with ease." },
            { icon: CreditCard, title: "Multiple Payment Options", desc: "Pay using cards, wallets, or cash for convenience." },
            { icon: PhoneCall, title: "24/7 Customer Support", desc: "Our support team is available around the clock to assist you." },
            { icon: Ticket, title: "E-Tickets & QR Codes", desc: "Say goodbye to paper tickets with digital booking." },
            { icon: TrainFront, title: "Intercity & Local Services", desc: "We cover both **city commutes** and **long-distance travel.**" },
          ].map((service, index) => (
            <Card key={index} className="bg-black text-white border border-gray-700 shadow-lg hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <service.icon className="text-blue-400 w-12 h-12 mx-auto" />
                <CardTitle className="text-lg mt-3">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400 text-center">{service.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 px-6 md:px-20 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center text-gray-900">🌟 Why Choose Go-Bus?</h2>
        <p className="text-gray-600 text-center mt-3 max-w-3xl mx-auto">
          Our mission is to offer **safe, efficient, and affordable** bus services to millions of travelers.
        </p>
        <ul className="mt-6 space-y-4 max-w-3xl mx-auto">
          <li className="flex items-center gap-3">
            ✅ <strong>Reliable Service:</strong> Our buses run on schedule with real-time updates.
          </li>
          <li className="flex items-center gap-3">
            ✅ <strong>Comfortable Travel:</strong> Well-maintained buses with **AC, Wi-Fi, and charging ports**.
          </li>
          <li className="flex items-center gap-3">
            ✅ <strong>Eco-Friendly Approach:</strong> We support **green travel** with fuel-efficient buses.
          </li>
        </ul>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-12 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-center text-gray-900">❓ Frequently Asked Questions</h2>
        <div className="mt-8">
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {[
              { 
                question: "How do I track my bus in real-time?", 
                answer: "Simply open the Go-Bus app or website, enter your route, and see live tracking updates." 
              },
              { 
                question: "Is Go-Bus available in my city?", 
                answer: "We are constantly expanding! Check our service areas on our website." 
              },
              { 
                question: "Can I book a seat in advance?", 
                answer: "Yes, you can reserve a seat using our app or website." 
              },
              { 
                question: "What if my bus is delayed?", 
                answer: "You will receive real-time notifications about any delays." 
              },
              { 
                question: "Are the buses equipped with charging ports?", 
                answer: "Yes, most of our buses offer charging ports for mobile devices." 
              }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="border border-gray-700 bg-black text-white rounded-lg shadow-md mb-4">
                <AccordionTrigger className="text-white px-4 py-3 text-lg font-semibold hover:text-gray-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-4 py-2">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Us */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">📞 Contact Us</h2>
        <p className="mt-4 text-lg text-gray-600">Need help? Our support team is here for you.</p>
        <Button
          className="mt-6 bg-black hover:bg-gray-800 px-6 py-3 font-semibold rounded-lg text-white"
          onClick={() => router.push("/contact")}
        >
          Contact Support
        </Button>
      </section>
    </div>
  );
}
