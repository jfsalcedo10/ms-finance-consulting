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
      title: "Accounting, tax, and data analysis services",
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
      title: "Contact your accountant in Cartagena",
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
        consent:
          "I authorize M&S Finance Consulting S.A.S. to process the personal data I provide here, for the purposes and under the terms described in its",
        consentLink: "Personal Data Processing Policy",
        consentTail: ", including its transmission through servers located abroad.",
        note: "Prefer not to use the form? Reach us directly using the details in the footer below.",
        sending: "Sending your message…",
        success: "Thanks — your message has been sent. We'll get back to you soon.",
        error: "Something went wrong sending your message. Please try again, or email us directly using the details in the footer below.",
      },
    },
    legal: {
      eyebrow: "Legal",
      title: "Personal Data Processing Policy",
      subtitle:
        "How M&S Finance Consulting collects, uses, protects, and deletes your personal data, in compliance with Colombian Law 1581 of 2012 and Decree 1074 of 2015.",
      updated: "In force since: 11 August 2026",
      langNote:
        "Issued in Spanish. The English translation is informational; in case of discrepancy, the Spanish text governs.",
      s1: {
        title: "1. Who is responsible for your data",
        body: "The party responsible for processing your personal data (Responsable del Tratamiento) is:",
        name: "M&S Finance Consulting S.A.S. — NIT: 901.242.087-7",
        address: "Address: Cartagena, Bolívar, Colombia",
        email: "Email: info@mscontadores.com.co",
        phone: "Phone: +57 300 787 1159",
        officer:
          "Queries, requests, and complaints regarding personal data are handled by Customer Service, reachable at the email address above.",
      },
      s2: {
        title: "2. What data we collect",
        body: "Through the contact form on this website we collect only the data you choose to give us:",
        i1: "Full name.",
        i2: "Email address.",
        i3: "Subject line (optional).",
        i4: "The content of the message you write.",
        note:
          "We do not collect sensitive personal data (as defined in Article 5 of Law 1581 of 2012) through this website, nor do we collect data from children or adolescents. Please do not include sensitive information, tax identification numbers, or financial account details in the contact form — use a direct channel for that once we have established contact.",
      },
      s3: {
        title: "3. Why we process it (purposes)",
        body: "Your data is processed exclusively for the following purposes:",
        i1: "To respond to your query, quote request, or contact request.",
        i2: "To contact you back by email or phone regarding the message you sent.",
        i3: "To keep a record of the communication as evidence of the request and of your authorization.",
        note:
          "We do not use your data for advertising, marketing, profiling, or automated decision-making, and we do not sell, rent, or share it with third parties for commercial purposes.",
      },
      s4: {
        title: "4. Authorization",
        body:
          "We process your data on the basis of the prior, express, and informed authorization you grant by ticking the consent box on the contact form before submitting it. You may revoke that authorization at any time, at no cost, using the procedure described in section 7, unless a legal or contractual duty requires us to keep the data.",
      },
      s5: {
        title: "5. Third parties and international transfer",
        body:
          "The contact form is delivered through Web3Forms, an email-forwarding service operated from outside Colombia, which means your message is transmitted through servers located abroad (primarily the United States). This constitutes an international transfer of data under Article 26 of Law 1581 of 2012, and by ticking the consent box you expressly and unequivocally authorize it. Web3Forms acts only as a conduit that delivers the message to our inbox; it does not use your data for its own purposes.",
        fonts:
          "This site also loads typefaces from Google Fonts, which involves your browser making a request to Google's servers and therefore exposing your IP address to Google. No other third-party service receives your data.",
      },
      s6: {
        title: "6. Your rights as a data subject",
        body: "Under Article 8 of Law 1581 of 2012, you have the right to:",
        i1: "Access, know, update, and rectify your personal data, free of charge.",
        i2: "Request proof of the authorization you granted, except where the law does not require it.",
        i3: "Be informed, upon request, about how your data has been used.",
        i4: "File complaints with the Superintendencia de Industria y Comercio (SIC) for breaches of the law, after having exhausted the process with us.",
        i5: "Revoke your authorization and/or request the deletion of your data when the SIC has determined that we have breached the law, or when there is no legal or contractual duty to retain it.",
      },
      s7: {
        title: "7. How to exercise your rights",
        body:
          "Write to info@mscontadores.com.co with the subject line \"Protección de Datos Personales\", stating your name, identification, the request you are making, and an address or email where we can reply. We handle requests as follows:",
        i1:
          "Queries (consultas) — requests to know, access, or be informed about your data: answered within ten (10) business days. If that is not possible, we will tell you why and answer within a further five (5) business days.",
        i2:
          "Complaints (reclamos) — requests to correct, update, or delete data, or to report a suspected breach: answered within fifteen (15) business days. If that is not possible, we will tell you why and answer within a further eight (8) business days. If a complaint is incomplete, we will ask you for the missing information within five (5) days; if you do not respond within two months, the complaint is deemed withdrawn.",
      },
      s8: {
        title: "8. Security and retention",
        body:
          "We apply reasonable technical, human, and administrative measures to keep your data secure and to prevent unauthorized access, loss, or alteration — including transmission of this website over HTTPS and access controls on the inbox that receives form submissions. We retain contact messages only as long as needed for the purposes above and to comply with applicable accounting and commercial record-keeping duties, after which they are deleted.",
      },
      s9: {
        title: "9. Cookies and local storage",
        body:
          "This website does not use advertising, analytics, or tracking cookies. It stores a single item in your browser's local storage (`ms_lang`) to remember whether you prefer Spanish or English. That value stays on your device, is not personal data, is never sent to us, and can be cleared at any time from your browser settings.",
      },
      s10: {
        title: "10. Changes to this policy",
        body:
          "We may update this policy. Any substantial change will be published on this page with a new effective date, and where the change affects the purposes of processing we will request your authorization again.",
      },
      s11: {
        title: "11. Term",
        body:
          "This policy is in force from the date indicated above. Personal data collected through this website will be retained for the period necessary to fulfil the purposes described in section 3 and to comply with applicable legal obligations.",
      },
    },
    footer: {
      tagline: "Accounting, tax, and financial consulting in Cartagena, Colombia.",
      rights: "All rights reserved.",
      contactTitle: "Contact",
      hoursTitle: "Hours & Location",
      privacy: "Privacy Policy",
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
      title: "Servicios contables, tributarios y de análisis de datos",
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
      title: "Contacta a tu contador en Cartagena",
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
        consent:
          "Autorizo a M&S Finance Consulting S.A.S. a tratar los datos personales que suministro aquí, para las finalidades y en los términos descritos en su",
        consentLink: "Política de Tratamiento de Datos Personales",
        consentTail: ", incluida su transmisión a través de servidores ubicados en el exterior.",
        note: "¿Prefieres no usar el formulario? Contáctanos directamente usando los datos en el pie de página.",
        sending: "Enviando tu mensaje…",
        success: "Gracias — tu mensaje ha sido enviado. Te responderemos pronto.",
        error: "Ocurrió un error al enviar tu mensaje. Inténtalo de nuevo, o escríbenos directamente usando los datos en el pie de página.",
      },
    },
    legal: {
      eyebrow: "Legal",
      title: "Política de Tratamiento de Datos Personales",
      subtitle:
        "Cómo M&S Finance Consulting recolecta, usa, protege y elimina tus datos personales, en cumplimiento de la Ley 1581 de 2012 y el Decreto 1074 de 2015.",
      updated: "Vigente desde: 11 de agosto de 2026",
      langNote:
        "Expedida en español. La traducción al inglés es informativa; en caso de discrepancia, prevalece el texto en español.",
      s1: {
        title: "1. Responsable del Tratamiento",
        body: "El Responsable del Tratamiento de tus datos personales es:",
        name: "M&S Finance Consulting S.A.S. — NIT: 901.242.087-7",
        address: "Dirección: Cartagena, Bolívar, Colombia",
        email: "Correo electrónico: info@mscontadores.com.co",
        phone: "Teléfono: +57 300 787 1159",
        officer:
          "El área de Atención al Cliente es la encargada de tramitar las consultas, peticiones y reclamos relacionados con datos personales, y puede ser contactada en el correo electrónico indicado arriba.",
      },
      s2: {
        title: "2. Datos que recolectamos",
        body: "A través del formulario de contacto de este sitio web recolectamos únicamente los datos que decides suministrarnos:",
        i1: "Nombre completo.",
        i2: "Correo electrónico.",
        i3: "Asunto (opcional).",
        i4: "El contenido del mensaje que escribes.",
        note:
          "No recolectamos datos personales sensibles (en los términos del artículo 5 de la Ley 1581 de 2012) a través de este sitio web, ni datos de niñas, niños y adolescentes. Te pedimos no incluir información sensible, números de identificación tributaria ni datos de cuentas financieras en el formulario de contacto — para eso usaremos un canal directo una vez establecido el contacto.",
      },
      s3: {
        title: "3. Finalidades del tratamiento",
        body: "Tus datos se tratan exclusivamente para las siguientes finalidades:",
        i1: "Atender y responder tu consulta, solicitud de cotización o solicitud de contacto.",
        i2: "Contactarte de vuelta por correo electrónico o teléfono en relación con el mensaje que enviaste.",
        i3: "Conservar registro de la comunicación como prueba de la solicitud y de tu autorización.",
        note:
          "No usamos tus datos para publicidad, mercadeo, elaboración de perfiles ni decisiones automatizadas, y no los vendemos, arrendamos ni compartimos con terceros con fines comerciales.",
      },
      s4: {
        title: "4. Autorización",
        body:
          "Tratamos tus datos con fundamento en la autorización previa, expresa e informada que otorgas al marcar la casilla de consentimiento en el formulario de contacto antes de enviarlo. Puedes revocar esa autorización en cualquier momento y de forma gratuita, mediante el procedimiento descrito en la sección 7, salvo que exista un deber legal o contractual de conservar los datos.",
      },
      s5: {
        title: "5. Terceros y transferencia internacional",
        body:
          "El formulario de contacto se entrega a través de Web3Forms, un servicio de reenvío de correo operado fuera de Colombia, lo que implica que tu mensaje se transmite por servidores ubicados en el exterior (principalmente en Estados Unidos). Esto constituye una transferencia internacional de datos en los términos del artículo 26 de la Ley 1581 de 2012 y, al marcar la casilla de consentimiento, la autorizas de manera expresa e inequívoca. Web3Forms actúa únicamente como intermediario que entrega el mensaje a nuestro buzón; no utiliza tus datos para finalidades propias.",
        fonts:
          "Este sitio también carga tipografías desde Google Fonts, lo que implica que tu navegador realiza una solicitud a servidores de Google y, por tanto, expone tu dirección IP a Google. Ningún otro servicio de terceros recibe tus datos.",
      },
      s6: {
        title: "6. Derechos del Titular",
        body: "De conformidad con el artículo 8 de la Ley 1581 de 2012, tienes derecho a:",
        i1: "Conocer, actualizar y rectificar tus datos personales, de forma gratuita.",
        i2: "Solicitar prueba de la autorización otorgada, salvo en los casos en que la ley no la exija.",
        i3: "Ser informado, previa solicitud, sobre el uso que se ha dado a tus datos personales.",
        i4: "Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley, una vez agotado el trámite ante nosotros.",
        i5: "Revocar la autorización y/o solicitar la supresión de tus datos cuando la SIC haya determinado que incurrimos en conductas contrarias a la ley, o cuando no exista un deber legal o contractual de conservarlos.",
      },
      s7: {
        title: "7. Procedimiento para ejercer tus derechos",
        body:
          "Escríbenos a info@mscontadores.com.co con el asunto \"Protección de Datos Personales\", indicando tu nombre, identificación, la solicitud concreta y una dirección o correo donde podamos responderte. Los términos de respuesta son:",
        i1:
          "Consultas — solicitudes para conocer, acceder o ser informado sobre tus datos: se atienden en un término máximo de diez (10) días hábiles. Si no fuere posible, te informaremos los motivos y atenderemos la consulta dentro de los cinco (5) días hábiles siguientes.",
        i2:
          "Reclamos — solicitudes de corrección, actualización o supresión de datos, o para advertir un presunto incumplimiento: se atienden en un término máximo de quince (15) días hábiles. Si no fuere posible, te informaremos los motivos y atenderemos el reclamo dentro de los ocho (8) días hábiles siguientes. Si el reclamo resulta incompleto, te requeriremos dentro de los cinco (5) días siguientes para que completes la información; transcurridos dos meses sin respuesta, se entenderá desistido.",
      },
      s8: {
        title: "8. Seguridad y conservación",
        body:
          "Aplicamos medidas técnicas, humanas y administrativas razonables para mantener tus datos seguros y evitar accesos no autorizados, pérdidas o alteraciones — incluyendo la transmisión de este sitio web mediante HTTPS y controles de acceso sobre el buzón que recibe los envíos del formulario. Conservamos los mensajes de contacto solo por el tiempo necesario para cumplir las finalidades descritas y los deberes contables y comerciales de conservación aplicables, tras lo cual se eliminan.",
      },
      s9: {
        title: "9. Cookies y almacenamiento local",
        body:
          "Este sitio web no utiliza cookies de publicidad, analítica ni rastreo. Almacena un único valor en el almacenamiento local de tu navegador (`ms_lang`) para recordar si prefieres español o inglés. Ese valor permanece en tu dispositivo, no constituye dato personal, nunca se nos transmite y puedes borrarlo en cualquier momento desde la configuración de tu navegador.",
      },
      s10: {
        title: "10. Cambios en esta política",
        body:
          "Podemos actualizar esta política. Cualquier cambio sustancial se publicará en esta página con una nueva fecha de vigencia y, cuando el cambio afecte las finalidades del tratamiento, solicitaremos nuevamente tu autorización.",
      },
      s11: {
        title: "11. Vigencia",
        body:
          "Esta política rige a partir de la fecha señalada arriba. Los datos personales recolectados a través de este sitio web se conservarán durante el tiempo necesario para cumplir las finalidades descritas en la sección 3 y las obligaciones legales aplicables.",
      },
    },
    footer: {
      tagline: "Contabilidad, impuestos y consultoría financiera en Cartagena, Colombia.",
      rights: "Todos los derechos reservados.",
      contactTitle: "Contacto",
      hoursTitle: "Horario y Ubicación",
      privacy: "Política de Privacidad",
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
