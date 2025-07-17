
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { cn } from "@/lib/utils";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "521234567890";

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50; // 50px buffer
      setIsVisible(!isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Button
      asChild
      className={cn(
        "fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-110",
        "bg-[#25D366] hover:bg-[#128C7E]",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
      )}
    >
      <Link href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
        <WhatsAppIcon className="w-8 h-8 text-white" />
      </Link>
    </Button>
  );
}
