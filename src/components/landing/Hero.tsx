import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "521234567890";
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/fondo2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white font-headline drop-shadow-lg">
            Espacio de sanación y bienestar
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-200 drop-shadow-md">
            Descubre el poder de las terapias holísticas para equilibrar tu cuerpo, mente y espíritu.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className={cn("text-lg py-7 px-8 transition-transform hover:scale-105", "hover-bg-brand")}>
              <Link href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                Reservar Sesión por WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
