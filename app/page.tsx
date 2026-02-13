"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./components/MobileMenu";
import { FadeIn, SlideIn, ScaleIn, StaggerContainer, StaggerItem, Counter } from "./components/AnimatedSection";
import { Carousel_001 } from "@/components/ui/skiper-ui/skiper47";

// Simple Icon Component
const Icon = ({ name, className = "w-12 h-12" }: { name: string; className?: string }) => {
  const icons: Record<string, React.JSX.Element> = {
    calculator: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="4" y="2" width="16" height="20" rx="2" strokeWidth="1" />
        <rect x="8" y="6" width="8" height="2" strokeWidth="1" fill="currentColor" />
        <rect x="8" y="11" width="2" height="2" strokeWidth="1" fill="currentColor" />
        <rect x="8" y="15" width="2" height="2" strokeWidth="1" fill="currentColor" />
        <rect x="13" y="11" width="2" height="2" strokeWidth="1" fill="currentColor" />
        <rect x="13" y="15" width="2" height="2" strokeWidth="1" fill="currentColor" />
      </svg>
    ),
    target: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth="1" />
        <circle cx="12" cy="12" r="6" strokeWidth="1" />
        <circle cx="12" cy="12" r="2" strokeWidth="1" />
      </svg>
    ),
    pen: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    feather: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 3l4 4-4 4m-5-5v12m0 0l-4 4m4-4l4 4" />
      </svg>
    ),
    brain: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    activity: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    eye: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    gem: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    book: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    trending: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    mapPin: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    phone: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    mail: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    clock: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth="1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6v6l4 2" />
      </svg>
    ),
  };

  return icons[name] || null;
};

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    message: "",
  });

  const [currentImage, setCurrentImage] = useState(0);
  const heroImages = [
    "/Images/DSC_0037-scaled-1.jpg",
    "/Images/IMG_20190930_102619.jpg",
    "/Images/WhatsApp-Image-2025-06-08-at-10.03.37_e3ac77d8.jpg",
    "/Images/WhatsApp-Image-2025-06-08-at-10.03.39_0f634c25-r70q3atn2hrk6sl09jh6d3zwf68pahr7jeygaih09s.jpg"
  ];

  const galleryImages = [
    { src: "/Images/IMG_20190930_102619.jpg", alt: "Classroom Activities" },
    { src: "/Images/WhatsApp-Image-2025-06-08-at-10.03.37_e3ac77d8.jpg", alt: "Brain Gym Sessions" },
    { src: "/Images/WhatsApp-Image-2025-06-08-at-10.03.39_0f634c25-r70q3atn2hrk6sl09jh6d3zwf68pahr7jeygaih09s.jpg", alt: "Hands-on Learning" },
    { src: "/Images/WhatsApp-Image-2025-06-08-at-10.03.37_cfe7f04f.jpg", alt: "Practice Sessions" },
    { src: "/Images/WhatsApp-Image-2025-06-08-at-10.03.38_091c0f31.jpg", alt: "Learning Support" },
    { src: "/Images/DSC_0037-scaled-1.jpg", alt: "Student Achievements" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your interest! We will contact you soon.");
    setFormData({ name: "", email: "", department: "", message: "" });
  };

  const programs = [
    {
      title: "Vedic Maths",
      description: "Ancient mathematical techniques for rapid calculations and problem-solving skills.",
      age: "11-35 years",
      icon: "calculator",
    },
    {
      title: "Pre-Abacus",
      description: "Foundation program introducing young minds to abacus concepts through play.",
      age: "4-6 years",
      icon: "target",
    },
    {
      title: "Handwriting Improvement",
      description: "Develop beautiful, legible handwriting with proper technique and practice.",
      age: "6-15 years",
      icon: "pen",
    },
    {
      title: "Calligraphy",
      description: "Master the art of beautiful writing with traditional and modern styles.",
      age: "8-18 years",
      icon: "feather",
    },
    {
      title: "Ascento Brain Gym",
      description: "Cognitive exercises to enhance memory, focus, and mental agility.",
      age: "5-15 years",
      icon: "brain",
    },
    {
      title: "Aerobics & Yoga",
      description: "Physical fitness programs promoting health, flexibility, and mindfulness.",
      age: "All ages",
      icon: "activity",
    },
  ];

  const stats = [
    { label: "Students Covered", value: 10000, suffix: "+" },
    { label: "Seminars & Institutes", value: 150, suffix: "+" },
    { label: "Parents Counsellings", value: 5000, suffix: "+" },
    { label: "Success Rate", value: 98, suffix: "%" },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Parent",
      text: "My daughter's mental math skills have improved tremendously. She's more confident and focused in all her studies!",
    },
    {
      name: "Rajesh Kumar",
      role: "Parent",
      text: "The brain gym activities have made a visible difference in my son's concentration and academic performance.",
    },
    {
      name: "Anita Verma",
      role: "Student (Age 12)",
      text: "I can now calculate faster than a calculator! Ascento Abacus has made math fun and exciting.",
    },
  ];

  const videos = [
    { id: "EPwB25kUxyU", title: "Abacus Training Overview" },
    { id: "5eSC0wF0EXE", title: "Student Achievement Highlights" },
    { id: "9gi1StcrsNw", title: "Mental Math Demonstration" },
    { id: "T1YC5Or530I", title: "Brain Gym Session" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-red-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/Images/logo1-1-e1749552992161.jpg"
                alt="Ascento Abacus Logo"
                width={60}
                height={60}
                className="rounded-full shadow-md"
              />
              <div>
                <h1 className="text-2xl font-bold text-red-600">Ascento Abacus</h1>
                <p className="text-xs text-gray-600">Unlock Your Child&apos;s Brain Power</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#home" className="text-gray-700 hover:text-red-600 transition-colors font-medium">Home</a>
              <a href="#about" className="text-gray-700 hover:text-red-600 transition-colors font-medium">About Us</a>
              <a href="#programs" className="text-gray-700 hover:text-red-600 transition-colors font-medium">Programs</a>
              <a href="#gallery" className="text-gray-700 hover:text-red-600 transition-colors font-medium">Gallery</a>
              <a href="#contact" className="text-gray-700 hover:text-red-600 transition-colors font-medium">Contact</a>
            </div>
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-rose-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <SlideIn>
              <div className="space-y-8">
                <div className="inline-block">
                  <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
                    Since 2010 • Trusted by 10,000+ Families
                  </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                  Unlock Your Child&apos;s{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">
                    Brain Power
                  </span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Advanced abacus training, mental arithmetic, and brain gym programs designed to enhance your child&apos;s creative intelligence and cognitive abilities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#contact"
                    className="group bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center"
                  >
                    New Admission
                    <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                  <a
                    href="#franchise"
                    className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold text-lg border-2 border-red-600 hover:bg-red-50 transition-all duration-300 text-center"
                  >
                    Join Our Franchise
                  </a>
                </div>
              </div>
            </SlideIn>
            <ScaleIn delay={0.2}>
              <div className="relative h-[300px] md:h-[450px] w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                <AnimatePresence>
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={heroImages[currentImage]}
                      alt="Students learning abacus"
                      fill
                      className="rounded-3xl shadow-2xl object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-rose-600">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <div className="text-center text-white">
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-red-100 font-medium">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="text-red-600">Ascento Abacus</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Ascento Abacus is the Indian subsidiary of <strong>Ascent International</strong>, a Delhi-based academy dedicated to enhancing children&apos;s creative intelligence through advanced abacus training and cognitive development programs.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Since <strong>2010</strong>, we have been using the Japanese concept of abacus teaching combined with brain gym and other cognitive development techniques to help children aged 4-15 years develop exceptional mental arithmetic skills, improved concentration, and enhanced confidence.
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
            <StaggerItem>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="text-red-600 mb-4 flex justify-center"><Icon name="target" className="w-12 h-12" /></div>
                <h3 className="text-xl font-bold mb-3 text-red-600">Our Mission</h3>
                <p className="text-gray-600">
                  To empower young minds with exceptional cognitive abilities and create confident, focused individuals.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="text-red-600 mb-4 flex justify-center"><Icon name="eye" className="w-12 h-12" /></div>
                <h3 className="text-xl font-bold mb-3 text-red-600">Our Vision</h3>
                <p className="text-gray-600">
                  To be the leading education academy transforming children&apos;s learning experiences across India.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="text-red-600 mb-4 flex justify-center"><Icon name="gem" className="w-12 h-12" /></div>
                <h3 className="text-xl font-bold mb-3 text-red-600">Our Values</h3>
                <p className="text-gray-600">
                  Excellence, innovation, and dedication to nurturing every child&apos;s unique potential.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 md:py-32 bg-gradient-to-br from-red-50 to-rose-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our <span className="text-red-600">Programs</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive programs designed to unlock your child&apos;s full potential
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <StaggerItem key={index}>
                <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-red-300 h-full">
                  <div className="text-red-600 mb-4 group-hover:scale-110 transition-transform"><Icon name={program.icon} className="w-16 h-16" /></div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{program.title}</h3>
                  <div className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    {program.age}
                  </div>
                  <p className="text-gray-600 leading-relaxed">{program.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our <span className="text-red-600">Gallery</span>
              </h2>
              <p className="text-xl text-gray-600">Moments of learning and growth</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="max-w-6xl mx-auto">
              <Carousel_001
                images={galleryImages}
                showPagination
                showNavigation
                loop
                autoplay
                className="w-full"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="text-center mt-20 mb-12">
              <h3 className="text-3xl font-bold text-gray-800">Video <span className="text-red-600">Highlights</span></h3>
              <p className="text-gray-600 mt-2">See our students in action</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {videos.map((video, index) => (
              <StaggerItem key={index}>
                <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-video bg-black group">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-red-50 to-rose-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                What <span className="text-red-600">Parents Say</span>
              </h2>
              <p className="text-xl text-gray-600">Real stories from our community</p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={index}>
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="text-red-600 text-4xl mb-4">"</div>
                  <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Franchise Section */}
      <section id="franchise" className="py-20 md:py-32 bg-gradient-to-r from-red-600 to-rose-600">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center text-white space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Start Your Own Learning Center
              </h2>
              <p className="text-xl text-red-100 leading-relaxed">
                Join our franchise family and be part of India&apos;s leading education academy. We provide comprehensive training, marketing support, and proven curriculum to help you succeed.
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
            <StaggerItem>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
                <div className="text-white mb-3 flex justify-center"><Icon name="book" className="w-10 h-10" /></div>
                <h3 className="font-bold text-lg mb-2 text-white">Complete Training</h3>
                <p className="text-red-100 text-sm">Comprehensive teacher training programs</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
                <div className="text-white mb-3 flex justify-center"><Icon name="trending" className="w-10 h-10" /></div>
                <h3 className="font-bold text-lg mb-2 text-white">Marketing Support</h3>
                <p className="text-red-100 text-sm">Full marketing and promotional assistance</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
                <div className="text-white mb-3 flex justify-center"><Icon name="target" className="w-10 h-10" /></div>
                <h3 className="font-bold text-lg mb-2 text-white">Proven Curriculum</h3>
                <p className="text-red-100 text-sm">Time-tested educational materials</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <SlideIn>
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold">
                  Get In <span className="text-red-600">Touch</span>
                </h2>
                <p className="text-xl text-gray-600">
                  Have questions? We&apos;re here to help you unlock your child&apos;s potential.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="mapPin" className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Address</h3>
                      <p className="text-gray-600">
                        D-168 C, Patel Garden, Main Dwarka Road,<br />
                        near Dwarka Hospital, Dwarka Mor,<br />
                        Dwarka, New Delhi
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="phone" className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Phone</h3>
                      <p className="text-gray-600">+91-9818613720</p>
                      <p className="text-gray-600">011 40813909</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="mail" className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-600">brainx.ascentabacus@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="clock" className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Working Hours</h3>
                      <p className="text-gray-600">Mon – Sat: 8:00 AM – 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>

            <SlideIn delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="department" className="block text-sm font-semibold text-gray-700 mb-2">
                      Department
                    </label>
                    <select
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                    >
                      <option value="">Select department</option>
                      <option value="admission">New Admission</option>
                      <option value="franchise">Franchise Inquiry</option>
                      <option value="teacher-training">Teacher Training</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <FadeIn>
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
              <div className="lg:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <Image
                    src="/Images/logo1-1-e1749552992161.jpg"
                    alt="Ascento Abacus Logo"
                    width={40}
                    height={40}
                  />
                  <h3 className="text-xl font-bold">Ascento Abacus</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Empowering young minds since 2010 with advanced abacus training and cognitive development programs.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#home" className="hover:text-red-500 transition-colors">Home</a></li>
                  <li><a href="#about" className="hover:text-red-500 transition-colors">About Us</a></li>
                  <li><a href="#programs" className="hover:text-red-500 transition-colors">Programs</a></li>
                  <li><a href="#gallery" className="hover:text-red-500 transition-colors">Gallery</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Programs</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>Vedic Maths</li>
                  <li>Handwriting Improvement</li>
                  <li>Calligraphy</li>
                  <li>Brain Gym</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Follow Us</h4>
                <div className="flex gap-4 mb-6">
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors">
                    <span className="font-bold">f</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors">
                    <span className="font-bold">𝕏</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors">
                    <span className="font-bold">in</span>
                  </a>
                </div>
                <h4 className="font-bold mb-2">Contact</h4>
                <p className="text-gray-400 text-xs">+91-9818613720</p>
              </div>

              <div className="lg:col-span-1">
                <h4 className="font-bold mb-4">Location</h4>
                <div className="rounded-xl overflow-hidden h-32 w-full shadow-lg border border-gray-800">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.47292141633!2d77.0320783!3d28.615585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d054876a6e37f%3A0x2c13c4b57d282fd5!2sASCENTO%20SCHOOL%20%26%20DAY%20CARE%20(%20ABACUS%20%26%20VEDIC%20MATHS%20CLASSES)!5e0!3m2!1sen!2sin!4v1770975895611!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
              <p>&copy; {new Date().getFullYear()} Ascento Abacus. All rights reserved. | Indian subsidiary of Ascent International</p>
            </div>
          </div>
        </FadeIn>
      </footer>
    </div>
  );
}
