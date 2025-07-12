import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Sparkles, HandHeart, Users } from "lucide-react";

const services = [
  {
    icon: <Sprout className="h-10 w-10 text-primary" />,
    title: "Terapias Energéticas",
    description: "Equilibra tu energía vital y encuentra la paz interior a través de técnicas como el Reiki y la sanación con cristales."
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: "Lecturas Intuitivas",
    description: "Obtén claridad y guía en tu camino de vida con lecturas de tarot, oráculos y canalizaciones personalizadas."
  },
  {
    icon: <HandHeart className="h-10 w-10 text-primary" />,
    title: "Masajes",
    description: "Libera tensiones y relaja tu cuerpo con masajes holísticos que integran aromaterapia y técnicas de relajación profunda."
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Talleres",
    description: "Aprende herramientas para tu crecimiento personal y espiritual en nuestros talleres de meditación, cristales y más."
  }
];

export function Services() {
  return (
    <section id="services" className="w-full py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground">Nuestros Servicios</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ofrecemos una variedad de terapias y herramientas para acompañarte en tu viaje de autodescubrimiento y bienestar.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center shadow-lg transition-transform duration-300 ease-in-out hover:scale-102 hover:shadow-xl border-t-4 border-t-accent">
              <CardHeader className="items-center">
                <div className="p-4 bg-accent/20 rounded-full mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-2xl font-headline text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
