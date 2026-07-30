/*
  Simple client-side i18n.
  Translations are embedded directly (not fetched as JSON) so the site
  works when opened straight from the filesystem, no local server needed.
*/
const translations = {
  en: {
    nav: { home: "Home", about: "About", services: "Services", contact: "Contact" },
    brand: { tail: "Finance Consulting" },
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
          title: "Modern Data Analysis and AI",
          body: "A new generation of insight — AI-assisted analysis, automation, and dashboards that turn your financial data into clearer, faster decisions.",
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
      team: {
        title: "Our team",
      },
      founder: {
        eyebrow: "Founder",
        name: "Emilio Salcedo",
        role: "Founder & Lead Consultant, Accountant",
        bio: "With over 30 years of experience in accounting and financial consulting, our founder has helped countless businesses and individuals in Cartagena navigate their finances with clarity and confidence.",
      },
      analyst: {
        eyebrow: "Data & Analytics",
        name: "Juan Felipe Salcedo",
        role: "Data Engineer & Technology Consultant",
        bio: "Juan Felipe brings modern data analysis, AI, and automation skills to the practice, helping turn financial and business data into clear dashboards and insights that support better decisions.",
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
          title: "Data Analysis & AI",
          body: "Modern data analysis, AI-assisted reporting, and workflow automation — plus custom dashboards and BI tools — that turn your financial and business data into clear, actionable insights. A new capability built on decades of financial expertise.",
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
      info: {
        address: { value: "Cartagena, Colombia" },
        phone: { value: "+57 300 787 1159" },
        email: { value: "info@mscontadores.com.co" },
        hours: { value: "Monday – Friday, 8:00 AM – 5:00 PM" },
      },
      form: {
        title: "Send a message",
        name: "Full name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        submit: "Send message",
        note: "Prefer not to use the form? Reach us directly using the details in the footer below.",
        sending: "Sending your message…",
        success: "Thanks — your message has been sent. We'll get back to you soon.",
        error: "Something went wrong sending your message. Please try again, or email us directly using the details in the footer below.",
      },
    },
    footer: {
      tagline: "Accounting, tax, and financial consulting in Cartagena, Colombia.",
      rights: "All rights reserved.",
      contactTitle: "Contact",
      hoursTitle: "Hours & Location",
    },
  },
  es: {
    nav: { home: "Inicio", about: "Nosotros", services: "Servicios", contact: "Contacto" },
    brand: { tail: "Finance Consulting" },
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
          title: "Análisis de Datos Moderno e IA",
          body: "Una nueva generación de conocimiento — análisis asistido por IA, automatización y tableros que convierten tus datos financieros en decisiones más claras y rápidas.",
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
      team: {
        title: "Nuestro equipo",
      },
      founder: {
        eyebrow: "Fundador",
        name: "Emilio Salcedo",
        role: "Fundador y Consultor Principal, Contador",
        bio: "Con más de 30 años de experiencia en contabilidad y consultoría financiera, nuestro fundador ha ayudado a innumerables empresas y personas en Cartagena a manejar sus finanzas con claridad y confianza.",
      },
      analyst: {
        eyebrow: "Datos y Analítica",
        name: "Juan Felipe Salcedo",
        role: "Ingeniero de Datos y Consultor en Tecnología",
        bio: "Juan Felipe aporta habilidades modernas de análisis de datos, IA y automatización a la práctica, ayudando a convertir los datos financieros y de negocio en tableros claros y conocimientos que apoyan mejores decisiones.",
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
          title: "Análisis de Datos e IA",
          body: "Análisis de datos moderno, informes asistidos por IA y automatización de flujos de trabajo — además de tableros personalizados y herramientas de BI — que convierten tu información financiera y de negocio en conocimientos claros y accionables. Una nueva capacidad construida sobre décadas de experiencia financiera.",
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
      info: {
        address: { value: "Cartagena, Colombia" },
        phone: { value: "+57 300 787 1159" },
        email: { value: "info@mscontadores.com.co" },
        hours: { value: "Lunes a viernes, 8:00 a.m. – 5:00 p.m." },
      },
      form: {
        title: "Envía un mensaje",
        name: "Nombre completo",
        email: "Correo electrónico",
        subject: "Asunto",
        message: "Mensaje",
        submit: "Enviar mensaje",
        note: "¿Prefieres no usar el formulario? Contáctanos directamente usando los datos en el pie de página.",
        sending: "Enviando tu mensaje…",
        success: "Gracias — tu mensaje ha sido enviado. Te responderemos pronto.",
        error: "Ocurrió un error al enviar tu mensaje. Inténtalo de nuevo, o escríbenos directamente usando los datos en el pie de página.",
      },
    },
    footer: {
      tagline: "Contabilidad, impuestos y consultoría financiera en Cartagena, Colombia.",
      rights: "Todos los derechos reservados.",
      contactTitle: "Contacto",
      hoursTitle: "Horario y Ubicación",
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

  document.querySelectorAll("[data-lang-current]").forEach((el) => {
    el.textContent = lang.toUpperCase();
  });

  document.querySelectorAll(".lang-select-menu li").forEach((li) => {
    li.setAttribute("aria-selected", String(li.getAttribute("data-lang") === lang));
  });

  localStorage.setItem("ms_lang", lang);
}

function closeLangSelect(select, { returnFocus } = {}) {
  const wasOpen = select.classList.contains("is-open");
  select.classList.remove("is-open");
  const toggle = select.querySelector(".lang-select-toggle");
  toggle.setAttribute("aria-expanded", "false");
  if (returnFocus && wasOpen) toggle.focus();
}

function openLangSelect(select) {
  select.classList.add("is-open");
  select.querySelector(".lang-select-toggle").setAttribute("aria-expanded", "true");
  // Move focus into the listbox so keyboard/screen-reader users can actually
  // reach the options — a real WCAG 2.1.1 gap when this only opened visually.
  // Deferred: the menu's `visibility: hidden` is part of a CSS transition
  // (see .lang-select-menu), and browsers don't resolve that transition's
  // computed value synchronously — not even after a forced reflow or a
  // requestAnimationFrame tick. A short delay (well under human perception,
  // but past that resolution point) is what reliably makes the option
  // focusable; verified empirically, not a guess.
  setTimeout(() => {
    const options = Array.from(select.querySelectorAll(".lang-select-menu li"));
    const selected = options.find((li) => li.getAttribute("aria-selected") === "true");
    (selected || options[0])?.focus();
  }, 60);
}

function initLanguage() {
  // Default is Spanish (the practice is based in Cartagena, Colombia) —
  // not browser-language detection, since plenty of visitors here run an
  // English OS/browser locale despite being Spanish speakers. A saved
  // choice from the language switcher always takes priority.
  const saved = localStorage.getItem("ms_lang");
  const initial = saved || "es";

  applyLanguage(initial);

  document.querySelectorAll(".lang-select").forEach((select) => {
    const toggle = select.querySelector(".lang-select-toggle");
    const options = Array.from(select.querySelectorAll(".lang-select-menu li"));

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      if (select.classList.contains("is-open")) {
        closeLangSelect(select);
      } else {
        openLangSelect(select);
      }
    });

    const selectOption = (li) => {
      applyLanguage(li.getAttribute("data-lang"));
      closeLangSelect(select, { returnFocus: true });
    };

    options.forEach((li, index) => {
      li.addEventListener("click", () => selectOption(li));

      li.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectOption(li);
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          options[(index + 1) % options.length].focus();
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          options[(index - 1 + options.length) % options.length].focus();
        } else if (event.key === "Escape") {
          closeLangSelect(select, { returnFocus: true });
        }
        // Tab is left to the browser's default; the container's focusout
        // handler below closes the menu once focus actually leaves it.
      });
    });

    // Closing on focusout (not just outside-click) covers keyboard users
    // tabbing away from the widget entirely.
    select.addEventListener("focusout", (event) => {
      if (!select.contains(event.relatedTarget)) closeLangSelect(select);
    });
  });

  document.addEventListener("click", (event) => {
    document.querySelectorAll(".lang-select.is-open").forEach((select) => {
      if (!select.contains(event.target)) closeLangSelect(select);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.querySelectorAll(".lang-select.is-open").forEach((select) => closeLangSelect(select, { returnFocus: true }));
    }
  });
}

document.addEventListener("DOMContentLoaded", initLanguage);
