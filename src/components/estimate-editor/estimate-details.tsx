"use client";

import { useEstimateStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EstimateDetailsEditor() {
  const { estimate, updateEstimateDetails } = useEstimateStore();
  const details = estimate.estimateDetails || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <div className="space-y-1.5 md:col-span-2">
        <Label htmlFor="est-number">Estimate Number</Label>
        <Input
          id="est-number"
          value={details.estimateNumber || ""}
          onChange={(e) => updateEstimateDetails({ estimateNumber: e.target.value })}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="est-date">Estimate Date</Label>
        <Input
          id="est-date"
          type="date"
          value={details.estimateDate || ""}
          onChange={(e) => updateEstimateDetails({ estimateDate: e.target.value })}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="est-valid">Valid Until</Label>
        <Input
          id="est-valid"
          type="date"
          value={details.validUntil || ""}
          onChange={(e) => updateEstimateDetails({ validUntil: e.target.value })}
        />
      </div>
    </div>

  );
}
