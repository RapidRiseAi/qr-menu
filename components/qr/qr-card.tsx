/* eslint-disable @next/next/no-img-element */
"use client";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { POWERED_BY } from "@/lib/constants";
import { isLocalhostUrl } from "@/lib/qr/url";
export function QrCard({
  url,
  title,
  subtitle,
  print = false,
}: {
  url: string;
  title: string;
  subtitle?: string;
  print?: boolean;
}) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    QRCode.toDataURL(url, {
      width: 420,
      margin: 2,
      color: { dark: "#071a2f", light: "#FFFFFF" },
    }).then(setSrc);
  }, [url]);
  const usesLocalhost = isLocalhostUrl(url);
  function download() {
    const a = document.createElement("a");
    a.href = src;
    a.download = `${title.replace(/\s+/g, "-")}-qr.png`;
    a.click();
  }
  return (
    <div className="print-card rounded-3xl bg-white p-5 text-center text-hennies-navy shadow-xl">
      <h3 className="font-black">{title}</h3>
      {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      {src ? (
        <img
          src={src}
          alt={`${title} QR code`}
          className="mx-auto my-4 h-52 w-52"
        />
      ) : (
        <div className="mx-auto my-4 h-52 w-52 animate-pulse bg-slate-100" />
      )}
      <p className="text-sm font-semibold">Scan to view our digital menu</p>
      <p className="mt-2 break-all text-xs text-slate-400">{url}</p>
      <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
        {POWERED_BY}
      </p>
      {usesLocalhost && (
        <p className="mt-3 rounded-2xl bg-red-50 px-3 py-2 text-xs font-bold text-red-700">
          This QR points to localhost. Set NEXT_PUBLIC_SITE_URL to your public
          or LAN URL before printing.
        </p>
      )}
      {!print && (
        <div className="no-print mt-4 flex gap-2">
          <Button type="button" onClick={download} className="flex-1">
            Download PNG
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="flex-1 !border-slate-200 !text-slate-950"
            onClick={() => navigator.clipboard.writeText(url)}
          >
            Copy link
          </Button>
        </div>
      )}
    </div>
  );
}
