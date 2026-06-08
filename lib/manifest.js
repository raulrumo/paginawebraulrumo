/*
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  RAÚL RUIZ MORATALLA — MANIFEST.JS (Archivo de Configuración) ║
 * ║  Edita este archivo para actualizar tu web.                  ║
 * ║  Guárdalo con el Bloc de Notas y recarga el navegador.       ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * INSTRUCCIONES DE EDICIÓN:
 * — Los textos van entre comillas: "así"
 * — Los arrays (listas) van entre corchetes: [elem1, elem2]
 * — Los objetos van entre llaves: { clave: "valor" }
 * — No borres comas ni llaves. Si algo se rompe, compara con el README.md.
 */

(function () {
  "use strict";

  window.__CV_DATA__ = {

    /* ────────────────── DATOS PERSONALES ────────────────── */
    name: "Raúl Ruiz Moratalla",
    nameShort: "RAÚL RUIZ.",
    location: "Valencia, España",
    email: "raulruizmoratalla@gmail.com",
    github: "https://github.com/raulrumo",
    linkedin: "https://linkedin.com/in/raulruizmoratalla",

    /* Ruta local de tu CV en PDF (coloca el PDF en la raíz del proyecto) */
    cvFile: "cv-raul-ruiz-moratalla.pdf",

    /* ────────────────── HERO ────────────────── */
    heroKicker: "INGENIERÍA INFORMÁTICA · TI / NETWORKS & SYSTEMS ADMINISTRATION",
    heroTagline: "Especializado en infraestructuras de red, administración de sistemas críticos y automatización. Capacidad probada para solucionar fallos técnicos complejos bajo presión.",
    systemVersion: "v3.2026",

    /* ────────────────── MARQUEE ────────────────── */
    marqueeItems: [
      "UPV TI SPECIALIZATION",
      "CISCO IOS",
      "BASH SCRIPTING",
      "AZURE DEVOPS",
      "DOCKER",
      "LINUX DEBIAN/UBUNTU",
      "ACTIVE DIRECTORY",
      "WIRESHARK",
      "FL STUDIO AUDIO NETWORK",
      "TCP/IP PROTOCOLS",
      "VMWARE",
      "GIT & GITHUB",
      "MICROSOFT AZURE",
      "PYTHON AUTOMATION",
      "WINDOWS SERVER",
    ],

    /* ────────────────── SOBRE MÍ (Sección 01) ────────────────── */
    about: {
      paragraphs: [
        "Estudiante de 3.er año de Ingeniería Informática (especialidad TI) en la UPV, con foco en administración de redes, sistemas y seguridad. Perfil proactivo, resolutivo y con criterio técnico formado en entornos de tolerancia cero al fallo.",
        "Mi trayectoria como DJ y productor musical profesional ha consolidado mi capacidad para gestionar infraestructuras técnicas complejas en tiempo real —redes de audio digital, MIDI/OSC de baja latencia, equipos en directo— bajo presión extrema y ante público. Esa disciplina se traslada directamente a mis proyectos de ingeniería.",
      ],
      highlights: [
        "Agilidad mental y resolución de problemas bajo presión",
        "Tolerancia cero al fallo: entornos críticos en tiempo real",
        "Carnet de conducir tipo B",
      ],
      status: "Cursando 3.er año · UPV",
      statusLocation: "Valencia, ES",
    },

    /* ────────────────── HABILIDADES (Sección 02) ────────────────── */
    skills: [
      {
        id: "02.1",
        cluster: "Programación & Scripting",
        icon: "code",
        items: ["Java", "C / C++", "Python (Automatización)", "SQL", "Bash Scripting", "JavaScript"],
      },
      {
        id: "02.2",
        cluster: "Sistemas e Infraestructura",
        icon: "server",
        items: ["Windows Server (Active Directory, GPOs)", "Linux Debian / Ubuntu", "VMware & VirtualBox", "Virtualización avanzada"],
      },
      {
        id: "02.3",
        cluster: "Redes & Seguridad",
        icon: "network",
        items: ["Switches / Routers Cisco (IOS)", "Protocolos TCP/IP", "Wireshark — Análisis de tráfico", "Segmentación de redes y VLANs"],
      },
      {
        id: "02.4",
        cluster: "Cloud & DevOps / Tools",
        icon: "cloud",
        items: ["Microsoft Azure", "Azure DevOps (CI/CD, Boards)", "Docker", "Git / GitHub", "FL Studio (DAW / Audio Network)"],
      },
    ],

    /* ────────────────── EXPERIENCIA (Sección 03) ────────────────── */
    experience: [
      {
        role: "DJ & Productor Musical",
        type: "Freelance — Ingeniería de Audio en Vivo",
        period: "2023 – Actualidad",
        tags: ["MIDI/OSC", "Redes de Audio Digital", "Latencia Crítica", "Real-Time Systems"],
        bullets: [
          "Pincho en directo ante público gestionando en tiempo real señales de audio digital de baja latencia.",
          "Montaje y configuración de la mesa y equipos propios cuando el evento lo requiere.",
          "Tolerancia cero al fallo: resolución de problemas técnicos en el momento sin posibilidad de parar.",
        ],
      },
    ],

    /* ────────────────── EDUCACIÓN (Sección 04) ────────────────── */
    education: [
      {
        degree: "Grado en Ingeniería Informática",
        spec: "Especialidad: Tecnologías de la Información (TI)",
        institution: "Universitat Politècnica de València (UPV)",
        period: "2023 – Actualidad",
        note: "Enfocado en administración, seguridad y redes de sistemas.",
      },
    ],
    languages: [
      { lang: "Español", level: "Nativo" },
      { lang: "Inglés", level: "B2 Certificado — CertAcles (7.1)" },
    ],
    achievements: [],

    /* ────────────────── CONTACTO (Sección 05) ────────────────── */
    contact: {
      formspreeEndpoint: "", /* Opcional: pega tu endpoint de Formspree aquí para activar el formulario */
      links: [
        { label: "Email directo", href: "mailto:raulruizmoratalla@gmail.com", cmd: "mail --open" },
        { label: "LinkedIn", href: "https://linkedin.com/in/raulruizmoratalla", cmd: "linkedin --connect" },
        { label: "GitHub", href: "https://github.com/raulruizmoratalla", cmd: "github --view" },
      ],
    },

  }; // FIN window.__CV_DATA__

})();
