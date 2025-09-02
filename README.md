# Landing Page - Aramy Anahata

Este es el repositorio para la página de aterrizaje de "Aramy Anahata", un espacio dedicado a terapias holísticas, sanación y bienestar.

## ✨ Visión General

El sitio web está diseñado para ser una carta de presentación digital para Stella, una terapeuta holística. Proporciona a los visitantes información sobre sus servicios, productos artesanales, su historia y testimonios de clientes. El objetivo principal es facilitar el contacto y la reserva de sesiones a través de WhatsApp y un formulario de contacto.

## 🚀 Funcionalidades

- **Hero Section:** Una imagen de bienvenida impactante con un llamado a la acción directo para reservar sesiones por WhatsApp.
- **Secciones de Contenido:** Información clara y separada sobre Servicios, Productos, la historia de Stella y Testimonios.
- **Separadores de Sección:** Un elegante separador con un icono de mandala que divide visualmente cada sección, manteniendo una estética limpia y energética.
- **Sección de Productos:** Presenta productos artesanales como jabones y velas. Cada producto tiene un botón para iniciar una consulta por WhatsApp con un mensaje predefinido.
- **Sobre Stella:** Una sección dedicada a presentar a la terapeuta, incluyendo una breve biografía y un enlace a su perfil de Instagram.
- **Sección de Testimonios:** Un carrusel dinámico que muestra testimonios de clientes. Incluye un formulario para que los visitantes puedan enviar sus propias experiencias, las cuales se almacenan en Firebase.
- **Formulario de Contacto:** Un formulario simple para que los usuarios envíen consultas generales. Los mensajes se guardan en Firebase y se envía una notificación por correo electrónico usando Resend.
- **Botón Flotante de WhatsApp:** Un botón fijo en la esquina inferior derecha para un acceso rápido y fácil al chat de WhatsApp.
- **SEO Optimizado:** Metadatos avanzados, `sitemap.xml` y `robots.txt` generados dinámicamente para un posicionamiento óptimo en buscadores.
- **Analíticas:** Integración con Vercel Analytics para seguimiento de tráfico.

## 🛠️ Tecnologías Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (con App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [ShadCN UI](https://ui.shadcn.com/)
- **Manejo de Formularios:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) para validación.
- **Backend & Base de Datos:** [Firebase](https://firebase.google.com/) (Firestore para almacenar testimonios y mensajes de contacto).
- **Envío de correos:** [Resend](https://resend.com/)
- **Carrusel:** [Embla Carousel](https://www.embla-carousel.com/)
- **Iconos:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Analíticas:** [Vercel Analytics](https://vercel.com/analytics)

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

Crea una copia del archivo `.env.example` y renómbrala a `.env`. Luego, completa los valores correspondientes.

```bash
cp .env.example .env
```

El archivo `.env` contendrá las credenciales para conectar con Firebase, Resend, la URL del sitio, el número de WhatsApp y la URL de Instagram. Reemplaza los valores de ejemplo con tus propias credenciales.

### 4. Ejecutar el Servidor de Desarrollo

```bash
npm run dev
```

Abre [http://localhost:9002](http://localhost:9002) en tu navegador para ver el sitio en acción.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
