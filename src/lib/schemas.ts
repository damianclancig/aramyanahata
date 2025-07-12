
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
});

export type FormValues = z.infer<typeof formSchema>;


export const testimonialFormSchema = z.object({
  quote: z.string().min(10, { message: "El testimonio debe tener al menos 10 caracteres." }),
  author: z.string().min(2, { message: "Tu nombre debe tener al menos 2 caracteres." }),
});

export type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;
