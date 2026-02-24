"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FadeIn, SlideIn, ScaleIn } from "../components/AnimatedSection";

export default function ProgramsPage() {
    return (
        <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-[#f6f7f8] dark:bg-[#111921] font-sans text-slate-900 dark:text-slate-100 antialiased">
            <Navbar />

            {/* Hero Section */}
            <header className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 -z-10 opacity-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#197fe6_0%,_transparent_70%)]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block py-1 px-4 rounded-full bg-[#197fe6]/10 text-[#197fe6] text-sm font-semibold mb-4 tracking-wide uppercase">Brain Development Center</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                        Our Specialized Programs
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                        Empowering young minds through our signature <span className="text-[#197fe6] font-semibold">"two-hand, four-finger"</span> methodology. We focus on holistic growth, combining ancient wisdom with modern cognitive science.
                    </p>
                </div>
            </header>

            {/* Program Filter Chips */}
            <section className="pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-3">
                    <button className="px-6 py-2 rounded-full bg-[#197fe6] text-white font-medium">All Programs</button>
                    <button className="px-6 py-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#197fe6] transition-all">Cognitive</button>
                    <button className="px-6 py-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#197fe6] transition-all">Maths</button>
                    <button className="px-6 py-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#197fe6] transition-all">Creative Arts</button>
                    <button className="px-6 py-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#197fe6] transition-all">Wellness</button>
                </div>
            </section>

            {/* Main Programs Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Advanced Abacus",
                            age: "Ages 6-14",
                            icon: "calculate",
                            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhxpCQcxOWPPJOiBRJdGH9yhTImuJ7tUqXHO5p_3Xzd5qTDrNUBv6yN-_gV39OdDSv9CyCOvBVHt6aI4_kJQW-v_3S9WG7CAqw8V4svqejfeNzPEJr7HBt5h6E6dFH0rZZyaTPT0w-Vm3lvSdj0HKJBK6_DTS7Cr3H2tgW6XAQdrVxrY8bscRDRYsRrtvTtyLmzR6H4WQ_f04l2F_1l7cRsZBwDgHHB6Y4w63JIwcvoLxb1qTDTjn0cfdbt-Cu9DTxzmhJ9ntO3VU",
                            points: ["Mastery of the 'Two-Hand, Four-Finger' technique", "Enhanced visualization and photographic memory", "Lightning-fast mental calculation speed"]
                        },
                        {
                            title: "Brain Gym",
                            age: "Ages 5-15",
                            icon: "psychology",
                            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAH2n5Ks-2fE2iG1PiG_zrn23ag-IkOm2jRMFBryZa_wxOmRaauMHrh5O4oTWsrNeznraqGhYQEKOqZhXtzh5TtPwTDZuCvSHAjp8qMlsV62pZ4q_V3_RkD8p-iLRCNPxmXQoS5p-y3C0QF9m4n_kneCy3SIl-aa02eIlS2yrm32NZNTJ-VduJp0BXhfouj-nLJR04wsUZrz-RF3fL0rRtg8RIz6DOVAuOkVu_0KI2j1dOQUXJVZl71UsTwamnBiBawjU0ZVTXNdqI",
                            points: ["Kinesiology-based movement exercises", "Improves left and right brain coordination", "Reduces stress and boosts concentration"]
                        },
                        {
                            title: "Pre-Abacus",
                            age: "Ages 4-6",
                            icon: "child_care",
                            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvKNCOWF-Gt31D8u2p4NMXmWPyq2t_w6YA7u6oZevxo3qO_aLwn6QJC5TAA5JjQSn8IudN9SpmN2kLGyKOFzog7dIlbMrOwK9XGKuUfzWVSJycAUpgHzUTNLJ4jJx1BfS10NFFxJ-1ftLxjTrmcsKNki9kcsexr1sXgM8Vv0uz4QImpWx8lXGTBlckTboan728pEreehWdWBvxmHNEVUqsTulLvUdLECOWGtBBzGh-GfTY-a0-CnYaz3MqKSJh-cGEEcGPIwKV6Rg",
                            points: ["Early numerical concepts through play", "Introduction to bead movements", "Fine motor skill development"]
                        },
                        {
                            title: "Vedic Maths",
                            age: "Ages 10+",
                            icon: "functions",
                            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqxk1GRUHZfJQuTBAfsCo2fGg5thwR6QsSFYcvEUwsCc0tTjJ2oghjRR8RsIXERJrYD0wIuvD_M7VDmUFcQhPK4ek3PDc-A2B8XK1E_2hnsYuFsv64pQ188LEj6BVNWB0cqQIF5wZuBYYyMX6mFi5df5UAOjY6MTLr-Yaz_YmJOFsjkhUnrSk1tyoexF0dLtK1k_WfEoQle0EFb11BemMigNI0kiNSdkYWgbdtVzPcHBXPhbttGou1Vl4HKk2gI54QQltMGWLAY1A",
                            points: ["Ancient mental math sutras & techniques", "10x faster calculations for competitive exams", "Eliminates fear of mathematics"]
                        },
                        {
                            title: "Handwriting & Arts",
                            age: "Ages 7+",
                            icon: "draw",
                            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9rKBuSrrdJ8oZl_1jCR-cgCmHrrxyfJv8ioRjWm7HCRiKy_mn3iGbJyH3-zoWcB6idqghb99Fxyz-ToDuLoAAb76AP5s01lojq8u9R2srZ4p9vxdY7A4XiRW9hFZsDhnSsjyf1iBuXtCQZkswWT1xrPhgXt5oehE5vJEH8JuMt_A9c8AOWJPgXQBQVnKZgl2FAp-Vc5HH40Zj1cjmA88ckI3c8R3Posy0537o9J4F-tsX3y4xEBClOei3U2Pp4Kw7THDZGWCqzCw",
                            points: ["Cursive and print handwriting improvement", "Artistic calligraphy for creative expression", "Focus on grip, posture, and legibility"]
                        },
                        {
                            title: "Yoga & Zumba",
                            age: "For Females",
                            icon: "self_improvement",
                            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8D6owVTNfzRcriY-mEEJ9xWtY0ZrIQOnym60cM-1cnV9I7eBmPM9B-atZ3LwveycepmKrgbkQ3r8x8xyeP1k437XFhUW4cIfcFqbTikjJKqkaLypgsqv1fBb45H03iRl0oFuFo4CUKFlGT-hhWpEedHq3vSMa9mGDX68uvbKkRUSs2A4gzhbka54MfYr4RMw0lOS7qSCPvifM5cV15fYslP4yO2tZRWgXX8kXtscaaE86kIK_xRQXziipgE29mZIeLbx0O9C9cPs",
                            points: ["Holistic wellness and physical fitness", "Rhythmic Zumba sessions for energy", "Mental clarity and community building"]
                        }
                    ].map((prog, idx) => (
                        <FadeIn key={idx} delay={idx * 0.1}>
                            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-200 dark:border-slate-700 flex flex-col h-full">
                                <div className="h-48 relative">
                                    <Image src={prog.img} alt={prog.title} fill className="object-cover" />
                                    <div className="absolute top-4 right-4 bg-[#197fe6] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{prog.age}</div>
                                </div>
                                <div className="p-8 flex-grow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="material-icons text-[#197fe6] p-2 bg-[#197fe6]/10 rounded-lg">{prog.icon}</span>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{prog.title}</h3>
                                    </div>
                                    <ul className="space-y-3 mb-8 text-slate-600 dark:text-slate-400">
                                        {prog.points.map((pt, pIdx) => (
                                            <li key={pIdx} className="flex items-start gap-2">
                                                <span className="material-icons text-[#197fe6] text-sm mt-1">check_circle</span>
                                                <span>{pt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="w-full bg-[#197fe6] text-white py-3 rounded-lg font-semibold hover:bg-[#197fe6]/90 transition-colors">Enroll Now</button>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </main>

            {/* Methodology Highlight Section */}
            <section className="bg-[#197fe6]/5 dark:bg-slate-900/50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Why the Two-Hand, Four-Finger Methodology?</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
                                Our unique approach stimulates both the left and right hemispheres of the brain simultaneously. Using two hands and four fingers creates a sensory-rich environment that enhances cognitive dexterity.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-8 text-center border-none">
                                <div className="p-4 bg-[#197fe6]/10 rounded-xl">
                                    <div className="text-[#197fe6] font-bold text-2xl mb-1">95%</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Accuracy Improvement</div>
                                </div>
                                <div className="p-4 bg-[#197fe6]/10 rounded-xl">
                                    <div className="text-[#197fe6] font-bold text-2xl mb-1">2.5x</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Faster Processing</div>
                                </div>
                            </div>
                            <button className="text-[#197fe6] font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
                                Learn about our methodology <span className="material-icons">arrow_forward</span>
                            </button>
                        </div>
                        <div className="md:w-1/2">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKjmqfxdkYgPj8VLXpxT9qf6Y2PKKtUp6U8WA8AHFwLIFONW2iwrRzyxpDoUvZBj9m5ZOpbJ5FiyU40_ueTRCtwVPFg7_FwKmRgqPahR413Cj42PBtXszl-DXb2dFzs6H12W8Y2vwlimwIyi9D_7wTQzrmX8oqkkM48g3VAUc42HKynMYL81cG2hS_ZPf5NlGcaMqaYKVGBiKWvwBJ-paRGSKbxhPJxAPfaf5SkP72oy_kom4EGQ6C1S-3FGFQehGKOacH4gZmvRU"
                                    alt="Methodology"
                                    width={600}
                                    height={400}
                                    className="w-full aspect-video object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#197fe6]/40 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-20 bg-[#f6f7f8] dark:bg-[#111921]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">Start Your Child's Journey Today</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg">
                        Join hundreds of families who have seen remarkable improvements in their children's focus, memory, and confidence.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-[#197fe6] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#197fe6]/90 transition-all shadow-lg shadow-[#197fe6]/30">Book a Free Trial</button>
                        <button className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-10 py-4 rounded-xl font-bold text-lg hover:border-[#197fe6] transition-all">Download Brochure</button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
