/*
 * RAÚL RUIZ MORATALLA — main.js v20260601
 * IIFE pattern — NO import/export, compatible with file:// y cualquier hosting
 * Funciona sin GSAP (CSS primary); GSAP enriquece si está disponible.
 */

(function () {
  "use strict";

  /* ─── Helpers ─────────────────────────────────────── */
  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.from((scope || document).querySelectorAll(sel)); };
  var fineHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduced   = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Wrap every init in safe() so one failure doesn't cascade */
  function safe(fn, name) {
    try { fn(); }
    catch (e) { console.warn("[" + name + "] error:", e); }
  }

  /* ─── 1. SPLASH ────────────────────────────────────── */
  function initSplash() {
    var splash = $("[data-splash]");
    if (!splash) return;

    var hide = function () {
      if (splash.classList.contains("is-out")) return;
      splash.classList.add("is-out");
    };

    /* Hide when page is fully loaded */
    if (document.readyState === "complete") {
      setTimeout(hide, 600);
    } else {
      window.addEventListener("load", function () { setTimeout(hide, 400); });
    }

    /* JS safety: 4000ms max */
    setTimeout(hide, 4000);
  }

  /* ─── 2. NAV scroll state + active section ─────────── */
  function initNav() {
    var nav    = $(".nav");
    var burger = $(".nav-burger");
    var menu   = $(".mobile-menu");
    if (!nav) return;

    /* Scroll → solidify nav */
    function onScroll() {
      if (window.scrollY > 60) {
        nav.classList.add("is-scrolled");
      } else {
        nav.classList.remove("is-scrolled");
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Burger toggle */
    if (burger && menu) {
      burger.addEventListener("click", function () {
        var open = burger.classList.toggle("is-open");
        menu.classList.toggle("is-open", open);
        burger.setAttribute("aria-expanded", open);
        menu.setAttribute("aria-hidden", !open);
      });

      /* Close menu on link click */
      $$(".mobile-link", menu).forEach(function (link) {
        link.addEventListener("click", function () {
          burger.classList.remove("is-open");
          menu.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
          menu.setAttribute("aria-hidden", "true");
        });
      });
    }

    /* Active nav link via IntersectionObserver */
    var navLinks = $$(".nav-link");
    var sections = $$("section[id]");

    if ("IntersectionObserver" in window && sections.length) {
      var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            navLinks.forEach(function (link) {
              var href = link.getAttribute("href");
              link.classList.toggle("is-active", href === "#" + id);
            });
          }
        });
      }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

      sections.forEach(function (s) { sectionObserver.observe(s); });
    }
  }

  /* ─── 3. SMOOTH ANCHOR SCROLL ──────────────────────── */
  function setupSmoothScroll() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navOffset = 80;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - navOffset,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  }

  /* ─── 4. REVEAL ANIMATIONS (IntersectionObserver) ──── */
  function initReveals() {
    var reveals = $$(".reveal");
    if (!reveals.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.01,
      rootMargin: "0px 0px -4% 0px"
    });

    reveals.forEach(function (el) { io.observe(el); });

    /* 6s safety: force-reveal anything still hidden in viewport */
    setTimeout(function () {
      reveals.forEach(function (el) {
        if (!el.classList.contains("is-visible")) {
          var rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight + 200) {
            el.classList.add("is-visible");
          }
        }
      });
    }, 6000);
  }

  /* ─── 5. MOUSE-REACTIVE GRADIENT ───────────────────── */
  function initMouseGradient() {
    if (!fineHover) return;
    var grad = $("[data-mouse-gradient]");
    if (!grad) return;

    var targetX = 30, targetY = 60;
    var currentX = 30, currentY = 60;
    var rAF = null;

    document.addEventListener("mousemove", function (e) {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    });

    function tick() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      document.documentElement.style.setProperty("--mx", currentX.toFixed(2) + "%");
      document.documentElement.style.setProperty("--my", currentY.toFixed(2) + "%");
      rAF = requestAnimationFrame(tick);
    }
    tick();
  }

  /* ─── 6. CUSTOM CURSOR ──────────────────────────────── */
  function initCursor() {
    if (!fineHover) return;
    var cursor = $(".cursor");
    var ring   = $(".cursor-ring");
    var dot    = $(".cursor-dot");
    var label  = $(".cursor-label");
    if (!cursor || !ring) return;

    var rx = 0, ry = 0;
    var cx = 0, cy = 0;
    var firstMove = false;

    window.addEventListener("mousemove", function (e) {
      cx = e.clientX;
      cy = e.clientY;

      /* Position dot immediately */
      if (dot) {
        dot.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
      }

      if (!firstMove) {
        firstMove = true;
        rx = cx; ry = cy;
        ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
        cursor.classList.add("is-ready");
      }
    });

    /* Smooth ring follow */
    function ringTick() {
      rx += (cx - rx) * 0.12;
      ry += (cy - ry) * 0.12;
      ring.style.transform = "translate3d(" + rx.toFixed(2) + "px," + ry.toFixed(2) + "px,0)";
      requestAnimationFrame(ringTick);
    }
    ringTick();

    /* Hover state on interactive elements */
    var HOVERABLE = 'a, button, [data-cursor-label], input, textarea, select, label';
    var LABELS = { download: "download", view: "view", open: "open", terminal: "terminal" };

    document.addEventListener("mouseover", function (e) {
      var el = e.target.closest(HOVERABLE);
      if (!el) return;
      cursor.classList.add("is-hovering");
      var lbl = el.getAttribute("data-cursor-label") || "";
      if (lbl && label) {
        label.textContent = LABELS[lbl] || lbl;
        cursor.classList.add("has-label");
      }
    });

    document.addEventListener("mouseout", function (e) {
      var el = e.target.closest(HOVERABLE);
      if (!el) return;
      /* Only remove if not entering another hoverable */
      if (!e.relatedTarget || !e.relatedTarget.closest(HOVERABLE)) {
        cursor.classList.remove("is-hovering", "has-label");
        if (label) label.textContent = "";
      }
    });
  }

  /* ─── 7. MARQUEE (populate from manifest + ensure loop) */
  function initMarquee() {
    var data = window.__CV_DATA__;
    if (!data || !data.marqueeItems) return;

    /* Rebuild marquee from data */
    var trackInners = $$(".marquee-inner");
    var items = data.marqueeItems;

    trackInners.forEach(function (inner) {
      var html = items.map(function (item) {
        return '<span class="marquee-item">' + escapeHTML(item) + '</span>' +
               '<span class="marquee-sep" aria-hidden="true">◆</span>';
      }).join("");
      inner.innerHTML = html;
    });
  }

  /* ─── 8. REBOOT BUTTON ─────────────────────────────── */
  function initReboot() {
    var btn = $("#reboot-btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* ─── 9. CONTACT FORM ──────────────────────────────── */
  function initContactForm() {
    var form = $("#contact-form");
    if (!form) return;

    var data = window.__CV_DATA__;
    var endpoint = data && data.contact && data.contact.formspreeEndpoint;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var submitBtn = form.querySelector(".form-submit");
      var originalHTML = submitBtn ? submitBtn.innerHTML : "";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-icon">⟳</span><span>Enviando...</span>';
      }

      if (endpoint) {
        /* Real submit via Formspree */
        var formData = new FormData(form);
        var body = {};
        formData.forEach(function (val, key) { body[key] = val; });

        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(body)
        })
        .then(function (res) {
          if (res.ok) { onSuccess(); }
          else { onError(); }
        })
        .catch(onError);
      } else {
        /* No endpoint: open mailto fallback */
        var name    = form.querySelector("#f-name")  ? form.querySelector("#f-name").value  : "";
        var email   = form.querySelector("#f-email") ? form.querySelector("#f-email").value : "";
        var message = form.querySelector("#f-msg")   ? form.querySelector("#f-msg").value   : "";
        var subject = encodeURIComponent("Contacto desde portfolio — " + name);
        var body2   = encodeURIComponent("De: " + name + " (" + email + ")\n\n" + message);
        var mailto  = "mailto:raulruizmoratalla@gmail.com?subject=" + subject + "&body=" + body2;
        window.location.href = mailto;

        setTimeout(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;
          }
        }, 2000);
        return;
      }

      function onSuccess() {
        form.reset();
        if (submitBtn) {
          submitBtn.innerHTML = '<span class="btn-icon">✓</span><span>¡Enviado!</span>';
          submitBtn.style.background = "var(--accent)";
          submitBtn.style.color = "var(--bg)";
          setTimeout(function () {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;
            submitBtn.removeAttribute("style");
          }, 3500);
        }
      }

      function onError() {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHTML;
        }
        alert("No se pudo enviar el mensaje. Por favor, escríbeme directamente a raulruizmoratalla@gmail.com");
      }
    });
  }

  /* ─── 10. GSAP progressive enhancement ─────────────── */
  function initGSAP() {
    if (!window.gsap || !window.ScrollTrigger) return;

    try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}

    /* Section titles parallax on scroll */
    $$(".section-num").forEach(function (el) {
      gsap.fromTo(el,
        { y: -20 },
        {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest(".section"),
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        }
      );
    });

    /* Hero title letter stagger */
    var heroTitle = $(".hero-title");
    if (heroTitle) {
      /* Already visible via CSS animation — GSAP just polishes */
    }

    /* Skill clusters stagger on reveal */
    $$(".skill-cluster").forEach(function (el, i) {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }

  /* ─── 11. KEYBOARD NAV for mobile menu ─────────────── */
  function initA11y() {
    /* ESC closes mobile menu */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        var burger = $(".nav-burger");
        var menu   = $(".mobile-menu");
        if (burger && menu && menu.classList.contains("is-open")) {
          burger.classList.remove("is-open");
          menu.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
          menu.setAttribute("aria-hidden", "true");
          burger.focus();
        }
      }
    });
  }

  /* ─── 12. POPULATE page from manifest ──────────────── */
  function mountFromManifest() {
    var d = window.__CV_DATA__;
    if (!d) return;

    /* Update page title and meta if needed */
    if (d.name) {
      document.title = d.name + " — TI & Systems Engineer";
    }

    /* Update all mailto links */
    if (d.email) {
      $$('a[href^="mailto:raulruizmoratalla"]').forEach(function (a) {
        a.href = "mailto:" + d.email;
      });
    }

    /* Update GitHub links */
    if (d.github) {
      $$('a[href*="github.com/raulruizmoratalla"]').forEach(function (a) {
        a.href = d.github;
      });
    }

    /* Update LinkedIn links */
    if (d.linkedin) {
      $$('a[href*="linkedin.com/in/raulruizmoratalla"]').forEach(function (a) {
        a.href = d.linkedin;
      });
    }

    /* CV download links */
    if (d.cvFile) {
      $$('a[download][href*="cv-raul"]').forEach(function (a) {
        a.href = d.cvFile;
      });
    }
  }

  /* ─── Helper: HTML escape ───────────────────────────── */
  function escapeHTML(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }

  /* ═══════════════════════════════════════════════════
     BOOT SEQUENCE
  ═══════════════════════════════════════════════════ */
  function boot() {
    /* Populate from manifest (idempotent, no DOM side-effects) */
    safe(mountFromManifest, "mountFromManifest");

    /* Core UI */
    safe(initSplash,        "initSplash");
    safe(initNav,           "initNav");
    safe(setupSmoothScroll, "setupSmoothScroll");
    safe(initReveals,       "initReveals");
    safe(initReboot,        "initReboot");
    safe(initA11y,          "initA11y");

    /* Visual enhancements (hover-only) */
    if (fineHover) {
      safe(initCursor,       "initCursor");
      safe(initMouseGradient,"initMouseGradient");
    }

    /* Marquee */
    safe(initMarquee, "initMarquee");

    /* Contact form */
    safe(initContactForm, "initContactForm");

    /* GSAP progressive enhancement */
    safe(initGSAP, "initGSAP");

    /* Mark page as ready */
    document.documentElement.classList.add("is-ready");
  }

  /* Fire boot on DOMContentLoaded or immediately if already parsed */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

})();
