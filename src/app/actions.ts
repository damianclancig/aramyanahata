
"use server";

import type { FormValues, TestimonialFormValues } from "@/lib/schemas";
import { getDb } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { Resend } from "resend";
import { ContactFormEmail } from "@/components/emails/ContactFormEmail";

const initialTestimonials = [
  {
    quote: "Una experiencia transformadora. Stella tiene una energía increíble que te hace sentir en paz desde el primer momento. Salí de la sesión renovada y con mucha claridad.",
    author: "Laura G.",
    rating: 5,
    createdAt: Timestamp.fromMillis(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
  },
  {
    quote: "Los productos son de una calidad excepcional. Se nota el amor y la dedicación en cada detalle. La vela de lavanda es mi favorita para meditar.",
    author: "Carlos M.",
    rating: 5,
    createdAt: Timestamp.fromMillis(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    quote: "El taller de cristales fue mágico. Aprendí muchísimo y me sentí muy conectada con el grupo. Stella es una maestra maravillosa, explica todo con mucha paciencia y sabiduría.",
    author: "Ana Sofía R.",
    rating: 5,
    createdAt: Timestamp.fromMillis(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  }
];

export async function submitInquiry(data: FormValues) {
  const resendApiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY;
  const toEmail = process.env.NEXT_PUBLIC_RESEND_TO_EMAIL;
  const fromEmail = process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL || 'Aramy Anahata <onboarding@resend.dev>';
  const db = getDb();

  try {
    // 1. Save to Firebase (as a backup)
    await addDoc(collection(db, "inquiries"), {
      ...data,
      createdAt: Timestamp.now(),
    });

    // 2. Send email with Resend
    if (resendApiKey && toEmail) {
      const resend = new Resend(resendApiKey);
      try {
        await resend.emails.send({
          from: fromEmail,
          to: toEmail,
          subject: 'Nuevo Mensaje de Contacto - Aramy Anahata',
          react: ContactFormEmail({ name: data.name, email: data.email, message: data.message }),
        });
      } catch (emailError) {
        console.error("Resend email error:", emailError);
        // Don't block the user response if email fails, just log it.
        // The inquiry is already saved in Firebase.
      }
    } else {
        console.warn("NEXT_PUBLIC_RESEND_API_KEY or NEXT_PUBLIC_RESEND_TO_EMAIL is not set. Skipping email sending.");
    }

    return { success: true, message: "¡Gracias por tu mensaje! Te contactaremos pronto." };
  } catch (e) {
    console.error("Error adding document or sending email: ", e);
    return { success: false, message: "Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo." };
  }
}

export async function submitTestimonial(data: TestimonialFormValues) {
  const db = getDb();
  try {
    await addDoc(collection(db, "testimonials"), {
      ...data,
      rating: 5, // Default rating
      createdAt: Timestamp.now(),
    });
    return { success: true, message: "¡Gracias por tu testimonio! Ha sido enviado para su revisión." };
  } catch (e) {
    console.error("Error adding testimonial: ", e);
    return { success: false, message: "Hubo un error al enviar tu testimonio. Por favor, intenta de nuevo." };
  }
}

export async function getTestimonials() {
  const db = getDb();
  try {
    const testimonialsCol = collection(db, "testimonials");
    const q = query(testimonialsCol, orderBy("createdAt", "desc"));
    const testimonialSnapshot = await getDocs(q);
    
    const dbTestimonials = testimonialSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        quote: data.quote,
        author: data.author,
        rating: data.rating,
      };
    });

    // Combine initial and database testimonials, ensuring a consistent structure
    const allTestimonials = [
        ...initialTestimonials.map(t => ({ quote: t.quote, author: t.author, rating: t.rating })), 
        ...dbTestimonials
    ];
    
    // Sort all testimonials by date (assuming createdAt exists or can be inferred)
    // For this example, we'll just return the combined list as is, with DB ones first.
    return dbTestimonials.length > 0 ? allTestimonials : initialTestimonials.map(t => ({ quote: t.quote, author: t.author, rating: t.rating }));

  } catch (error) {
    console.error("Error fetching testimonials: ", error);
    // On error, return the hardcoded list
    return initialTestimonials.map(t => ({ quote: t.quote, author: t.author, rating: t.rating }));
  }
}
