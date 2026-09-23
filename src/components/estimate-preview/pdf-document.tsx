import React, { forwardRef } from "react";
import { Estimate } from "@/types/estimate";

interface PDFDocumentProps {
  estimate: Estimate;
}

export const PDFDocument = forwardRef<HTMLDivElement, PDFDocumentProps>(({ estimate }, ref) => {
  const { businessInfo, customerInfo, serviceLocation, estimateDetails, items: allItems, subtotal, discount, taxRate, total, notes, terms } = estimate;

  // Strictly enforce 6 items max for the template consistency
  const items = allItems.slice(0, 6);

  return (
    <div
      ref={ref}
      className="bg-white text-slate-800 font-sans mx-auto flex flex-col shrink-0 relative overflow-hidden"
      style={{
        width: "210mm",
        minHeight: "297mm",
        boxSizing: "border-box",
        padding: "48px",
      }}
    >
      {/* ── WATERMARK ── */}
      {businessInfo.name && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-[0.04]">
          <div
            className="text-slate-900 font-black whitespace-nowrap"
            style={{
              fontSize: 'clamp(60px, 15vw, 140px)',
              transform: 'rotate(-45deg)',
            }}
          >
            {businessInfo.name}
          </div>
        </div>
      )}

      {/* ── HEADER (Absolute Background) ── */}
      <div className="absolute top-0 left-0 right-0 h-[380px] pointer-events-none overflow-hidden">
        {/* Header Background Image with AC on the right */}
        <img src="/header-bg.jpg" className="absolute inset-0 w-full h-full object-cover object-right" alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        {/* White gradient overlay for seamless fade (Replaces mask-image for iOS PDF compatibility) */}
        <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-white to-transparent/0"></div>
      </div>

      {/* ── HEADER CONTENT ── */}
      <div className="relative pt-4 px-4">
        <div className="flex justify-between items-start">
          {/* Logo & Brand */}
          <div className="flex gap-4 items-center">
            <div className="w-[90px] h-[90px] shrink-0 flex items-center justify-center -ml-2">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain mix-blend-multiply" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-baseline tracking-tight">
                <span className="text-4xl font-black text-[#0a192f]">HYDRO</span>
                <span className="text-4xl font-black text-[#0ea5e9]">COOL</span>
              </div>
              <span className="text-sm font-light text-slate-500 tracking-[0.4em] ml-1 mt-1 uppercase">SERVICES</span>
              <span className="text-[11px] font-medium text-slate-600 mt-2 ml-1">
                Built on Trust. Driven by Services.
              </span>
              <div className="w-12 h-[2px] bg-[#3b82f6] mt-3 ml-1"></div>
              <div className="mt-3 ml-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">AC <span className="mx-1 text-slate-300\">|</span> RO <span className="mx-1 text-slate-300\">|</span> GEYSER <span className="mx-1 text-slate-300\">|</span> WASHING MACHINE</span>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="text-right pt-6 pr-48">
            <div className="text-sm text-slate-600 font-bold uppercase tracking-widest leading-relaxed text-left">
              Comfort<br />For A Better<br /><span className="text-blue-600">Tomorrow</span>
            </div>
          </div>
        </div>

        {/* Estimate Details */}
        <div className="flex justify-end gap-12 mt-12 mx-8 relative text-right">
          <div className="flex flex-col items-end">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">Estimate No.</div>
            <div className="font-black text-slate-800 text-xl tracking-tight">{estimateDetails.estimateNumber}</div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">Estimate Date</div>
            <div suppressHydrationWarning className="font-bold text-slate-700 text-lg">{estimateDetails.estimateDate}</div>
          </div>
          {estimateDetails.validUntil ? (
            <div className="flex flex-col items-end">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">Valid Until</div>
              <div suppressHydrationWarning className="font-bold text-slate-700 text-lg">{estimateDetails.validUntil}</div>
            </div>
          ) : null}
        </div>

        {/* Bottom Line & Location */}
        <div className="mt-8 mx-4">
          <div className="w-full h-px bg-gradient-to-r from-blue-500 via-blue-200 to-transparent flex relative">
            <div className="w-48 h-[2px] bg-blue-600 absolute -top-[0.5px] left-0"></div>
          </div>
          <div className="text-right mt-2 mr-2">
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">GANDHINAGAR, GUJARAT</span>
          </div>
        </div>
      </div>

      {/* ── ADDRESS BLOCKS ── */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        {/* From (Business) */}
        <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
          <div className="grid grid-cols-[80px_1fr] gap-2 text-xs">
            <span className="font-semibold text-slate-500">Estimate By</span>
            <span className="font-bold text-slate-800">{businessInfo.name}</span>

            <span className="font-semibold text-slate-500">Address</span>
            <span className="text-slate-600 leading-relaxed whitespace-pre-wrap">{businessInfo.address}</span>

            {businessInfo.phone && (
              <>
                <span className="font-semibold text-slate-500">Phone</span>
                <span className="text-slate-600">{businessInfo.phone}</span>
              </>
            )}
          </div>
        </div>

        {/* To (Customer) */}
        <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
          <div className="grid grid-cols-[80px_1fr] gap-2 text-xs">
            <span className="font-semibold text-slate-500">Estimate To</span>
            <span className="font-bold text-slate-800">{customerInfo.name || "-"}</span>

            <span className="font-semibold text-slate-500">Address</span>
            <span className="text-slate-600 leading-relaxed whitespace-pre-wrap">
              {[customerInfo.address, customerInfo.address2].filter(Boolean).join('\n') || "-"}
            </span>

            {customerInfo.phone && (
              <>
                <span className="font-semibold text-slate-500">Phone</span>
                <span className="text-slate-600">{customerInfo.phone}</span>
              </>
            )}
          </div>
        </div>
      </div>


      {/* ── ITEMS TABLE ── */}
      <div className="mb-8 rounded-lg overflow-hidden flex-1 border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold w-12 text-xs">#</th>
              <th className="py-3 px-4 text-left font-semibold text-xs">Item Description</th>
              <th className="py-3 px-4 text-center font-semibold w-24 text-xs">Qty</th>
              <th className="py-3 px-4 text-right font-semibold w-32 text-xs">Rate (₹)</th>
              <th className="py-3 px-4 text-right font-semibold w-32 text-xs">Amount (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 border-b border-slate-200">
            {items.map((item, index) => (
              <tr key={item.id} className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50/80"} border-b border-slate-100`}>
                <td className="py-3 px-4 text-slate-500 font-medium text-xs">{String(index + 1).padStart(2, '0')}</td>
                <td className="py-3 px-4 font-medium text-slate-800">{item.description}</td>
                <td className="py-3 px-4 text-center text-slate-600 font-medium">{item.quantity ?? ""}</td>
                <td className="py-3 px-4 text-right text-slate-600 font-medium">{item.rate}</td>
                <td className="py-3 px-4 text-right font-bold text-slate-800">{item.amount > 0 ? item.amount : ""}</td>
              </tr>
            ))}
            {/* Padding rows to maintain exact height */}
            {Array.from({ length: Math.max(0, 6 - items.length) }).map((_, i) => (
              <tr key={`empty-${i}`} className={`${(items.length + i) % 2 === 0 ? "bg-white" : "bg-slate-50/80"} border-b border-slate-100`}>
                <td className="py-3 px-4 h-[44px]"></td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── TOTALS & FOOTER ── */}
      <div className="flex gap-10 items-start pb-40">
        {/* Notes & Terms */}
        <div className="flex-1 space-y-6 pt-2">
          {terms.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-blue-700 mb-2">Terms & Conditions</h4>
              <ul className="text-xs text-slate-500 space-y-1 leading-relaxed list-decimal pl-4">
                {terms.map((term, i) => (
                  <li key={i}>{term.replace(/^\d+\.\s*/, '')}</li>
                ))}
              </ul>
            </div>
          )}
          {notes.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-blue-700 mb-2">Additional Notes</h4>
              <ul className="text-xs text-slate-500 space-y-1 leading-relaxed">
                {notes.map((note, i) => <li key={i}>{note}</li>)}
              </ul>
            </div>
          )}

          {/* Trust Badges */}
          <div className="grid grid-cols-4 gap-2 pt-4">
            <div className="flex flex-col items-center text-center gap-1">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-blue-600 border border-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
              </div>
              <span className="text-[9px] font-medium text-slate-600 leading-tight">Trusted<br />Service</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-blue-600 border border-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </div>
              <span className="text-[9px] font-medium text-slate-600 leading-tight">Skilled<br />Technicians</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-blue-600 border border-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
              </div>
              <span className="text-[9px] font-medium text-slate-600 leading-tight">Quality<br />Assurance</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-blue-600 border border-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <span className="text-[9px] font-medium text-slate-600 leading-tight">On-Time<br />Support</span>
            </div>
          </div>


        </div>

        {/* Totals */}
        <div className="w-[300px] shrink-0">
          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-sm font-medium text-slate-600 px-2">
              <span>Sub Total</span>
              <span className="font-bold text-slate-800">₹ {Number(subtotal).toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm font-medium text-emerald-600 px-2 mt-1">
                <span>Discount</span>
                <span>- ₹ {Number(discount).toFixed(2)}</span>
              </div>
            )}
            {taxRate > 0 && (
              <div className="flex justify-between text-sm font-medium text-slate-600 px-2 mt-1 pb-3">
                <span>Tax ({taxRate}%)</span>
                <span>+ ₹ {((Math.max(0, subtotal - discount) * taxRate) / 100).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-black text-slate-800 pt-3 px-2 border-t-2 border-slate-200">
              <span>Total</span>
              <span>₹ {Number(total).toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Card Section */}
          {businessInfo.qrCodeImage && (
            <div className="w-[300px] mb-8 bg-[#f5f3ff] rounded-xl overflow-hidden border border-purple-100 flex shadow-sm relative -mr-2">
              <div className="flex-1 p-4 flex flex-col justify-between border-r border-purple-100">
                <div className="flex items-start gap-2 mb-4">
                  <div className="text-purple-600 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M7 12h10" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-700 leading-tight">Scan & Pay</h3>
                    <p className="text-[10px] text-purple-500/80">Pay via any UPI App</p>
                  </div>
                </div>

                {businessInfo.upiId && (
                  <div className="mb-4">
                    <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">UPI ID</p>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-slate-800 text-sm truncate">{businessInfo.upiId}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400 shrink-0">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                    </div>
                  </div>
                )}

                <div className="flex gap-1.5 items-center">
                  {/* Fake GPay Logo */}
                  <div className="flex items-center gap-0.5 font-bold tracking-tighter text-[11px] text-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" className="mr-0.5">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Pay
                  </div>
                  {/* Fake PhonePe Logo */}
                  <div className="flex items-center gap-0.5 font-bold tracking-tight text-[11px] text-purple-700 ml-1">
                    <span className="bg-purple-700 text-white rounded-[4px] w-4 h-4 flex items-center justify-center font-black">पे</span>
                    PhonePe
                  </div>
                  {/* Fake Paytm Logo */}
                  <div className="flex items-center font-black italic tracking-tighter text-[11px] text-[#002e6e] ml-1">
                    paytm
                  </div>
                </div>
              </div>

              <div className="w-[130px] p-2 bg-white flex flex-col items-center justify-center shrink-0">
                <div className="w-[100px] h-[100px] mb-2 p-1 border border-slate-200 rounded-lg">
                  <img
                    src={businessInfo.qrCodeImage}
                    alt="QR Code"
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <p className="text-[8px] font-semibold text-slate-700 text-center leading-tight mb-1">Scan this QR to make payment</p>
                <p className="text-[7px] text-slate-500 text-center leading-tight max-w-[100px]">Share payment screenshot after payment</p>
              </div>
            </div>
          )}


        </div>
      </div>

      {/* ── NEW PREMIUM FOOTER ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col bg-white border-t border-slate-100">
        <div className="flex justify-between items-end px-12 pt-8 pb-6">
          {/* Left: Enquiries */}
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-500 font-medium mb-1 tracking-wide">For any enquiries, call us on</span>
            <span className="text-sm font-black text-[#0a192f] mb-2">{businessInfo.phone || "+91 99999 99999"}</span>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.15em]">
              SERVICE TODAY. A COOLER TOMORROW.
            </span>
          </div>

          {/* Center: Airflow Wave */}
          <div className="flex-1 flex justify-center items-center px-10">
            <svg className="w-full max-w-[220px] h-8" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 20C40 5 60 5 100 20C140 35 160 35 200 20" stroke="#2563eb" strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
              <path d="M0 25C45 10 70 15 100 25C130 35 155 30 200 25" stroke="#3b82f6" strokeWidth="0.5" strokeLinecap="round" opacity="0.3" />
              <path d="M0 15C35 0 55 0 100 15C145 30 165 30 200 15" stroke="#60a5fa" strokeWidth="0.5" strokeLinecap="round" opacity="0.5" />
            </svg>
          </div>

          {/* Right: Signature */}
          <div className="flex flex-col items-center w-48">
            <div className="w-full h-16 flex items-end justify-center mb-2 relative">
              {businessInfo.signatureImage ? (
                <img
                  src={businessInfo.signatureImage}
                  alt="Signature"
                  className="max-w-full max-h-full object-contain mix-blend-multiply relative z-10"
                  style={{ filter: 'grayscale(100%) brightness(200%) contrast(500%)' }}
                />
              ) : null}
            </div>
            <div className="w-full h-[1px] bg-slate-300 mb-2"></div>
            <p className="text-[9px] font-bold text-[#0a192f] uppercase tracking-widest text-center w-full">Authorized Signature</p>
            <p className="text-[8px] text-slate-500 mt-1 uppercase tracking-wider text-center">{businessInfo.name || "HYDROCOOL SERVICES"}</p>
          </div>
        </div>

        {/* Bottom Premium Strip */}
        <div className="bg-gradient-to-r from-[#0a192f] via-[#0f274a] to-[#0a192f] py-3 px-12 flex justify-between items-center text-white">
          <span className="text-[9px] font-semibold tracking-widest opacity-90">{businessInfo.name || "HYDROCOOL SERVICES"}</span>
          <span className="text-[8px] font-light tracking-[0.2em] opacity-70">
            CLEANER AIR <span className="mx-2 opacity-30">|</span> BETTER COMFORT <span className="mx-2 opacity-30">|</span> RELIABLE SERVICE
          </span>
          <span className="text-[9px] font-medium tracking-widest opacity-90">GANDHINAGAR, GUJARAT</span>
        </div>
      </div>
    </div>
  );
});

PDFDocument.displayName = "PDFDocument";
