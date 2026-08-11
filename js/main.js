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
    // Strings are baked into the form per language at build time, so this
    // file has no dependency on the translation layer.
    const MESSAGES = {
      sending: contactForm.dataset.msgSending,
      success: contactForm.dataset.msgSuccess,
      error: contactForm.dataset.msgError,
    };
    const setStatus = (key) => {
      statusEl.setAttribute("data-state", key);
      statusEl.textContent = MESSAGES[key] || "";
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

  // Language dropdown. The menu items are now real links (the URL carries the
  // language), so this only handles open/close and keyboard navigation.
  const closeLangSelect = (select, { returnFocus } = {}) => {
    const wasOpen = select.classList.contains("is-open");
    select.classList.remove("is-open");
    const toggle = select.querySelector(".lang-select-toggle");
    toggle.setAttribute("aria-expanded", "false");
    if (returnFocus && wasOpen) toggle.focus();
  };

  document.querySelectorAll(".lang-select").forEach((select) => {
    const toggle = select.querySelector(".lang-select-toggle");
    const links = Array.from(select.querySelectorAll(".lang-select-menu a"));

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      if (select.classList.contains("is-open")) {
        closeLangSelect(select);
      } else {
        select.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        if (links[0]) links[0].focus();
      }
    });

    links.forEach((link, index) => {
      link.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          links[(index + 1) % links.length].focus();
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          links[(index - 1 + links.length) % links.length].focus();
        } else if (event.key === "Escape") {
          closeLangSelect(select, { returnFocus: true });
        }
      });
    });

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
      document
        .querySelectorAll(".lang-select.is-open")
        .forEach((select) => closeLangSelect(select, { returnFocus: true }));
    }
  });
});
