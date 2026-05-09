import { useEffect, useRef } from "react";

const workshops = [
  {
    id: 1,
    date: "OCT 15",
    title: "Advanced Oil Techniques",
    desc: "Explore glazing and impasto with resident artist Elena Rostova.",
    time: "10:00 AM - 4:00 PM",
    price: "$250",
    occupancy: "8/10 spots filled",
    occupancyPct: 80,
    soldOut: false,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB43sliqL37DDPOOeGt3Yx1uHBbDp8ZchZnTF2dutwtr1l93xOMlznc1Dhd5AFf32DkYxFSm-ptwoz5wIYdup6ZgsYh5jtcgkiTv7CgIN6NkQuFmxtsCCLZDn59Sjqxs868obxUZqZdLZXv4aOiRI2rRcgl7swty3ektWucvKmLlbcxeOwGiU1Yhjfbh7nch7o3wFfVcjJVEAQadcaf-rOk11NEjAUus9xFUXh_t4nkr9Lhjtiiz3rTIJDdNs3InyboYXgNbd1BM9uI",
  },
  {
    id: 2,
    date: "OCT 22",
    title: "Tactile Form: Wheel Throwing",
    desc: "A two-day intensive on shaping large vessels from raw stoneware.",
    time: "9:00 AM - 5:00 PM",
    price: "$380",
    occupancy: "10/10 spots filled",
    occupancyPct: 100,
    soldOut: true,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzIOlFtBv8d4lDC2XhuXbmyNMTF8crrLyNMMFWi6Tl5hK36KfehQs2ZwO3yuXCFamkTRUlzG-8suLvXqpnrbyCzUy2ljyUy83_XWnFVwRIeQH-d-dF_WWaDcQNRRiB0n3eRSCilcZ_PMeWn7oBeyG5q6Xp5gWOymuiSzvch5Q3I55W_As_1SojRdl-wBix7kgzexd7BdO-vN8pAysTVgL-CwweuFPcbJxSLRf1z0ByLsPuxd_fkRXEFRxoe0cfWvUqv-n2Lz17kb5Z",
  },
  {
    id: 3,
    date: "NOV 05",
    title: "Shadow & Light: Charcoal",
    desc: "Mastering contrast and volumetric drawing from live models.",
    time: "6:00 PM - 9:00 PM",
    price: "$150",
    occupancy: "3/15 spots filled",
    occupancyPct: 20,
    soldOut: false,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfIB4j5LF48padqKM6ucIym16324jxujHQBaLo5NnQvDwKACUMAWiWYwrA3qbWnx19PsbyTo8DQ41d7l0SajgJl_HD4kmQw2VI1yLXi4GM21gmaaGMxtiFyqvdh9sBlQkVhgJ078AZEDT4S8qeIG-rRPILZnWkbpLfMN6WgNnPlU95PPjWtobwQ8tcdZdtQR53mcPt2xSI4T1mV-YQXuHk6-WFZ-9o3mrSBfr2Sp-2gnSwQOyf5r20y5cNANEEOgxfLGnYElcbwYJr",
  },
];

