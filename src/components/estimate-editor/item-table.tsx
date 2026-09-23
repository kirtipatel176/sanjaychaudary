"use client";

import { useEstimateStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { calculateItemAmount, formatCurrency } from "@/lib/calculations";

export function ItemTableEditor() {
  const { estimate, addItem, updateItem, removeItem, updateFinancials } = useEstimateStore();
  const { items, discount, taxRate, subtotal, total } = estimate;

  const handleAddItem = () => {
    if (items.length >= 6) {
      alert("Maximum of 6 items allowed for this bill design.");
      return;
    }
    addItem({
      id: crypto.randomUUID(),
      description: "",
      quantity: null,
      unit: "",
      rate: null,
      amount: 0,
    });
  };

  const handleItemChange = (id: string, field: string, value: any) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    const updatedItem = { ...item, [field]: value };
    if (field === "quantity" || field === "rate") {
      updatedItem.amount = calculateItemAmount(
        field === "quantity" ? (value === "" ? null : Number(value)) : item.quantity,
        field === "rate" ? (value === "" ? null : Number(value)) : item.rate
      );
    }
    updateItem(id, updatedItem);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4 pb-2">
        <Button 
          onClick={handleAddItem} 
          disabled={items.length >= 6}
          size="sm" 
          className="h-9 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 rounded-full px-5 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          <Plus className="w-4 h-4 mr-1" /> {items.length >= 6 ? "Max 6 Items" : "Add Item"}
        </Button>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="font-semibold px-4 py-3 text-left w-12">#</th>
              <th className="font-semibold px-4 py-3 text-left">Description</th>
              <th className="font-semibold px-4 py-3 text-left w-24">Qty</th>
              <th className="font-semibold px-4 py-3 text-left w-32">Rate</th>
              <th className="font-semibold px-4 py-3 text-right w-32">Amount</th>
              <th className="font-semibold px-4 py-3 text-center w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item, index) => (
              <tr key={item.id} className="group hover:bg-slate-50/80 transition-colors">
                <td className="px-4 py-3 text-muted-foreground">{index + 1}</td>
                <td className="px-4 py-3">
                  <Input 
                    value={item.description} 
                    onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                    placeholder="Item description"
                    className="border-0 shadow-none focus-visible:ring-1 bg-transparent px-2"
                  />
                </td>
                <td className="px-4 py-3">
                  <Input 
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={item.quantity === null ? "" : item.quantity} 
                    onChange={(e) => handleItemChange(item.id, "quantity", e.target.value)}
                    placeholder="0"
                    className="border-0 shadow-none focus-visible:ring-1 bg-transparent px-2"
                  />
                </td>
                <td className="px-4 py-3">
                  <Input 
                    type="text"
                    inputMode="decimal"
                    value={item.rate === null ? "" : item.rate} 
                    onChange={(e) => handleItemChange(item.id, "rate", e.target.value)}
                    placeholder="0"
                    className="border-0 shadow-none focus-visible:ring-1 bg-transparent px-2"
                  />
                </td>
                <td className="px-4 py-3 text-right font-medium tabular-nums">
                  {formatCurrency(item.amount)}
                </td>
                <td className="px-4 py-3 text-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeItem(item.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                  No items added yet. Click &apos;Add Item&apos; to begin.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="border rounded-lg p-4 space-y-3 bg-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground">ITEM {String(index + 1).padStart(2, '0')}</span>
              <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="h-6 w-6 text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Input 
                value={item.description} 
                onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                placeholder="Item description"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Quantity</Label>
                <Input 
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={item.quantity === null ? "" : item.quantity} 
                  onChange={(e) => handleItemChange(item.id, "quantity", e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Rate</Label>
                <Input 
                  type="text"
                  inputMode="decimal"
                  value={item.rate === null ? "" : item.rate} 
                  onChange={(e) => handleItemChange(item.id, "rate", e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-1.5 flex flex-col justify-end">
                <Label className="mb-2">Amount</Label>
                <div className="font-semibold text-lg">{formatCurrency(item.amount)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Totals Section */}
      <div className="flex flex-col items-end pt-6 space-y-3 border-t">
        <div className="flex items-center justify-between w-full md:w-64">
          <span className="text-muted-foreground text-sm">Subtotal</span>
          <span className="font-medium tabular-nums">{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex items-center justify-between w-full md:w-64">
          <Label htmlFor="discount" className="text-muted-foreground text-sm flex-1">Discount Amount</Label>
          <div className="w-32">
            <Input 
              id="discount"
              type="number" 
              value={discount ? discount : ""} 
              onChange={(e) => updateFinancials(e.target.value ? Number(e.target.value) : 0, taxRate)}
              placeholder="0"
              className="text-right h-8"
            />
          </div>
        </div>

        <div className="flex items-center justify-between w-full md:w-64">
          <Label htmlFor="taxRate" className="text-muted-foreground text-sm flex-1">Tax (%)</Label>
          <div className="w-32">
            <Input 
              id="taxRate"
              type="number" 
              value={taxRate ? taxRate : ""} 
              onChange={(e) => updateFinancials(discount, e.target.value ? Number(e.target.value) : 0)}
              placeholder="0"
              className="text-right h-8"
            />
          </div>
        </div>

        <div className="w-full md:w-64 pt-3 border-t flex items-center justify-between mt-2">
          <span className="font-bold text-primary">TOTAL AMOUNT</span>
          <span className="font-bold text-xl text-primary tabular-nums">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
