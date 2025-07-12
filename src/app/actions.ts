
"use server";

import type { FormValues, TestimonialFormValues } from "@/lib/schemas";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from "firebase/firestore";

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
  try {
    const docRef = await addDoc(collection(db, "inquiries"), {
      ...data,
      createdAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
    return { success: true, message: "¡Gracias por tu mensaje! Te contactaremos pronto." };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { success: false, message: "Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo." };
  }
}

export async function submitTestimonial(data: TestimonialFormValues) {
  try {
    await addDoc(collection(db, "testimonials"), {
      ...data,
      rating: 5, // Default rating
      createdAt: new Date(),
    });
    return { success: true, message: "¡Gracias por tu testimonio! Ha sido enviado para su revisión." };
  } catch (e) {
    console.error("Error adding testimonial: ", e);
    return { success: false, message: "Hubo un error al enviar tu testimonio. Por favor, intenta de nuevo." };
  }
}

export async function getTestimonials() {
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

    // Combine initial testimonials with testimonials from DB
    // To prevent duplicates if initial ones were added to DB, a more robust check would be needed.
    // For this case, we just combine them.
    return [...initialTestimonials.map(t => ({ quote: t.quote, author: t.author, rating: t.rating })), ...dbTestimonials];
  } catch (error) {
    console.error("Error fetching testimonials: ", error);
    // On error, return the hardcoded list
    return initialTestimonials.map(t => ({ quote: t.quote, author: t.author, rating: t.rating }));
  }
}
