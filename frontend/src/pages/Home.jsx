export default function Home() {
  const artworks = [
    {
      id: 1,
      title: "Ethereal Geometry II",
      artist: "Elena Rostova",
      price: "Inquire for Price",
      large: true,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzFtgBPqG7ikYK3ZTctC7ZpbgcAAS0G7Ry4UUsrnvlMqy7GkZZWwDqXCq0qg5m3G9jE1oov49bH-7-mN3_1v6osv3lifS0I8f8HY988o6t3AewjBOn14TYXx1kkWTnQ89xazVRd6K3olaiBlyeopBWtF0rtYJat8s1IvbKiko1UqiMrWyfqb5U3UId90EUn75jN8DtTGtv50-jKItpE0pLaBmLpyqu1Q4PmKy4Fs-nQpJRHS4MCOaMjZjdDLF8xw7_sA1vwcL6JEN2",
    },
    {
      id: 2,
      title: "Obsidian Form",
      artist: "Marcus Vance",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBn9e43ThVyr2m7rcYjTeqInQ2EfSFNqFukf0Yffytl6VMxPdzzK7hxQicGxr3U76eq20pv7LycdCqgunByq9P8-lQXl9X_LP-9OdFU5kxBiSYMsVe0606R-6TaYhRMg2y9Dw7HsOzyNSHmUNLa3tQJlqpzA-TXaDWBUK_W8OoMq2V2BANXxvekToFMAfkEtBrrUE9V2qBPEY6RJLQQXBgCE-JWCh_Ks2u2i2kJFIeCJTyPMjgnZFP2v7be2bexkJbiBAkGx9xRsejo",
    },
    {
      id: 3,
      title: "Earth & Ruin",
      artist: "Sarah Jenkins",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVutMNSNgRpdv8PDHO4T8lpiWaopO5wCPqqx7JKtfcqmVCDpVeLEAKhNDXFCHtyDFYf1rO0NZBIb4ei7TgepBimsOmBmvluhj_4jK462GNOhWGtsbJ6lFSTEh7q0-z4kd5XWoNMoSLJofymJN50hTah7rqjh2UYNhiM32U6uMqdq_N0C7ChKSglIf2SACaIu5gU2ANmRV_en3UCqMyt_LcnFkruwYCj83qpB2gGRDGvVaJsvqjRXONC91LEqyosVNW3J9D8zhHjfPU",
    },
  ];

  const workshops = [
    { date: "Oct 12 - 14", title: "Mastering Texture", desc: "Led by Elena Rostova. A deep dive into mixed-media layering techniques.", status: "3 Spots Remaining" },
    { date: "Nov 05", title: "Digital to Physical", desc: "Bridging generative art with traditional printmaking processes.", status: "Waitlist Only" },
    { date: "Nov 18 - 20", title: "The Sculptor's Light", desc: "Understanding shadow and form with Marcus Vance.", status: "Open Registration" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeInUp 0.8s ease-out forwards; }
        .fade-up-2 { animation: fadeInUp 0.8s ease-out 0.2s forwards; opacity: 0; }
        .fade-up-4 { animation: fadeInUp 0.8s ease-out 0.4s forwards; opacity: 0; }
        .fade-up-6 { animation: fadeInUp 0.8s ease-out 0.6s forwards; opacity: 0; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { scrollbar-width: none; }
        .card-hover { transition: all 0.5s ease; }
        .card-hover:hover { transform: translateY(-4px); }
        .card-hover:hover .card-img { transform: scale(1.05); }
        .card-img { transition: transform 0.7s ease; }
        .gold-border-hover { transition: border-color 0.5s ease; }
        .gold-border-hover:hover { border-color: #D4AF37 !important; }
      `}</style>

      <div className="bg-[#131315] text-[#e4e2e4] min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>

        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 border-b border-white/10"
          style={{ background: 'rgba(19,19,21,0.8)', backdropFilter: 'blur(12px)' }}>
          <div className="flex justify-between items-center px-5 md:px-16 h-20 w-full max-w-[1440px] mx-auto">
            <div className="text-[#e4e2e4] font-bold text-2xl tracking-tight cursor-pointer"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              ArtGallery419
            </div>
            <div className="hidden md:flex items-center gap-8">
              {["Exhibitions", "Artists", "Workshops"].map((item) => (
                <a key={item} href="#"
                  className="text-[#c6c6cd] hover:text-[#e9c349] transition-colors duration-300 uppercase tracking-widest text-xs font-semibold">
                  {item}
                </a>
              ))}
              <a href="#"
                className="text-[#e9c349] border-b border-[#e9c349] pb-1 uppercase tracking-widest text-xs font-semibold">
                Gallery
              </a>
            </div>
            <div className="flex items-center gap-4 text-[#e9c349]">
              <button className="hover:text-[#ffe088] transition-colors duration-300">
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button className="hover:text-[#ffe088] transition-colors duration-300">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
              <button className="md:hidden text-[#e4e2e4]">
                <span className="material-symbols-outlined">menu</span>
              </button>
              <div className="hidden md:block w-8 h-8 rounded-full overflow-hidden border border-white/10 ml-2">
                <img alt="User" className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuANgc1lCaztvlT5NiPtY36VcrYX3vtTt2MW9N4nGGbkiB-4VR1zOAJ42fFwofEDAxJ3IeU6qMMQdoqFgKKpI_m9AC9RhSuct0JbhFgdqvq3ew2oWhTVJC8KLr2AVJD2cU2dj9524W43NoBjx28Q_uceDuNQIk0VBGCzf_Sbh6DpUQ1JdYUdCw0qeZiYM3B31AGWls-k3Wf3uV1AE94EHMBFBXcyTsizY9de9vCpSouKYdOvBlES2fTNSuEFRJwplaC3I9gjZLyPnT1a" />
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <header className="relative w-full h-[870px] min-h-[600px] mt-20 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover opacity-70"
              alt="Contemporary gallery with dramatic lighting"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSkhGfMi-XOeovVhMa00bM8O-nTJeZAFF7Q_9oVLTstos0BKmP1IVKIhtQ-JJNyisMjVha5EWpUM65_HMauo7dv6yV-S7xNCGONyiPAYINf7ykMbB8vrT-akXL79Cr7MM2dANFJcfGJlz347uI0ke4WyBLac2Dd_LM2npar9Efncfsnk1EkBNxJOOnKF7fltvo9ars-ba74YZvhgZ1u_v0briMq_sB6IdRvZ9yOyD80QLRONeHWt79an6_NBCFGuozrev4SPntWZMv" />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, #131315 0%, rgba(19,19,21,0.4) 50%, transparent 100%)' }} />
          </div>
          <div className="relative z-10 text-center px-5 md:px-16 max-w-4xl mx-auto flex flex-col items-center gap-8 fade-up">
            <h1 className="text-[40px] md:text-[64px] font-bold text-[#e4e2e4] leading-tight"
              style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em' }}>
              Curated Excellence in Modern Art
            </h1>
            <p className="text-lg text-[#c6c6cd] max-w-2xl leading-relaxed">
              Discover exclusive collections from visionary artists. A sanctuary for high-net-worth collectors seeking intellectual depth and timeless craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button className="bg-[#D4AF37] text-[#0e0e10] uppercase tracking-widest text-xs font-semibold px-8 py-4 hover:bg-[#FFBF00] transition-colors duration-300">
                Explore Collection
              </button>
              <button className="bg-transparent text-[#D4AF37] border border-[#D4AF37] uppercase tracking-widest text-xs font-semibold px-8 py-4 hover:bg-[#D4AF37]/10 transition-colors duration-300">
                View Workshops
              </button>
            </div>
          </div>
        </header>

        <main>
          {/* Trending Exhibitions */}
          <section className="py-32 px-5 md:px-16 max-w-[1440px] mx-auto">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-[48px] font-semibold text-[#e4e2e4] mb-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  Trending Exhibitions
                </h2>
                <p className="text-base text-[#c6c6cd]">The most coveted pieces currently on display.</p>
              </div>
              <a href="#" className="hidden md:flex items-center gap-2 text-[#e9c349] hover:text-[#ffe088] transition-colors uppercase tracking-widest text-xs font-semibold">
                View All Gallery <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Large card */}
              <article className="md:col-span-8 cursor-pointer card-hover fade-up-2">
                <div className="relative overflow-hidden mb-4 bg-[#1b1b1d] border border-white/10 gold-border-hover"
                  style={{ aspectRatio: '16/9' }}>
                  <img className="w-full h-full object-cover card-img" alt={artworks[0].title} src={artworks[0].img} />
                  <div className="absolute inset-0 bg-[#D4AF37]/0 hover:bg-[#D4AF37]/5 transition-colors duration-500 blur-2xl" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-medium text-[#e4e2e4] mb-1"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                      {artworks[0].title}
                    </h3>
                    <p className="text-base text-[#c6c6cd]">{artworks[0].artist}</p>
                  </div>
                  <p className="text-sm font-medium text-[#e9c349]">{artworks[0].price}</p>
                </div>
              </article>

              {/* Small stacked cards */}
              <div className="md:col-span-4 flex flex-col gap-8">
                {artworks.slice(1).map((aw, i) => (
                  <article key={aw.id} className={`cursor-pointer card-hover ${i === 0 ? 'fade-up-4' : 'fade-up-6'}`}>
                    <div className="relative overflow-hidden aspect-square mb-4 bg-[#1b1b1d] border border-white/10 gold-border-hover">
                      <img className="w-full h-full object-cover card-img" alt={aw.title} src={aw.img} />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-medium text-[#e4e2e4] mb-1"
                          style={{ fontFamily: 'Playfair Display, serif' }}>
                          {aw.title}
                        </h3>
                        <p className="text-sm text-[#c6c6cd]">{aw.artist}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Curator's Note */}
          <section className="py-16 px-5 md:px-16 max-w-4xl mx-auto">
            <div className="border-l-4 border-[#C04000] pl-8 py-4 bg-[#1b1b1d]/30">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-[#c6c6cd] mb-6">
                Curator's Note
              </h4>
              <p className="text-2xl italic text-[#e4e2e4] leading-relaxed"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                "This season's collection challenges the boundary between digital precision and tactile reality. We invite collectors to experience the tension of these contrasting mediums in a space designed for quiet contemplation."
              </p>
              <p className="mt-6 text-base text-[#D4AF37]">— Julian Thorne, Head Curator</p>
            </div>
          </section>

          {/* Upcoming Workshops */}
          <section className="py-32 overflow-hidden">
            <div className="px-5 md:px-16 max-w-[1440px] mx-auto mb-16">
              <h2 className="text-[48px] font-semibold text-[#e4e2e4] mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                Upcoming Workshops
              </h2>
              <p className="text-base text-[#c6c6cd]">Intimate sessions with master creators.</p>
            </div>
            <div className="flex gap-8 overflow-x-auto pb-8 px-5 md:px-16 snap-x snap-mandatory hide-scrollbar">
              {workshops.map((w) => (
                <article key={w.title}
                  className="flex-none w-[85vw] md:w-[400px] snap-start bg-[#1f1f21] border border-white/10 cursor-pointer card-hover gold-border-hover">
                  <div className="p-6 border-b border-white/10">
                    <p className="text-xs font-semibold tracking-widest uppercase text-[#e9c349] mb-2">{w.date}</p>
                    <h3 className="text-2xl font-medium text-[#e4e2e4] mb-2"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                      {w.title}
                    </h3>
                    <p className="text-base text-[#c6c6cd]">{w.desc}</p>
                  </div>
                  <div className="p-6 flex justify-between items-center bg-[#1b1b1d]">
                    <span className="text-sm font-medium text-[#e4e2e4]">{w.status}</span>
                    <span className="material-symbols-outlined text-[#e9c349]">arrow_forward</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[#131315] w-full pt-32 pb-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-5 md:px-16 max-w-[1440px] mx-auto">
            <div className="md:col-span-2 flex flex-col justify-between mb-8 md:mb-0">
              <div className="text-2xl text-[#e4e2e4] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                ArtGallery419
              </div>
              <p className="text-base text-[#c6c6cd] opacity-80">© 2024 ArtGallery419. Curated Excellence.</p>
            </div>
            <div className="flex flex-col gap-4">
              <a href="#" className="text-xs font-semibold tracking-widest uppercase text-[#c6c6cd] hover:text-[#e9c349] transition-colors opacity-80 hover:opacity-100">Privacy Policy</a>
              <a href="#" className="text-xs font-semibold tracking-widest uppercase text-[#c6c6cd] hover:text-[#e9c349] transition-colors opacity-80 hover:opacity-100">Terms of Service</a>
            </div>
            <div className="flex flex-col gap-4">
              <a href="#" className="text-xs font-semibold tracking-widest uppercase text-[#c6c6cd] hover:text-[#e9c349] transition-colors opacity-80 hover:opacity-100">Press Kit</a>
              <a href="#" className="text-xs font-semibold tracking-widest uppercase text-[#c6c6cd] hover:text-[#e9c349] transition-colors opacity-80 hover:opacity-100">Contact Us</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
