"use client";

import { useEstimateStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function BusinessDetailsEditor() {
  const { estimate, updateBusinessInfo } = useEstimateStore();
  const info = estimate.businessInfo || {};

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-1.5">
          <Label htmlFor="b-name">Business Name</Label>
          <Input
            id="b-name"
            value={info.name || ""}
            onChange={(e) => updateBusinessInfo({ name: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="b-slogan">Slogan (Optional)</Label>
          <Input
            id="b-slogan"
            value={info.slogan || ""}
            onChange={(e) => updateBusinessInfo({ slogan: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="b-services">Services</Label>
          <Input
            id="b-services"
            value={info.services || ""}
            onChange={(e) => updateBusinessInfo({ services: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="b-proprietor">Proprietor</Label>
          <Input
            id="b-proprietor"
            value={info.proprietor || ""}
            onChange={(e) => updateBusinessInfo({ proprietor: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="b-phone">Phone</Label>
          <Input
            id="b-phone"
            value={info.phone || ""}
            onChange={(e) => updateBusinessInfo({ phone: e.target.value })}
          />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="b-address">Address</Label>
          <Textarea
            id="b-address"
            value={info.address || ""}
            onChange={(e) => updateBusinessInfo({ address: e.target.value })}
            rows={3}
          />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label>Authorized Signature</Label>
          <div className="flex flex-col gap-2">
            {info.signatureImage ? (
              <div className="flex items-center gap-4">
                <div className="w-32 h-16 border rounded bg-slate-50 flex items-center justify-center p-1">
                  <img src={info.signatureImage} alt="Signature" className="max-w-full max-h-full object-contain" />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateBusinessInfo({ signatureImage: null })}
                >
                  Clear Signature
                </Button>
              </div>
            ) : (
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      updateBusinessInfo({ signatureImage: reader.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            )}
          </div>
        </div>
        <div className="space-y-1.5 md:col-span-2 mt-4">
          <Label>QR Code Image (Optional)</Label>
          <p className="text-xs text-slate-500 mb-2">Upload a QR code to display a stylish payment card on the estimate.</p>
          <div className="flex flex-col gap-2">
            {info.qrCodeImage ? (
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 border rounded bg-slate-50 flex items-center justify-center p-1">
                  <img src={info.qrCodeImage} alt="QR Code" className="max-w-full max-h-full object-contain" />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateBusinessInfo({ qrCodeImage: null })}
                >
                  Clear QR Code
                </Button>
              </div>
            ) : (
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      updateBusinessInfo({ qrCodeImage: reader.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            )}
          </div>
        </div>

        {info.qrCodeImage && (
          <div className="space-y-1.5 md:col-span-2 mt-2 bg-purple-50 p-4 rounded-lg border border-purple-100">
            <Label htmlFor="b-upi">UPI ID for Payment Card</Label>
            <Input
              id="b-upi"
              placeholder="e.g. coolfix@okaxis"
              value={info.upiId || ""}
              onChange={(e) => updateBusinessInfo({ upiId: e.target.value })}
              className="bg-white"
            />
            <p className="text-xs text-purple-600 mt-1">This will be printed next to the QR code on the payment card.</p>
          </div>
        )}
      </div>
    </div>
  );
}
