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

      {/* ── HEADER ── */}
      <div className="flex justify-between items-start mb-10 relative z-10">
        <div>
          <h1 className="text-4xl font-black text-blue-700 tracking-tight mb-6">ESTIMATE</h1>
          <div className="grid grid-cols-[100px_1fr] gap-y-2 text-xs">
            <span className="font-semibold text-slate-500">Estimate No.</span>
            <span className="font-bold text-slate-800">{estimateDetails.estimateNumber}</span>
            <span className="font-semibold text-slate-500">Estimate Date</span>
            <span suppressHydrationWarning className="font-bold text-slate-800">{estimateDetails.estimateDate}</span>
            {estimateDetails.validUntil && (
              <>
                <span className="font-semibold text-slate-500">Valid Until</span>
                <span suppressHydrationWarning className="font-bold text-slate-800">{estimateDetails.validUntil}</span>
              </>
            )}
          </div>
        </div>
        
        {/* BRANDING */}
        <div className="flex items-center gap-3 shrink-0 text-right">
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-1">{businessInfo.name}</span>
            {businessInfo.slogan && (
              <span className="text-xs font-medium text-slate-600 mb-1">{businessInfo.slogan}</span>
            )}
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{businessInfo.services || "Services"}</span>
          </div>
          <div className="w-16 h-16 shrink-0 bg-slate-50 rounded-lg flex items-center justify-center p-1 border border-slate-100 shadow-sm">
            <img src="/logo.jpg" alt="Logo" className="max-w-full max-h-full object-contain mix-blend-multiply" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
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
      <div className="flex gap-10 items-start">
        {/* Notes & Terms */}
        <div className="flex-1 space-y-6 pt-2">
          {terms.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-blue-700 mb-2">Terms and Conditions</h4>
              <ul className="text-xs text-slate-500 space-y-1 leading-relaxed">
                {terms.map((term, i) => <li key={i}>{term}</li>)}
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
          
          <div className="pt-8">
            <p className="text-[10px] font-bold text-slate-800">
              For any enquiries, email us or call us on <span className="text-blue-700">{businessInfo.phone}</span>
            </p>
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
                      <path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>
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
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                      </svg>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-1.5 items-center">
                  {/* Fake GPay Logo */}
                  <div className="flex items-center gap-0.5 font-bold tracking-tighter text-[11px] text-slate-700">
                    <span className="w-4 h-4 rounded-full border-[1.5px] border-emerald-500 border-t-blue-500 border-l-yellow-500 border-r-red-500 inline-block mr-0.5"></span>
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

          {/* Signature Box */}
          <div className={`flex flex-col items-center justify-end ${businessInfo.qrCodeImage ? 'mt-0' : 'mt-12'}`}>
            <div className="w-48 h-20 flex items-end justify-center mb-2">
              {businessInfo.signatureImage ? (
                <img 
                  src={businessInfo.signatureImage} 
                  alt="Signature" 
                  className="max-w-full max-h-full object-contain mix-blend-multiply" 
                  style={{ filter: 'grayscale(100%) brightness(200%) contrast(500%)' }}
                />
              ) : (
                <div className="w-full h-full border-b border-dashed border-slate-300"></div>
              )}
            </div>
            <p className="text-[10px] font-bold text-slate-800 uppercase tracking-wider text-center">Authorized Signature</p>
            <p className="text-[9px] text-slate-500 mt-0.5 text-center">{businessInfo.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

PDFDocument.displayName = "PDFDocument";
