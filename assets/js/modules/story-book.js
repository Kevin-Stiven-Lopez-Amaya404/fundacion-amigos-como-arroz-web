import { SELECTORS } from "./config.js";

// Controla el libro 3D de la historia institucional.
export function initStoryBook() {
  document.querySelectorAll(SELECTORS.storyBook).forEach((book) => {
    const pagesHost = book.querySelector(".story-book-pages");
    const pages = Array.from(book.querySelectorAll(SELECTORS.storyPage)).map((page) => ({
      className: page.className,
      content: page.innerHTML
    }));
    const prevButton = book.querySelector(SELECTORS.storyPrev);
    const nextButton = book.querySelector(SELECTORS.storyNext);
    const status = book.querySelector(SELECTORS.storyStatus);

    if (!pagesHost || !pages.length || !prevButton || !nextButton || !status) return;

    let currentLocation = 0;
    const maxLocation = Math.ceil(pages.length / 2);

    const createFace = (side, page) => {
      const face = document.createElement("div");
      face.className = `story-book-face story-book-face--${side}`;

      const content = document.createElement("article");
      content.className = page ? page.className : "story-book-page story-book-page--empty";
      content.innerHTML = page
        ? page.content
        : '<span class="story-page-number">Fin</span><h3>Gracias por leer</h3><p>Esta historia sigue creciendo con cada niño, joven, familia y aliado que se suma a la misión.</p>';

      face.appendChild(content);
      return face;
    };

    const getVisibleLabel = () => {
      if (currentLocation === 0) return `Portada de ${pages.length} páginas`;

      const firstVisible = Math.min(currentLocation * 2, pages.length);
      const secondVisible = Math.min(firstVisible + 1, pages.length);
      return firstVisible === secondVisible
        ? `Página ${firstVisible} de ${pages.length}`
        : `Páginas ${firstVisible} y ${secondVisible} de ${pages.length}`;
    };

    const renderBook = () => {
      pagesHost.innerHTML = '<div class="story-book-spine" aria-hidden="true"></div>';

      for (let index = 0; index < pages.length; index += 2) {
        const paperIndex = index / 2;
        const paper = document.createElement("div");
        paper.className = "story-book-paper";
        paper.style.zIndex = String(maxLocation - paperIndex);

        if (paperIndex < currentLocation) {
          paper.classList.add("is-flipped");
        }

        const front = createFace("front", pages[index]);
        const back = createFace("back", pages[index + 1]);
        // Visibles: el reverso de la hoja anterior (izquierda) y el frente de la actual (derecha).
        front.inert = paperIndex !== currentLocation;
        back.inert = paperIndex !== currentLocation - 1;
        paper.append(front, back);
        pagesHost.appendChild(paper);
      }

      pagesHost.classList.toggle("is-open", currentLocation > 0);
      prevButton.disabled = currentLocation === 0;
      nextButton.disabled = currentLocation === maxLocation;
      status.textContent = getVisibleLabel();
    };

    prevButton.addEventListener("click", () => {
      currentLocation = Math.max(0, currentLocation - 1);
      renderBook();
    });

    nextButton.addEventListener("click", () => {
      currentLocation = Math.min(maxLocation, currentLocation + 1);
      renderBook();
    });

    renderBook();
  });
}
