# Landing Page - Aramy Anahata

Este es el repositorio para la página de aterrizaje de "Aramy Anahata", un espacio dedicado a terapias holísticas, sanación y bienestar.

## ✨ Visión General

El sitio web está diseñado para ser una carta de presentación digital para Stella, una terapeuta holística. Proporciona a los visitantes información sobre sus servicios, productos artesanales, su historia y testimonios de clientes. El objetivo principal es facilitar el contacto y la reserva de sesiones a través de WhatsApp y un formulario de contacto.

## 🚀 Funcionalidades

- **Hero Section:** Una imagen de bienvenida impactante con un llamado a la acción directo para reservar sesiones por WhatsApp.
- **Sección de Servicios:** Muestra las diferentes terapias ofrecidas (Terapias Energéticas, Lecturas Intuitivas, Masajes, Talleres).
- **Sección de Productos:** Presenta productos artesanales como jabones y velas. Cada producto tiene un botón para iniciar una consulta por WhatsApp con un mensaje predefinido.
- **Sobre Stella:** Una sección dedicada a presentar a la terapeuta, incluyendo una breve biografía y un enlace a su perfil de Instagram.
- **Sección de Testimonios:** Un carrusel dinámico que muestra testimonios de clientes. Incluye un formulario para que los visitantes puedan enviar sus propias experiencias, las cuales se almacenan en Firebase.
- **Formulario de Contacto:** Un formulario simple para que los usuarios envíen consultas generales. Los mensajes se guardan en Firebase.
- **Botón Flotante de WhatsApp:** Un botón fijo en la esquina inferior derecha para un acceso rápido y fácil al chat de WhatsApp.

## 🛠️ Tecnologías Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (con App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [ShadCN UI](https://ui.shadcn.com/)
- **Manejo de Formularios:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) para validación.
- **Backend & Base de Datos:** [Firebase](https://firebase.google.com/) (Firestore para almacenar testimonios y mensajes de contacto).
- **Carrusel:** [Embla Carousel](https://www.embla-carousel.com/)
- **Iconos:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## ⚙️ Configuración del Ambiente de Desarrollo

Sigue estos pasos para levantar el proyecto en tu entorno local.

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn

### 1. Clonar el Repositorio

```bash
git clone https://github.com/damianclancig/aramyanahata.git
cd aramyanahata
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto. Este archivo contendrá las credenciales para conectar con Firebase.

```
# Firebase Configuration
FIREBASE_API_KEY="TU_API_KEY"
FIREBASE_AUTH_DOMAIN="TU_AUTH_DOMAIN"
FIREBASE_PROJECT_ID="TU_PROJECT_ID"
FIREBASE_STORAGE_BUCKET="TU_STORAGE_BUCKET"
FIREBASE_MESSAGING_SENDER_ID="TU_SENDER_ID"
FIREBASE_APP_ID="TU_APP_ID"
```

Reemplaza los valores `TU_*` con las credenciales de tu proyecto de Firebase. Puedes encontrarlas en la configuración de tu proyecto en la consola de Firebase.

### 4. Ejecutar el Servidor de Desarrollo

```bash
npm run dev
```

Abre [http://localhost:9002](http://localhost:9002) en tu navegador para ver el sitio en acción.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
