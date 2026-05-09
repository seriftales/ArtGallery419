import React from 'react';

const AdminDashboard = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .material-symbols-outlined {
            font-family: 'Material Symbols Outlined';
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
        }

        .font-playfair {
            font-family: 'Playfair Display', serif;
        }

        /* Custom scrollbar for dark modern aesthetic */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #131315; 
        }
        ::-webkit-scrollbar-thumb {
            background: #353436; 
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #45464d; 
        }
    
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        @keyframes growUp {
            from { transform: scaleY(0); transform-origin: bottom; }
            to { transform: scaleY(1); transform-origin: bottom; }
        }

        .animate-fade-up { animation: fadeUp 0.6s ease-out forwards; opacity: 0; }
        .animate-grow-up { animation: growUp 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-scale-in { animation: scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }
      `}</style>

      <div className="bg-[#131315] text-[#e4e2e4] text-[16px] leading-[1.6] antialiased flex h-screen overflow-hidden selection:bg-[#e9c349]/30 selection:text-[#e9c349]" style={{ fontFamily: 'Inter, sans-serif' }}>
        
        {/* Admin Sidebar */}
        <aside className="w-[280px] flex-shrink-0 border-r border-[#45464d] bg-[#1b1b1d] flex-col justify-between hidden md:flex z-10 relative">
          <div>
            {/* Brand */}
            <div className="h-20 flex items-center px-8 border-b border-[#45464d]/50">
              <span className="font-playfair text-[24px] font-medium tracking-tight text-[#e4e2e4]">
                ArtGallery<span className="text-[#e9c349]">419</span>
              </span>
            </div>
            
            {/* Navigation */}
            <nav className="p-4 space-y-2 mt-4">
              {/* Active Item */}
              <a className="flex items-center gap-4 px-4 py-3 rounded-lg bg-[#e9c349]/10 text-[#e9c349] transition-all group border border-[#e9c349]/20 relative overflow-hidden" href="#">
                <div className="absolute inset-0 bg-[#e9c349]/5 blur-xl group-hover:bg-[#e9c349]/10 transition-colors pointer-events-none"></div>
                <span className="material-symbols-outlined relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                <span className="text-[14px] font-medium relative z-10">Dashboard</span>
              </a>
              
              {/* Inactive Items */}
              {[
                { icon: 'inventory_2', label: 'Inventory' },
                { icon: 'event', label: 'Workshops' },
                { icon: 'receipt_long', label: 'Orders' },
                { icon: 'group', label: 'Users' },
                { icon: 'support_agent', label: 'Support' }
              ].map((item, index) => (
                <a key={index} className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#c6c6cd] hover:text-[#e4e2e4] hover:bg-[#353436] transition-all group" href="#">
                  <span className="material-symbols-outlined group-hover:text-[#e4e2e4] transition-colors">{item.icon}</span>
                  <span className="text-[14px] font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
          
          {/* Admin Profile Snippet */}
          <div className="p-4 border-t border-[#45464d]/50">
            <div className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-[#353436] cursor-pointer transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#353436] border border-[#45464d] overflow-hidden flex items-center justify-center">
                <span className="material-symbols-outlined text-[#c6c6cd]">person</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-[#e4e2e4] truncate">E. Blackwood</p>
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#c6c6cd] truncate mt-1">Chief Curator</p>
              </div>
              <span className="material-symbols-outlined text-[#c6c6cd] text-sm">more_vert</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#131315] relative">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#e9c349]/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          {/* Top Header Area */}
          <header className="h-20 flex-shrink-0 flex items-center justify-between px-[20px] md:px-[64px] border-b border-[#45464d]/30 backdrop-blur-md bg-[#131315]/80 z-20">
            <div className="flex items-center gap-4">
              <button className="md:hidden text-[#c6c6cd] hover:text-[#e4e2e4]">
                <span className="material-symbols-outlined">menu</span>
              </button>
              <h1 className="font-playfair text-[24px] font-medium text-[#e4e2e4] hidden sm:block">Overview</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative hidden md:block">
                <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-[#c6c6cd] text-sm pb-1">search</span>
                <input 
                  className="bg-transparent border-0 border-b border-[#45464d] pl-8 py-2 text-[#e4e2e4] text-[16px] focus:ring-0 focus:border-[#e9c349] placeholder:text-[#c6c6cd]/50 transition-colors w-64 outline-none" 
                  placeholder="Search records..." 
                  type="text"
                />
              </div>
              <button className="text-[#c6c6cd] hover:text-[#e9c349] transition-colors relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#e9c349] rounded-full border-2 border-[#131315]"></span>
              </button>
            </div>
          </header>

          {/* Scrollable Canvas */}
          <div className="flex-1 overflow-y-auto p-[20px] md:p-[64px]">
            <div className="max-w-[1440px] mx-auto space-y-[32px] pb-[128px]">
              
              {/* TOP: Summary Stat Cards */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Card 1 */}
                <div className="bg-[#1b1b1d] border border-[#45464d]/50 rounded-xl p-6 group relative overflow-hidden transition-all duration-500 hover:border-[#e9c349]/30">
                  <div className="absolute inset-0 bg-[#e9c349]/0 group-hover:bg-[#e9c349]/5 transition-colors duration-500 pointer-events-none"></div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-[12px] font-semibold tracking-[0.1em] text-[#c6c6cd] uppercase">Total Artworks</h3>
                    <span className="material-symbols-outlined text-[#c6c6cd] group-hover:text-[#e9c349] transition-colors">palette</span>
                  </div>
                  <div className="flex items-end justify-between relative z-10">
                    <p className="font-playfair text-[32px] font-medium leading-[1.3] text-[#e4e2e4]">1,429</p>
                    <div className="flex items-center gap-1 text-[#bec6e0]">
                      <span className="material-symbols-outlined text-sm">trending_up</span>
                      <span className="text-[12px] font-semibold uppercase tracking-[0.1em]">+12%</span>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-[#1b1b1d] border border-[#45464d]/50 rounded-xl p-6 group relative overflow-hidden transition-all duration-500 hover:border-[#e9c349]/30">
                  <div className="absolute inset-0 bg-[#e9c349]/0 group-hover:bg-[#e9c349]/5 transition-colors duration-500 pointer-events-none"></div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-[12px] font-semibold tracking-[0.1em] text-[#c6c6cd] uppercase">Reservations</h3>
                    <span className="material-symbols-outlined text-[#c6c6cd] group-hover:text-[#e9c349] transition-colors">book_online</span>
                  </div>
                  <div className="flex items-end justify-between relative z-10">
                    <p className="font-playfair text-[32px] font-medium leading-[1.3] text-[#e4e2e4]">342</p>
                    <div className="flex items-center gap-1 text-[#bec6e0]">
                      <span className="material-symbols-outlined text-sm">trending_up</span>
                      <span className="text-[12px] font-semibold uppercase tracking-[0.1em]">+5.4%</span>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-[#1b1b1d] border border-[#45464d]/50 rounded-xl p-6 group relative overflow-hidden transition-all duration-500 hover:border-[#e9c349]/30">
                  <div className="absolute inset-0 bg-[#e9c349]/0 group-hover:bg-[#e9c349]/5 transition-colors duration-500 pointer-events-none"></div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-[12px] font-semibold tracking-[0.1em] text-[#c6c6cd] uppercase">Monthly Revenue</h3>
                    <span className="material-symbols-outlined text-[#c6c6cd] group-hover:text-[#e9c349] transition-colors">account_balance_wallet</span>
                  </div>
                  <div className="flex items-end justify-between relative z-10">
                    <p className="font-playfair text-[32px] font-medium leading-[1.3] text-[#e4e2e4]">$284k</p>
                    <div className="flex items-center gap-1 text-[#ffb4ab]">
                      <span className="material-symbols-outlined text-sm">trending_down</span>
                      <span className="text-[12px] font-semibold uppercase tracking-[0.1em]">-2.1%</span>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-[#1b1b1d] border border-[#45464d]/50 rounded-xl p-6 group relative overflow-hidden transition-all duration-500 hover:border-[#e9c349]/30">
                  <div className="absolute inset-0 bg-[#e9c349]/0 group-hover:bg-[#e9c349]/5 transition-colors duration-500 pointer-events-none"></div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-[12px] font-semibold tracking-[0.1em] text-[#c6c6cd] uppercase">Active Users</h3>
                    <span className="material-symbols-outlined text-[#c6c6cd] group-hover:text-[#e9c349] transition-colors">vital_signs</span>
                  </div>
                  <div className="flex items-end justify-between relative z-10">
                    <p className="font-playfair text-[32px] font-medium leading-[1.3] text-[#e4e2e4]">8,901</p>
                    <div className="flex items-center gap-1 text-[#bec6e0]">
                      <span className="material-symbols-outlined text-sm">trending_up</span>
                      <span className="text-[12px] font-semibold uppercase tracking-[0.1em]">+18%</span>
                    </div>
                  </div>
                </div>

              </section>

              {/* MIDDLE: Charts / Visualizations */}
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Chart Area 1 */}
                <div className="lg:col-span-2 bg-[#1b1b1d] border border-[#45464d]/50 rounded-xl p-8 flex flex-col relative overflow-hidden">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="font-playfair text-[24px] font-medium text-[#e4e2e4]">Artwork Engagement</h2>
                      <p className="text-[16px] text-[#c6c6cd] mt-1">Views vs Likes across top collections</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-[#45464d] rounded-lg text-[#c6c6cd] hover:text-[#e9c349] hover:border-[#e9c349] transition-colors text-[14px] font-medium">
                      <span>This Month</span>
                      <span className="material-symbols-outlined text-sm">expand_more</span>
                    </button>
                  </div>
                  
                  {/* Line Chart Area (Simulated) */}
                  <div className="flex-1 min-h-[300px] relative w-full flex items-end justify-between gap-2 border-b border-l border-[#45464d]/30 pb-4 pl-4 pt-10">
                    <div className="absolute left-[-24px] top-0 bottom-4 flex flex-col justify-between text-[#c6c6cd]/50 text-[12px] font-semibold tracking-[0.1em] uppercase py-2">
                      <span>10k</span><span>7.5k</span><span>5k</span><span>2.5k</span><span>0</span>
                    </div>
                    
                    <div className="w-1/12 h-[40%] bg-gradient-to-t from-[#e9c349]/10 to-[#e9c349]/40 rounded-t-sm relative group cursor-crosshair animate-grow-up" style={{ animationDelay: '0.5s' }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#353436] px-2 py-1 rounded text-xs text-[#e4e2e4]">4.1k</div>
                    </div>
                    <div className="w-1/12 h-[65%] bg-gradient-to-t from-[#e9c349]/20 to-[#e9c349]/60 rounded-t-sm relative group cursor-crosshair animate-grow-up" style={{ animationDelay: '0.6s' }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#353436] px-2 py-1 rounded text-xs text-[#e4e2e4]">6.5k</div>
                    </div>
                    <div className="w-1/12 h-[30%] bg-gradient-to-t from-[#bec6e0]/10 to-[#bec6e0]/40 rounded-t-sm relative group cursor-crosshair animate-grow-up" style={{ animationDelay: '0.7s' }}></div>
                    <div className="w-1/12 h-[80%] bg-gradient-to-t from-[#e9c349]/30 to-[#e9c349]/80 rounded-t-sm relative group cursor-crosshair shadow-[0_0_15px_rgba(212,175,55,0.1)] animate-grow-up" style={{ animationDelay: '0.8s' }}></div>
                    <div className="w-1/12 h-[55%] bg-gradient-to-t from-[#e9c349]/20 to-[#e9c349]/50 rounded-t-sm relative group cursor-crosshair animate-grow-up" style={{ animationDelay: '0.9s' }}></div>
                    <div className="w-1/12 h-[90%] bg-gradient-to-t from-[#e9c349]/40 to-[#e9c349] rounded-t-sm relative group cursor-crosshair shadow-[0_0_20px_rgba(212,175,55,0.2)] animate-grow-up" style={{ animationDelay: '1.0s' }}></div>
                    <div className="w-1/12 h-[45%] bg-gradient-to-t from-[#bec6e0]/20 to-[#bec6e0]/50 rounded-t-sm relative group cursor-crosshair animate-grow-up" style={{ animationDelay: '1.1s' }}></div>
                    
                    <div className="absolute -bottom-8 left-4 right-0 flex justify-between text-[#c6c6cd]/50 text-[12px] font-semibold tracking-[0.1em] uppercase px-4">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                  </div>
                </div>

                {/* Chart Area 2 */}
                <div className="bg-[#1b1b1d] border border-[#45464d]/50 rounded-xl p-8 flex flex-col justify-between">
                  <div>
                    <h2 className="font-playfair text-[24px] font-medium text-[#e4e2e4]">Workshop Occupancy</h2>
                    <p className="text-[16px] text-[#c6c6cd] mt-1">Current capacity metrics</p>
                  </div>
                  
                  <div className="flex-1 flex items-center justify-center py-8">
                    <div className="relative w-48 h-48 rounded-full border-8 border-[#353436] flex items-center justify-center before:absolute before:inset-[-8px] before:rounded-full before:border-8 before:border-transparent before:border-t-[#e9c349] before:border-r-[#e9c349] before:-rotate-45 animate-scale-in" style={{ animationDelay: '0.5s' }}>
                      <div className="text-center">
                        <span className="block font-playfair text-[48px] font-semibold leading-[1.2] text-[#e4e2e4]">82%</span>
                        <span className="text-[12px] font-semibold tracking-[0.1em] text-[#c6c6cd] uppercase mt-2 block">Booked</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-[#45464d]/30 pb-2">
                      <span className="text-[14px] font-medium text-[#c6c6cd]">Masterclass: Oils</span>
                      <span className="text-[14px] font-medium text-[#e4e2e4]">95%</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#45464d]/30 pb-2">
                      <span className="text-[14px] font-medium text-[#c6c6cd]">Modern Sculpture</span>
                      <span className="text-[14px] font-medium text-[#e4e2e4]">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] font-medium text-[#c6c6cd]">Digital Curation</span>
                      <span className="text-[14px] font-medium text-[#e4e2e4]">64%</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* BOTTOM: Table */}
              <section className="bg-[#1b1b1d] border border-[#45464d]/50 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-[#45464d]/50 flex justify-between items-center bg-[#1f1f21]/50">
                  <h2 className="font-playfair text-[24px] font-medium text-[#e4e2e4]">Recent Support Requests</h2>
                  <button className="text-[12px] font-semibold text-[#e9c349] hover:text-[#e9c349] transition-colors flex items-center gap-1 uppercase tracking-[0.1em]">
                    View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr>
                        {['Ticket ID', 'Collector', 'Subject', 'Date', 'Status', 'Action'].map((head, i) => (
                          <th key={i} className={`py-4 px-6 text-[12px] font-semibold text-[#c6c6cd] uppercase tracking-[0.1em] border-b border-[#45464d]/50 ${i === 5 ? 'text-right' : ''}`}>
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-[16px] text-[#e4e2e4]">
                      {/* Row 1 */}
                      <tr className="hover:bg-[#353436]/50 transition-colors group animate-fade-up" style={{ animationDelay: '0.6s' }}>
                        <td className="py-4 px-6 font-mono text-sm text-[#c6c6cd]">#REQ-8021</td>
                        <td className="py-4 px-6 font-medium">A. Rothschild</td>
                        <td className="py-4 px-6 text-[#c6c6cd]">Authentication inquiry for Lot 42</td>
                        <td className="py-4 px-6 text-[#c6c6cd]">Oct 12, 14:30</td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#e9c349]/10 text-[#e9c349] border border-[#e9c349]/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#e9c349]"></span> Pending
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="text-[#c6c6cd] group-hover:text-[#e9c349] transition-colors"><span className="material-symbols-outlined">more_horiz</span></button>
                        </td>
                      </tr>
                      {/* Row 2 */}
                      <tr className="hover:bg-[#353436]/50 transition-colors group border-t border-[#45464d]/20 animate-fade-up" style={{ animationDelay: '0.7s' }}>
                        <td className="py-4 px-6 font-mono text-sm text-[#c6c6cd]">#REQ-8020</td>
                        <td className="py-4 px-6 font-medium">M. Chen</td>
                        <td className="py-4 px-6 text-[#c6c6cd]">Workshop cancellation request</td>
                        <td className="py-4 px-6 text-[#c6c6cd]">Oct 12, 09:15</td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#bec6e0]/10 text-[#bec6e0] border border-[#bec6e0]/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#bec6e0]"></span> Resolved
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="text-[#c6c6cd] group-hover:text-[#e9c349] transition-colors"><span className="material-symbols-outlined">more_horiz</span></button>
                        </td>
                      </tr>
                      {/* Row 3 */}
                      <tr className="hover:bg-[#353436]/50 transition-colors group border-t border-[#45464d]/20 animate-fade-up" style={{ animationDelay: '0.8s' }}>
                        <td className="py-4 px-6 font-mono text-sm text-[#c6c6cd]">#REQ-8019</td>
                        <td className="py-4 px-6 font-medium">V. Dubois</td>
                        <td className="py-4 px-6 text-[#c6c6cd]">Payment failure on "Silent Echo"</td>
                        <td className="py-4 px-6 text-[#c6c6cd]">Oct 11, 18:45</td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#ffb4ab]/10 text-[#ffb4ab] border border-[#ffb4ab]/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]"></span> Urgent
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="text-[#c6c6cd] group-hover:text-[#e9c349] transition-colors"><span className="material-symbols-outlined">more_horiz</span></button>
                        </td>
                      </tr>
                      {/* Row 4 */}
                      <tr className="hover:bg-[#353436]/50 transition-colors group border-t border-[#45464d]/20 animate-fade-up" style={{ animationDelay: '0.9s' }}>
                        <td className="py-4 px-6 font-mono text-sm text-[#c6c6cd]">#REQ-8018</td>
                        <td className="py-4 px-6 font-medium">S. Hughes</td>
                        <td className="py-4 px-6 text-[#c6c6cd]">Private viewing schedule change</td>
                        <td className="py-4 px-6 text-[#c6c6cd]">Oct 11, 11:20</td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#bec6e0]/10 text-[#bec6e0] border border-[#bec6e0]/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#bec6e0]"></span> Resolved
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="text-[#c6c6cd] group-hover:text-[#e9c349] transition-colors"><span className="material-symbols-outlined">more_horiz</span></button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;