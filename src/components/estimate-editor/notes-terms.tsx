"use client";

import { useEstimateStore } from "@/lib/store";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function NotesTermsEditor() {
  const { estimate, setEstimate } = useEstimateStore();

  const handleNotesChange = (val: string) => {
    setEstimate({ notes: val.split("\n") });
  };

  const handleTermsChange = (val: string) => {
    setEstimate({ terms: val.split("\n") });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase mb-2">Additional Notes</h3>
        <Textarea 
          value={estimate.notes.join("\n")} 
          onChange={(e) => handleNotesChange(e.target.value)}
          rows={5}
          placeholder="Add your notes here (one per line)..."
        />
      </div>
      
      <div className="space-y-1.5 pt-4">
        <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase mb-2">Terms & Conditions</h3>
        <Textarea 
          value={estimate.terms.join("\n")} 
          onChange={(e) => handleTermsChange(e.target.value)}
          rows={4}
          placeholder="Add terms and conditions here (one per line)..."
        />
      </div>
    </div>
  );
}
