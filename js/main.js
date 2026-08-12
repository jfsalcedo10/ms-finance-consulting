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

  // The dark panel under the hero starts inset and rounded, then expands to
  // full-bleed as it scrolls in — so the strip at the fold reads as a panel,
  // and the section reads as a section once you are looking at it.
  //
  // Progress is derived from the panel's own position rather than a fixed
  // scroll distance, so it behaves the same whatever the hero's height works
  // out to on a given screen.
  const panel = document.querySelector(".hero + .section-alt");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (panel && !reducedMotion.matches) {
    const INSET_MAX = 22;
    const RADIUS_MAX = 22;
    let queued = false;

    const applyPanel = () => {
      queued = false;
      const top = panel.getBoundingClientRect().top;
      // 0 when the panel's top edge sits at the bottom of the viewport,
      // 1 by the time it has risen to within 15% of the top.
      const span = window.innerHeight * 0.85;
      const progress = Math.min(Math.max((window.innerHeight - top) / span, 0), 1);
      const remaining = 1 - progress;
      panel.style.setProperty("--panel-inset", `${(INSET_MAX * remaining).toFixed(2)}px`);
      panel.style.setProperty("--panel-radius", `${(RADIUS_MAX * remaining).toFixed(2)}px`);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(applyPanel);
    };

    applyPanel();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
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
        // Move focus into the menu so keyboard/screen-reader users can
        // actually reach the options — a real WCAG 2.1.1 gap when this only
        // opened visually. Deferred: the menu's `visibility: hidden` is part
        // of a CSS transition (see .lang-select-menu), and browsers don't
        // resolve that transition's computed value synchronously — not even
        // after a forced reflow or a requestAnimationFrame tick. A short
        // delay (well under human perception, but past that resolution
        // point) is what reliably makes the link focusable; verified
        // empirically, not a guess. Do not "simplify" this back to a
        // synchronous focus() call — that silently does nothing.
        // Focus the language you are on, not the first item — otherwise the
        // focus ring always lands on English and reads as "English is
        // selected" no matter which version you are reading.
        const current = select.querySelector('.lang-select-menu a[aria-current="true"]');
        setTimeout(() => (current || links[0])?.focus(), 60);
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
