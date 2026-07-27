/*
  Simple client-side i18n.
  Translations are embedded directly (not fetched as JSON) so the site
  works when opened straight from the filesystem, no local server needed.
*/
const translations = {
  en: {
    nav: { home: "Home", about: "About", services: "Services", contact: "Contact" },
    brand: { name: "M&S Finance Consulting" },
    hero: {
      eyebrow: "Accounting & Financial Consulting",
      title: "Clear finances. Confident decisions.",
      subtitle:
        "M&S Finance Consulting has supported businesses and individuals in Cartagena, Colombia for over 30 years with accounting, tax, and financial consulting — now enhanced with modern data analysis.",
      ctaPrimary: "Get in touch",
      ctaSecondary: "Our services",
    },
    home: {
      highlights: {
        title: "Why work with us",
        experience: {
          title: "30+ Years of Experience",
          body: "Decades of hands-on accounting and financial consulting experience serving businesses and individuals across Cartagena.",
        },
        accounting: {
          title: "Accounting & Tax Expertise",
          body: "Full-service bookkeeping, tax filing, and financial statement preparation, compliant with Colombian regulations.",
        },
        data: {
          title: "Modern Data Analysis",
          body: "A new generation of insight: turning your financial data into clear reports and smarter decisions.",
        },
      },
      about: {
        title: "A one-on-one relationship you can trust",
        body: "Founded and led personally, M&S Finance Consulting means you always work directly with an experienced professional — not a call center. Get to know our story.",
        cta: "Learn more about us",
      },
      cta: {
        title: "Ready to put your finances in order?",
        body: "Schedule a consultation and see how three decades of experience can work for you.",
        button: "Contact us today",
      },
    },
    about: {
      eyebrow: "About Us",
      title: "Three decades of experience, one dedicated professional",
      intro:
        "M&S Finance Consulting was built on a simple principle: give every client the same care, precision, and attention a business owner would give their own finances.",
      body1:
        "For more than 30 years, M&S Finance Consulting has provided accounting, tax, and financial consulting services to businesses and individuals in Cartagena, Colombia. As a one-person practice, every engagement is handled personally — no hand-offs, no juniors learning on your account, just direct, experienced guidance from start to finish.",
      body2:
        "In recent years, the practice has expanded to include data analysis services, bringing modern tools and techniques to help clients understand their numbers more deeply and make better decisions — a new chapter built on the same foundation of trust.",
      values: {
        title: "Our values",
        integrity: { title: "Integrity", body: "Every recommendation is made with honesty and your best interest in mind." },
        precision: { title: "Precision", body: "Meticulous, accurate work — because in finance, details matter." },
        personal: { title: "Personal attention", body: "You are never just a file number. Every client gets direct, personal attention." },
        learning: { title: "Continuous learning", body: "Combining decades of experience with modern tools like data analysis to keep delivering value." },
      },
      founder: {
        eyebrow: "Founder",
        name: "[Founder name — TODO]",
        role: "Founder & Lead Consultant, Accountant",
        bio: "With over 30 years of experience in accounting and financial consulting, our founder has helped countless businesses and individuals in Cartagena navigate their finances with clarity and confidence.",
      },
    },
    services: {
      eyebrow: "What We Offer",
      title: "Services",
      intro:
        "Comprehensive accounting and financial services, backed by three decades of experience — plus modern data analysis to give you a sharper view of your numbers.",
      items: {
        accounting: {
          title: "Accounting & Bookkeeping",
          body: "Accurate, up-to-date bookkeeping and financial statement preparation, so you always know exactly where your business stands.",
        },
        tax: {
          title: "Tax Planning & Filing",
          body: "Timely, compliant tax preparation and planning under Colombian regulations, minimizing risk and helping you plan ahead.",
        },
        consulting: {
          title: "Financial Consulting",
          body: "Personalized guidance on budgeting, cash flow, and financial strategy for businesses and individuals alike.",
        },
        data: {
          title: "Data Analysis",
          body: "Modern data analysis services that turn your financial and business data into clear dashboards and actionable insights — a new capability built on decades of financial expertise.",
        },
      },
      cta: {
        title: "Not sure what you need?",
        body: "Every business is different. Let's talk about your specific situation.",
        button: "Schedule a consultation",
      },
    },
    contact: {
      eyebrow: "Get in Touch",
      title: "Contact",
      intro: "Have a question or ready to get started? Reach out — we typically respond within one business day.",
      infoTitle: "Contact information",
      info: {
        address: { label: "Address", value: "Cartagena, Colombia [TODO: add full address]" },
        phone: { label: "Phone / WhatsApp", value: "[TODO: add phone number]" },
        email: { label: "Email", value: "[TODO: add email address]" },
        hours: { label: "Business hours", value: "Monday – Friday, 8:00 AM – 5:00 PM" },
      },
      form: {
        title: "Send a message",
        name: "Full name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        submit: "Send message",
        note: "This form is not yet connected to email — for now, please contact us directly using the information above.",
      },
    },
    footer: {
      tagline: "Accounting, tax, and financial consulting in Cartagena, Colombia.",
      rights: "All rights reserved.",
    },
  },
  es: {
    nav: { home: "Inicio", about: "Nosotros", services: "Servicios", contact: "Contacto" },
    brand: { name: "M&S Finance Consulting" },
    hero: {
      eyebrow: "Consultoría Contable y Financiera",
      title: "Finanzas claras. Decisiones seguras.",
      subtitle:
        "M&S Finance Consulting ha acompañado a empresas y personas en Cartagena, Colombia durante más de 30 años en contabilidad, impuestos y consultoría financiera — ahora potenciado con análisis de datos moderno.",
      ctaPrimary: "Contáctanos",
      ctaSecondary: "Nuestros servicios",
    },
    home: {
      highlights: {
        title: "Por qué trabajar con nosotros",
        experience: {
          title: "Más de 30 Años de Experiencia",
          body: "Décadas de experiencia práctica en contabilidad y consultoría financiera al servicio de empresas y personas en Cartagena.",
        },
        accounting: {
          title: "Experiencia Contable y Tributaria",
          body: "Contabilidad integral, declaración de impuestos y preparación de estados financieros, conforme a la normativa colombiana.",
        },
        data: {
          title: "Análisis de Datos Moderno",
          body: "Una nueva generación de conocimiento: convertir tus datos financieros en reportes claros y mejores decisiones.",
        },
      },
      about: {
        title: "Una relación personal en la que puedes confiar",
        body: "Fundada y dirigida personalmente, en M&S Finance Consulting siempre trabajas directamente con un profesional con experiencia — no con un centro de llamadas. Conoce nuestra historia.",
        cta: "Conócenos",
      },
      cta: {
        title: "¿Listo para poner tus finanzas en orden?",
        body: "Agenda una consulta y descubre cómo tres décadas de experiencia pueden trabajar para ti.",
        button: "Contáctanos hoy",
      },
    },
    about: {
      eyebrow: "Sobre Nosotros",
      title: "Tres décadas de experiencia, un profesional dedicado",
      intro:
        "M&S Finance Consulting se construyó sobre un principio simple: brindar a cada cliente el mismo cuidado, precisión y atención que un empresario le daría a sus propias finanzas.",
      body1:
        "Durante más de 30 años, M&S Finance Consulting ha brindado servicios de contabilidad, impuestos y consultoría financiera a empresas y personas en Cartagena, Colombia. Al ser una práctica de una sola persona, cada caso se maneja personalmente — sin traspasos, sin junior aprendiendo con tu cuenta, solo asesoría directa y experimentada de principio a fin.",
      body2:
        "En los últimos años, la práctica se ha ampliado para incluir servicios de análisis de datos, incorporando herramientas y técnicas modernas para ayudar a los clientes a entender mejor sus números y tomar mejores decisiones — un nuevo capítulo construido sobre la misma base de confianza.",
      values: {
        title: "Nuestros valores",
        integrity: { title: "Integridad", body: "Cada recomendación se hace con honestidad y pensando en tu mejor interés." },
        precision: { title: "Precisión", body: "Trabajo meticuloso y exacto — porque en las finanzas, los detalles importan." },
        personal: { title: "Atención personal", body: "Nunca eres solo un número de expediente. Cada cliente recibe atención directa y personal." },
        learning: { title: "Aprendizaje continuo", body: "Combinando décadas de experiencia con herramientas modernas como el análisis de datos para seguir generando valor." },
      },
      founder: {
        eyebrow: "Fundador",
        name: "[Nombre del fundador — TODO]",
        role: "Fundador y Consultor Principal, Contador",
        bio: "Con más de 30 años de experiencia en contabilidad y consultoría financiera, nuestro fundador ha ayudado a innumerables empresas y personas en Cartagena a manejar sus finanzas con claridad y confianza.",
      },
    },
    services: {
      eyebrow: "Lo Que Ofrecemos",
      title: "Servicios",
      intro:
        "Servicios integrales de contabilidad y finanzas, respaldados por tres décadas de experiencia — además de análisis de datos moderno para darte una visión más clara de tus números.",
      items: {
        accounting: {
          title: "Contabilidad y Teneduría de Libros",
          body: "Contabilidad precisa y actualizada, junto con la preparación de estados financieros, para que siempre sepas exactamente en qué punto está tu negocio.",
        },
        tax: {
          title: "Planeación y Declaración de Impuestos",
          body: "Preparación y planeación tributaria oportuna y conforme a la normativa colombiana, minimizando riesgos y ayudándote a planear con anticipación.",
        },
        consulting: {
          title: "Consultoría Financiera",
          body: "Asesoría personalizada en presupuestos, flujo de caja y estrategia financiera, tanto para empresas como para personas.",
        },
        data: {
          title: "Análisis de Datos",
          body: "Servicios modernos de análisis de datos que convierten tu información financiera y de negocio en tableros claros y conocimientos accionables — una nueva capacidad construida sobre décadas de experiencia financiera.",
        },
      },
      cta: {
        title: "¿No sabes qué necesitas?",
        body: "Cada negocio es diferente. Hablemos sobre tu situación específica.",
        button: "Agenda una consulta",
      },
    },
    contact: {
      eyebrow: "Contáctanos",
      title: "Contacto",
      intro: "¿Tienes una pregunta o estás listo para comenzar? Escríbenos — normalmente respondemos dentro de un día hábil.",
      infoTitle: "Información de contacto",
      info: {
        address: { label: "Dirección", value: "Cartagena, Colombia [TODO: agregar dirección completa]" },
        phone: { label: "Teléfono / WhatsApp", value: "[TODO: agregar número de teléfono]" },
        email: { label: "Correo electrónico", value: "[TODO: agregar correo electrónico]" },
        hours: { label: "Horario de atención", value: "Lunes a viernes, 8:00 a.m. – 5:00 p.m." },
      },
      form: {
        title: "Envía un mensaje",
        name: "Nombre completo",
        email: "Correo electrónico",
        subject: "Asunto",
        message: "Mensaje",
        submit: "Enviar mensaje",
        note: "Este formulario aún no está conectado al correo — por ahora, contáctanos directamente usando la información anterior.",
      },
    },
    footer: {
      tagline: "Contabilidad, impuestos y consultoría financiera en Cartagena, Colombia.",
      rights: "Todos los derechos reservados.",
    },
  },
};

function getTranslation(lang, key) {
  return key.split(".").reduce((obj, part) => (obj ? obj[part] : undefined), translations[lang]);
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = getTranslation(lang, el.getAttribute("data-i18n"));
    if (value !== undefined) el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const value = getTranslation(lang, el.getAttribute("data-i18n-placeholder"));
    if (value !== undefined) el.setAttribute("placeholder", value);
  });

  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });

  localStorage.setItem("ms_lang", lang);
}

function initLanguage() {
  const saved = localStorage.getItem("ms_lang");
  const browserLang = navigator.language && navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
  const initial = saved || browserLang;

  applyLanguage(initial);

  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.getAttribute("data-lang")));
  });
}

document.addEventListener("DOMContentLoaded", initLanguage);
