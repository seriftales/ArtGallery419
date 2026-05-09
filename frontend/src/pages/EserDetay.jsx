import React from 'react';

const ArtworkDetail = () => {
  return (
    <>
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
        
        .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
        }
        
        .stagger-1 { animation-delay: 0.1s; opacity: 0; }
        .stagger-2 { animation-delay: 0.2s; opacity: 0; }
        .stagger-3 { animation-delay: 0.3s; opacity: 0; }
        .stagger-4 { animation-delay: 0.4s; opacity: 0; }

        details > div {
            overflow: hidden;
            transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
            max-height: 0;
            opacity: 0;
        }
        
        details[open] > div {
            max-height: 500px;
            opacity: 1;
        }
      `}</style>

      <div className="bg-[#131315] text-[#e4e2e4] antialiased min-h-screen flex flex-col pt-20" style={{ fontFamily: 'Inter, sans-serif' }}>
        
        {/* TopNavBar */}
        <header className="bg-[#131315]/80 backdrop-blur-md text-[#e9c349] fixed top-0 w-full z-50 border-b border-[#e4e2e4]/10">
          <div className="flex justify-between items-center px-[20px] md:px-[64px] h-20 w-full max-w-[1440px] mx-auto">
            <a className="text-[32px] leading-[1.3] font-bold tracking-tight text-[#e4e2e4]" href="#" style={{ fontFamily: 'Playfair Display, serif' }}>
              ArtGallery419
            </a>
            
            {/* Navigation Links (Hidden on Mobile) */}
            <nav className="hidden md:flex gap-[32px] items-center">
              <a className="text-[12px] font-semibold leading-none tracking-[0.1em] text-[#c6c6cd] hover:text-[#e9c349] transition-colors uppercase" href="#">Exhibitions</a>
              <a className="text-[12px] font-semibold leading-none tracking-[0.1em] text-[#c6c6cd] hover:text-[#e9c349] transition-colors uppercase" href="#">Artists</a>
              <a className="text-[12px] font-semibold leading-none tracking-[0.1em] text-[#c6c6cd] hover:text-[#e9c349] transition-colors uppercase" href="#">Workshops</a>
              <a className="text-[12px] font-semibold leading-none tracking-[0.1em] text-[#e9c349] border-b border-[#e9c349] pb-1 uppercase" href="#">Gallery</a>
            </nav>
            
            <div className="flex items-center gap-4">
              <button aria-label="Search" className="text-[#e4e2e4] hover:text-[#e9c349] transition-colors duration-300 scale-95 active:scale-90">
                <span className="material-symbols-outlined">search</span>
              </button>
              <button aria-label="Favorite" className="text-[#e4e2e4] hover:text-[#e9c349] transition-colors duration-300 scale-95 active:scale-90">
                <span className="material-symbols-outlined" data-icon="favorite">favorite</span>
              </button>
              <button aria-label="Shopping Cart" className="text-[#e4e2e4] hover:text-[#e9c349] transition-colors duration-300 scale-95 active:scale-90 relative">
                <span className="material-symbols-outlined" data-icon="shopping_cart">shopping_cart</span>
                <span className="absolute -top-1 -right-1 bg-[#e9c349] text-[#3c2f00] text-[12px] font-semibold leading-none tracking-[0.1em] w-4 h-4 rounded-full flex items-center justify-center">2</span>
              </button>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#e4e2e4]/20 ml-2">
                <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU9vWK0RT23CDJQJKwoyY6wcKvcyha7DPWGfpQyvZd1kkCvOjA2N4MkRQD_YLBaYjIQpGBGpGBW8tKY1QVv1hIT3fiCcugEUzRefQrhU-l2EjK8Cfp_XGZKSYI3rRohS4xDvb-qr7nTpUoCu4kPvWvbap6kx63UiLf4Im9dp6K-XxlvsmNkjByOUdIrFk3UqRaeQdrdUWizVV7m9kJtr0AYKUKKleJ7T_xGUj1NsSenZdLAoXifoGVqGI5z6475k5f1qs8j3JByub2" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow pb-[128px]">
          
          {/* Artwork Hero Details Section */}
          <section className="max-w-[1440px] mx-auto px-[20px] md:px-[64px] mt-8 md:mt-16 mb-[128px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-[32px] items-start">
              
              {/* Image Side */}
              <div className="md:col-span-7 relative group cursor-zoom-in animate-fade-in">
                <div className="relative w-full aspect-[4/5] bg-[#1b1b1d] overflow-hidden border border-[#e4e2e4]/10 hover:border-[#e9c349]/30 transition-colors duration-500">
                  <img alt="Artwork" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdqblGtVVQLfBnY3TMES20_C61hMq4gIcVHpU8X41ZOI6r5GZtPTPrueOjHRb8y3SL9OezHOp0op6yNsNgZ-t2vv3FNLN7_eBHTcXNg-jFi4KKS5ZYpnHXt3Qn-408suVtY-Hw27ol79Vdsj2XghTw57OCiVAExxRoNSetkXStCVFIzmLoklFofvezDUQRKf2c_bv17JgndmxE_ZoVhBXMUxLpkYxVMR7c85Qk07Mt1icv6XqCIrpQS-2ZHtk-Jv4AwF2vwdqgrQdz" />
                  <div className="absolute inset-0 bg-[#e9c349]/0 group-hover:bg-[#e9c349]/5 transition-colors duration-500 pointer-events-none blur-xl"></div>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2 text-[#c6c6cd] text-[12px] font-semibold leading-none tracking-[0.1em] bg-[#1f1f21]/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#e4e2e4]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">
                  <span className="material-symbols-outlined text-sm">zoom_in</span> Hover to zoom
                </div>
              </div>
              
              {/* Details Side */}
              <div className="md:col-span-5 flex flex-col sticky top-32">
                <div className="mb-4">
                  <a className="text-[12px] font-semibold leading-none text-[#e9c349] tracking-[0.1em] uppercase hover:text-[#e9c349] transition-colors border-b border-transparent hover:border-[#e9c349] pb-0.5 inline-block mb-2 animate-fade-in stagger-1" href="#">Julianne Moore</a>
                  <h1 className="text-[48px] leading-[1.2] font-semibold text-[#e4e2e4] mb-2 animate-fade-in stagger-2" style={{ fontFamily: 'Playfair Display, serif' }}>Echoes of the Void</h1>
                  <p className="text-[18px] leading-[1.6] text-[#c6c6cd]">Oil and gold leaf on canvas, 2023</p>
                </div>
                
                <div className="text-[32px] leading-[1.3] font-medium text-[#e4e2e4] mb-8 animate-fade-in stagger-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  $12,500
                </div>
                
                <p className="text-[16px] leading-[1.6] text-[#c6c6cd] mb-8 leading-relaxed animate-fade-in stagger-4">
                  A masterful exploration of space and absence, "Echoes of the Void" utilizes heavily textured oil paints juxtaposed with delicate gold leaf. The piece invites the viewer into a contemplative state, reflecting the gallery's commitment to profound, minimalist aesthetics. The deep, almost light-absorbing darks contrast sharply with the reflective metallic elements, creating a dynamic interplay depending on ambient lighting.
                </p>
                
                <div className="flex flex-col gap-4 mb-12">
                  <button className="w-full bg-[#D4AF37] text-[#131315] text-[14px] font-medium py-4 px-6 hover:bg-[#FFBF00] transition-colors duration-300 uppercase tracking-wider flex justify-center items-center gap-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transform hover:-translate-y-0.5">
                    Add to Cart
                  </button>
                  <button className="w-full bg-transparent text-[#D4AF37] text-[14px] font-medium py-4 px-6 border border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors duration-300 uppercase tracking-wider flex justify-center items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">favorite_border</span> Add to Favorites
                  </button>
                </div>

                {/* Accordion Details */}
                <div className="border-t border-[#e4e2e4]/10">
                  <details className="group py-4 border-b border-[#e4e2e4]/10" open>
                    <summary className="flex justify-between items-center cursor-pointer list-none text-[14px] font-medium uppercase tracking-wider text-[#e4e2e4] hover:text-[#e9c349] transition-colors">
                      Technical Details
                      <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                    </summary>
                    <div className="pt-4 text-[16px] text-[#c6c6cd] space-y-2 transition-all duration-300 ease-in-out">
                      <p><span className="text-[#e4e2e4]">Dimensions:</span> 120cm x 150cm (47" x 59")</p>
                      <p><span className="text-[#e4e2e4]">Medium:</span> Oil, Acrylic, 24k Gold Leaf</p>
                      <p><span className="text-[#e4e2e4]">Authentication:</span> Signed by artist, comes with Certificate of Authenticity.</p>
                      <p><span className="text-[#e4e2e4]">Shipping:</span> Requires specialized crating. Ships within 2-3 weeks.</p>
                    </div>
                  </details>
                  <details className="group py-4 border-b border-[#e4e2e4]/10">
                    <summary className="flex justify-between items-center cursor-pointer list-none text-[14px] font-medium uppercase tracking-wider text-[#e4e2e4] hover:text-[#e9c349] transition-colors">
                      Exhibition History
                      <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                    </summary>
                    <div className="pt-4 text-[16px] text-[#c6c6cd] transition-all duration-300 ease-in-out">
                      <ul className="space-y-3">
                        <li className="flex gap-4">
                          <span className="text-[#e9c349] whitespace-nowrap">2023</span>
                          <span>"Modern Silences", Solo Exhibition, ArtGallery419, New York</span>
                        </li>
                        <li className="flex gap-4">
                          <span className="text-[#e9c349] whitespace-nowrap">2022</span>
                          <span>"Textures of Thought", Group Show, Biennale of Contemporary Arts, Venice</span>
                        </li>
                      </ul>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </section>

          {/* Curator's Note */}
          <section className="max-w-[1440px] mx-auto px-[20px] md:px-[64px] mb-[128px]">
            <div className="border-l-[3px] border-[#C04000] pl-6 md:pl-10 py-2 max-w-4xl mx-auto bg-[#1b1b1d]/30">
              <h3 className="text-[12px] leading-none font-semibold text-[#C04000] uppercase tracking-[0.1em] mb-4">Curator's Note</h3>
              <p className="text-[24px] leading-[1.4] font-medium italic text-[#c6c6cd] leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
                "Moore's work demands patience. 'Echoes of the Void' does not reveal itself entirely at first glance; rather, it unfolds as the ambient light shifts throughout the day, catching the gold leaf and revealing deep, structural impasto that speaks to the architectural nature of her process."
              </p>
            </div>
          </section>

          {/* Similar Artworks */}
          <section className="max-w-[1440px] mx-auto px-[20px] md:px-[64px]">
            <div className="flex justify-between items-end mb-12 border-b border-[#e4e2e4]/10 pb-4">
              <h2 className="text-[32px] leading-[1.3] font-medium text-[#e4e2e4]" style={{ fontFamily: 'Playfair Display, serif' }}>Similar Artworks</h2>
              <a className="text-[12px] leading-none font-semibold tracking-[0.1em] text-[#e9c349] hover:text-[#e9c349] uppercase flex items-center gap-2 transition-colors" href="#">
                View Gallery <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
              
              {/* Card 1 */}
              <div className="group cursor-pointer transform transition-transform duration-500 hover:-translate-y-2">
                <div className="relative w-full aspect-[3/4] mb-4 bg-[#1f1f21] overflow-hidden">
                  <img alt="Similar Artwork 1" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3cjHGSAO0GnTgnxk6YC3IA2Jrn8czvDlsN7WnbVS9n9K9h_VbFtIXPIUlILC7td0UofOOtfmGh-QI0kQt80qOQv7VEpk92rZ3wpEVzBvZvMqEvVoyUCvh-tvrqTCxoO5hgjLkMsnFCNRA4Iui2vdGH3QtFnAP6kFWOmiNWIdKN500Opi6Dl94JjKv4QEax1xOXpFnBqCa6RGV0KJ0rO01xbPb3k0JvFU0eciQ78M8rrmEk3K57kNWz4lB0dVEDEmUtT4-gVoQgOJw" />
                  <div className="absolute inset-0 border border-[#e9c349]/0 group-hover:border-[#e9c349]/50 transition-colors duration-500 pointer-events-none z-10"></div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] leading-none font-semibold tracking-[0.1em] text-[#c6c6cd] uppercase">E. Vance</span>
                  <h4 className="text-[24px] leading-[1.4] font-medium text-[#e4e2e4] text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>Fractured Light I</h4>
                  <span className="text-[16px] leading-[1.6] text-[#e9c349] mt-1">$8,200</span>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="group cursor-pointer lg:mt-8 transform transition-transform duration-500 hover:-translate-y-2">
                <div className="relative w-full aspect-square mb-4 bg-[#1f1f21] overflow-hidden">
                  <img alt="Similar Artwork 2" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJCt1PHhJPcXF-rfPYY_XYTfSlElpHWNETXRxs5FUZkVi97236ZZlMyWxx070r7Tso4TpsgpEB2OH58H4lh3S5ArHyGK9rF83DhKiJS0a2BwbEUWmYrkqlqDITjEthQja6VoIEpJQeuHQE6enT-w7UjHvKm3qQAjY_ecxup0Ukx6rWSjYIiEgAeKRjir3C_vCNr1HV_Xb7XsmiasaYxsyuQda9CBD_hqUQO4Rrdpje_OqnvTp4q9tOPyOStJVOCcKjF-I0oIRiprqy" />
                  <div className="absolute inset-0 border border-[#e9c349]/0 group-hover:border-[#e9c349]/50 transition-colors duration-500 pointer-events-none z-10"></div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] leading-none font-semibold tracking-[0.1em] text-[#c6c6cd] uppercase">Julianne Moore</span>
                  <h4 className="text-[24px] leading-[1.4] font-medium text-[#e4e2e4] text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>Study in Absence</h4>
                  <span className="text-[16px] leading-[1.6] text-[#e9c349] mt-1">$5,500</span>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="group cursor-pointer transform transition-transform duration-500 hover:-translate-y-2">
                <div className="relative w-full aspect-[4/5] mb-4 bg-[#1f1f21] overflow-hidden">
                  <img alt="Similar Artwork 3" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQPdLMapDnDP9tRl6cP6yXhZbe-Sd_X90QYK2VKhABhTco9zmyzf4YIQt7FVMIso2R0Q_uF_jzHFH_6slKVQCkz45BPB26HBjsFuqrMiOhC9AeUnQyZgjcViK4ZUUdCqT0SWh0eKYGCdpJkrB3aZ3oPqb-ymG-XNdWPwNxtW-GCbpHXyLF8zW88U9ZS7twLyOmJ4EHtCm7FFTESxSGv4AHtY5GK--vHfnWW9h3rfa7C-lqD00qCzu4vqKlfo2ajizXaNLCPaP5qEjW" />
                  <div className="absolute inset-0 border border-[#e9c349]/0 group-hover:border-[#e9c349]/50 transition-colors duration-500 pointer-events-none z-10"></div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] leading-none font-semibold tracking-[0.1em] text-[#c6c6cd] uppercase">M. Chen</span>
                  <h4 className="text-[24px] leading-[1.4] font-medium text-[#e4e2e4] text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>Horizon Line</h4>
                  <span className="text-[16px] leading-[1.6] text-[#e9c349] mt-1">$10,000</span>
                </div>
              </div>
              
              {/* Card 4 */}
              <div className="group cursor-pointer lg:mt-12 hidden sm:block transform transition-transform duration-500 hover:-translate-y-2">
                <div className="relative w-full aspect-[3/4] mb-4 bg-[#1f1f21] overflow-hidden">
                  <img alt="Similar Artwork 4" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUjbxbKeDwMiyGMPf7rS8QdKHXdGmCFxkYPdaMFi_kt2uiNpn0VcKMVI8V-2i89ya3fK97gDFoPLNHjXOeyrPKxgv9YzLJQcEHL0pfdEduNXDjt1HdabqamuKf7sb4Fk65OJAejNecpgwgR4PZHLZZrb_OPjd5msC5wsYoqRb6VgGmtv75Izf0TE4Hp9FCRwI1-uCxhj3U0j-WJPfdKk35mX1qLnNHpIscimZEf_Kpl87zlyxdM-_VXxkPtjsd3rB-u8sDSEMQ7M7X" />
                  <div className="absolute inset-0 border border-[#e9c349]/0 group-hover:border-[#e9c349]/50 transition-colors duration-500 pointer-events-none z-10"></div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] leading-none font-semibold tracking-[0.1em] text-[#c6c6cd] uppercase">E. Vance</span>
                  <h4 className="text-[24px] leading-[1.4] font-medium text-[#e4e2e4] text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>Structural Silence</h4>
                  <span className="text-[16px] leading-[1.6] text-[#e9c349] mt-1">$9,800</span>
                </div>
              </div>
              
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[#131315] text-[#e9c349] w-full pt-[128px] pb-8 border-t border-[#e4e2e4]/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[32px] px-[20px] md:px-[64px] max-w-[1440px] mx-auto mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="text-[24px] leading-[1.4] font-medium text-[#e4e2e4] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                ArtGallery419
              </div>
              <p className="text-[16px] leading-[1.6] text-[#c6c6cd] max-w-md">
                A curated space for the discerning collector. We represent contemporary artists pushing the boundaries of modernist aesthetics and tactile expression.
              </p>
            </div>
            <div className="col-span-1">
              <h4 className="text-[12px] leading-none font-semibold tracking-[0.1em] text-[#e4e2e4] mb-6 uppercase">Navigation</h4>
              <ul className="space-y-4">
                <li><a className="text-[12px] leading-none font-semibold tracking-[0.1em] text-[#c6c6cd] hover:text-[#e9c349] transition-colors opacity-80 hover:opacity-100 uppercase" href="#">Privacy Policy</a></li>
                <li><a className="text-[12px] leading-none font-semibold tracking-[0.1em] text-[#c6c6cd] hover:text-[#e9c349] transition-colors opacity-80 hover:opacity-100 uppercase" href="#">Terms of Service</a></li>
              </ul>
            </div>
            <div className="col-span-1">
              <h4 className="text-[12px] leading-none font-semibold tracking-[0.1em] text-[#e4e2e4] mb-6 uppercase">Connect</h4>
              <ul className="space-y-4">
                <li><a className="text-[12px] leading-none font-semibold tracking-[0.1em] text-[#c6c6cd] hover:text-[#e9c349] transition-colors opacity-80 hover:opacity-100 uppercase" href="#">Press Kit</a></li>
                <li><a className="text-[12px] leading-none font-semibold tracking-[0.1em] text-[#c6c6cd] hover:text-[#e9c349] transition-colors opacity-80 hover:opacity-100 uppercase" href="#">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#e4e2e4]/10 pt-8 px-[20px] md:px-[64px] max-w-[1440px] mx-auto flex justify-between items-center">
            <span className="text-[16px] leading-[1.6] text-[#c6c6cd]">© 2024 ArtGallery419. Curated Excellence.</span>
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-[#1f1f21] flex items-center justify-center text-[#c6c6cd]">in</span>
              <span className="w-8 h-8 rounded-full bg-[#1f1f21] flex items-center justify-center text-[#c6c6cd]">ig</span>
            </div>
          </div>
        </footer>
        
      </div>
    </>
  );
};

export default ArtworkDetail;