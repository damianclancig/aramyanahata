
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const products = [
  {
    image: { src: "/images/Productos-Jabones.jpg", hint: "soap" },
    title: "Jabones Artesanales Naturales",
    description: "Elaborados a base de glicerina vegetal y enriquecidos con ingredientes botánicos y esencias naturales que cuidan y nutren la piel.\nDisponibles en combinaciones únicas con hierbas, especias y flores.\nIdeales para una limpieza suave, energética y revitalizante.",
    whatsappMessage: "¡Hola! Me interesaron los jabones artesanales y quisiera más información.",
    visible: true,
  },
  {
    image: { src: "/images/Productos-Perfumes.jpg", hint: "perfume bottle" },
    title: "Perfumes Energéticos",
    description: "Elaborados artesanalmente con ingredientes 100% naturales: alcohol, cáscaras de naranja, mirra, benjuí, incienso y pétalos de rosa.\nPerfumes de descarga pensados para armonizar, limpiar y elevar tu energía.",
    whatsappMessage: "¡Hola! Me interesaron los perfumes energéticos y quisiera más información.",
    visible: true,
  },
  {
    image: { src: "https://placehold.co/600x400.png", hint: "candle" },
    title: "Velas Intencionadas",
    description: "Crea un ambiente sagrado y manifiesta tus deseos con nuestras velas cargadas de intención.",
    whatsappMessage: "¡Hola! Me interesaron las velas intencionadas y quisiera más información.",
    visible: false,
  },
  {
    image: { src: "https://placehold.co/600x400.png", hint: "essential oil" },
    title: "Aceites Esenciales",
    description: "Mezclas personalizadas para aromaterapia, masajes y rituales de autocuidado.",
    whatsappMessage: "¡Hola! Me interesaron los aceites esenciales y quisiera más información.",
    visible: false,
  },
  {
    image: { src: "https://placehold.co/600x400.png", hint: "body cream" },
    title: "Cremas Naturales",
    description: "Nutre tu piel con la pureza de la naturaleza. Ingredientes orgánicos y sin químicos.",
    whatsappMessage: "¡Hola! Me interesaron las cremas naturales y quisiera más información.",
    visible: false,
  }
];

export function Products() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "521234567890";
  const whatsappBaseUrl = `https://wa.me/${whatsappNumber}?text=`;
  const visibleProducts = products.filter(p => p.visible);

  return (
    <section id="products" className="w-full bg-background/70">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground">Productos Artesanales</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Cada producto está hecho a mano con amor, ingredientes naturales y la intención de nutrir tu ser.
          </p>
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {visibleProducts.map((product, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 max-w-md flex p-2">
              <Card className="overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-102 hover:shadow-xl flex flex-col w-full">
                <CardHeader className="p-0">
                  <Image
                    src={product.image.src}
                    alt={product.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    data-ai-hint={product.image.hint}
                  />
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="text-2xl font-headline text-foreground mb-2">{product.title}</CardTitle>
                  <p className="text-muted-foreground whitespace-pre-line">{product.description}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0 mt-auto">
                  <Button asChild className="w-full whitespace-normal h-auto" variant="outline">
                    <Link href={`${whatsappBaseUrl}${encodeURIComponent(product.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      <WhatsAppIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span>Consultar por WhatsApp</span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
