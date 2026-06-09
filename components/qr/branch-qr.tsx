"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, Printer } from "lucide-react";
import { POWERED_BY } from "@/lib/constants";
import { Button } from "@/components/ui/button";
export function BranchQr({
  branchName,
  slug,
}: {
  branchName: string;
  slug: string;
}) {
  const [dataUrl, setDataUrl] = useState("");
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  const url = useMemo(() => `${origin}/m/${slug}`, [origin, slug]);
  const posterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    QRCode.toDataURL(url, {
      width: 900,
      margin: 2,
      color: { dark: "#071a2f", light: "#ffffff" },
    }).then(setDataUrl);
  }, [url]);
  function download() {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${slug}-qr.png`;
    a.click();
  }
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <div
        ref={posterRef}
        className="print-card rounded-[2rem] bg-white p-8 text-center text-hennies-navy shadow-2xl"
      >
        <p className="text-sm font-black uppercase tracking-[0.25em] text-hennies-orange">
          {branchName}
        </p>
        <h2 className="mt-2 text-4xl font-black">
          Scan to view our digital menu
        </h2>
        {dataUrl && (
          <img
            src={dataUrl}
            alt={`${branchName} QR code`}
            className="mx-auto mt-6 h-72 w-72"
          />
        )}
        <p className="mt-4 break-all text-sm font-semibold text-slate-600">
          {url}
        </p>
        <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
          {POWERED_BY}
        </p>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-white/8 p-5">
        <h3 className="text-2xl font-black">One QR per branch</h3>
        <p className="mt-2 text-sm text-white/65">
          This QR points only to the public branch menu route. No table
          recognition, cart or checkout is included.
        </p>
        <div className="mt-5 grid gap-3">
          <Button onClick={download}>
            <Download className="mr-2 h-4 w-4" /> Download QR PNG
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigator.clipboard.writeText(url)}
          >
            Copy public menu link
          </Button>
          <Button variant="light" onClick={() => print()}>
            <Printer className="mr-2 h-4 w-4" /> Print QR poster
          </Button>
        </div>
      </div>
    </div>
  );
}
