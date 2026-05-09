import { useState } from "react";

export default function WorkshopDetail() {
  const [participants, setParticipants] = useState(1);
  const [selectedDate, setSelectedDate] = useState("oct");

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .stagger-item { opacity: 0; animation: fadeIn 0.6s ease-out forwards; }
        .stagger-item:nth-child(1) { animation-delay: 0.2s; }
        .stagger-item:nth-child(2) { animation-delay: 0.4s; }
      `}</style>

      <div className="bg-[#131315] text-[#e4e2e4] min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>

        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 border-b border-white/10"
          style={{ background: 'rgba(19,19,21,0.8)', backdropFilter: 'blur(12px)' }}>
          <div className="flex justify-between items-center px-5 md:px-16 h-20 w-full max-w-[1440px] mx-auto">
            <a href="#" className="text-[#e4e2e4] font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              ArtGallery419
            </a>
            <div className="hidden md:flex items-center gap-8">
              {["Exhibitions", "Artists", "Gallery"].map((item) => (
                <a key={item} href="#"
                  className="text-[#c6c6cd] hover:text-[#e9c349] transition-colors duration-300 uppercase tracking-widest text-xs font-semibold">
                  {item}
                </a>
              ))}
              <a href="#"
                className="text-[#e9c349] border-b border-[#e9c349] pb-1 uppercase tracking-widest text-xs font-semibold hover:opacity-80 transition-opacity">
                Workshops
              </a>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-[#e4e2e4] hover:text-[#e9c349] transition-colors">
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button className="p-2 text-[#e4e2e4] hover:text-[#e9c349] transition-colors">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
              <button className="w-10 h-10 rounded-full overflow-hidden ml-4 border border-white/10">
                <img alt="User profile" className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZzinD8-nznUkIVPYbtK2fmqtcIUSBi7mSMG9yCj6tUkPRWMdpoXVYvkpxKW5yAhajNCBB-Izit7p5zDQAOCpkUuBKRVehZCKSUnWL-H5ByvXafZjhK1dk3IgxHgD1FrzhgtzmB4kpAXW6BD3EE_wVkM-uTjysFgjpeHqmXFFYnoJM_YtI_Y6XNyI0UJbzpiQEJf2pX2DNJgu6LUCvpJ_rfD5JwtHdm3dpc7VJWJCrBQEKLMsq54ndsP6T2Xd_nQJrT6pIN93PTGf7" />
              </button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <main className="pt-20">
          <section className="relative w-full h-[614px] min-h-[500px] flex items-end pb-16">
            <div className="absolute inset-0 bg-[#0e0e10]">
              <img
                alt="Fine art studio with dramatic lighting"
                className="w-full h-full object-cover opacity-60 animate-fade-in"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAffUTO3Eyh5MqIi1oLQE8v1GDLwaA9ppttTRjrFNiXQ6jjrCcYjzO2jX5OD-ytCDwEOPUq3LxLLfI0__A77q-Z2ALas2kBuoSwMkaJ5gHEPYpPGBiixK98AR-oiNW5GjRG_k7Nnj6Tpw4VriwtARtjzV0G9_RJk-6srhGptpBAblo6lBlqfJd1RMb8rwFS3eg-OzfhZjyLGK_oDL8JUmKvzCCJGI134hgywkatiqQ3tpRbkuFEEULPoV"
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, #131315 0%, rgba(19,19,21,0.6) 50%, transparent 100%)' }} />
            </div>
            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-16">
              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 border border-white/30 text-[#c6c6cd] mb-6 uppercase tracking-widest text-xs font-semibold"
                  style={{ backdropFilter: 'blur(4px)', background: 'rgba(19,19,21,0.2)' }}>
                  Masterclass Series
                </span>
                <h1 className="text-[40px] md:text-[64px] font-bold text-[#e4e2e4] mb-6 animate-fade-in leading-tight"
                  style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em' }}>
                  Abstract Expressionism: The Gesture &amp; The Void
                </h1>
                <p className="text-lg text-[#c6c6cd] max-w-2xl leading-relaxed">
                  A two-day immersive exploration into large-scale gestural painting, guided by resident artist Julian Vance. Learn to articulate emotion through aggressive scale and minimalist composition.
                </p>
              </div>
            </div>
          </section>

          {/* Content */}
          <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* Left Column */}
              <div className="lg:col-span-8 space-y-16">

                {/* Quick Info Bar */}
                <div className="flex flex-wrap gap-8 py-8 border-y border-white/10">
                  {[
                    { icon: "calendar_today", label: "DATE", value: "Oct 14 - Oct 15, 2024", color: "text-[#e9c349]" },
                    { icon: "schedule", label: "TIME", value: "10:00 AM - 4:00 PM", color: "text-[#e9c349]" },
                    { icon: "location_on", label: "LOCATION", value: "Studio 4B, South Wing", color: "text-[#e9c349]" },
                  ].map(({ icon, label, value, color }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className={`material-symbols-outlined ${color}`}>{icon}</span>
                      <div>
                        <p className="text-xs font-semibold tracking-widest uppercase text-[#c6c6cd] mb-1">{label}</p>
                        <p className="text-base text-[#e4e2e4]">{value}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#e9c349]">person</span>
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-[#c6c6cd] mb-1">CAPACITY</p>
                      <p className="text-base text-[#e9c349]">Only 3 spots left</p>
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="space-y-6">
                  <h2 className="text-[32px] font-medium text-[#e4e2e4]"
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                    About the Workshop
                  </h2>
                  <p className="text-base text-[#c6c6cd] leading-relaxed">
                    This intensive workshop is designed for intermediate to advanced painters looking to break free from rigid structures. We will focus on the physicality of painting—how the movement of the body translates onto the canvas. Participants will work on oversized canvases, utilizing non-traditional tools to create bold, sweeping gestures.
                  </p>
                  <p className="text-base text-[#c6c6cd] leading-relaxed">
                    Beyond technique, the masterclass delves into the philosophy of the 'void'—understanding negative space not as emptiness, but as a deliberate and powerful structural element in composition.
                  </p>
                </div>

                {/* Curator's Note */}
                <div className="border-l-4 border-[#dd541a] pl-6 py-2 bg-[#1b1b1d]/50">
                  <p className="text-2xl italic text-[#e4e2e4] mb-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                    "Julian Vance's approach to the canvas is akin to a physical performance. This workshop is a rare opportunity to deconstruct his visceral methodology firsthand."
                  </p>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#c6c6cd]">— Elena Rostova, Head Curator</p>
                </div>

                {/* Schedule */}
                <div className="space-y-8">
                  <h3 className="text-2xl font-medium text-[#e4e2e4] border-b border-white/10 pb-4"
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                    Schedule Overview
                  </h3>
                  <div className="relative pl-8 space-y-12 before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-white/20">
                    {[
                      { day: "DAY 1: THE FOUNDATION", title: "Deconstructing Scale", desc: "Morning session focused on preparing large-scale canvases and selecting a restricted palette to force compositional problem-solving." },
                      { day: "DAY 2: THE EXECUTION", title: "Action and Restraint", desc: "Applying the physical techniques. The afternoon is dedicated to identifying when a piece is finished—mastering the art of stopping." },
                    ].map(({ day, title, desc }) => (
                      <div key={day} className="relative stagger-item">
                        <div className="absolute -left-[35px] w-6 h-6 bg-[#131315] border border-white/30 flex items-center justify-center mt-1">
                          <div className="w-1.5 h-1.5 bg-[#e9c349]" />
                        </div>
                        <h4 className="text-sm font-semibold tracking-widest uppercase text-[#e9c349] mb-2">{day}</h4>
                        <h5 className="text-lg text-[#e4e2e4] mb-2">{title}</h5>
                        <p className="text-base text-[#c6c6cd]">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Materials */}
                <div className="bg-[#2a2a2b] p-8 border border-white/10">
                  <h3 className="text-2xl font-medium text-[#e4e2e4] mb-6"
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                    Materials Provided
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {["60\" x 48\" Cotton Canvas (x2)", "Professional Grade Acrylics", "Assorted Industrial Brushes & Trowels", "Protective Gear & Aprons"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[#c6c6cd] text-base">
                        <span className="material-symbols-outlined text-[#909097] text-sm">check</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Booking */}
              <div className="lg:col-span-4 relative">
                <div className="sticky top-28 bg-[#1b1b1d] border border-white/10 p-8 shadow-2xl">
                  <div className="mb-8">
                    <h3 className="text-3xl font-medium text-[#e4e2e4] mb-2"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                      Reserve Your Space
                    </h3>
                    <p className="text-base text-[#c6c6cd]">Secure your spot in this limited-capacity masterclass.</p>
                  </div>

                  <div className="text-3xl text-[#e4e2e4] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                    $450 <span className="text-lg text-[#c6c6cd]" style={{ fontFamily: 'Inter, sans-serif' }}>/ person</span>
                  </div>

                  <div className="space-y-6">
                    {/* Date Selection */}
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-[#c6c6cd] mb-4">
                        SELECT DATES
                      </label>
                      <div className="space-y-3">
                        <button
                          onClick={() => setSelectedDate("oct")}
                          className="w-full flex items-center justify-between p-4 border transition-colors duration-300"
                          style={{
                            borderColor: selectedDate === "oct" ? "#e9c349" : "rgba(144,144,151,0.2)",
                            background: selectedDate === "oct" ? "rgba(233,195,73,0.05)" : "transparent",
                          }}>
                          <div className="text-left">
                            <div className="text-base text-[#e4e2e4] font-medium">Oct 14 - Oct 15</div>
                            <div className="text-xs font-semibold tracking-widest uppercase text-[#e9c349] mt-1">3 SPOTS LEFT</div>
                          </div>
                          <div className="w-5 h-5 rounded-full border-2 border-[#e9c349] flex items-center justify-center">
                            {selectedDate === "oct" && <div className="w-2.5 h-2.5 bg-[#e9c349] rounded-full" />}
                          </div>
                        </button>

                        <div className="flex items-center justify-between p-4 border border-white/20 opacity-50 cursor-not-allowed">
                          <div>
                            <div className="text-base text-[#e4e2e4] font-medium">Nov 10 - Nov 11</div>
                            <div className="text-xs font-semibold tracking-widest uppercase text-[#ffb4ab] mt-1">SOLD OUT</div>
                          </div>
                          <div className="w-5 h-5 rounded-full border-2 border-white/30" />
                        </div>
                      </div>
                    </div>

                    {/* Participants */}
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-[#c6c6cd] mb-4">
                        PARTICIPANTS
                      </label>
                      <div className="flex items-center justify-between border-b border-white/30 pb-2">
                        <button
                          onClick={() => setParticipants(Math.max(1, participants - 1))}
                          className="text-[#e4e2e4] hover:text-[#e9c349] p-2 transition-colors duration-200">
                          <span className="material-symbols-outlined">remove</span>
                        </button>
                        <span className="text-lg text-[#e4e2e4]">{participants}</span>
                        <button
                          onClick={() => setParticipants(Math.min(3, participants + 1))}
                          className="text-[#e4e2e4] hover:text-[#e9c349] p-2 transition-colors duration-200">
                          <span className="material-symbols-outlined">add</span>
                        </button>
                      </div>
                    </div>

                    {/* Reserve Button */}
                    <button
                      className="w-full bg-[#e9c349] text-[#3c2f00] text-xs font-semibold tracking-widest uppercase py-4 hover:bg-[#FFBF00] transition-colors duration-300"
                      style={{ boxShadow: '0 0 40px rgba(212,175,55,0.05)' }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(212,175,55,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(212,175,55,0.05)'}>
                      Reserve Now
                    </button>

                    <p className="text-center text-xs font-semibold tracking-widest uppercase text-[#c6c6cd]">
                      All materials included. Cancellations up to 48hrs prior.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full pt-32 pb-8 bg-[#131315] border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-5 md:px-16 max-w-[1440px] mx-auto">
            <div className="col-span-1 md:col-span-4 mb-12">
              <span className="text-2xl text-[#e4e2e4] opacity-80 hover:opacity-100 transition-opacity"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                ArtGallery419
              </span>
            </div>
            {["Privacy Policy", "Terms of Service", "Press Kit", "Contact Us"].map((link) => (
              <div key={link} className="flex flex-col space-y-4">
                <a href="#" className="text-xs font-semibold tracking-widest uppercase text-[#c6c6cd] hover:text-[#e9c349] transition-colors opacity-80 hover:opacity-100">
                  {link}
                </a>
              </div>
            ))}
            <div className="col-span-1 md:col-span-4 mt-16 pt-8 border-t border-white/10 text-center">
              <p className="text-base text-[#c6c6cd]">© 2024 ArtGallery419. Curated Excellence.</p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
