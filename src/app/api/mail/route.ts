import { type NextRequest, NextResponse } from "next/server";
import { formSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  const mailerooApiKey = process.env.MAILEROO_API_KEY;
  const mailerooApiUrl = "https://smtp.maileroo.com/api/v2/emails";
  const fromEmail = process.env.EMAIL_FROM || "contact@domain.com";
  const toEmail = process.env.EMAIL_TO || "contact@domain.com";

  if (!mailerooApiKey) {
    console.error("Maileroo API key is not configured.");
    return NextResponse.json(
      { success: false, message: "La configuración del servidor de correo no está completa." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const validatedData = formSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { success: false, message: "Datos de formulario inválidos.", errors: validatedData.error.errors },
        { status: 400 }
      );
    }
    
    const { name, email, message } = validatedData.data;

    const emailPayload = {
      from: {
        address: fromEmail,
        display_name: "Aramy Anahata Web",
      },
      to: [
        {
          address: toEmail,
        },
      ],
      reply_to: {
        address: email,
        display_name: name,
      },
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
        return NextResponse.json(
            { success: false, message: "Error al comunicarse con el servicio de correo." },
            { status: response.status }
        );
    }

    const responseData = await response.json();

    return NextResponse.json({ success: true, data: responseData });

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, message: "Hubo un error interno en el servidor." },
      { status: 500 }
    );
  }
}
