import React from 'react';

const UserProfile = () => {
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

        .material-symbols-outlined.fill {
            font-variation-settings: 'FILL' 1;
        }
      `}</style>

      <div className="bg-[#131315] text-[#e4e2e4] antialiased min-h-screen flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
        
        {/* TopNavBar */}
        <header className="bg-[#131315]/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-[#e4e2e4]/10">
          <div className="flex justify-between items-center px-[20px] md:px-[64px] h-20 w-full max-w-[1440px] mx-auto">
            <div className="text-[32px] font-bold tracking-tight text-[#e4e2e4]" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.3' }}>
              ArtGallery419
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] hover:text-[#e9c349] transition-colors duration-300 scale-95 active:scale-90" href="#">Exhibitions</a>
              <a className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] hover:text-[#e9c349] transition-colors duration-300 scale-95 active:scale-90" href="#">Artists</a>
              <a className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] hover:text-[#e9c349] transition-colors duration-300 scale-95 active:scale-90" href="#">Workshops</a>
              <a className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] hover:text-[#e9c349] transition-colors duration-300 scale-95 active:scale-90" href="#">Gallery</a>
            </nav>
            
            <div className="flex items-center space-x-6">
              <button aria-label="Favorites" className="text-[#e9c349] hover:text-[#ffe088] transition-colors duration-300 scale-95 active:scale-90">
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button aria-label="Shopping Cart" className="text-[#e9c349] hover:text-[#ffe088] transition-colors duration-300 scale-95 active:scale-90">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
              <div className="w-10 h-10 rounded-full bg-[#1f1f21] overflow-hidden border border-[#e4e2e4]/10 ml-4">
                <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsfM6Ak3Cn1O30RTS4wQrEJY-1olpjd8Y3YGIFJBXjtLinojcR9siGkZJbtIuHjEUyzhSlPZteb8rDtWV6MtUUgSzUxyAl6tbVc-t6LpG7K9oBbARNYHCB_vhfYwNpAyWeKDYwr0M76V5fzHPmwnOntm3VC_VqRmQyoGY9qcLFhpQ9HXe6_nomw9TstLuvOrwqXr-tyGtqk4SnuVDWWfb6FBLfzr-isSiQa6eVMyuh6q8p3vwnurtfMn5Kq0yXlA1aIqTyEIDnZaIq" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Canvas */}
        <main className="flex-grow pt-32 pb-[128px] px-[20px] md:px-[64px] max-w-[1440px] mx-auto w-full">
          <div className="max-w-4xl mx-auto">
            
            {/* Page Header */}
            <div className="mb-16 border-b border-[#e4e2e4]/10 pb-8 flex flex-col md:flex-row items-center md:items-start gap-[32px]">
              <div className="w-32 h-32 rounded-full overflow-hidden border border-[#e4e2e4]/20 flex-shrink-0 transition-all duration-500 hover:scale-105 hover:border-[#e9c349] cursor-pointer">
                <img alt="User Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzEM6Ek5yqbLFRBbXBqVPCZTzm3Yo145BWcAflYz2IskaBgTM3eAUD7m5zggDsLrAR8j8dGeCV5rirC0P8zd-xtEJwXg5zDwEJx-WmDhoOqUhEwLN6mQ6yAioYxKPJryZyyuyI85m4zuYFWZNUr0k6clqja-c1L4H74FWSqmoBfI7zrulMBpftWcxmGt2XO81rnDceAPyrv08_VHRBqmhXY4hZ_JW-vNCOUe-i_3PKP9aUMRG1hrIOLZNc2Ca_w26DQL-yyg-T90xd" />
              </div>
              <div className="text-center md:text-left flex-grow">
                <h1 className="text-[48px] font-semibold text-[#e4e2e4] mb-2" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.2' }}>
                  Elena Rostova
                </h1>
                <p className="text-[18px] text-[#c6c6cd] leading-[1.6]">
                  Collector & Patron since 2021
                </p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                  <button className="bg-[#e9c349] text-[#131315] text-[12px] font-semibold tracking-[0.1em] uppercase px-6 py-3 hover:bg-[#ffe088] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(233,195,73,0.2)] active:scale-95">
                    EDIT PROFILE
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-[32px]">
              
              {/* Navigation Sidebar (Internal Settings) */}
              <div className="md:col-span-4 lg:col-span-3">
                <nav className="flex flex-col space-y-4 sticky top-32">
                  <a className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#e9c349] flex items-center gap-3 border-l-2 border-[#e9c349] pl-4 py-1 transition-all duration-300" href="#">
                    <span className="material-symbols-outlined">person</span>
                    Personal Information
                  </a>
                  <a className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] hover:text-[#e4e2e4] flex items-center gap-3 border-l-2 border-transparent pl-4 py-1 transition-all duration-300" href="#">
                    <span className="material-symbols-outlined">lock</span>
                    Security
                  </a>
                  <a className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] hover:text-[#e4e2e4] flex items-center gap-3 border-l-2 border-transparent pl-4 py-1 transition-all duration-300" href="#">
                    <span className="material-symbols-outlined">notifications</span>
                    Notifications
                  </a>
                  <a className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] hover:text-[#e4e2e4] flex items-center gap-3 border-l-2 border-transparent pl-4 py-1 transition-all duration-300" href="#">
                    <span className="material-symbols-outlined">receipt_long</span>
                    Acquisitions
                  </a>
                </nav>
              </div>

              {/* Forms Area */}
              <div className="md:col-span-8 lg:col-span-9 space-y-16">
                
                {/* Personal Info Section */}
                <section className="bg-[#1f1f21] p-8 rounded-lg border border-[#e4e2e4]/10 transition-all duration-500 ease-in-out hover:shadow-[0_4px_20px_rgba(233,195,73,0.05)] hover:border-[#e9c349]/20">
                  <h2 className="text-[24px] font-medium text-[#e4e2e4] mb-8" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.4' }}>
                    Personal Information
                  </h2>
                  <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex flex-col">
                        <label className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] mb-2">FIRST NAME</label>
                        <input className="bg-transparent border-0 border-b border-[#e4e2e4]/20 text-[#e4e2e4] text-[16px] focus:ring-0 focus:outline-none focus:border-[#e9c349] px-0 py-2 transition-all duration-300" type="text" defaultValue="Elena" />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] mb-2">LAST NAME</label>
                        <input className="bg-transparent border-0 border-b border-[#e4e2e4]/20 text-[#e4e2e4] text-[16px] focus:ring-0 focus:outline-none focus:border-[#e9c349] px-0 py-2 transition-all duration-300" type="text" defaultValue="Rostova" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] mb-2">EMAIL ADDRESS</label>
                      <input className="bg-transparent border-0 border-b border-[#e4e2e4]/20 text-[#e4e2e4] text-[16px] focus:ring-0 focus:outline-none focus:border-[#e9c349] px-0 py-2 transition-all duration-300" type="email" defaultValue="elena.rostova@example.com" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] mb-2">SHIPPING ADDRESS</label>
                      <input className="bg-transparent border-0 border-b border-[#e4e2e4]/20 text-[#e4e2e4] text-[16px] focus:ring-0 focus:outline-none focus:border-[#e9c349] px-0 py-2 transition-all duration-300" type="text" defaultValue="124 Gallery Row, Suite 4B, New York, NY 10012" />
                    </div>
                    <div className="pt-4">
                      <button className="bg-[#e9c349] text-[#131315] text-[12px] font-semibold tracking-[0.1em] uppercase px-8 py-3 hover:bg-[#ffe088] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(233,195,73,0.2)] active:scale-95" type="button">
                        SAVE CHANGES
                      </button>
                    </div>
                  </form>
                </section>

                {/* Security Section */}
                <section className="bg-[#1f1f21] p-8 rounded-lg border border-[#e4e2e4]/10 transition-all duration-500 ease-in-out hover:shadow-[0_4px_20px_rgba(233,195,73,0.05)] hover:border-[#e9c349]/20">
                  <h2 className="text-[24px] font-medium text-[#e4e2e4] mb-8" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.4' }}>
                    Security
                  </h2>
                  <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col">
                      <label className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] mb-2">CURRENT PASSWORD</label>
                      <input className="bg-transparent border-0 border-b border-[#e4e2e4]/20 text-[#e4e2e4] text-[16px] focus:ring-0 focus:outline-none focus:border-[#e9c349] px-0 py-2 transition-all duration-300" placeholder="••••••••" type="password" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] mb-2">NEW PASSWORD</label>
                      <input className="bg-transparent border-0 border-b border-[#e4e2e4]/20 text-[#e4e2e4] text-[16px] focus:ring-0 focus:outline-none focus:border-[#e9c349] px-0 py-2 transition-all duration-300" type="password" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] mb-2">CONFIRM NEW PASSWORD</label>
                      <input className="bg-transparent border-0 border-b border-[#e4e2e4]/20 text-[#e4e2e4] text-[16px] focus:ring-0 focus:outline-none focus:border-[#e9c349] px-0 py-2 transition-all duration-300" type="password" />
                    </div>
                    <div className="pt-4">
                      <button className="bg-transparent border border-[#e9c349] text-[#e9c349] text-[12px] font-semibold tracking-[0.1em] uppercase px-8 py-3 hover:bg-[#e9c349]/10 transition-all duration-300 hover:scale-[1.02] active:scale-95" type="button">
                        UPDATE PASSWORD
                      </button>
                    </div>
                  </form>
                </section>

              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#131315] w-full pt-[128px] pb-8 border-t border-[#e4e2e4]/10 mt-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[32px] px-[20px] md:px-[64px] max-w-[1440px] mx-auto">
            <div className="col-span-1 md:col-span-2 mb-8 md:mb-0">
              <div className="text-[24px] font-medium text-[#e4e2e4] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                ArtGallery419
              </div>
              <p className="text-[16px] text-[#c6c6cd] opacity-80 transition-opacity hover:opacity-100">
                © 2024 ArtGallery419. Curated Excellence.
              </p>
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-6 md:justify-end md:items-end">
              {['Privacy Policy', 'Terms of Service', 'Press Kit', 'Contact Us'].map((link) => (
                <a key={link} className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#c6c6cd] hover:text-[#e9c349] transition-colors opacity-80 hover:opacity-100" href="#">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </footer>
        
      </div>
    </>
  );
};

export default UserProfile;