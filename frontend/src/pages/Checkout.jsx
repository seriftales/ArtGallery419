import { useState } from "react";

const inputClass = `
  w-full bg-transparent border-0 border-b border-[#909097] 
  hover:border-[#45464d] text-[#e4e2e4] text-base py-3 px-0 
  outline-none placeholder-[#c6c6cd]/50
  transition-colors duration-300
  focus:border-[#e9c349]
`;

function Input({ id, placeholder, type = "text", colSpan = "" }) {
  return (
    <div className={`relative group ${colSpan}`}>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={inputClass}
        style={{ fontFamily: 'Inter, sans-serif', boxShadow: 'none' }}
      />
    </div>
  );
}

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        input[type="text"] { box-shadow: none !important; }
      `}</style>

      <div className="bg-[#131315] text-[#e4e2e4] min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>

        {/* Minimal Header */}
        <header className="w-full border-b border-white/10 py-6 px-5 md:px-16">
          <div className="max-w-[1440px] mx-auto flex justify-between items-center">
            <a href="/" className="text-[#e4e2e4] font-bold text-2xl tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              ArtGallery419
            </a>
            <a href="/" className="flex items-center gap-2 text-[#c6c6cd] hover:text-[#e9c349] transition-colors duration-300">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
              <span className="text-xs font-semibold tracking-widest uppercase">Return to Gallery</span>
            </a>
          </div>
        </header>

        {/* Main Checkout */}
        <main className="py-16 md:py-32 px-5 md:px-16 max-w-[1440px] mx-auto">
          <h1 className="text-[40px] md:text-[64px] font-bold text-[#e4e2e4] mb-12 md:mb-16"
            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            Secure Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left: Form */}
            <div className="lg:col-span-7 flex flex-col gap-16">

              {/* 1. Shipping */}
              <section>
                <h2 className="text-2xl font-medium text-[#e4e2e4] mb-8 border-b border-white/10 pb-4 flex items-center gap-3"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  <span className="text-[#e9c349]">1.</span> Shipping Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                  <Input id="firstName" placeholder="First Name" />
                  <Input id="lastName" placeholder="Last Name" />
                  <Input id="address" placeholder="Street Address" colSpan="md:col-span-2" />
                  <Input id="city" placeholder="City" />
                  <Input id="postalCode" placeholder="Postal / Zip Code" />
                  <Input id="country" placeholder="Country" colSpan="md:col-span-2" />
                </div>
              </section>

              {/* 2. Payment */}
              <section>
                <h2 className="text-2xl font-medium text-[#e4e2e4] mb-8 border-b border-white/10 pb-4 flex items-center gap-3"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  <span className="text-[#e9c349]">2.</span> Payment Method
                </h2>

                {/* Method Selector */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className="flex-1 py-6 px-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 active:scale-[0.98] relative overflow-hidden group"
                    style={{
                      border: paymentMethod === "card" ? "1px solid #e9c349" : "1px solid rgba(144,144,151,0.3)",
                      background: paymentMethod === "card" ? "rgba(233,195,73,0.05)" : "transparent",
                      color: paymentMethod === "card" ? "#e9c349" : "#c6c6cd",
                    }}>
                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform" style={{ fontSize: '28px' }}>credit_card</span>
                    <span className="text-sm font-medium">Credit Card</span>
                    <div className="absolute inset-0 bg-[#e9c349]/10 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
                  </button>

                  <button
                    onClick={() => setPaymentMethod("bank")}
                    className="flex-1 py-6 px-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 active:scale-[0.98]"
                    style={{
                      border: paymentMethod === "bank" ? "1px solid #e9c349" : "1px solid rgba(144,144,151,0.3)",
                      background: paymentMethod === "bank" ? "rgba(233,195,73,0.05)" : "transparent",
                      color: paymentMethod === "bank" ? "#e9c349" : "#c6c6cd",
                    }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>account_balance</span>
                    <span className="text-sm font-medium">Bank Transfer</span>
                  </button>
                </div>

                {/* Card Form */}
                {paymentMethod === "card" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    <div className="md:col-span-2 relative flex items-end">
                      <input
                        id="cardNumber"
                        type="text"
                        placeholder="Card Number"
                        className={inputClass}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                      <div className="absolute right-0 bottom-3 text-[#c6c6cd]">
                        <span className="material-symbols-outlined">contactless</span>
                      </div>
                    </div>
                    <Input id="cardName" placeholder="Name on Card" />
                    <div className="grid grid-cols-2 gap-8">
                      <Input id="expiry" placeholder="MM/YY" />
                      <Input id="cvc" placeholder="CVC" />
                    </div>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="p-6 border border-white/10 bg-[#1b1b1d] text-[#c6c6cd] text-base">
                    <p className="mb-2 font-medium text-[#e4e2e4]">Bank Transfer Details</p>
                    <p>Account Name: ArtGallery419 Ltd.</p>
                    <p>IBAN: TR00 0000 0000 0000 0000 0000 00</p>
                    <p className="mt-2 text-sm text-[#c6c6cd]/70">Please use your order number as the reference.</p>
                  </div>
                )}
              </section>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5 relative mt-12 lg:mt-0">
              <div className="sticky top-8 bg-[#1b1b1d] p-8 md:p-10 border border-white/5 flex flex-col gap-8 shadow-2xl fade-up"
                style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>

                <h3 className="text-2xl font-medium text-[#e4e2e4]"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  Order Summary
                </h3>

                {/* Artwork Item */}
                <div className="flex gap-6 pb-8 border-b border-white/10">
                  <div className="w-24 h-32 bg-[#1f1f21] flex-shrink-0 relative">
                    <img
                      alt="Nocturne in Gold"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSs1ms8AecFqn4dTpFqZUi_7XD-n_qqg7bipImp-GRHpd6qjO1P8RXsNR-VrUywGB5LTKBVCZ89DzJz3KI2CKjSnAagZR5E9fjk3fIxIFH8KJQKooA5nQaxw8IbtJfxw29mGESdF65Z4Gu5fQa1vHPk_HyWXHnUfJUQgjEIL8iCMwxujkkr-ett1OeMCc0sBeOggMfe-01t26HpZN_W056UCMjzkUUVPzkqoorTylA6BrcZjtihFmsXLPE1pJruaK-4QjqEpQTi6SW"
                    />
                    <div className="absolute inset-0 border border-white/10 pointer-events-none" />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <h4 className="text-xl text-[#e4e2e4] leading-tight"
                        style={{ fontFamily: 'Playfair Display, serif' }}>
                        Nocturne in Gold
                      </h4>
                      <p className="text-base text-[#c6c6cd] mt-1">Elena Rostova, 2023</p>
                    </div>
                    <p className="text-base text-[#e9c349]">$12,500</p>
                  </div>
                </div>

                {/* Coupon */}
                <div className="flex gap-4 items-end pb-8 border-b border-white/10">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Curator or Access Code"
                      className={inputClass}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                  <button className="text-xs font-semibold tracking-widest text-[#e9c349] hover:text-[#ffe088] border-b border-transparent hover:border-[#ffe088] transition-all pb-2 duration-300">
                    APPLY
                  </button>
                </div>

                {/* Totals */}
                <div className="flex flex-col gap-4 text-base text-[#c6c6cd]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#e4e2e4]">$12,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>White-Glove Shipping</span>
                    <span className="text-[#e4e2e4]">$450</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span className="text-[#e4e2e4]">Calculated at next step</span>
                  </div>
                  <div className="flex justify-between items-end mt-4 pt-6 border-t border-white/10">
                    <span className="text-2xl font-medium text-[#e4e2e4]"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                      Total
                    </span>
                    <span className="text-3xl font-medium text-[#e9c349]"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                      $12,950
                    </span>
                  </div>
                </div>

                {/* Confirm Button */}
                <button
                  className="w-full mt-4 bg-[#e9c349] text-[#3c2f00] py-5 px-6 text-sm font-medium flex items-center justify-center gap-3 relative group overflow-hidden transition-all duration-300 active:scale-[0.99]"
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(233,195,73,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                  style={{ transition: 'background 0.3s, box-shadow 0.3s' }}
                  onMouseOver={e => e.currentTarget.style.background = '#ffe088'}
                  onMouseOut={e => e.currentTarget.style.background = '#e9c349'}>
                  <span className="material-symbols-outlined z-10" style={{ fontSize: '20px' }}>lock</span>
                  <span className="z-10">Confirm and Pay</span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                </button>

                {/* Trust Indicators */}
                <div className="mt-2 flex flex-col items-center gap-2">
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#c6c6cd]/60 flex items-center gap-2">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>shield</span>
                    256-BIT ENCRYPTED TRANSACTION
                  </p>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#c6c6cd]/60 flex items-center gap-2">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>verified</span>
                    AUTHENTICITY GUARANTEED
                  </p>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
