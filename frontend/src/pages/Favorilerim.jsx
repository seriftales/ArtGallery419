import React from 'react';

const CuratedSelection = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
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
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
      `}</style>

      <div className="bg-[#131315] text-[#e4e2e4] antialiased min-h-screen flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
        
        {/* TopNavBar */}
        <nav className="fixed top-0 w-full z-50 bg-[#131315]/80 backdrop-blur-md border-b border-[#e4e2e4]/10">
          <div className="flex justify-between items-center px-[20px] md:px-[64px] h-20 w-full max-w-[1440px] mx-auto">
            <a className="text-[32px] font-bold tracking-tight text-[#e4e2e4]" href="#" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.3' }}>
              ArtGallery419
            </a>
            
            <div className="hidden md:flex gap-8">
              {['Exhibitions', 'Artists', 'Workshops', 'Gallery'].map((item) => (
                <a key={item} className="text-[#c6c6cd] hover:text-[#e9c349] transition-colors duration-300 text-[12px] font-semibold tracking-[0.1em] uppercase" href="#">
                  {item}
                </a>
              ))}
            </div>
            
            <div className="flex items-center gap-6 text-[#e9c349]">
              <button aria-label="favorite" className="scale-95 active:scale-90 transition-transform hover:text-[#ffe088] transition-colors duration-300 border-b border-[#e9c349] pb-1">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              </button>
              <button aria-label="shopping_cart" className="scale-95 active:scale-90 transition-transform hover:text-[#ffe088] transition-colors duration-300">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
              <button aria-label="User profile" className="scale-95 active:scale-90 transition-transform hover:text-[#ffe088] transition-colors duration-300 w-8 h-8 rounded-full bg-[#2a2a2b] border border-[#909097]/20 overflow-hidden flex items-center justify-center">
                <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADJp54x9ueDH6961fSfDJc1W1zITuz9Y-ky5TYXS5E2B2zROQNE2W7ir79FErI4V6zbiujL6YitgcqyZeVr5r2I_v_iiP5-bscWGBmWx6N7tS-qN-bQ2V2UyBTEF15xPk5vIQQEb0zfBWJyNdaS70FlDtorOwH-zyzjKhbDVB1CFRmUEWLjTjGpJp2skxzNCiCMqe-2EDCmx5DVhdnir9ZQy4lFiUrVKjpizg1s6TI6IgDaNeh3g7i9SK6IGtDJwTy4zLJD1WViRUJ" />
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow pt-[128px] pb-[128px] px-[20px] md:px-[64px] max-w-[1440px] mx-auto w-full">
          <header className="mb-16">
            <h1 className="text-[40px] md:text-[64px] font-bold text-[#e4e2e4] mb-4 animate-fade-in-up" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
              My Curated Selection
            </h1>
            <p className="text-[18px] text-[#c6c6cd] max-w-2xl animate-fade-in-up delay-100" style={{ lineHeight: '1.6' }}>
              Your personal collection of masterpieces, saved for future consideration.
            </p>
          </header>

          {/* Masonry Grid for Artworks */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-[32px] space-y-[32px]">
            
            {/* Artwork Card 1 */}
            <div className="break-inside-avoid bg-[#2a2a2b] border border-[#909097]/10 group relative overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-[#e9c349]/50 animate-fade-in-up delay-100">
              <div className="relative overflow-hidden">
                <img alt="Abstract painting with vibrant red, blue, and yellow geometric shapes." className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp49oWhAXO5cv87cALUn9mKn6F1C4MVc_WvpNxONngashcn7kzLR5U0PAy1E6t15ZoZGE5-gNuQOI817Gf9nAc8LWnt0efjh5KiZJ4Q8eQlYKtpx0rn_jU2Pu7E_L_5VV4U9HDukaTQN_yANDgs7BAt2S9FKU1Py39txGAn2jAQt5mGjy_U_ZrVnKXHDWnWZxTM1XvCYayGg9tXafa_oox70OJ_nAUfGBUZi0oa3_ym6iiotCc5zhiAEy5fKym0YRlvB7XDxfcNtWI" />
                <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 bg-[#131315]/80 backdrop-blur-sm border border-[#909097]/20 flex items-center justify-center text-[#e4e2e4] hover:text-[#e9c349] hover:border-[#e9c349] transition-colors" title="Remove from favorites">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-[24px] font-medium text-[#e4e2e4] mb-1" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.4' }}>Chromatic Convergence</h3>
                    <p className="text-[16px] text-[#c6c6cd]">Elena Rostova</p>
                  </div>
                  <span className="text-[14px] font-medium text-[#e9c349]">$12,500</span>
                </div>
                <div className="mt-6">
                  <button className="w-full py-3 bg-transparent border border-[#e9c349] text-[#e9c349] text-[12px] font-semibold tracking-[0.1em] hover:bg-[#e9c349]/10 hover:text-[#ffe088] transition-colors duration-300 uppercase flex items-center justify-center gap-2">
                    <span>Move to Cart</span>
                    <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Artwork Card 2 */}
            <div className="break-inside-avoid bg-[#2a2a2b] border border-[#909097]/10 group relative overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-[#e9c349]/50 animate-fade-in-up delay-200">
              <div className="relative overflow-hidden">
                <img alt="Minimalist monochromatic sculpture on a pedestal." className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMLac6T-KFsSTlwa8Rg0anyMvgHyFO2xnnHGX2kHVyxwgSAKtBNgqaxSfcAMnZF3pqIt31bUnY1YLa6M6JzJPXgF1LEl5Lz0nwgnC5kTcp5c1msq47pdATMO8mEa0VbAwTrD-vnIZK6HQLx_3131ucqXBX6gmEvI41WgUYXhgYRjRa13lTWw0AFbdlwe5CT2G11bFa5l1Z22VR8XrDop3lbcNEyFJLxeOZyQcrSH8rsVEyA_bA7twxvW92LmWxYvcAC71GrByb0z4o" />
                <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 bg-[#131315]/80 backdrop-blur-sm border border-[#909097]/20 flex items-center justify-center text-[#e4e2e4] hover:text-[#e9c349] hover:border-[#e9c349] transition-colors" title="Remove from favorites">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-[24px] font-medium text-[#e4e2e4] mb-1" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.4' }}>Silence in Bronze</h3>
                    <p className="text-[16px] text-[#c6c6cd]">Julian Vance</p>
                  </div>
                  <span className="text-[14px] font-medium text-[#e9c349]">$28,000</span>
                </div>
                <div className="mt-6">
                  <button className="w-full py-3 bg-transparent border border-[#e9c349] text-[#e9c349] text-[12px] font-semibold tracking-[0.1em] hover:bg-[#e9c349]/10 hover:text-[#ffe088] transition-colors duration-300 uppercase flex items-center justify-center gap-2">
                    <span>Move to Cart</span>
                    <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Artwork Card 3 */}
            <div className="break-inside-avoid bg-[#2a2a2b] border border-[#909097]/10 group relative overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-[#e9c349]/50 animate-fade-in-up delay-300">
              <div className="relative overflow-hidden">
                <img alt="Large scale expressionist portrait painting." className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7c4iDGeIwExqx6pBpA7fdJmr2CWFSKuRWh_tjvfm7mQOiuyCQozgQn1AsauPVfXTKbiHfYTLx0VR3HmswZYYs8T2YhVfnWlTC7UdKpUNEhRNoUSJiU_CJsnl4mvVU4aIK8fqKdBPl8meB42JsZNBwL8SMS0_FFLQrzvNcMAmR5C4IvNcpq7T3LUx8NLjybzrrhsodN521BMvFENcDy6bZsoqlWgjWFrYFJa-nqzVKkEmynJfc9PL9iGB3w2HwW7nereiKoagWlsf7" />
                <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 bg-[#131315]/80 backdrop-blur-sm border border-[#909097]/20 flex items-center justify-center text-[#e4e2e4] hover:text-[#e9c349] hover:border-[#e9c349] transition-colors" title="Remove from favorites">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-[24px] font-medium text-[#e4e2e4] mb-1" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.4' }}>The Observer</h3>
                    <p className="text-[16px] text-[#c6c6cd]">Samira Okafor</p>
                  </div>
                  <span className="text-[14px] font-medium text-[#e9c349]">$15,200</span>
                </div>
                <div className="mt-6">
                  <button className="w-full py-3 bg-transparent border border-[#e9c349] text-[#e9c349] text-[12px] font-semibold tracking-[0.1em] hover:bg-[#e9c349]/10 hover:text-[#ffe088] transition-colors duration-300 uppercase flex items-center justify-center gap-2">
                    <span>Move to Cart</span>
                    <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Artwork Card 4 */}
            <div className="break-inside-avoid bg-[#2a2a2b] border border-[#909097]/10 group relative overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-[#e9c349]/50 animate-fade-in-up delay-400">
              <div className="relative overflow-hidden">
                <img alt="Modernist architectural photography piece." className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9_d951jIA1qLrizlEnAXE1Smd83uCSFgA4tK5GDSH2RZh3xhveG9ZSDp7CeU4ZjRpKmXcLCxuCkxlob_0RBDB7xw7oyc9bB0pCB1G65k6tljGzsB3lsfRuu_6Zd8ksS1v1noIQMhNEkuXCv0v0j_0iFng6Umga_913Xy5wMNw-FO1ovXg8fyIFNd0wwOLImjlg4tl8OCxysgk_Rwtl4SAjR6lXCOqCe9gN3-llPr3YQuOns6n8jOpNNu3TysdM2NywQOI-XQGZH65" />
                <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 bg-[#131315]/80 backdrop-blur-sm border border-[#909097]/20 flex items-center justify-center text-[#e4e2e4] hover:text-[#e9c349] hover:border-[#e9c349] transition-colors" title="Remove from favorites">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-[24px] font-medium text-[#e4e2e4] mb-1" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.4' }}>Brutalist Echoes IV</h3>
                    <p className="text-[16px] text-[#c6c6cd]">David Chen</p>
                  </div>
                  <span className="text-[14px] font-medium text-[#e9c349]">$8,900</span>
                </div>
                <div className="mt-6">
                  <button className="w-full py-3 bg-transparent border border-[#e9c349] text-[#e9c349] text-[12px] font-semibold tracking-[0.1em] hover:bg-[#e9c349]/10 hover:text-[#ffe088] transition-colors duration-300 uppercase flex items-center justify-center gap-2">
                    <span>Move to Cart</span>
                    <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#131315] w-full pt-[128px] pb-8 border-t border-[#e4e2e4]/10 mt-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[32px] px-[20px] md:px-[64px] max-w-[1440px] mx-auto">
            <div className="col-span-1 md:col-span-4 mb-8">
              <span className="text-[24px] font-medium text-[#e4e2e4]" style={{ fontFamily: 'Playfair Display, serif' }}>ArtGallery419</span>
            </div>
            <div className="flex flex-col gap-4 col-span-1 md:col-span-3 md:flex-row md:gap-8">
              {['Privacy Policy', 'Terms of Service', 'Press Kit', 'Contact Us'].map((link) => (
                <a key={link} className="text-[12px] font-semibold tracking-[0.1em] text-[#c6c6cd] opacity-80 hover:opacity-100 hover:text-[#e9c349] transition-all duration-300 uppercase" href="#">
                  {link}
                </a>
              ))}
            </div>
            <div className="col-span-1 md:col-span-1 mt-8 md:mt-0 flex items-end md:justify-end">
              <span className="text-[16px] text-[#c6c6cd]">© 2024 ArtGallery419. Curated Excellence.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CuratedSelection;