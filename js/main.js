document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => mainNav.classList.remove("is-open"));
    });
  }

  // Sticky header shadow on scroll
  const header = document.querySelector(".site-header");
  if (header) {
    const updateHeaderShadow = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    updateHeaderShadow();
    window.addEventListener("scroll", updateHeaderShadow, { passive: true });
  }

  // Highlight the active nav link based on the current page
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) link.classList.add("active");
  });

  // Reveal-on-scroll animation
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // Footer year
  const yearEl = document.querySelector("#current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form — submits to Web3Forms via fetch so we can show an
  // inline status message instead of navigating away to their API response.
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    const statusEl = contactForm.querySelector(".form-status");
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const currentLang = () => document.documentElement.lang || "es";
    const setStatus = (key) => {
      statusEl.setAttribute("data-i18n", `contact.form.${key}`);
      statusEl.setAttribute("data-state", key);
      statusEl.textContent = getTranslation(currentLang(), `contact.form.${key}`);
    };

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      submitBtn.disabled = true;
      setStatus("sending");

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(contactForm),
        });
        const result = await response.json();
        if (result.success) {
          setStatus("success");
          contactForm.reset();
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
});
