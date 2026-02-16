/*
 * LegalDisclaimer.tsx — Reusable legal disclaimer banner
 * Design: Midnight Compass — subtle amber/warning styling
 */
import { AlertTriangle } from "lucide-react";

interface LegalDisclaimerProps {
  text: string;
  className?: string;
}

export default function LegalDisclaimer({ text, className = "" }: LegalDisclaimerProps) {
  return (
    <div className={`rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 ${className}`}>
      <div className="flex gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-200/80 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
