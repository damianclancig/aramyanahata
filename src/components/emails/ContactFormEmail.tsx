
import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  message,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
    <h1 style={{ color: '#5a6e6a' }}>Nuevo Mensaje de Contacto</h1>
    <p>Has recibido un nuevo mensaje a través del formulario de contacto de tu sitio web.</p>
    <hr />
    <h2>Detalles del Mensaje:</h2>
    <ul>
      <li>
        <strong>Nombre:</strong> {name}
      </li>
      <li>
        <strong>Email:</strong> {email}
      </li>
    </ul>
    <h3>Mensaje:</h3>
    <p style={{ whiteSpace: 'pre-wrap', borderLeft: '3px solid #ccc', paddingLeft: '1em' }}>
        {message}
    </p>
    <hr />
    <p style={{ fontSize: '12px', color: '#999' }}>
      Este correo fue enviado automáticamente desde el sitio web Aramy Anahata.
    </p>
  </div>
);
