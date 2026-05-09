import React from 'react';

const Reservations = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .material-symbols-outlined {
            font-family: 'Material Symbols Outlined';
            font-weight: normal;
            font-style: normal;
            font-size: 24px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-feature-settings: 'liga';
            -webkit-font-smoothing: antialiased;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-list-item {
            animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        
        .tab-transition {
            transition: all 0.3s ease-in-out;
        }
      `}</style>

      <div className="bg-[#131315] text-[#e4e2e4] antialiased min-h-screen flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
        
        {/* TopNavBar */}
        <nav className="bg-[#131315]/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-[#e4e2e4]/10">
          <div className="flex justify-between items-center px-[20px] md:px-[64px] h-20 w-full max-w-[1440px] mx-auto">
            <div className="text-[32px] font-bold tracking-tight text-[#e4e2e4]" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.3' }}>
              ArtGallery419
            </div>
            
            <div className="hidden md:flex space-x-[32px]">
              {['Exhibitions', 'Artists', 'Workshops'].map((item) => (
                <a key={item} className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] hover:text-[#e9c349] transition-colors duration-300 scale-95 active:scale-90" href="#">
                  {item}
                </a>
              ))}
              <a className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#e9c349] border-b border-[#e9c349] pb-1 transition-colors duration-300 scale-95 active:scale-90" href="#">
                Gallery
              </a>
            </div>
            
            <div className="flex items-center space-x-[8px]">
              <button className="p-2 text-[#c6c6cd] hover:text-[#e9c349] transition-colors duration-300">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              </button>
              <button className="p-2 text-[#c6c6cd] hover:text-[#e9c349] transition-colors duration-300">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
              </button>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#e4e2e4]/10 ml-4">
                <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfy-Yd1UYGALul6OyNJxgfW5jQSTtSnHJdHTbsYl2GsJh8SqKiS-YNrW5cpuS_KbebwhRuoj-SsLjb_RlmxHVpA5BNR4OjSpVC_epa3m1vEkB5i6HR1ThpIoVvkK_3skgEdpGnnKgGNaxeFSf0LNv5_AquCqEybjJ8njPczh1EuGD3POSw7d9r1XBcmDeB-h9RESRTDIbs5EG8xyoOY_gXqEWOWmui9Y8g0Wfoh2E7NoPfioCxcOE_aQ6h8rI4r5LKD-AbElXXQ_-a" />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Canvas */}
        <main className="flex-grow pt-[144px] pb-[128px] px-[20px] md:px-[64px] max-w-[1440px] mx-auto w-full">
          
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-[48px] font-semibold text-[#e4e2e4] mb-4" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.2' }}>
              Your Collection
            </h1>
            <p className="text-[18px] text-[#c6c6cd] max-w-2xl" style={{ lineHeight: '1.6' }}>
              Manage your upcoming reservations and review past acquisitions from ArtGallery419.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 mb-12 border-b border-[#e4e2e4]/10">
            <button className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#e9c349] border-b-2 border-[#e9c349] pb-4 px-2 tab-transition">
              ACTIVE RESERVATIONS
            </button>
            <button className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] hover:text-[#e9c349] transition-colors pb-4 px-2 tab-transition">
              ORDER HISTORY
            </button>
          </div>

          {/* Bento Grid Layout for Active Reservations */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px]">
            
            {/* Reservation Item 1 (Detailed View Open) */}
            <div className="lg:col-span-12 bg-[#0f172a] border border-[#e4e2e4]/10 p-8 flex flex-col md:flex-row gap-8 relative overflow-hidden group animate-list-item delay-1">
              <div className="w-full md:w-1/3 aspect-[4/3] bg-[#0e0e10] overflow-hidden flex-shrink-0">
                <img alt="Artwork" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv-lUSW75534Tg_CYjpFkCZ23GuQBIJrZGL46crojgxk5Fe5dYSnCRBSiFl88jpSKXmlWRx6R1-B0xdywg1oweYtm_aOP9cOvCDB4LStDdl6s6djulhZAe0JsUq41wtI5s3yC3vBCVeErdIfjFORcpUovujCC5JMkiWjoEpAT4Uu-sAOYaam90nDBGx1fNpSMi927ZmZfv4oLwRYz7hgqCbI-UyVEUgtO5Fz9GGF3aX4fjnDWF9kqPyon3IkG2JxLZqxr6cSM4nBzt" />
              </div>
              <div className="w-full md:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-[24px] font-medium text-[#e4e2e4] mb-2" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.4' }}>
                        Nocturne in Gold
                      </h2>
                      <p className="text-[16px] text-[#c6c6cd] mb-1">by Elena Rostova</p>
                      <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#e9c349] mt-4">RES-9082-ER</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="px-3 py-1 bg-[#2a2a2b] border border-[#e4e2e4]/10 text-[#e9c349] text-[12px] font-semibold tracking-[0.1em] uppercase rounded-sm flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-[#e9c349]"></span> PENDING
                      </span>
                      <span className="text-[24px] font-medium text-[#e4e2e4]" style={{ fontFamily: 'Playfair Display, serif' }}>$12,500</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-[#e4e2e4]/10">
                    <div>
                      <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] mb-2">RESERVATION DATE</p>
                      <p className="text-[16px] text-[#e4e2e4]">October 24, 2024</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] mb-2">VIEWING APPOINTMENT</p>
                      <p className="text-[16px] text-[#e4e2e4]">November 02, 2024 — 14:00</p>
                    </div>
                  </div>
                  
                  {/* Curator Note */}
                  <div className="mt-8 pl-4 border-l border-[#dd541a] bg-[#1b1b1d]/50 p-4">
                    <p className="text-[18px] italic text-[#c6c6cd]" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.6' }}>
                      "Rostova's late period work captures the tension between structure and chaos. A truly museum-quality acquisition."
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-8 flex-wrap">
                  <button className="px-8 py-3 bg-[#e9c349] text-[#0e0e10] text-[12px] font-semibold tracking-[0.1em] uppercase hover:bg-[#ffe088] transition-colors">
                    UPDATE APPOINTMENT
                  </button>
                  <button className="px-8 py-3 bg-transparent border border-[#e4e2e4]/20 text-[#c6c6cd] text-[12px] font-semibold tracking-[0.1em] uppercase hover:border-[#ffb4ab] hover:text-[#ffb4ab] transition-colors">
                    CANCEL
                  </button>
                </div>
              </div>
            </div>

            {/* Reservation Item 2 (Collapsed) */}
            <div className="lg:col-span-12 bg-[#1f1f21] border border-[#e4e2e4]/10 p-6 flex flex-col md:flex-row items-start md:items-center justify-between group hover:border-[#e9c349]/30 transition-colors cursor-pointer animate-list-item delay-2 gap-4 md:gap-0">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-[#0e0e10] overflow-hidden flex-shrink-0">
                  <img alt="Sculpture" className="w-full h-full object-cover grayscale opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpQslcbj6HIDshvmtHBpqUJHPUKx9SahlcmeS3gX0sXcxgeSOKr7ZAwiGDcsRwu5mEBDHAFfL9VknKzSjDpvITVPp8bVt4HdWD5CFPuMbZpO9h8zP2yxSMmLerL4xq10o514Aqrl0WhkKFDAD1OYbWu73IrSicwzBjw_Ij6Q5cqVHuS2grUlpjQQRs03dQAQI45ZpRfjXS_ttOrq6geowWL8SGSUkkRhW4CBWWW9tyESvyjfSksRdQKcLF-Ce_6BjAF4BR6PiEtkz1" />
                </div>
                <div>
                  <h3 className="text-[18px] text-[#e4e2e4]" style={{ fontFamily: 'Playfair Display, serif' }}>Structural Silence IV</h3>
                  <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] mt-2">RES-4412-MT</p>
                </div>
              </div>
              <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto justify-between md:justify-end">
                <div className="text-left md:text-right">
                  <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] mb-1">NOV 15, 2024</p>
                  <p className="text-[16px] text-[#e4e2e4]">$8,200</p>
                </div>
                <div className="flex items-center gap-4 md:gap-12">
                  <span className="px-3 py-1 bg-[#2a2a2b] border border-[#e4e2e4]/10 text-[#bec6e0] text-[12px] font-semibold tracking-[0.1em] uppercase rounded-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#bec6e0]"></span> CONFIRMED
                  </span>
                  <button className="p-2 text-[#c6c6cd] hover:text-[#e9c349] transition-colors">
                    <span className="material-symbols-outlined">expand_more</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#131315] w-full pt-[128px] pb-8 border-t border-[#e4e2e4]/10 mt-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[32px] px-[20px] md:px-[64px] max-w-[1440px] mx-auto opacity-80 hover:opacity-100 transition-opacity">
            <div className="text-[24px] font-medium text-[#e4e2e4] mb-6 md:mb-0" style={{ fontFamily: 'Playfair Display, serif' }}>
              ArtGallery419
            </div>
            <div className="col-span-1 md:col-span-3 flex flex-wrap justify-start md:justify-end gap-6 md:gap-8">
              {['Privacy Policy', 'Terms of Service', 'Press Kit', 'Contact Us'].map((link) => (
                <a key={link} className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] hover:text-[#e9c349] transition-colors" href="#">
                  {link}
                </a>
              ))}
            </div>
            <div className="col-span-1 md:col-span-4 mt-12 pt-8 border-t border-[#e4e2e4]/5 text-center md:text-left">
              <p className="text-[16px] text-[#c6c6cd]">© 2024 ArtGallery419. Curated Excellence.</p>
            </div>
          </div>
        </footer>
        
      </div>
    </>
  );
};

export default Reservations;