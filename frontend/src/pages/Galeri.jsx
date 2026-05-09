import React from 'react';

const TheCollection = () => {
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
        
        .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }

        .sidebar-transition {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Custom Scrollbar for Artist Filter */
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #2a2a2b;
            border-radius: 4px;
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
              <a className="text-[12px] font-semibold tracking-[0.1em] text-[#c6c6cd] hover:text-[#e9c349] transition-colors uppercase" href="#">Exhibitions</a>
              <a className="text-[12px] font-semibold tracking-[0.1em] text-[#c6c6cd] hover:text-[#e9c349] transition-colors uppercase" href="#">Artists</a>
              <a className="text-[12px] font-semibold tracking-[0.1em] text-[#c6c6cd] hover:text-[#e9c349] transition-colors uppercase" href="#">Workshops</a>
              <a className="text-[12px] font-semibold tracking-[0.1em] text-[#e9c349] border-b border-[#e9c349] pb-1 uppercase" href="#">Gallery</a>
            </nav>
            <div className="flex items-center space-x-6">
              <button aria-label="Search" className="scale-95 active:scale-90 transition-transform text-[#c6c6cd] hover:text-[#e9c349] transition-colors duration-300">
                <span className="material-symbols-outlined">search</span>
              </button>
              <button aria-label="Favorites" className="scale-95 active:scale-90 transition-transform text-[#c6c6cd] hover:text-[#e9c349] transition-colors duration-300">
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button aria-label="Cart" className="scale-95 active:scale-90 transition-transform text-[#c6c6cd] hover:text-[#e9c349] transition-colors duration-300">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#909097]/20">
                <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDFj1hBJVZkFWCB1InGsVY1r2TvDUmK7wf5k3Oc5Zzkr6YnSwP8U5KXKz-gJ-Tm1IfLkOA2c2c-Qf8tLwtS4ZtVnj5AhGN7Z0uqvyNUVURw1ADvkLOMi80-WtIk5CwiNtBn1NnYVLhIQ6iMwL7SMoVFOm4fjhj_F-9sg9k-rAUr6QDJv9-FqmN50kvvEFZ1UsSSTmr9IGkNKAqgtL6caNtsM_5SLF0T5qKQlxvAKKo401cP8UhIufC1mvikz0ozAoVLMCVabbS9J1r" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Canvas */}
        <main className="flex-grow pt-[120px] pb-[128px] px-[20px] md:px-[64px] max-w-[1440px] mx-auto w-full">
          
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-[40px] md:text-[64px] font-bold text-[#e4e2e4] mb-4" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
              The Collection
            </h1>
            <p className="text-[18px] text-[#c6c6cd] mt-4 max-w-2xl" style={{ lineHeight: '1.6' }}>
              Discover curated masterpieces across various mediums, carefully selected for the discerning collector. Our gallery features exclusive works from emerging and established artists worldwide.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-[32px]">
            
            {/* Sidebar Filters */}
            <aside className="w-full md:w-64 flex-shrink-0 mb-8 md:mb-0 space-y-12">
              
              {/* Category Filter */}
              <div>
                <h3 className="text-[12px] font-semibold text-[#e4e2e4] mb-6 uppercase tracking-[0.1em] border-b border-[#e4e2e4]/10 pb-2">Category</h3>
                <ul className="space-y-4">
                  {['Painting', 'Digital', 'Photography'].map((category) => (
                    <li key={category}>
                      <label className="flex items-center space-x-3 cursor-pointer group sidebar-transition">
                        <div className="w-4 h-4 border border-[#c6c6cd] rounded-sm flex items-center justify-center group-hover:border-[#e9c349] transition-colors">
                          <span className="material-symbols-outlined text-[12px] opacity-0 text-[#e9c349]">check</span>
                        </div>
                        <span className="text-[16px] text-[#c6c6cd] group-hover:text-[#e4e2e4] transition-colors">{category}</span>
                      </label>
                    </li>
                  ))}
                  {/* Selected Item Example */}
                  <li>
                    <label className="flex items-center space-x-3 cursor-pointer group sidebar-transition">
                      <div className="w-4 h-4 border border-[#e9c349] bg-[#e9c349]/10 rounded-sm flex items-center justify-center">
                        <span className="material-symbols-outlined text-[12px] opacity-100 text-[#e9c349]">check</span>
                      </div>
                      <span className="text-[16px] text-[#e4e2e4] transition-colors">Sculpture</span>
                    </label>
                  </li>
                </ul>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="text-[12px] font-semibold text-[#e4e2e4] mb-6 uppercase tracking-[0.1em] border-b border-[#e4e2e4]/10 pb-2">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[14px] font-medium text-[#c6c6cd]">
                    <span>$1,000</span>
                    <span>$50,000+</span>
                  </div>
                  <div className="relative w-full h-1 bg-[#2a2a2b] rounded-full">
                    <div className="absolute top-0 left-[20%] right-[30%] h-full bg-[#e9c349] rounded-full"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-[20%] w-3 h-3 bg-[#e9c349] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)] cursor-pointer"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-[30%] w-3 h-3 bg-[#e9c349] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)] cursor-pointer"></div>
                  </div>
                </div>
              </div>

              {/* Artist Filter */}
              <div>
                <h3 className="text-[12px] font-semibold text-[#e4e2e4] mb-6 uppercase tracking-[0.1em] border-b border-[#e4e2e4]/10 pb-2">Artist</h3>
                <div className="relative mb-4">
                  <input 
                    className="w-full bg-transparent border-0 border-b border-[#e4e2e4]/20 py-2 text-[16px] text-[#e4e2e4] placeholder-[#c6c6cd]/50 focus:outline-none focus:border-[#e9c349] focus:ring-0 transition-colors duration-300" 
                    placeholder="Search artists..." 
                    type="text" 
                  />
                  <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-[#c6c6cd] text-[18px]">search</span>
                </div>
                <ul className="space-y-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  <li>
                    <label className="flex items-center space-x-3 cursor-pointer group sidebar-transition">
                      <div className="w-4 h-4 border border-[#c6c6cd] rounded-sm flex items-center justify-center group-hover:border-[#e9c349] transition-colors">
                        <span className="material-symbols-outlined text-[12px] opacity-0 text-[#e9c349]">check</span>
                      </div>
                      <span className="text-[16px] text-[#c6c6cd] group-hover:text-[#e4e2e4] transition-colors">Elena Rossi</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-3 cursor-pointer group sidebar-transition">
                      <div className="w-4 h-4 border border-[#c6c6cd] rounded-sm flex items-center justify-center group-hover:border-[#e9c349] transition-colors">
                        <span className="material-symbols-outlined text-[12px] opacity-0 text-[#e9c349]">check</span>
                      </div>
                      <span className="text-[16px] text-[#c6c6cd] group-hover:text-[#e4e2e4] transition-colors">Marcus Chen</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-3 cursor-pointer group sidebar-transition">
                      <div className="w-4 h-4 border border-[#e9c349] bg-[#e9c349]/10 rounded-sm flex items-center justify-center">
                        <span className="material-symbols-outlined text-[12px] opacity-100 text-[#e9c349]">check</span>
                      </div>
                      <span className="text-[16px] text-[#e4e2e4] transition-colors">Sarah Jenkins</span>
                    </label>
                  </li>
                </ul>
              </div>
            </aside>

            {/* Grid Area */}
            <div className="flex-grow">
              
              {/* Utilities Bar */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#e4e2e4]/10">
                <span className="text-[16px] text-[#c6c6cd]">Showing 1-9 of 42 artworks</span>
                <div className="flex items-center space-x-4">
                  <span className="text-[14px] font-medium text-[#c6c6cd] uppercase tracking-wider hidden sm:inline-block">Sort by:</span>
                  <select className="bg-transparent border-none text-[16px] text-[#e4e2e4] focus:ring-0 cursor-pointer p-0 pr-6 outline-none">
                    <option className="bg-[#131315] text-[#e4e2e4]" value="newest">Newest Arrivals</option>
                    <option className="bg-[#131315] text-[#e4e2e4]" value="price-high">Price: High to Low</option>
                    <option className="bg-[#131315] text-[#e4e2e4]" value="price-low">Price: Low to High</option>
                  </select>
                </div>
              </div>

              {/* Masonry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Card 1 */}
                <article className="group relative flex flex-col cursor-pointer bg-[#1b1b1d] border border-[#e4e2e4]/5 p-4 rounded transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.06)] hover:border-[#e9c349]/30 animate-fade-in-up stagger-1 hover:-translate-y-2">
                  <div className="relative w-full aspect-[4/5] overflow-hidden mb-4 bg-[#1f1f21]">
                    <img alt="Abstract painting" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx2FRzjfMEEnXgSMnifvn051zGmNfy7BF1GL5Mle7tzKGKPNOZuebEkGaJxYLRRnno8ZiAdY-2IxtbqhCHC1xA92nr_IHmmj5iWeKx6H5oarGTCnPBLYM_ANQrLSQcFXrA_07hPZANmPmZgzKOroGaPBtx5zQ6E5kcyb-fLrPp45Zi_sVo-hVVFCFIcH7FkA15TVR1xqj0hQEBJ_88VHtrfebUgHm-Lj_IVnDRqSR1IzsdFm4SSjD-W8qo-g4ZB0teG2ec3GnUgDzk" />
                    
                    {/* Overlays */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-10 h-10 bg-[#131315]/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[#e4e2e4] hover:text-[#e9c349] transition-colors shadow-lg active:scale-90">
                        <span className="material-symbols-outlined">favorite</span>
                      </button>
                    </div>
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <label className="flex items-center space-x-2 bg-[#131315]/80 backdrop-blur-sm px-3 py-1.5 rounded-full cursor-pointer active:scale-95 transition-transform">
                        <div className="w-4 h-4 border border-[#c6c6cd] rounded-sm flex items-center justify-center">
                          <span className="material-symbols-outlined text-[12px] opacity-0 text-[#e9c349]">check</span>
                        </div>
                        <span className="text-[12px] font-semibold tracking-[0.1em] text-[#e4e2e4] uppercase">Compare</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h2 className="text-[24px] font-medium text-[#e4e2e4] mb-1 group-hover:text-[#e9c349] transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>Ethereal Resonance</h2>
                    <p className="text-[16px] text-[#c6c6cd] mb-4">Sarah Jenkins, 2023</p>
                    <div className="mt-auto flex justify-between items-end">
                      <span className="text-[18px] text-[#e4e2e4] font-semibold">$12,500</span>
                      <span className="text-[12px] font-semibold text-[#c6c6cd] uppercase tracking-[0.1em]">Painting</span>
                    </div>
                  </div>
                </article>

                {/* Card 2 */}
                <article className="group relative flex flex-col cursor-pointer bg-[#1b1b1d] border border-[#e4e2e4]/5 p-4 rounded transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.06)] hover:border-[#e9c349]/30 animate-fade-in-up stagger-2 hover:-translate-y-2">
                  <div className="relative w-full aspect-square overflow-hidden mb-4 bg-[#1f1f21]">
                    <img alt="Modern sculpture" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwUE9uRRJnIfbQTQCfo_jmA3IMUTdE-o4FDtQDTghMJ0yESy_0Sx7e1thIovTxsMrcnFseDw08L8dawY_qQjxIupLpMuy2vqTac6Fwy_jFRS5dvv2el8B6LsdQ0qLrK8XpiVoHRMOCuv7B0LpTME2vWZL8CAY6_Ob3lPABgXnDoD_7fwfD7KpNDPW8_k1y90JWi5CepcMnrQkoQXV6fpe9EhjcjqKPii76ttma_MuTabmWQou3A77NbTMBgfjSFDOfYyRwgJtRSHSM" />
                    
                    {/* Overlays */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-10 h-10 bg-[#131315]/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[#e4e2e4] hover:text-[#e9c349] transition-colors shadow-lg active:scale-90">
                        <span className="material-symbols-outlined">favorite</span>
                      </button>
                    </div>
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <label className="flex items-center space-x-2 bg-[#131315]/80 backdrop-blur-sm px-3 py-1.5 rounded-full cursor-pointer active:scale-95 transition-transform">
                        <div className="w-4 h-4 border border-[#c6c6cd] rounded-sm flex items-center justify-center">
                          <span className="material-symbols-outlined text-[12px] opacity-0 text-[#e9c349]">check</span>
                        </div>
                        <span className="text-[12px] font-semibold tracking-[0.1em] text-[#e4e2e4] uppercase">Compare</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h2 className="text-[24px] font-medium text-[#e4e2e4] mb-1 group-hover:text-[#e9c349] transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>Construct IV</h2>
                    <p className="text-[16px] text-[#c6c6cd] mb-4">Marcus Chen, 2024</p>
                    <div className="mt-auto flex justify-between items-end">
                      <span className="text-[18px] text-[#e4e2e4] font-semibold">$8,900</span>
                      <span className="text-[12px] font-semibold text-[#c6c6cd] uppercase tracking-[0.1em]">Sculpture</span>
                    </div>
                  </div>
                </article>

                {/* Card 3 */}
                <article className="group relative flex flex-col cursor-pointer bg-[#1b1b1d] border border-[#e4e2e4]/5 p-4 rounded transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.06)] hover:border-[#e9c349]/30 animate-fade-in-up stagger-3 hover:-translate-y-2">
                  <div className="relative w-full aspect-[3/4] overflow-hidden mb-4 bg-[#1f1f21]">
                    <img alt="Digital art piece" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVRjsIdWEKLhL3qWCNBlvrfAiMLKYBQ_QXfEi2m40GdHfhl_DrDiWZbVcRp6xGg_ktraFaDbOx_caAPnaSNEziRVFKWn6cwoOD-BbtfeLVaIASLqfn0hFag2VOuNTsXyeJusBfgVxJ1Bu_RiHheFtfgONI4UD08LkgiC1_kNhVjpnWtQHTIWScbDKG6NAbdJ-BVqaC8H2okg2n3pazGs8PlqI9qt4Euv0iJ8HPfbyzkmiRdKzLOXJL_Kn_QHlgmkysIX78H9QreWuR" />
                    
                    {/* Overlays */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-10 h-10 bg-[#131315]/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[#e9c349] transition-colors shadow-lg active:scale-90">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                      </button>
                    </div>
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <label className="flex items-center space-x-2 bg-[#131315]/80 backdrop-blur-sm px-3 py-1.5 rounded-full cursor-pointer active:scale-95 transition-transform">
                        <div className="w-4 h-4 border border-[#e9c349] bg-[#e9c349]/10 rounded-sm flex items-center justify-center">
                          <span className="material-symbols-outlined text-[12px] opacity-100 text-[#e9c349]">check</span>
                        </div>
                        <span className="text-[12px] font-semibold tracking-[0.1em] text-[#e4e2e4] uppercase">Compare</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h2 className="text-[24px] font-medium text-[#e4e2e4] mb-1 group-hover:text-[#e9c349] transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>Neural Synthesis</h2>
                    <p className="text-[16px] text-[#c6c6cd] mb-4">Elena Rossi, 2023</p>
                    <div className="mt-auto flex justify-between items-end">
                      <span className="text-[18px] text-[#e4e2e4] font-semibold">$4,200</span>
                      <span className="text-[12px] font-semibold text-[#c6c6cd] uppercase tracking-[0.1em]">Digital</span>
                    </div>
                  </div>
                </article>

                {/* Card 4 */}
                <article className="group relative flex flex-col cursor-pointer bg-[#1b1b1d] border border-[#e4e2e4]/5 p-4 rounded transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.06)] hover:border-[#e9c349]/30 animate-fade-in-up stagger-4 hover:-translate-y-2">
                  <div className="relative w-full aspect-square overflow-hidden mb-4 bg-[#1f1f21]">
                    <img alt="Oil painting portrait" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc14XDPu_Ibwmty-AfqaVDhk1_0zhqcdedZI7W6feNWP4JwJVQl8YhVxyMwhkPIZZalY9wONYbAKhu33wHjqt2QoIlRYI-ujCrWr5yauKFPySKbawBoWBECE46ZmK9Aa58k6a77kKWayVlPyRDDY9Mswo38R-iUSNvnzhZohpXRxiJ1DHBhjjzJ30bpuiYH8kS9_nd5UPm37BW3nrAfqp0KbJeNXcIofuZFgF3Mytybo3w_0ssPwzvUgtS6Vh779WqMHYRF3jQ6Sss" />
                    
                    {/* Overlays */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-10 h-10 bg-[#131315]/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[#e4e2e4] hover:text-[#e9c349] transition-colors shadow-lg active:scale-90">
                        <span className="material-symbols-outlined">favorite</span>
                      </button>
                    </div>
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <label className="flex items-center space-x-2 bg-[#131315]/80 backdrop-blur-sm px-3 py-1.5 rounded-full cursor-pointer active:scale-95 transition-transform">
                        <div className="w-4 h-4 border border-[#c6c6cd] rounded-sm flex items-center justify-center">
                          <span className="material-symbols-outlined text-[12px] opacity-0 text-[#e9c349]">check</span>
                        </div>
                        <span className="text-[12px] font-semibold tracking-[0.1em] text-[#e4e2e4] uppercase">Compare</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h2 className="text-[24px] font-medium text-[#e4e2e4] mb-1 group-hover:text-[#e9c349] transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>Study in Silence</h2>
                    <p className="text-[16px] text-[#c6c6cd] mb-4">Julian Vance, 2021</p>
                    <div className="mt-auto flex justify-between items-end">
                      <span className="text-[18px] text-[#e4e2e4] font-semibold">$18,000</span>
                      <span className="text-[12px] font-semibold text-[#c6c6cd] uppercase tracking-[0.1em]">Painting</span>
                    </div>
                  </div>
                </article>

              </div>

              {/* Load More */}
              <div className="mt-16 flex justify-center">
                <button className="px-8 py-4 bg-transparent border border-[#e9c349] text-[#e9c349] text-[12px] font-semibold uppercase tracking-[0.1em] rounded-none hover:bg-[#e9c349]/10 transition-colors duration-300">
                  Load More Works
                </button>
              </div>

            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#131315] w-full pt-[128px] pb-8 border-t border-[#e4e2e4]/10 mt-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[32px] px-[20px] md:px-[64px] max-w-[1440px] mx-auto">
            <div className="col-span-1 md:col-span-1 mb-8 md:mb-0">
              <div className="text-[24px] font-medium text-[#e4e2e4] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>ArtGallery419</div>
              <p className="text-[16px] text-[#c6c6cd]">© 2024 ArtGallery419. Curated Excellence.</p>
            </div>
            <div className="col-span-1 md:col-span-3 flex flex-wrap gap-8 md:justify-end items-start mt-2">
              <a className="text-[12px] font-semibold tracking-[0.1em] text-[#c6c6cd] hover:text-[#e9c349] opacity-80 hover:opacity-100 transition-all uppercase" href="#">Privacy Policy</a>
              <a className="text-[12px] font-semibold tracking-[0.1em] text-[#c6c6cd] hover:text-[#e9c349] opacity-80 hover:opacity-100 transition-all uppercase" href="#">Terms of Service</a>
              <a className="text-[12px] font-semibold tracking-[0.1em] text-[#c6c6cd] hover:text-[#e9c349] opacity-80 hover:opacity-100 transition-all uppercase" href="#">Press Kit</a>
              <a className="text-[12px] font-semibold tracking-[0.1em] text-[#c6c6cd] hover:text-[#e9c349] opacity-80 hover:opacity-100 transition-all uppercase" href="#">Contact Us</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};

export default TheCollection;