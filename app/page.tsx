'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  ArrowRight, 
  Bot, 
  Droplets, 
  HeartPulse, 
  Glasses, 
  Users, 
  Award, 
  Stethoscope, 
  Star, 
  Quote,
  ImageOff,
  CheckCircle
} from 'lucide-react';

/**
 * UTILITIES & HOOKS
 */
const useScrollReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

/**
 * SAFE IMAGE COMPONENT
 */
function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div className={`flex items-center justify-center bg-secondary/5 border border-secondary/10 ${className}`}>
        <ImageOff size={32} className="text-secondary/20" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}

/**
 * BRAND DATA & ASSETS
 */
const BRAND = {
  name: "Vision24 Eye Clinic",
  tagline: "Clarity Engineered for Your Life.",
  description: "Vision24 Eye Clinic in Lagos is dedicated to providing world-class ophthalmic care using cutting-edge technology and personalized, empathetic service. We specialize in advanced surgery, precise diagnostics, and curated optical wear.",
  currency: "₦",
  contact: {
    whatsapp: "+234 7061965278",
    instagram: "vision24eyeclinic",
    email: "info@vision24eyeclinic.ng",
    address: "14, Admiralty Way, Lekki Phase 1, Lagos, Nigeria"
  }
};

const PRODUCTS = [
  { name: "Designer Frames Collection", desc: "Curated selection of premium Italian and German designer spectacle frames.", price: "₦35,000", img: "https://images.unsplash.com/photo-1602573991396-fb69ee6d7a0d?auto=format&fit=crop&q=80" },
  { name: "Advanced Cataract Surgery", desc: "State-of-the-art phacoemulsification with premium intraocular lens options.", price: "₦450,000", img: "https://images.unsplash.com/photo-1726626258851-7363d963b345?auto=format&fit=crop&q=80" },
  { name: "Blue Light Filtering Lenses", desc: "High-index lenses with advanced anti-reflective and blue-light blocking coatings.", price: "₦55,000", img: "https://images.unsplash.com/photo-1593854519602-687eae339d57?auto=format&fit=crop&q=80" },
  { name: "Comprehensive Vision Exam", desc: "A detailed 1-hour diagnostic check covering retinal health and visual acuity.", price: "₦18,500", img: "https://images.unsplash.com/photo-1669617227396-6dd2772aac52?auto=format&fit=crop&q=80" }
];

const FEATURES = [
  { title: "Robotic Precision Surgery", desc: "Utilizing the latest micro-surgical tools for minimized invasiveness.", icon: Bot },
  { title: "Retinopathy Screening", desc: "Non-invasive imaging technology to detect early complications.", icon: Droplets },
  { title: "Pediatric Vision Care", desc: "Specialized care plans designed for children's visual development.", icon: HeartPulse },
  { title: "On-Site Optical Boutique", desc: "Immediate access to stylish, high-quality frames and lenses.", icon: Glasses }
];

const STATS = [
  { number: "4,600+", label: "Patients Trusted Us", icon: Users },
  { number: "15+", label: "Years of Expertise", icon: Award },
  { number: "99.8%", label: "Surgical Outcomes", icon: Stethoscope }
];

const TESTIMONIALS = [
  { name: "Mr. Adebayo K.", text: "The clarity after my cataract surgery was unbelievable. Professional, swift, and deeply caring staff.", role: "Patient, Victoria Island" },
  { name: "Dr. Chinwe O.", text: "As a fellow medical professional, I trust Vision24 for my family's most critical eye health needs.", role: "Medical Colleague" },
  { name: "Mrs. Ebele M.", text: "The frame selection is exquisite, and the staff made finding the perfect pair effortless.", role: "Client, Ikoyi" }
];

/**
 * MAIN PAGE COMPONENT
 */