export default function Workshops() {
  const barsRef = useRef([]);

  useEffect(() => {
    // Animate progress bars on mount
    const timer = setTimeout(() => {
      barsRef.current.forEach((bar, i) => {
        if (bar) {
          bar.style.transition = "width 1.5s ease";
          bar.style.width = workshops[i].occupancyPct + "%";
        }
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .art-card { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
        .art-card:nth-child(1) { animation-delay: 0.1s; }
        .art-card:nth-child(2) { animation-delay: 0.3s; }
        .art-card:nth-child(3) { animation-delay: 0.5s; }
        .art-card-image { transition: transform 0.5s ease-out; }
        .art-card:hover .art-card-image { transform: scale(1.05); }
        .art-card:hover { border-color: rgba(233,195,73,0.5) !important; }
      `}</style>

      <div className="bg-[#131315] text-[#e4e2e4] min-h-screen flex flex-col pt-20" style={{ fontFamily: 'Inter, sans-serif' }}>

        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 border-b border-white/10"
          style={{ background: 'rgba(19,19,21,0.8)', backdropFilter: 'blur(12px)' }}>
          <div className="flex justify-between items-center px-5 md:px-16 h-20 w-full max-w-[1440px] mx-auto">
            <div className="text-[#e4e2e4] font-bold text-2xl tracking-tight cursor-pointer"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              ArtGallery419
            </div>
            <div className="hidden md:flex items-center gap-8">
              {["Exhibitions", "Artists"].map((item) => (
                <a key={item} href="#"
                  className="text-[#c6c6cd] hover:text-[#e9c349] transition-colors uppercase tracking-widest text-xs font-semibold">
                  {item}
                </a>
              ))}
              <a href="#" className="relative text-[#e9c349] border-b border-[#e9c349] pb-1 uppercase tracking-widest text-xs font-semibold">
                Workshops
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#e9c349] rounded-full" />
              </a>
              <a href="#"
                className="text-[#c6c6cd] hover:text-[#e9c349] transition-colors uppercase tracking-widest text-xs font-semibold">
                Gallery
              </a>
            </div>
            <div className="flex items-center gap-4">
              {["search", "favorite", "shopping_cart"].map((icon) => (
                <button key={icon} className="text-[#c6c6cd] hover:text-[#e9c349] transition-colors">
                  <span className="material-symbols-outlined">{icon}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          {/* Hero */}
          <header className="w-full px-5 md:px-16 max-w-[1440px] mx-auto pt-32 pb-16">
            <h1 className="text-[40px] md:text-[64px] font-bold text-[#e4e2e4] mb-6"
              style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
              Artistic Workshops
            </h1>
            <p className="text-lg text-[#c6c6cd] max-w-2xl leading-relaxed">
              Refine your craft under the guidance of master artists. Intimate, focused sessions designed for serious practitioners and dedicated beginners alike.
            </p>
          </header>

          {/* Filters */}
          <div className="px-5 md:px-16 max-w-[1440px] mx-auto mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-6">
            <div className="flex flex-wrap gap-4">
              {["Date", "Price", "Category: All"].map((label) => (
                <button key={label}
                  className="text-sm font-medium text-[#e4e2e4] bg-transparent border-b border-white/30 pb-1 hover:border-[#e9c349] hover:text-[#e9c349] transition-colors flex items-center gap-2">
                  {label}
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>expand_more</span>
                </button>
              ))}
            </div>
          </div>

          {/* Workshop Grid */}
          <div className="px-5 md:px-16 max-w-[1440px] mx-auto pb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workshops.map((w, i) => (
                <div key={w.id}
                  className="art-card relative bg-[#2a2a2b] overflow-hidden border border-white/10 flex flex-col transition-colors duration-300">

                  {/* Image */}
                  <div className="w-full overflow-hidden bg-[#1f1f21] relative" style={{ aspectRatio: '4/3' }}>
                    <img alt={w.title} className="w-full h-full object-cover art-card-image" src={w.img} />
                    <div className="absolute top-4 right-4 bg-[#131315]/90 px-3 py-1 text-xs font-semibold tracking-widest uppercase text-[#e4e2e4] border border-white/20"
                      style={{ backdropFilter: 'blur(4px)' }}>
                      {w.date}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-medium text-[#e4e2e4] mb-2"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                      {w.title}
                    </h3>
                    <p className="text-base text-[#c6c6cd] mb-6 flex-grow">{w.desc}</p>

                    <div className="space-y-4 mt-auto">
                      {/* Time & Price */}
                      <div className="flex justify-between text-sm font-medium text-[#c6c6cd]">
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>schedule</span>
                          {w.time}
                        </span>
                        <span>{w.price}</span>
                      </div>

                      {/* Occupancy bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold tracking-widest uppercase text-[#c6c6cd]">
                          <span>Occupancy</span>
                          <span>{w.occupancy}</span>
                        </div>
                        <div className="w-full h-1 bg-[#0e0e10] overflow-hidden">
                          <div
                            ref={(el) => (barsRef.current[i] = el)}
                            className="h-full"
                            style={{
                              width: "0%",
                              backgroundColor: w.soldOut ? "#45464d" : "#e9c349",
                            }}
                          />
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-4 pt-4 border-t border-white/10">
                        {w.soldOut ? (
                          <button disabled
                            className="flex-1 bg-[#1f1f21] text-[#c6c6cd] border border-white/10 text-sm font-semibold py-3 px-6 cursor-not-allowed uppercase tracking-widest">
                            Waitlist
                          </button>
                        ) : (
                          <button
                            className="flex-1 bg-[#e9c349] text-[#3c2f00] text-sm font-semibold py-3 px-6 hover:bg-[#FFBF00] transition-colors uppercase tracking-widest hover:scale-[1.02] active:scale-95">
                            Reserve
                          </button>
                        )}
                        <button aria-label="Compare"
                          className="bg-transparent border border-[#e9c349] text-[#e9c349] py-3 px-4 hover:bg-[#e9c349]/10 transition-colors flex items-center justify-center">
                          <span className="material-symbols-outlined">compare_arrows</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#131315] border-t border-white/10 w-full pt-32 pb-8 mt-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-5 md:px-16 max-w-[1440px] mx-auto">
            <div className="md:col-span-1 mb-8 md:mb-0">
              <div className="text-2xl text-[#e4e2e4] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                ArtGallery419
              </div>
              <p className="text-base text-[#c6c6cd]">© 2024 ArtGallery419. Curated Excellence.</p>
            </div>
            {[["Privacy Policy", "Terms of Service"], ["Press Kit", "Contact Us"]].map((group, i) => (
              <div key={i} className="flex flex-col gap-4">
                {group.map((link) => (
                  <a key={link} href="#"
                    className="text-xs font-semibold tracking-widest uppercase text-[#c6c6cd] hover:text-[#e9c349] transition-colors opacity-80 hover:opacity-100">
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </footer>

      </div>
    </>
  );
}
