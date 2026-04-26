/**
 * Toc — Table of Contents generator for BlauwFilms
 * https://github.com/blauwfilms/toc
 *
 * Usage:
 *   new Toc(textSource, targetDiv, headingTypes, indentSize);
 *
 * Example:
 *   new Toc("rich-text-blauw-films", "toc-wrapper", ["h2"], 0);
 *
 * Parameters:
 *   textSource   {string}   CSS class name of the element(s) containing your rich text
 *   targetDiv    {string}   CSS class name of the element where the TOC will be rendered
 *   headingTypes {string[]} Array of heading tags to include, e.g. ["h2"] or ["h2", "h3"]
 *   indentSize   {number}   Pixels to indent each heading level (0 = all flush left)
 */
class Toc {
  constructor(
    textSource,
    targetDiv,
    headingTypes = ["h1", "h2", "h3", "h4", "h5", "h6"],
    indentSize = 0
  ) {
    this.textSource = textSource;
    this.targetDiv = targetDiv;
    this.headingTypes = headingTypes;
    this.indentSize = indentSize;

    if (!textSource || !targetDiv) {
      throw new Error("Both a text source and a target div are required.");
    }

    this.generate();
  }

  generate() {
    const sources = document.querySelectorAll(`.${this.textSource}`);
    const target = document.querySelector(`.${this.targetDiv}`);

    if (!target) {
      console.warn(`[Toc] Target element ".${this.targetDiv}" not found.`);
      return;
    }

    const headings = [];
    let count = 0;

    sources.forEach((div) => {
      div.querySelectorAll(this.headingTypes.join(",")).forEach((heading) => {
        const id = `toc-h${count++}`;
        heading.id = id;
        headings.push({ id, heading });
      });
    });

    if (headings.length === 0) {
      target.innerHTML = "";
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "toc";

    headings.forEach(({ id, heading }) => {
      const level = parseInt(heading.tagName.substring(1)) - 1;
      const item = document.createElement("div");
      item.className = `toc-item toc-item-${id}`;
      item.style.marginLeft = `${level * this.indentSize}px`;

      const link = document.createElement("a");
      link.href = `#${id}`;
      link.className = `toc-heading toc-h${level}`;
      link.textContent = heading.textContent;

      item.appendChild(link);
      wrapper.appendChild(item);
    });

    target.innerHTML = "";
    target.appendChild(wrapper);

    // Highlight active heading on scroll
    this._initActiveTracking(headings);
  }

_initActiveTracking(headings) {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = document.querySelector(`.toc-item-${entry.target.id}`);
          if (item) {
            if (entry.isIntersecting) {
              document.querySelectorAll(".toc-item").forEach((el) => el.classList.remove("toc-item-active"));
              item.classList.add("toc-item-active");
            }
          }
        });
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }
}
