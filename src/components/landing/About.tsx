import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

export function About() {
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/aramy.anahata";

  return (
    <section id="about" className="w-full bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <div className="relative w-full aspect-square rounded-lg shadow-2xl overflow-hidden mx-auto max-w-sm lg:max-w-none">
              <Image
                src="/images/perfil.jpg"
                alt="Stella, fundadora de Aramy Anahata"
                fill
                className="object-cover"
                data-ai-hint="woman portrait"
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground">Sobre Stella</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Stella es una terapeuta holística apasionada por guiar a otros en su camino de sanación y autoconocimiento. Con más de 10 años de experiencia en Reiki, sanación con cristales y lecturas intuitivas, su enfoque se centra en crear un espacio seguro y amoroso para la transformación personal.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Su misión es empoderarte con herramientas que te permitan reconectar con tu sabiduría interior, liberar bloqueos energéticos y vivir una vida más plena y auténtica. Cada sesión y producto está impregnado de su dedicación y energía sanadora.
            </p>
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link href={instagramUrl} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="w-5 h-5 mr-2" />
                  Síguela en Instagram
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
