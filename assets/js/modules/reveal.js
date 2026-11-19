import { SELECTORS, shouldLimitMotion } from "./config.js";

// Muestra elementos con clase .reveal y anima contadores cuando entran al viewport.
export function initReveal() {
  const revealElements = document.querySelectorAll(SELECTORS.reveal);
  const animatedCounters = new WeakSet();

  const setCounterValue = (counter, value) => {
    counter.textContent = value.toLocaleString("es-CO");
  };

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.counter);
    if (!Number.isFinite(target)) return;

    if (shouldLimitMotion) {
      setCounterValue(counter, target);
      return;
    }

    const duration = 1300;
    const start = performance.now();

    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounterValue(counter, Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCounterValue(counter, target);
      }
    };

    requestAnimationFrame(update);
  };

  const reveal = (element) => {
    element.classList.add("visible");

    element.querySelectorAll("[data-counter]").forEach((counter) => {
      if (animatedCounters.has(counter)) return;
      animatedCounters.add(counter);
      animateCounter(counter);
    });
  };

  revealElements.forEach((element, index) => {
    element.style.setProperty("--delay", `${Math.min(index * 55, 300)}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}
