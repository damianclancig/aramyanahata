
"use server";

import type { FormValues, TestimonialFormValues } from "@/lib/schemas";
import { getDb } from "@/lib/firebase";
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
  const db = getDb();
  const mailerooApiKey = process.env.MAILEROO_API_KEY;
  const fromEmail = process.env.MAILEROO_FROM_EMAIL;
  const toEmail = process.env.MAILEROO_TO_CONTACT;

  if (!mailerooApiKey || !fromEmail || !toEmail) {
    console.error("Maileroo environment variables are not configured.");
    return { success: false, message: "Error en la configuración del servidor. Por favor, intenta más tarde." };
  }

  try {
    // 1. Save to Firebase (as a backup)
    await addDoc(collection(db, "inquiries"), {
      ...data,
      createdAt: Timestamp.now(),
    });

    // 2. Send email via Maileroo
    const { name, email, message } = data;
    const mailerooApiUrl = "https://smtp.maileroo.com/api/v2/emails";
    
    const emailPayload = {
      from: {
        address: fromEmail,
        display_name: "Aramy Anahata Web",
      },
      to: [{ address: toEmail }],
      reply_to: { address: email, display_name: name },
      subject: `Nuevo Mensaje de Contacto - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h1 style="color: #789D8C;">Nuevo Mensaje de Contacto</h1>
          <p>Has recibido un nuevo mensaje a través del formulario de tu sitio web.</p>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <h2>Detalles del Mensaje:</h2>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Nombre:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
          </ul>
          <h3>Mensaje:</h3>
          <p style="white-space: pre-wrap; background-color: #f9f9f9; border-left: 4px solid #B6A6CA; padding: 1em;">
              ${message}
          </p>
          <hr style="border: 0; border-top: 1px solid #eee;" />
        </div>
      `,
    };

    const response = await fetch(mailerooApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${mailerooApiKey}`,
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Maileroo API error:", errorData);
      return { success: false, message: "Hubo un error al enviar el correo. Por favor, intenta de nuevo." };
    }

    return { success: true, message: "¡Gracias por tu mensaje! Te contactaremos pronto." };

  } catch (e) {
    console.error("Error submitting inquiry: ", e);
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