export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="relative bg-primary">
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-3">
            <span className="font-heading text-3xl font-black text-secondary tracking-tighter">
              {BRAND.name.split(' ').map(w => w[0]).slice(0,2).join('')}
            </span>
            <span className="text-secondary/60 text-[10px] font-mono tracking-[0.2em] uppercase hidden sm:block">
              {BRAND.name}
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {['Services', 'Frames', 'About', 'Testimonials'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-secondary/70 hover:text-accent font-medium text-sm tracking-wide transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-secondary text-white px-7 py-3 rounded-full text-sm font-bold hover:bg-accent transition-all duration-300 hover:scale-105">
              Book an Eye Exam
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden text-secondary">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-secondary/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className="relative ml-auto h-full w-[80%] max-w-sm bg-secondary p-10 flex flex-col animate-slideIn">
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 text-white">
              <X size={32} />
            </button>
            <div className="mt-20 flex flex-col gap-8">
              {['Services', 'Frames', 'About', 'Testimonials', 'Contact'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-white text-3xl font-heading font-light">
                  {link}
                </a>
              ))}
            </div>
            <div className="mt-auto pt-10 border-t border-white/10">
              <p className="text-white/50 text-xs tracking-widest uppercase">Contact Us</p>
              <p className="text-white mt-2 font-medium">{BRAND.contact.whatsapp}</p>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section id="home" ref={heroReveal.ref} className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-primary to-accent/5" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-[100px]" />
        
        <div className={`relative z-10 text-center max-w-5xl px-6 transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold text-secondary leading-[0.9] tracking-tighter">
            Excellence in Sight.<br />
            <span className="text-accent italic">Personalized</span> for You.
          </h1>
          <p className="text-secondary/60 mt-10 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Experience world-class ophthalmic care right here in Lagos. At Vision24, technology meets compassion.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
            <a href="#contact" className="bg-secondary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-accent transition-all duration-300 flex items-center justify-center gap-3 group">
              Book an Eye Exam <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services" className="border-2 border-secondary/20 text-secondary px-10 py-5 rounded-full font-bold text-lg hover:border-secondary transition-all">
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* DIVIDER STRIP */}
      <div className="py-12 border-y border-secondary/5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-6 px-6">
          {['Lagos Care', 'German Technology', 'Italian Frames', 'Precision Surgery', 'Elite Diagnostics'].map((word, i) => (
            <div key={i} className="flex items-center gap-3 text-secondary/40 text-xs font-mono tracking-widest uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section id="services" ref={featuresReveal.ref} className="py-24 px-6 bg-white">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${featuresReveal.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary">Specialized Medical Services</h2>
            <p className="text-accent font-medium mt-4 tracking-widest uppercase text-sm">Advanced Diagnostics & Surgical Excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((item, idx) => (
              <div key={idx} 
                   style={{ transitionDelay: `${idx * 150}ms` }}
                   className={`p-10 rounded-3xl bg-secondary/5 border border-secondary/5 group hover:bg-secondary transition-all duration-500 hover:-translate-y-2 ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:bg-accent transition-colors duration-500">
                  <item.icon size={32} className="text-secondary group-hover:text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-secondary group-hover:text-white mb-4">{item.title}</h3>
                <p className="text-secondary/60 group-hover:text-white/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="frames" ref={productsReveal.ref} className="py-24 px-6 bg-secondary text-white overflow-hidden">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold">Optimal Boutique</h2>
              <p className="text-accent font-medium mt-2 tracking-widest uppercase text-sm">See the World Beautifully</p>
            </div>
            <p className="max-w-md text-white/60 text-lg">
              Explore our curated collection of premium frames and lens technology, sourced from the world's leading artisans.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((prod, idx) => (
              <div key={idx} 
                   className={`group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 transition-all duration-500 hover:border-accent ${productsReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                   style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <SafeImage src={prod.img} alt={prod.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">
                    {BRAND.currency} {prod.price.replace('₦', '')}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-heading text-2xl font-bold mb-3">{prod.name}</h3>
                  <p className="text-white/50 text-sm line-clamp-2 mb-6">{prod.desc}</p>
                  <a href="#contact" className="inline-flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                    Inquire <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION (STATS STRIP INCLUDED) */}
      <section id="about" ref={aboutReveal.ref} className="py-32 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className={`relative aspect-square rounded-full overflow-hidden border-[16px] border-secondary/5 transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <SafeImage 
                src="https://images.unsplash.com/photo-1712431182145-dddb1a08a826?auto=format&fit=crop&q=80" 
                alt="Technology" 
                fill 
                className="object-cover"
              />
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-8">The Vision24 Difference</h2>
              <p className="text-secondary/70 text-lg leading-relaxed mb-8">
                Founded on a commitment to preserving and enhancing sight, Vision24 merges international expertise with local understanding. We invest heavily in technology to ensure you receive the clearest vision possible.
              </p>
              <p className="text-secondary/80 font-medium text-lg italic border-l-4 border-accent pl-6 mb-12">
                "Sharp diagnosis, world-class care — quality wey go loud for your eyes."
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-secondary/10">
                {STATS.map((stat, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-accent mb-2">
                      <stat.icon size={20} />
                      <span className="text-3xl font-bold text-secondary">{stat.number}</span>
                    </div>
                    <p className="text-secondary/50 text-xs tracking-widest uppercase font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" ref={testimonialsReveal.ref} className="py-24 px-6 bg-secondary/5">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${testimonialsReveal.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary">What Our Patients See</h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm border border-secondary/5 relative flex flex-col group hover:shadow-xl transition-all duration-500">
                <Quote size={40} className="text-accent/20 absolute top-8 right-8" />
                <div className="flex text-accent mb-6 gap-1">
                  {[1,2,3,4,5].map(n => <Star key={n} fill="currentColor" size={14} />)}
                </div>
                <p className="text-secondary/70 italic leading-relaxed mb-10 text-lg">"{t.text}"</p>
                <div className="mt-auto flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary">{t.name}</h4>
                    <p className="text-secondary/40 text-xs font-medium uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-white overflow-hidden">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-5xl md:text-6xl font-bold text-secondary mb-10">Schedule Your Clarity Consultation</h2>
              <p className="text-secondary/60 text-lg mb-12">
                Our clinic is conveniently located in Lekki Phase 1. Fill out the form or reach us via WhatsApp for immediate appointment booking.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: Phone, label: "Phone", val: BRAND.contact.whatsapp },
                  { icon: Mail, label: "Email", val: BRAND.contact.email },
                  { icon: MapPin, label: "Visit", val: BRAND.contact.address }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center text-accent group-hover:bg-secondary group-hover:text-white transition-all">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-1">{item.label}</p>
                      <p className="text-secondary font-medium">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex gap-4">
                <a href={`https://instagram.com/${BRAND.contact.instagram}`} className="w-12 h-12 rounded-full border border-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-accent/5 rounded-[40px] -rotate-2 scale-105" />
              <div className="relative bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-secondary/5">
                {formSubmitted ? (
                  <div className="text-center py-20 animate-scale-in">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={48} />
                    </div>
                    <h3 className="font-heading text-3xl font-bold text-secondary mb-4">Request Sent</h3>
                    <p className="text-secondary/60">One of our specialists will contact you shortly to confirm your booking.</p>
                    <button onClick={() => setFormSubmitted(false)} className="mt-8 text-accent font-bold hover:underline">Send another message</button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-secondary/40 mb-2">Full Name</label>
                        <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-secondary/5 border border-transparent focus:border-accent focus:bg-white outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-secondary/40 mb-2">Phone Number</label>
                        <input type="tel" required className="w-full px-6 py-4 rounded-2xl bg-secondary/5 border border-transparent focus:border-accent focus:bg-white outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-secondary/40 mb-2">Email Address</label>
                      <input type="email" required className="w-full px-6 py-4 rounded-2xl bg-secondary/5 border border-transparent focus:border-accent focus:bg-white outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-secondary/40 mb-2">Message</label>
                      <textarea rows={4} required className="w-full px-6 py-4 rounded-2xl bg-secondary/5 border border-transparent focus:border-accent focus:bg-white outline-none transition-all resize-none"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-secondary text-white py-5 rounded-2xl font-bold text-lg hover:bg-accent transition-all duration-300 shadow-xl shadow-secondary/10">
                      Send Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-secondary text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-1">
              <span className="font-heading text-4xl font-black text-accent tracking-tighter block mb-6">
                V24
              </span>
              <p className="text-white/50 leading-relaxed mb-8">
                Setting the standard for premium eye care in West Africa. Expert ophthalmic surgeons, world-class diagnostics, and elite optical wear.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-8 tracking-widest uppercase text-xs">Quick Links</h4>
              <ul className="space-y-4 text-white/60">
                {['Home', 'Services', 'Optical Boutique', 'About Vision24', 'Patient Portal'].map(item => (
                  <li key={item}><a href="#" className="hover:text-accent transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-8 tracking-widest uppercase text-xs">Medical Care</h4>
              <ul className="space-y-4 text-white/60">
                {['Cataract Surgery', 'Retinal Care', 'Pediatric Clinic', 'Glaucoma Clinic', 'Laser Vision'].map(item => (
                  <li key={item}><a href="#" className="hover:text-accent transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-8 tracking-widest uppercase text-xs">Location</h4>
              <p className="text-white/60 leading-relaxed">
                14, Admiralty Way, Lekki Phase 1,<br />
                Lagos, Nigeria.
              </p>
              <div className="mt-6 font-bold text-accent">
                {BRAND.contact.whatsapp}
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} {BRAND.name}. All Rights Reserved.
            </p>
            <div className="flex gap-8 text-white/30 text-sm font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}