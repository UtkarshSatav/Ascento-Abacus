"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#111921]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="text-[#197fe6] size-10 flex items-center justify-center">
                            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-[#0e141b] dark:text-white">Ascento Abacus</h1>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link className="text-sm font-medium hover:text-[#197fe6] transition-colors" href="/">Home</Link>
                        <Link className="text-sm font-medium hover:text-[#197fe6] transition-colors" href="/programs">Programs</Link>
                        <Link className="text-sm font-medium hover:text-[#197fe6] transition-colors" href="/franchise">Franchise</Link>
                        <Link className="text-sm font-medium hover:text-[#197fe6] transition-colors" href="/contact">Contact</Link>
                    </nav>

                    {/* CTA */}
                    <div className="flex items-center gap-4">
                        <Link href="/contact" className="hidden lg:flex bg-[#197fe6] hover:bg-[#197fe6]/90 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md shadow-[#197fe6]/20">
                            Book a Demo
                        </Link>
                        <button
                            className="md:hidden text-[#0e141b] dark:text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-[#111921] border-b border-slate-200 dark:border-slate-800 p-4">
                    <nav className="flex flex-col gap-4">
                        <Link className="text-base font-medium hover:text-[#197fe6] transition-colors" href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                        <Link className="text-base font-medium hover:text-[#197fe6] transition-colors" href="/programs" onClick={() => setIsMobileMenuOpen(false)}>Programs</Link>
                        <Link className="text-base font-medium hover:text-[#197fe6] transition-colors" href="/franchise" onClick={() => setIsMobileMenuOpen(false)}>Franchise</Link>
                        <Link className="text-base font-medium hover:text-[#197fe6] transition-colors" href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                        <Link className="bg-[#197fe6] text-white px-6 py-3 rounded-lg text-center font-bold transition-all" href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                            Book a Demo
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
