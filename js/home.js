/* =========================================================
   HOME.JS
   Used on: index.html
   Purpose: Interactive homepage layers + newsletter demo
   ========================================================= */

/* Atlas Layer Buttons */
const layerButtons = document.querySelectorAll(".layer-pill");
const layerOutput = document.getElementById("layerOutput");

const layerDescriptions = {
  summary:
    "Summary turns a long episode into a clean learning guide with key ideas, questions, and takeaways.",

  timeline:
    "Timeline shows historical events in order so users can understand what happened before, during, and after an episode topic.",

  map:
    "World Map lets users explore places connected to episodes, people, books, history, and ideas. The full page will use an interactive 3D globe.",

  books:
    "Books connect podcast conversations to deeper reading paths, source cards, and related authors.",

  people:
    "People profiles connect guests, authors, researchers, journalists, and historical figures across episodes.",

  concepts:
    "Concepts explain major ideas in simple language and connect them to episodes, books, events, and learning paths.",

  episodes:
    "Episodes become research dashboards with summaries, maps, timelines, people, books, claims, and journal prompts.",

  connections:
    "Connections show how people, places, events, books, and concepts link together across the entire Atlas."
};

layerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedLayer = button.dataset.layer;

    layerButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    if (layerOutput && layerDescriptions[selectedLayer]) {
      layerOutput.textContent = layerDescriptions[selectedLayer];
    }
  });
});

/* Newsletter Demo */
const homeNewsletterForm = document.getElementById("homeNewsletterForm");

if (homeNewsletterForm) {
  homeNewsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = homeNewsletterForm.querySelector("input");

    if (input) {
      input.value = "";
      input.placeholder = "Subscribed in demo mode ✓";
    }
  });
}