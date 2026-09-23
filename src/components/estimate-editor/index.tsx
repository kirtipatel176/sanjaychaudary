"use client";

import { BusinessDetailsEditor } from "./business-details";
import { CustomerDetailsEditor } from "./customer-details";
import { EstimateDetailsEditor } from "./estimate-details";
import { ItemTableEditor } from "./item-table";
import { NotesTermsEditor } from "./notes-terms";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function EstimateEditor() {
  return (
    <div className="w-full max-w-3xl mx-auto p-2 sm:p-6 space-y-8 pb-32">
      <Accordion defaultValue={["business"]} className="space-y-4">
        
        <AccordionItem value="business" className="glass rounded-2xl border-none overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
          <div className="border-t-4 border-t-indigo-500 px-4 sm:px-6">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/><path d="M12 3v6"/></svg>
                </div>
                <h2 className="text-lg font-bold text-slate-800 tracking-tight text-left">Business Profile</h2>
              </div>
            </AccordionTrigger>
          </div>
          <AccordionContent className="px-4 sm:px-6 pb-6 pt-2">
            <BusinessDetailsEditor />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="customer" className="glass rounded-2xl border-none overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10">
          <div className="border-t-4 border-t-emerald-500 px-4 sm:px-6">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h2 className="text-lg font-bold text-slate-800 tracking-tight text-left">Customer Details</h2>
              </div>
            </AccordionTrigger>
          </div>
          <AccordionContent className="px-4 sm:px-6 pb-6 pt-2">
            <CustomerDetailsEditor />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="estimate" className="glass rounded-2xl border-none overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10">
          <div className="border-t-4 border-t-amber-500 px-4 sm:px-6">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                </div>
                <h2 className="text-lg font-bold text-slate-800 tracking-tight text-left">Estimate Details</h2>
              </div>
            </AccordionTrigger>
          </div>
          <AccordionContent className="px-4 sm:px-6 pb-6 pt-2">
            <EstimateDetailsEditor />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="items" className="glass rounded-2xl border-none overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
          <div className="border-t-4 border-t-blue-500 px-4 sm:px-6">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
                </div>
                <h2 className="text-lg font-bold text-slate-800 tracking-tight text-left">Items & Pricing</h2>
              </div>
            </AccordionTrigger>
          </div>
          <AccordionContent className="px-2 sm:px-6 pb-6 pt-2">
            <ItemTableEditor />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="notes" className="glass rounded-2xl border-none overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-rose-500/10">
          <div className="border-t-4 border-t-rose-500 px-4 sm:px-6">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-100 rounded-lg shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                </div>
                <h2 className="text-lg font-bold text-slate-800 tracking-tight text-left">Notes & Terms</h2>
              </div>
            </AccordionTrigger>
          </div>
          <AccordionContent className="px-4 sm:px-6 pb-6 pt-2">
            <NotesTermsEditor />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
