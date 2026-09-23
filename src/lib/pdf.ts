import { toCanvas } from "html-to-image";
import { jsPDF } from "jspdf";

export async function generatePDF(element: HTMLElement, filename: string) {
  const PDF_W_MM = 210;
  const PDF_H_MM = 297;
  const A4_PX_W  = 794;  // 210mm @ 96dpi

  // ── 1. Temporarily widen the viewport so iOS Safari renders the full width ──
  let viewportMeta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
  const originalViewport = viewportMeta?.getAttribute("content") ?? "";

  if (!viewportMeta) {
    viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    document.head.appendChild(viewportMeta);
  }
  viewportMeta.setAttribute("content", `width=${A4_PX_W}, initial-scale=1`);

  // Give the browser time to reflow at the new viewport width
  await new Promise((r) => setTimeout(r, 300));

  // ── 2. Clone onto body at full A4 width ──
  const clone = element.cloneNode(true) as HTMLElement;
  Object.assign(clone.style, {
    position:      "fixed",
    top:           "0",
    left:          "0",
    zIndex:        "-99999",
    transform:     "none",
    transformOrigin:"top left",
    width:         `${A4_PX_W}px`,
    minHeight:     "1123px",
    background:    "white",
    pointerEvents: "none",
    visibility:    "visible",
    opacity:       "1",
    overflow:      "visible",
  });
  document.body.appendChild(clone);

  try {
    // Wait for fonts/images inside clone to settle
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    await new Promise((r) => setTimeout(r, 400));

    const totalHeight = clone.scrollHeight || 1123;

    const canvas = await toCanvas(clone, {
      width: A4_PX_W,
      height: totalHeight,
      backgroundColor: "#ffffff",
      pixelRatio: 2,
      style: {
        transform: "none",
        transformOrigin: "top left",
      }
    });

    if (!canvas.width || !canvas.height) {
      throw new Error(`Canvas is empty (${canvas.width}×${canvas.height}). Try again.`);
    }

    // ── 3. Build a strict 1-page PDF without distortion ──
    const pdfHeightMm = (canvas.height * PDF_W_MM) / canvas.width;
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [PDF_W_MM, Math.max(PDF_H_MM, pdfHeightMm)] });
    
    // Maintain perfect aspect ratio by using the calculated height
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, PDF_W_MM, pdfHeightMm);

    // ── 4. Save / open PDF ──
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    if (isIOS) {
      // iOS Safari blocks programmatic file downloads — open in new tab so user can
      // tap Share → Save to Files / AirDrop / etc.
      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      const newTab = window.open(url, "_blank");
      if (!newTab) {
        // If popup was blocked, fall back to an anchor click
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      setTimeout(() => URL.revokeObjectURL(url), 30000);
    } else {
      pdf.save(filename);
    }

  } finally {
    // ── 4. Clean up ──
    if (document.body.contains(clone)) document.body.removeChild(clone);

    // Restore original viewport
    if (originalViewport) {
      viewportMeta.setAttribute("content", originalViewport);
    } else {
      viewportMeta.setAttribute("content", "width=device-width, initial-scale=1");
    }
  }
}
