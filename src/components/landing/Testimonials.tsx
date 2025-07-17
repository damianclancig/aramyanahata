"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getTestimonials, submitTestimonial } from "@/app/actions";
import { testimonialFormSchema, type TestimonialFormValues } from "@/lib/schemas";

type Testimonial = {
  quote: string;
  author: string;
  rating: number;
};

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full_${i}`} className="w-5 h-5 text-accent fill-accent" />);
  }
  if (halfStar) {
    stars.push(<StarHalf key="half" className="w-5 h-5 text-accent fill-accent" />);
  }
  return stars;
};

export function Testimonials() {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const { toast } = useToast();

  React.useEffect(() => {
    async function fetchTestimonials() {
      setIsLoading(true);
      const fetchedTestimonials = await getTestimonials();
      setTestimonials(fetchedTestimonials);
      setIsLoading(false);
    }
    fetchTestimonials();
  }, []);
  
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      quote: "",
      author: "",
    },
  });

  const onSubmit = async (values: TestimonialFormValues) => {
    const result = await submitTestimonial(values);
    if (result.success) {
      toast({
        title: "Testimonio Enviado",
        description: result.message,
      });
      form.reset();
      // Optimistically add to the list, or refetch
      const newTestimonial = { ...values, rating: 5 };
      setTestimonials(prev => [newTestimonial, ...prev]);
    } else {
      toast({
        title: "Error",
        description: result.message || "No se pudo enviar el testimonio.",
        variant: "destructive",
      });
    }
  };


  return (
    <section id="testimonials" className="w-full bg-background/70">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground">Lo que dicen de nosotros</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            La voz de nuestra comunidad es nuestro mayor orgullo y motivación.
          </p>
        </div>
        <div className="mt-16">
          {isLoading ? (
            <p className="text-center">Cargando testimonios...</p>
          ) : testimonials.length > 0 ? (
            <Carousel
              plugins={[plugin.current]}
              className="w-full max-w-4xl mx-auto"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              opts={{ loop: true }}
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card className="bg-card shadow-lg flex flex-col justify-between p-4 h-full border-l-4 border-l-accent">
                        <CardContent className="p-0 flex flex-col h-full">
                          <div className="flex mb-2">{renderStars(testimonial.rating)}</div>
                          <blockquote className="text-muted-foreground italic text-base leading-relaxed flex-grow">
                            “{testimonial.quote}”
                          </blockquote>
                          <div className="mt-3 text-right">
                            <p className="font-bold font-headline text-foreground text-lg">- {testimonial.author}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          ) : (
            <p className="text-center text-muted-foreground">Aún no hay testimonios. ¡Sé el primero!</p>
          )}
        </div>
        
        <div className="mt-20">
            <Card className="max-w-2xl mx-auto shadow-xl border-t-4 border-t-primary">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold font-headline text-foreground">Comparte tu Experiencia</CardTitle>
                    <CardDescription className="mt-2 text-md text-muted-foreground">
                        Tu opinión nos ayuda a crecer. ¡Gracias por formar parte de nuestra comunidad!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                        control={form.control}
                        name="quote"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-lg">Tu Testimonio</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="Escribe tu experiencia aquí..."
                                className="min-h-[120px]"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-lg">Tu Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Tu nombre" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full text-lg py-6" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Enviando..." : "Enviar Testimonio"}
                        </Button>
                    </form>
                    </Form>
                </CardContent>
            </Card>
        </div>

      </div>
    </section>
  );
}
