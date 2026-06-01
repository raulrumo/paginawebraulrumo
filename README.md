# Raúl Ruiz Moratalla — Portfolio Web
## Guía de edición y despliegue

---

## ¿Qué hay en la carpeta?

```
raul-ruiz-portfolio/
├── index.html          ← página principal (no tocar salvo que sepas HTML)
├── styles.css          ← estilos visuales (no tocar salvo que sepas CSS)
├── main.js             ← comportamiento y animaciones (no tocar)
├── .htaccess           ← configuración de caché para Hostinger
├── cv-raul-ruiz-moratalla.pdf  ← PON AQUÍ TU CV EN PDF (con ese nombre exacto)
├── lib/
│   ├── manifest.js     ← ⭐ ESTE ES EL ARCHIVO QUE EDITAS
│   ├── gsap.min.js     ← animaciones (ver instrucción de descarga abajo)
│   └── ScrollTrigger.min.js
└── assets/
    └── img/            ← imágenes (si añades foto tuya, ponla aquí)
```

---

## Cómo actualizar tu información

**Solo tienes que editar un archivo:** `lib/manifest.js`

### Pasos:
1. Haz clic derecho en `lib/manifest.js`
2. Selecciona "Abrir con..." → Bloc de Notas (o Notepad++, VS Code)
3. Edita los valores que necesites (ver guía abajo)
4. Guarda el archivo (`Ctrl + S`)
5. Recarga el navegador (`F5`)

---

## Guía de edición de manifest.js

### Datos personales
```js
name: "Raúl Ruiz Moratalla",      // Tu nombre completo
location: "Valencia, España",       // Tu ciudad
email: "tu@email.com",             // Tu email de contacto
github: "https://github.com/TU_USUARIO",
linkedin: "https://linkedin.com/in/TU_USUARIO",
cvFile: "cv-raul-ruiz-moratalla.pdf",  // Nombre del PDF de tu CV
```

### Cambiar el marquee (cinta de texto)
Edita el array `marqueeItems`. Cada texto va entre comillas, separado por comas:
```js
marqueeItems: [
  "UPV TI SPECIALIZATION",
  "CISCO IOS",
  "MI NUEVA HABILIDAD",   // ← añade aquí
],
```

### Añadir una habilidad a un clúster
Busca el clúster correcto (01, 02, 03 o 04) en `skills` y añade al array `items`:
```js
{
  id: "02.1",
  cluster: "Programación & Scripting",
  items: ["Java", "C / C++", "Python", "TU NUEVA HABILIDAD"],  // ← añade aquí
},
```

### Añadir una nueva experiencia laboral
En el array `experience`, añade un objeto nuevo al principio (la más reciente):
```js
{
  role: "Tu Puesto",
  type: "Empresa / Tipo",
  period: "2025 – Actualidad",
  tags: ["Tag1", "Tag2"],
  bullets: [
    "Descripción de lo que hiciste.",
    "Otro logro o responsabilidad.",
  ],
},
```

### Activar el formulario de contacto (opcional)
1. Crea una cuenta gratuita en [formspree.io](https://formspree.io)
2. Crea un nuevo formulario y copia tu endpoint (algo como `https://formspree.io/f/XXXXXXXX`)
3. Pégalo en manifest.js:
```js
formspreeEndpoint: "https://formspree.io/f/XXXXXXXX",
```
Sin esto, el botón de enviar abrirá tu cliente de correo (mailto:).

---

## Añadir tu CV en PDF

1. Exporta tu CV como PDF
2. Renómbralo exactamente: `cv-raul-ruiz-moratalla.pdf`
3. Cópialo en la carpeta raíz del proyecto (donde está `index.html`)

---

## Activar animaciones GSAP (opcional pero recomendado)

La web funciona perfectamente sin GSAP. Para activar animaciones avanzadas:

1. Descarga estos dos archivos:
   - [gsap.min.js](https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js)
   - [ScrollTrigger.min.js](https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js)
2. Guárdalos en la carpeta `lib/` reemplazando los stubs actuales

---

## Subir a Hostinger

1. Accede al panel de Hostinger → Administrador de archivos (o usa FTP)
2. Navega a `public_html/`
3. **Sube toda la carpeta** `raul-ruiz-portfolio/` (o su contenido directamente a `public_html/`)
4. El archivo `.htaccess` **debe subirse también** (a veces los gestores de archivos ocultan archivos que empiezan por punto — activa "Mostrar archivos ocultos")

### Subir a GitHub Pages (alternativa gratuita)
1. Crea un repositorio en GitHub llamado `TU_USUARIO.github.io`
2. Sube el contenido de la carpeta al repositorio
3. Tu web estará en `https://TU_USUARIO.github.io`

---

## Ver en local (sin internet)

Haz doble clic en `index.html`. Se abrirá en tu navegador y funcionará completo (el cursor personalizado requiere un servidor HTTP para Chrome, pero todo el contenido es visible).

Para el cursor y los efectos completos en local, abre una terminal en la carpeta y ejecuta:
```
python -m http.server 8080
```
Luego abre `http://localhost:8080` en tu navegador.

---

## Reglas de edición de JSON/JS (¡importante!)

- Los textos van SIEMPRE entre comillas dobles: `"así"`
- Cada elemento de una lista lleva coma al final, EXCEPTO el último
- No borres llaves `{ }` ni corchetes `[ ]`
- Si algo se rompe: pulsa `Ctrl+Z` para deshacer, o compara con una copia de seguridad

---

## Contacto para soporte técnico de la web

Si tienes dudas técnicas sobre la web, puedes preguntarle a Claude (la IA que la generó) describiendo qué cambio quieres hacer.

---

*© 2026 Raúl Ruiz Moratalla — Valencia, España*
