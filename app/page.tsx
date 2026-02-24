"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FadeIn, SlideIn, ScaleIn } from "./components/AnimatedSection";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-[#f6f7f8] dark:bg-[#111921] font-sans text-[#0e141b] dark:text-slate-100 antialiased">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <SlideIn>
                <div className="flex flex-col gap-8">
                  <div className="inline-flex items-center gap-2 bg-[#197fe6]/10 text-[#197fe6] px-4 py-1.5 rounded-full w-fit">
                    <span className="material-symbols-outlined text-sm">workspace_premium</span>
                    <span className="text-xs font-bold uppercase tracking-wider">India's Leading Brain Development Program</span>
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-black leading-[1.1] text-[#0e141b] dark:text-white tracking-tight">
                    Unlock Your Child’s <span className="text-[#197fe6]">Brain Power</span>
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                    Empowering young minds through specialized abacus and cognitive training. Join 10,000+ students on a journey toward lifelong mathematical and mental excellence.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link href="/contact" className="bg-[#197fe6] hover:bg-[#197fe6]/90 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-lg shadow-[#197fe6]/20 flex items-center gap-2">
                      Enroll Your Child <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                    <Link href="/franchise" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#f59e0b] text-[#0e141b] dark:text-white px-8 py-4 rounded-xl text-base font-bold transition-all flex items-center gap-2 group">
                      <span className="text-[#f59e0b] material-symbols-outlined">storefront</span>
                      Explore Franchise Opportunity
                    </Link>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="size-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                          <Image
                            src={`https://lh3.googleusercontent.com/aida-public/AB6AXuD89qL2sG8XTu7FgZs3JP8cPv1W2Ih7MpbMaQW-rKsX6ZUruFibjUWPX89d0rUZH4YgKTLzEtenucYWUX6VRlkIu9rrCD5PO6eO2pmgHeysPNd2-qfPAlOZawHsGw6wnPnnEh4gKcPKWE5gzNAeFPRDSf_gE9nNFB3K57JKGPvynbLyGCplcogEqgnsIncls0XWi0ZRqR4bMXG24SboyS8RE5L7SrgPLwDNjNWd7gBqX-Gk7PHCDBFGxA-Su8f-Y8mUtHqMCjEPqSE`}
                            alt="Student"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <span>Trusted by 2,500+ Parents this month</span>
                  </div>
                </div>
              </SlideIn>

              <ScaleIn delay={0.2}>
                <div className="relative">
                  <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#197fe6]/5 rounded-full blur-3xl"></div>
                  <div className="rounded-3xl overflow-hidden shadow-2xl transform lg:rotate-2">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBewo1avpta46C5FKjcVXLRDCczZknlz6FSmy6NCgT0jYvQiQeQwG8vPPrPcaGkJHp1N-HJmUiQTQUBx-fB64zKrS-si2fmZz_-wSrFdVXNMXHuKpG6YzCAVV8D_F8T3L66nBr0DLRiMgKbMIK12pYUncLx8kexn7NvxoZVtbPlp3EFC8cKoudFUqE44yuWYXlPL8M72uBioBMz5DJjJtXmIGl4kYrB2K__ZdzlHD-HZcovUkqvzpWFvWdpynnz48ARlM4iT16sNPs"
                      alt="Young child learning with colorful abacus"
                      width={800}
                      height={600}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </div>
                  {/* Floating Card */}
                  <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 hidden sm:block">
                    <div className="flex items-center gap-4">
                      <div className="size-12 bg-[#f59e0b]/20 text-[#f59e0b] rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined font-bold">trending_up</span>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">IQ Improvement</p>
                        <p className="text-xl font-black text-[#0e141b] dark:text-white">+45% Avg.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScaleIn>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-white dark:bg-[#0e141b] py-12 border-y border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center border-none">
              {[
                { label: "Active Students", value: "10K+" },
                { label: "Growth Impact", value: "145K+" },
                { label: "Learning Centers", value: "50+" },
                { label: "Years Excellence", value: "15+" }
              ].map((stat, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div>
                    <p className="text-4xl font-black text-[#197fe6] mb-1">{stat.value}</p>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Overview */}
        <section className="py-20 bg-[#f6f7f8] dark:bg-[#111921]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-[#f59e0b] font-bold text-sm uppercase tracking-[0.2em] mb-4">Our Curriculum</h2>
              <h3 className="text-3xl lg:text-4xl font-black text-[#0e141b] dark:text-white">Empowering Every Learning Stage</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Abacus Mastery",
                  desc: "Foundation for mental arithmetic and lightning-fast calculations without calculators.",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdFhqG9a9-fBgKLgbNPqwnO5voA87LfZmXLxHt4dmOHXmsnYUEXMdg322k0PM-pKokF0DIHWmxw1O8JPpF_3a3W1oFpRGZC-u9f_xx3VVSu5Whbhf3kVsk_QJxoa-n8MyBzqIDsApK3bkk4a3Y8DfASHrkxFWGvvYNW7rhMvN6-1zEqR70uqtHtPDG6BYeCZGDlNTn9rTKRXy39mFzO8xucea9PwtU5_R8gTVe0iaA1FH0M9VvyMbeoVlcvsdrFYO5IOR98aqeCks"
                },
                {
                  title: "Brain Gym",
                  desc: "Cognitive enhancement exercises designed to improve focus, memory, and coordination.",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-KjGhIH5UWuoRzqykSXECuHJmSwiEhAg1Pq887ETL2CeXteE6zGQ2FmtE2TIQwE4pwpg9hWAqDpwaFIBU9FdWSb3QOh4rF1hEW_oweHQLZTbFxf1vSuiJPxoKbU5xfLxI5asllsPal1BMqRbe9nECVYcLxXos4YjvUhKB2d-UgwyY7UAiWyT6rW0J_r4gERaSLMKrDRi2joKGeEYPHLiYYfL6csQ10V89jKjrqKsl8Q4rE5h7zq3eFhgfRanDOaonuHsG9Q3Amu0"
                },
                {
                  title: "Vedic Maths",
                  desc: "Ancient speed math techniques for solving complex problems with high accuracy and speed.",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9c0zn9HjZO8j8qoRm3yqdDDmrkV5RGqYcp01fHh5-lEbey_uFdVmnceNDbSu91Q6J8N86hpnq1fohRhAkEJOYxuambigsDjfRS5P50w8fXsQXYI_7LltFP1pRdwnWyiVYTKOvLkpV1vSRWw2nj0qRI-FTVhCwI879qqV2xzG1DathRr4ZYppLEAKML_qyEAb5kRrsOBDVz8PLFkgnw3PdzN_sHycV6m2K0q_SE3_LOErGva_Fz24W9x1P4s4U2qUy0gXZm2elxi8"
                },
                {
                  title: "Pre-Abacus",
                  desc: "Gentle introduction to numbers and visualization for toddlers aged 4 to 6 years.",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8pGSOA7YE4IVngIktlp5rjhrt7XPSh2zZ6GtLBmkn2xv9057mWdDTVPPLuUqDjIvVmwjXQUMT_kVuP38Vkqh6Rp1AlbFakAaUrijdhtdKzAC1Of90EtBpD2-ealyMghqaNvujnaKoP0tExkJM_arDCuEaCussJased2VrOm8wq5ZJ0f7OmgU5smKtPQ6IDgIWM3tqPBVZr4wzEgDFNmNFgzII0jalKaGhYs8zzoE0Ys5yqm0iwm7xlvbDjSNBuTTLb8W5yfxKTdw"
                }
              ].map((prog, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="group bg-white dark:bg-slate-800 p-2 rounded-2xl border border-transparent hover:border-[#197fe6]/20 transition-all hover:shadow-xl hover:-translate-y-1 h-full">
                    <div className="aspect-square rounded-xl overflow-hidden mb-6 relative">
                      <Image
                        src={prog.img}
                        alt={prog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="px-4 pb-6">
                      <h4 className="text-xl font-bold mb-2 group-hover:text-[#197fe6] transition-colors">{prog.title}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">{prog.desc}</p>
                      <Link className="text-[#197fe6] font-bold text-sm flex items-center gap-2 group/link" href="/programs">
                        Explore Program
                        <span className="material-symbols-outlined text-base group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Value Prop Section */}
        <section className="py-24 bg-white dark:bg-[#0e141b]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-64 rounded-2xl overflow-hidden relative">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLqYt-nran1bIhAOcvpY9Lfhff-r_ju8lZewK2eE4YFper4KH4ydZ3ERpHfq5R_7-vMt7v7ESHYULelc7Hw3wkyfvS6GYuBj1A-GlvCvRc9ia1jrVoF8XZ2yBLh8WQNLtV-ekd7jOLjSqSAOVS0_M02FlRBw10QpG9K4siij_NIAu4wOGFmR3zPsOa_tnczNHP_GGBMCU0vlvHON5g2rRc2Ak0RVczdVGScRxfkR8h5pXwP5oqekMdfZ3XEMhqZl7DWYk6T0LdpAY"
                        alt="Student"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="h-40 bg-[#f59e0b]/10 rounded-2xl p-6 flex flex-col justify-end">
                      <p className="text-[#f59e0b] font-bold text-2xl">98%</p>
                      <p className="text-[#0e141b] dark:text-white text-sm font-medium">Retention Rate</p>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="h-40 bg-[#197fe6]/10 rounded-2xl p-6 flex flex-col justify-end">
                      <p className="text-[#197fe6] font-bold text-2xl">Expert</p>
                      <p className="text-[#0e141b] dark:text-white text-sm font-medium">Certified Trainers</p>
                    </div>
                    <div className="h-64 rounded-2xl overflow-hidden relative">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEcsbyTB3YQ4avcEDPiNsQKXIP1J0XQvPa-K08gMSKXiYEMlqcPouMGRf4vaK9LUbuTqQn7wb51ZakB2-4KhugYOuafW_PiFA-MCWWQz15XqBGI6P0t-0uSKDFzQ910w7sx-iaWiD_dwxgHasR6vYyxwxIWifW6moRBDIgOEMS6pX0VtERFiOXUfYB4Ds6C25QcvzsaDG621EPDND8ZLMzMojAHLz4gdzoF--texRpuPEGEkTlU1mT_76se4UQplQM5FoIHZuUCqQ"
                        alt="Teacher"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 order-1 lg:order-2 space-y-8">
                <h2 className="text-4xl font-black text-[#0e141b] dark:text-white leading-tight">Why Parents Choose <br /><span className="text-[#197fe6]">Ascento Abacus?</span></h2>
                <div className="space-y-6">
                  {[
                    { icon: "psychology", title: "Whole Brain Development", desc: "Our syllabus stimulates both left (logical) and right (creative) brain hemispheres simultaneously.", color: "bg-[#197fe6]/10 text-[#197fe6]" },
                    { icon: "emoji_events", title: "Globally Recognized", desc: "Certification that is respected worldwide, giving your child a competitive edge in global exams.", color: "bg-[#f59e0b]/10 text-[#f59e0b]" },
                    { icon: "diversity_3", title: "Small Batch Sizes", desc: "Personalized attention for every child ensures steady progress and concept clarity.", color: "bg-green-500/10 text-green-500" }
                  ].map((feature, idx) => (
                    <FadeIn key={idx} delay={idx * 0.1}>
                      <div className="flex gap-4">
                        <div className={`shrink-0 size-12 ${feature.color} rounded-xl flex items-center justify-center`}>
                          <span className="material-symbols-outlined">{feature.icon}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold mb-1">{feature.title}</h4>
                          <p className="text-slate-500 dark:text-slate-400">{feature.desc}</p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
                <Link href="/about" className="bg-[#0e141b] dark:bg-slate-700 text-white px-8 py-4 rounded-xl text-base font-bold transition-all hover:bg-slate-800 inline-flex items-center gap-2">
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#197fe6] rounded-[2rem] p-8 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Abstract Background Pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white"></path>
                </svg>
              </div>
              <div className="relative z-10 lg:w-2/3">
                <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">Start Your Entrepreneurial Journey Today</h2>
                <p className="text-blue-100 text-lg opacity-90 max-w-xl">
                  Join our network of 50+ successful centers. We provide end-to-end support, training, and marketing materials to help you succeed.
                </p>
              </div>
              <div className="relative z-10 flex flex-col gap-4 w-full lg:w-auto">
                <Link href="/franchise" className="bg-white text-[#197fe6] px-10 py-5 rounded-2xl text-lg font-bold transition-transform hover:scale-105 shadow-xl text-center">
                  Become a Franchisee
                </Link>
                <p className="text-white/80 text-center text-sm">Low Investment • High ROI • Dedicated Support</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
