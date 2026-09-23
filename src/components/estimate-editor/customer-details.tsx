"use client";

import { useEstimateStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CustomerDetailsEditor() {
  const { estimate, updateCustomerInfo, updateServiceLocation } = useEstimateStore();
  const info = estimate.customerInfo || {};
  const serviceLoc = estimate.serviceLocation || {};

  return (
    <div className="space-y-8">
      {/* Customer Information */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="c-name">Customer Name</Label>
            <Input 
              id="c-name" 
              value={info.name || ""} 
              onChange={(e) => updateCustomerInfo({ name: e.target.value })} 
              placeholder="e.g. John Doe"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-phone">Phone</Label>
            <Input 
              id="c-phone" 
              value={info.phone || ""} 
              onChange={(e) => updateCustomerInfo({ phone: e.target.value })} 
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-email">Email</Label>
            <Input 
              id="c-email" 
              type="email"
              value={info.email || ""} 
              onChange={(e) => updateCustomerInfo({ email: e.target.value })} 
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="c-address">Address Line 1</Label>
            <Textarea 
              id="c-address" 
              value={info.address || ""} 
              onChange={(e) => updateCustomerInfo({ address: e.target.value })} 
              rows={2}
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="c-address2">Address Line 2</Label>
            <Textarea 
              id="c-address2" 
              value={info.address2 || ""} 
              onChange={(e) => updateCustomerInfo({ address2: e.target.value })} 
              rows={2}
              placeholder="Optional"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-city">City</Label>
            <Input 
              id="c-city" 
              value={info.city || ""} 
              onChange={(e) => updateCustomerInfo({ city: e.target.value })} 
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-state">State</Label>
            <Input 
              id="c-state" 
              value={info.state || ""} 
              onChange={(e) => updateCustomerInfo({ state: e.target.value })} 
            />
          </div>
        </div>
      </div>

      {/* Service Location (If Different) */}
      <div className="space-y-6 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1.5 md:col-span-2">
            <h3 className="font-bold text-slate-700">Service Location</h3>
            <p className="text-xs text-slate-500">Only fill this if the service location differs from the billing address above.</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="s-name">Location/Contact Name</Label>
            <Input 
              id="s-name" 
              value={serviceLoc.name || ""} 
              onChange={(e) => updateServiceLocation({ name: e.target.value })} 
              placeholder="Optional"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="s-phone">Contact Phone</Label>
            <Input 
              id="s-phone" 
              value={serviceLoc.phone || ""} 
              onChange={(e) => updateServiceLocation({ phone: e.target.value })} 
              placeholder="Optional"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="s-address">Service Address Line 1</Label>
            <Textarea 
              id="s-address" 
              value={serviceLoc.address || ""} 
              onChange={(e) => updateServiceLocation({ address: e.target.value })} 
              rows={2}
              placeholder="Optional"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="s-address2">Service Address Line 2</Label>
            <Textarea 
              id="s-address2" 
              value={serviceLoc.address2 || ""} 
              onChange={(e) => updateServiceLocation({ address2: e.target.value })} 
              rows={2}
              placeholder="Optional"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
