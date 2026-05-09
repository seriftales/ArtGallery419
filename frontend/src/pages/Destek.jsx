import React from 'react';

const SupportContact = () => {
  const inputClass = `peer w-full bg-transparent border-0 border-b border-[#909097]/30 text-[#e4e2e4] py-3 px-0 focus:outline-none focus:border-[#e9c349] focus:ring-0 transition-colors placeholder-transparent`;
  const labelClass = `absolute left-0 -top-3.5 text-[#c6c6cd] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-[#e9c349]`;

  return (
    <>
      {/* Font ve İkon importları Checkout.jsx ile aynı mantıkta */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      <div className="bg-[#131315] text-[#e4e2e4] min-h-screen flex flex-col antialiased" style={{ fontFamily: 'Inter, sans-serif' }}>
        
        {/* TopNavBar */}
        <header className="fixed top-0 w-full z-50 bg-[#131315]/80 backdrop-blur-md border-b border-white/10">
          <div className="flex justify-between items-center px-5 md:px-16 h-20 w-full max-w-[1440px] mx-auto">
            {/* Brand */}
            <a href="#" className="font-bold text-[32px] tracking-tight text-[#e4e2e4]" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.3' }}>
              ArtGallery419
            </a>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {['Exhibitions', 'Artists', 'Workshops', 'Gallery'].map((item) => (
                <a key={item} href="#" className="text-[#c6c6cd] hover:text-[#ffe088] transition-colors duration-300 text-xs font-semibold tracking-[0.1em] uppercase">
                  {item}
                </a>
              ))}
            </nav>
            
            {/* Trailing Icons */}
            <div className="flex items-center gap-6">
              <button className="text-[#e9c349] hover:text-[#ffe088] transition-colors duration-300 scale-95 active:scale-90 flex items-center justify-center">
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button className="text-[#e9c349] hover:text-[#ffe088] transition-colors duration-300 scale-95 active:scale-90 flex items-center justify-center">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Canvas */}
        <main className="flex-grow pt-32 pb-32">
          {/* Hero Banner */}
          <div className="w-full h-64 md:h-80 relative overflow-hidden mb-16 border-b border-white/10">
            <img 
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0cL5ldFTDfZOqRrnSoHppQJBzyja56NRiXRE0b_TQ_PYCQ50UTuNNCpa-ObvCfCqxR3oFUzB_dPmDiOxv_P6_rT1j-1VXdB8Zr39YbH21DTkxL1SVU32GgOwwRBf8r1I7gIagZE4WoSc_eeSiD3M9pAZfyagh59Jy9EHaBTBzxR7qY4miBz905FH0p2hMRzpEQPIml_sgF1MkeVeYyRGyp4HnW-nOw6gHk9UXhIFvJtZ9wUfH2Nx4vNutianiBveGC4-E57U4yE-J" 
              alt="Gallery Space"
            />
            <div className="absolute inset-0 flex flex-col justify-end pb-12 px-5 md:px-16 max-w-[1440px] mx-auto">
              <h1 className="text-[40px] md:text-[64px] text-[#e4e2e4] mb-4 font-bold" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                Client Services
              </h1>
              <p className="text-lg text-[#c6c6cd] max-w-2xl">
                Expert assistance and dedicated support for your curation journey.
              </p>
            </div>
          </div>

          <div className="px-5 md:px-16 max-w-[1440px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Contact Form */}
              <section className="lg:col-span-7 fade-in">
                <div className="bg-[#1b1b1d] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#e9c349]/0 group-hover:bg-[#e9c349]/5 blur-3xl transition-colors duration-700 pointer-events-none"></div>
                  
                  <h2 className="text-[48px] font-semibold text-[#e4e2e4] mb-2 relative z-10" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.2' }}>
                    Direct Inquiry
                  </h2>
                  <p className="text-base text-[#c6c6cd] mb-10 relative z-10">
                    Connect with our curatorial team regarding acquisitions, exhibitions, or technical assistance.
                  </p>
                  
                  <form action="#" className="space-y-8 relative z-10" method="POST">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="relative pt-4">
                        <input className={inputClass} id="name" name="name" placeholder="Full Name" required type="text" />
                        <label className={labelClass} htmlFor="name">Full Name</label>
                      </div>
                      <div className="relative pt-4">
                        <input className={inputClass} id="email" name="email" placeholder="Email Address" required type="email" />
                        <label className={labelClass} htmlFor="email">Email Address</label>
                      </div>
                    </div>
                    <div className="relative pt-4">
                      <input className={inputClass} id="subject" name="subject" placeholder="Subject" required type="text" />
                      <label className={labelClass} htmlFor="subject">Subject</label>
                    </div>
                    <div className="relative pt-4">
                      <textarea className={`${inputClass} resize-y`} id="message" name="message" placeholder="Your Message" required rows="4"></textarea>
                      <label className={labelClass} htmlFor="message">Your Message</label>
                    </div>
                    <div className="pt-4 flex items-center justify-end">
                      <button 
                        className="bg-[#e9c349] text-[#3c2f00] px-8 py-4 text-xs font-semibold tracking-[0.1em] uppercase hover:bg-[#ffe088] transition-colors duration-300 inline-flex items-center gap-3" 
                        type="submit"
                      >
                        Send Inquiry
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </form>
                </div>
              </section>

              {/* Right Column: Support Tickets */}
              <section className="lg:col-span-5 flex flex-col fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-end justify-between mb-8 pb-2 border-b border-white/10">
                  <h2 className="text-[24px] font-medium text-[#e4e2e4]" style={{ fontFamily: 'Playfair Display, serif' }}>My Support Tickets</h2>
                  <a className="text-[#e9c349] text-sm font-medium hover:text-[#ffe088] transition-colors flex items-center gap-1" href="#">
                    View All <span className="material-symbols-outlined text-sm">arrow_outward</span>
                  </a>
                </div>
                
                <div className="flex flex-col gap-4 flex-grow">
                  {/* Ticket 1 */}
                  <a className="block bg-[#1f1f21] border border-[#909097]/10 p-6 hover:border-[#e9c349]/40 transition-all duration-300 group" href="#">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#e9c349] shadow-[0_0_8px_rgba(233,195,73,0.6)]"></span>
                        <span className="text-[#e9c349] text-xs font-semibold tracking-[0.1em] uppercase">OPEN</span>
                      </div>
                      <span className="text-[#c6c6cd] text-sm font-medium">Oct 24, 2024</span>
                    </div>
                    <h3 className="text-lg text-[#e4e2e4] font-medium group-hover:text-[#e9c349] transition-colors mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Inquiry regarding "Echoes of Silence" print availability
                    </h3>
                    <p className="text-[#c6c6cd] text-sm line-clamp-2">
                      I am interested in acquiring the limited edition print, but I wanted to verify the framing options...
                    </p>
                    <span className="block mt-4 text-[#909097] text-xs font-semibold tracking-[0.1em] uppercase">TICKET #AG-8842</span>
                  </a>

                  {/* Ticket 2 */}
                  <a className="block bg-[#1f1f21] border border-[#909097]/10 p-6 hover:border-[#e9c349]/40 transition-all duration-300 group" href="#">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#ffb59b]"></span>
                        <span className="text-[#ffb59b] text-xs font-semibold tracking-[0.1em] uppercase">PENDING</span>
                      </div>
                      <span className="text-[#c6c6cd] text-sm font-medium">Oct 18, 2024</span>
                    </div>
                    <h3 className="text-lg text-[#e4e2e4] font-medium group-hover:text-[#e9c349] transition-colors mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Shipping address update for recent acquisition
                    </h3>
                    <p className="text-[#c6c6cd] text-sm line-clamp-2">
                      Please update the delivery address for my recent purchase to the alternate gallery space as previously discussed.
                    </p>
                    <span className="block mt-4 text-[#909097] text-xs font-semibold tracking-[0.1em] uppercase">TICKET #AG-8801</span>
                  </a>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full pt-32 pb-8 bg-[#131315] border-t border-white/10 mt-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-5 md:px-16 max-w-[1440px] mx-auto">
            <div className="col-span-1 md:col-span-4 mb-8">
              <span className="text-[24px] font-medium text-[#e4e2e4]" style={{ fontFamily: 'Playfair Display, serif' }}>ArtGallery419</span>
            </div>
            {['Privacy Policy', 'Terms of Service', 'Press Kit'].map(link => (
              <a key={link} className="text-[#c6c6cd] hover:text-[#e9c349] transition-colors duration-300 text-xs font-semibold tracking-[0.1em] uppercase" href="#">{link}</a>
            ))}
            <a className="text-[#e9c349] hover:text-[#ffe088] transition-colors duration-300 text-xs font-semibold tracking-[0.1em] uppercase" href="#">Contact Us</a>
            
            <div className="col-span-1 md:col-span-4 mt-8 pt-8 border-t border-white/5">
              <p className="text-base text-[#c6c6cd]">© 2024 ArtGallery419. Curated Excellence.</p>
            </div>
          </div>
        </footer>

        {/* FAB Bubble */}
        <button className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#e9c349] text-[#3c2f00] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(212,175,55,0.15)] hover:scale-105 hover:bg-[#ffe088] transition-all duration-300">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
        </button>
      </div>
    </>
  );
};

export default SupportContact;