import Link from "next/link";
import Image from "next/image";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "521234567890";
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/aramy.anahata";

  return (
    <footer className="bg-background/80 border-t">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Image src="/images/logo1.png" alt="Aramy Anahata Logo" width={40} height={40} className="h-10 w-10" />
            <span className="text-2xl font-bold font-headline text-foreground">
              Aramy Anahata
            </span>
          </div>
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Aramy Anahata. Todos los derechos reservados.
            </p>
             <p className="text-xs text-muted-foreground/80 mt-1">
              Diseño y desarrollo web por{" "}
              <Link href="https://www.clancig.com.ar" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                clancig.com.ar
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <WhatsAppIcon className="w-6 h-6 text-[#25D366] hover:text-[#128C7E] transition-colors" />
            </Link>
            <Link href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon className="w-6 h-6 text-[#E1306C] hover:text-[#C13584] transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
