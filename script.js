/* =========================================================
   GLOBAL NAVIGATION
   Used on: ALL pages
   Purpose: Mobile navigation + active link highlight
   ========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

/* Close mobile nav after clicking a link */
if (navLinks) {
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });
}

/* Highlight active nav link */
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach((link) => {
  const linkPage = link.getAttribute("href").split("/").pop();

  if (linkPage === currentPage) {
    link.classList.add("active-link");
  }
});

/* =========================================================
   INDEX.HTML - ATLAS LAYER BUTTONS
   Used on: index.html
   Purpose: Changes layer description when user clicks buttons
   ========================================================= */

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

/* =========================================================
   INDEX.HTML - NEWSLETTER FORM
   Used on: index.html
   Purpose: Demo newsletter signup interaction
   ========================================================= */

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

/* =========================================================
   EPISODES.HTML - SEARCH AND FILTER
   Used on: research-wing/episodes.html
   Purpose: Lets users search and filter episode cards
   ========================================================= */

const episodeSearch = document.getElementById("episodeSearch");
const episodeCards = document.querySelectorAll(".episode-card");
const episodeFilterButtons = document.querySelectorAll("[data-episode-filter]");

let activeEpisodeFilter = "all";

function filterEpisodes() {
  const searchValue = episodeSearch ? episodeSearch.value.toLowerCase() : "";

  episodeCards.forEach((card) => {
    const category = card.dataset.episodeCategory;
    const searchText = card.dataset.search.toLowerCase();

    const matchesFilter =
      activeEpisodeFilter === "all" || category === activeEpisodeFilter;

    const matchesSearch = searchText.includes(searchValue);

    if (matchesFilter && matchesSearch) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}

if (episodeSearch) {
  episodeSearch.addEventListener("input", filterEpisodes);
}

episodeFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeEpisodeFilter = button.dataset.episodeFilter;

    episodeFilterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    filterEpisodes();
  });
});

/* =========================================================
   EPISODE-PROFILE.HTML - SIDEBAR ACTIVE SECTION
   Used on: research-wing/episode-profile.html
   Purpose: Highlights the sidebar link while scrolling
   ========================================================= */

const episodeProfileSections = document.querySelectorAll(".episode-profile-content .atlas-card");
const episodeProfileLinks = document.querySelectorAll(".episode-profile-sidebar a");

function highlightEpisodeSection() {
  let currentSectionId = "";

  episodeProfileSections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  episodeProfileLinks.forEach((link) => {
    link.classList.remove("active-sidebar-link");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active-sidebar-link");
    }
  });
}

if (episodeProfileSections.length && episodeProfileLinks.length) {
  window.addEventListener("scroll", highlightEpisodeSection);
}

/* =========================================================
   PEOPLE.HTML - SEARCH AND FILTER
   Used on: research-wing/people.html
   Purpose: Lets users search and filter people cards
   ========================================================= */

const peopleSearch = document.getElementById("peopleSearch");
const peopleCards = document.querySelectorAll(".person-card");
const peopleFilterButtons = document.querySelectorAll("[data-people-filter]");

let activePeopleFilter = "all";

function filterPeople() {
  const searchValue = peopleSearch ? peopleSearch.value.toLowerCase() : "";

  peopleCards.forEach((card) => {
    const category = card.dataset.peopleCategory;
    const searchText = card.dataset.search.toLowerCase();

    const matchesFilter =
      activePeopleFilter === "all" || category === activePeopleFilter;

    const matchesSearch = searchText.includes(searchValue);

    if (matchesFilter && matchesSearch) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}

if (peopleSearch) {
  peopleSearch.addEventListener("input", filterPeople);
}

peopleFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activePeopleFilter = button.dataset.peopleFilter;

    peopleFilterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    filterPeople();
  });
});

/* =========================================================
   PERSON-PROFILE.HTML - SIDEBAR ACTIVE SECTION
   Used on: research-wing/person-profile.html
   Purpose: Highlights sidebar link while scrolling
   ========================================================= */

const personProfileSections = document.querySelectorAll(".person-profile-content .atlas-card");
const personProfileLinks = document.querySelectorAll(".person-profile-sidebar a");

function highlightPersonSection() {
  let currentSectionId = "";

  personProfileSections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  personProfileLinks.forEach((link) => {
    link.classList.remove("active-sidebar-link");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active-sidebar-link");
    }
  });
}

if (personProfileSections.length && personProfileLinks.length) {
  window.addEventListener("scroll", highlightPersonSection);
}

/* =========================================================
   BOOKS.HTML - SEARCH AND FILTER
   Used on: research-wing/books.html
   Purpose: Lets users search and filter book cards
   ========================================================= */

const bookSearch = document.getElementById("bookSearch");
const bookCards = document.querySelectorAll(".book-card");
const bookFilterButtons = document.querySelectorAll("[data-book-filter]");

let activeBookFilter = "all";

function filterBooks() {
  const searchValue = bookSearch ? bookSearch.value.toLowerCase() : "";

  bookCards.forEach((card) => {
    const category = card.dataset.bookCategory;
    const searchText = card.dataset.search.toLowerCase();

    const matchesFilter =
      activeBookFilter === "all" || category === activeBookFilter;

    const matchesSearch = searchText.includes(searchValue);

    if (matchesFilter && matchesSearch) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}

if (bookSearch) {
  bookSearch.addEventListener("input", filterBooks);
}

bookFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeBookFilter = button.dataset.bookFilter;

    bookFilterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    filterBooks();
  });
});

/* =========================================================
   BOOK-PROFILE.HTML - SIDEBAR ACTIVE SECTION
   Used on: research-wing/book-profile.html
   Purpose: Highlights sidebar link while scrolling
   ========================================================= */

const bookProfileSections = document.querySelectorAll(".book-profile-content .atlas-card");
const bookProfileLinks = document.querySelectorAll(".book-profile-sidebar a");

function highlightBookSection() {
  let currentSectionId = "";

  bookProfileSections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  bookProfileLinks.forEach((link) => {
    link.classList.remove("active-sidebar-link");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active-sidebar-link");
    }
  });
}

if (bookProfileSections.length && bookProfileLinks.length) {
  window.addEventListener("scroll", highlightBookSection);
}

/* =========================================================
   CONCEPTS.HTML - SEARCH AND FILTER
   Used on: research-wing/concepts.html
   Purpose: Lets users search and filter concept cards
   ========================================================= */

const conceptSearch = document.getElementById("conceptSearch");
const conceptCards = document.querySelectorAll(".concept-card");
const conceptFilterButtons = document.querySelectorAll("[data-concept-filter]");

let activeConceptFilter = "all";

function filterConcepts() {
  const searchValue = conceptSearch ? conceptSearch.value.toLowerCase() : "";

  conceptCards.forEach((card) => {
    const category = card.dataset.conceptCategory;
    const searchText = card.dataset.search.toLowerCase();

    const matchesFilter =
      activeConceptFilter === "all" || category === activeConceptFilter;

    const matchesSearch = searchText.includes(searchValue);

    if (matchesFilter && matchesSearch) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}

if (conceptSearch) {
  conceptSearch.addEventListener("input", filterConcepts);
}

conceptFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeConceptFilter = button.dataset.conceptFilter;

    conceptFilterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    filterConcepts();
  });
});


/* =========================================================
   CONCEPT-PROFILE.HTML - SIDEBAR ACTIVE SECTION
   Used on: research-wing/concept-profile.html
   Purpose: Highlights sidebar link while scrolling
   ========================================================= */

const conceptProfileSections = document.querySelectorAll(".concept-profile-content .atlas-card");
const conceptProfileLinks = document.querySelectorAll(".concept-profile-sidebar a");

function highlightConceptSection() {
  let currentSectionId = "";

  conceptProfileSections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  conceptProfileLinks.forEach((link) => {
    link.classList.remove("active-sidebar-link");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active-sidebar-link");
    }
  });
}

if (conceptProfileSections.length && conceptProfileLinks.length) {
  window.addEventListener("scroll", highlightConceptSection);
}

/* =========================================================
   WORLD-MAP.HTML
   The 3D globe now lives in /3d-globe/.
   Files used:
   - 3d-globe/globe-data.js
   - 3d-globe/globe-controls.js
   - 3d-globe/globe.js
   ========================================================= */

/* =========================================================
   LOCATION-PROFILE.HTML - SIDEBAR ACTIVE SECTION
   Used on: exploration-wing/location-profile.html
   Purpose: Highlights sidebar link while scrolling
   ========================================================= */

const locationProfileSections = document.querySelectorAll(".location-profile-content .atlas-card");
const locationProfileLinks = document.querySelectorAll(".location-profile-sidebar a");

function highlightLocationSection() {
  let currentSectionId = "";

  locationProfileSections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  locationProfileLinks.forEach((link) => {
    link.classList.remove("active-sidebar-link");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active-sidebar-link");
    }
  });
}

if (locationProfileSections.length && locationProfileLinks.length) {
  window.addEventListener("scroll", highlightLocationSection);
}



/* =========================================================
   TIMELINE.HTML - SEARCH AND FILTER
   Used on: exploration-wing/timeline.html
   Purpose: Lets users search and filter timeline event cards
   ========================================================= */

const timelineSearch = document.getElementById("timelineSearch");
const timelineCards = document.querySelectorAll(".timeline-event-card");
const timelineFilterButtons = document.querySelectorAll("[data-timeline-filter]");

let activeTimelineFilter = "all";

function filterTimeline() {
  const searchValue = timelineSearch ? timelineSearch.value.toLowerCase() : "";

  timelineCards.forEach((card) => {
    const category = card.dataset.timelineCategory;
    const searchText = card.dataset.search.toLowerCase();

    const matchesFilter =
      activeTimelineFilter === "all" || category === activeTimelineFilter;

    const matchesSearch = searchText.includes(searchValue);

    if (matchesFilter && matchesSearch) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}

if (timelineSearch) {
  timelineSearch.addEventListener("input", filterTimeline);
}

timelineFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeTimelineFilter = button.dataset.timelineFilter;

    timelineFilterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    filterTimeline();
  });
});

/* =========================================================
   TIMELINE-EVENT.HTML - SIDEBAR ACTIVE SECTION
   Used on: exploration-wing/timeline-event.html
   Purpose: Highlights sidebar link while scrolling
   ========================================================= */

const timelineEventSections = document.querySelectorAll(".timeline-event-content .atlas-card");
const timelineEventLinks = document.querySelectorAll(".timeline-event-sidebar a");

function highlightTimelineEventSection() {
  let currentSectionId = "";

  timelineEventSections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  timelineEventLinks.forEach((link) => {
    link.classList.remove("active-sidebar-link");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active-sidebar-link");
    }
  });
}

if (timelineEventSections.length && timelineEventLinks.length) {
  window.addEventListener("scroll", highlightTimelineEventSection);
}

/* =========================================================
   LEARNING-PATHS.HTML - SEARCH AND FILTER
   Used on: learning-wing/learning-paths.html
   Purpose: Lets users search and filter learning path cards
   ========================================================= */

const learningPathSearch = document.getElementById("learningPathSearch");
const learningPathCards = document.querySelectorAll(".learning-path-card");
const learningPathFilterButtons = document.querySelectorAll("[data-path-filter]");

let activeLearningPathFilter = "all";

function filterLearningPaths() {
  const searchValue = learningPathSearch
    ? learningPathSearch.value.toLowerCase()
    : "";

  learningPathCards.forEach((card) => {
    const category = card.dataset.pathCategory;
    const searchText = card.dataset.search.toLowerCase();

    const matchesFilter =
      activeLearningPathFilter === "all" || category === activeLearningPathFilter;

    const matchesSearch = searchText.includes(searchValue);

    if (matchesFilter && matchesSearch) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}

if (learningPathSearch) {
  learningPathSearch.addEventListener("input", filterLearningPaths);
}

learningPathFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeLearningPathFilter = button.dataset.pathFilter;

    learningPathFilterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    filterLearningPaths();
  });
});



/* =========================================================
   LEARNING-PATH-PROFILE.HTML - MODULE PROGRESS
   Used on: learning-wing/learning-path-profile.html
   Purpose: Lets users mark modules complete and updates progress bar
   ========================================================= */

const moduleCards = document.querySelectorAll(".module-card");
const moduleButtons = document.querySelectorAll(".module-toggle-btn");
const pathProgressBar = document.getElementById("pathProgressBar");
const pathProgressText = document.getElementById("pathProgressText");
const startPathBtn = document.getElementById("startPathBtn");

function updatePathProgress() {
  if (!moduleCards.length || !pathProgressBar || !pathProgressText) return;

  const completedModules = document.querySelectorAll(".module-card.complete").length;
  const progressPercent = Math.round((completedModules / moduleCards.length) * 100);

  pathProgressBar.style.width = `${progressPercent}%`;
  pathProgressText.textContent = `${progressPercent}%`;
}

moduleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const moduleCard = button.closest(".module-card");

    if (!moduleCard) return;

    moduleCard.classList.toggle("complete");

    button.textContent = moduleCard.classList.contains("complete")
      ? "Completed ✓"
      : "Mark Complete";

    updatePathProgress();
  });
});

if (startPathBtn) {
  startPathBtn.addEventListener("click", () => {
    startPathBtn.textContent = "Path Started ✓";
  });
}

updatePathProgress();

/* =========================================================
   LEARNING-PATH-PROFILE.HTML - SIDEBAR ACTIVE SECTION
   Used on: learning-wing/learning-path-profile.html
   Purpose: Highlights sidebar link while scrolling
   ========================================================= */

const learningPathSections = document.querySelectorAll(".learning-path-content .atlas-card");
const learningPathLinks = document.querySelectorAll(".learning-path-sidebar a");

function highlightLearningPathSection() {
  let currentSectionId = "";

  learningPathSections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  learningPathLinks.forEach((link) => {
    link.classList.remove("active-sidebar-link");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active-sidebar-link");
    }
  });
}

if (learningPathSections.length && learningPathLinks.length) {
  window.addEventListener("scroll", highlightLearningPathSection);
}


/* =========================================================
   COURSES.HTML - SEARCH AND FILTER
   Used on: learning-wing/courses.html
   Purpose: Lets users search and filter course cards
   ========================================================= */

const courseSearch = document.getElementById("courseSearch");
const courseCards = document.querySelectorAll(".course-card");
const courseFilterButtons = document.querySelectorAll("[data-course-filter]");

let activeCourseFilter = "all";

function filterCourses() {
  const searchValue = courseSearch ? courseSearch.value.toLowerCase() : "";

  courseCards.forEach((card) => {
    const category = card.dataset.courseCategory;
    const searchText = card.dataset.search.toLowerCase();

    const matchesFilter =
      activeCourseFilter === "all" || category === activeCourseFilter;

    const matchesSearch = searchText.includes(searchValue);

    if (matchesFilter && matchesSearch) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}

if (courseSearch) {
  courseSearch.addEventListener("input", filterCourses);
}

courseFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCourseFilter = button.dataset.courseFilter;

    courseFilterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    filterCourses();
  });
});

/* =========================================================
   COURSE-PROFILE.HTML - START BUTTON
   Used on: learning-wing/course-profile.html
   Purpose: Demo course start interaction
   ========================================================= */

const startCourseBtn = document.getElementById("startCourseBtn");

if (startCourseBtn) {
  startCourseBtn.addEventListener("click", () => {
    startCourseBtn.textContent = "Course Started ✓";
  });
}

/* =========================================================
   COURSE-PROFILE.HTML - SIDEBAR ACTIVE SECTION
   Used on: learning-wing/course-profile.html
   Purpose: Highlights sidebar link while scrolling
   ========================================================= */

const courseProfileSections = document.querySelectorAll(".course-profile-content .atlas-card");
const courseProfileLinks = document.querySelectorAll(".course-profile-sidebar a");

function highlightCourseSection() {
  let currentSectionId = "";

  courseProfileSections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  courseProfileLinks.forEach((link) => {
    link.classList.remove("active-sidebar-link");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active-sidebar-link");
    }
  });
}

if (courseProfileSections.length && courseProfileLinks.length) {
  window.addEventListener("scroll", highlightCourseSection);
}

/* =========================================================
   WEEKLY-CHALLENGES.HTML - SEARCH AND FILTER
   Used on: learning-wing/weekly-challenges.html
   Purpose: Lets users search and filter weekly challenge cards
   ========================================================= */

const challengeSearch = document.getElementById("challengeSearch");
const challengeCards = document.querySelectorAll(".weekly-challenge-card");
const challengeFilterButtons = document.querySelectorAll("[data-challenge-filter]");

let activeChallengeFilter = "all";

function filterChallenges() {
  const searchValue = challengeSearch ? challengeSearch.value.toLowerCase() : "";

  challengeCards.forEach((card) => {
    const category = card.dataset.challengeCategory;
    const searchText = card.dataset.search.toLowerCase();

    const matchesFilter =
      activeChallengeFilter === "all" || category === activeChallengeFilter;

    const matchesSearch = searchText.includes(searchValue);

    if (matchesFilter && matchesSearch) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}

if (challengeSearch) {
  challengeSearch.addEventListener("input", filterChallenges);
}

challengeFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeChallengeFilter = button.dataset.challengeFilter;

    challengeFilterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    filterChallenges();
  });
});

/* =========================================================
   WEEKLY-CHALLENGES.HTML - START CHALLENGE BUTTONS
   Used on: learning-wing/weekly-challenges.html
   Purpose: Demo interaction for challenge start buttons
   ========================================================= */

const challengeStartButtons = document.querySelectorAll(".challenge-start-btn");

challengeStartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("started");
    button.textContent = "Challenge Started ✓";
  });
});


/* =========================================================
   JOURNAL-VAULT.HTML - SAVE JOURNAL ENTRY DEMO
   Used on: reflection-wing/journal-vault.html
   Purpose: Adds a new journal card to the saved entries list
   ========================================================= */

const journalForm = document.getElementById("journalForm");
const savedJournalList = document.getElementById("savedJournalList");

if (journalForm && savedJournalList) {
  journalForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("journalTitle").value;
    const category = document.getElementById("journalCategory").value;
    const text = document.getElementById("journalText").value;

    const newEntry = document.createElement("article");
    newEntry.classList.add("saved-journal-card");

    newEntry.innerHTML = `
      <span class="label documented">${category}</span>
      <h3>${title}</h3>
      <p>${text}</p>
    `;

    savedJournalList.prepend(newEntry);
    journalForm.reset();
  });
}

/* =========================================================
   JOURNAL-VAULT.HTML - PROMPT CLICK TO JOURNAL
   Used on: reflection-wing/journal-vault.html
   Purpose: Copies prompt text into the journal title field
   ========================================================= */

const promptCards = document.querySelectorAll(".prompt-card");
const journalTitle = document.getElementById("journalTitle");

promptCards.forEach((prompt) => {
  prompt.addEventListener("click", () => {
    if (journalTitle) {
      journalTitle.value = prompt.textContent;
      journalTitle.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });
});

/* =========================================================
   JOURNAL-VAULT.HTML - SIDEBAR ACTIVE SECTION
   Used on: reflection-wing/journal-vault.html
   Purpose: Highlights sidebar link while scrolling
   ========================================================= */

const journalSections = document.querySelectorAll(".journal-content .atlas-card");
const journalLinks = document.querySelectorAll(".journal-sidebar a");

function highlightJournalSection() {
  let currentSectionId = "";

  journalSections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  journalLinks.forEach((link) => {
    link.classList.remove("active-sidebar-link");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active-sidebar-link");
    }
  });
}

if (journalSections.length && journalLinks.length) {
  window.addEventListener("scroll", highlightJournalSection);
}



/* =========================================================
   JOURNAL-ENTRY.HTML - SIDEBAR ACTIVE SECTION
   Used on: reflection-wing/journal-entry.html
   Purpose: Highlights sidebar link while scrolling
   ========================================================= */

const journalEntrySections = document.querySelectorAll(".journal-entry-content .atlas-card");
const journalEntryLinks = document.querySelectorAll(".journal-entry-sidebar a");

function highlightJournalEntrySection() {
  let currentSectionId = "";

  journalEntrySections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  journalEntryLinks.forEach((link) => {
    link.classList.remove("active-sidebar-link");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active-sidebar-link");
    }
  });
}

if (journalEntrySections.length && journalEntryLinks.length) {
  window.addEventListener("scroll", highlightJournalEntrySection);
}


/* =========================================================
   AI-EPISODE-CHAT.HTML
   Used on: reflection-wing/ai-episode-chat.html
   Purpose: Demo AI interaction
   ========================================================= */

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatWindow = document.getElementById("chatWindow");

const questionButtons =
  document.querySelectorAll(".ai-question-btn");

if (questionButtons.length) {

  questionButtons.forEach((button) => {

    button.addEventListener("click", () => {

      if (chatInput) {
        chatInput.value = button.textContent.trim();
      }

    });

  });

}

if (chatForm && chatInput && chatWindow) {

  chatForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const userQuestion = chatInput.value.trim();

    if (!userQuestion) return;

    /* USER MESSAGE */

    const userMessage = document.createElement("div");

    userMessage.classList.add(
      "chat-message",
      "user-message"
    );

    userMessage.innerHTML = `
      <div class="chat-avatar">👤</div>

      <div class="chat-bubble">
        <strong>You</strong>
        <p>${userQuestion}</p>
      </div>
    `;

    chatWindow.appendChild(userMessage);

    /* AI MESSAGE */

    setTimeout(() => {

      const aiMessage = document.createElement("div");

      aiMessage.classList.add(
        "chat-message",
        "ai-message"
      );

      aiMessage.innerHTML = `
        <div class="chat-avatar">✦</div>

        <div class="chat-bubble">

          <strong>Atlas AI</strong>

          <p>
            This is a prototype response.

            In the full Human Knowledge Atlas system,
            this answer would search connected episodes,
            books, concepts, timeline events, people,
            locations, and source cards before creating
            a fully sourced response.
          </p>

        </div>
      `;

      chatWindow.appendChild(aiMessage);

      chatWindow.scrollTop =
        chatWindow.scrollHeight;

    }, 700);

    chatInput.value = "";

    chatWindow.scrollTop =
      chatWindow.scrollHeight;

  });

}


/* =========================================================
   COMMUNITY.HTML
   Used on: community-wing/community.html
   Purpose: Community interactions
   ========================================================= */

const communityButtons =
  document.querySelectorAll(".community-join-btn");

communityButtons.forEach((button) => {

  button.addEventListener("click", () => {

    button.textContent =
      "Joined ✓";

    button.disabled = true;

  });

});


/* =========================================================
   NEWSLETTER.HTML
   Used on: community-wing/newsletter.html
   Purpose: Newsletter signup demo
   ========================================================= */

const newsletterPageForm = document.getElementById("newsletterPageForm");
const newsletterMessage = document.getElementById("newsletterMessage");

if (newsletterPageForm && newsletterMessage) {
  newsletterPageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    newsletterMessage.textContent =
      "Subscribed in demo mode ✓";

    newsletterPageForm.reset();
  });
}

/* =========================================================
   NEWSLETTER-ARCHIVE.HTML
   Used on: community-wing/newsletter-archive.html
   Purpose: Search and filter newsletter archive issues
   ========================================================= */

const newsletterArchiveSearch = document.getElementById("newsletterArchiveSearch");
const newsletterArchiveCards = document.querySelectorAll(".newsletter-archive-card");
const newsletterFilterButtons = document.querySelectorAll("[data-newsletter-filter]");

let activeNewsletterFilter = "all";

function filterNewsletterArchive() {
  const searchValue = newsletterArchiveSearch
    ? newsletterArchiveSearch.value.toLowerCase()
    : "";

  newsletterArchiveCards.forEach((card) => {
    const category = card.dataset.newsletterCategory;
    const searchText = card.dataset.search.toLowerCase();

    const matchesFilter =
      activeNewsletterFilter === "all" || category === activeNewsletterFilter;

    const matchesSearch = searchText.includes(searchValue);

    if (matchesFilter && matchesSearch) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}

if (newsletterArchiveSearch) {
  newsletterArchiveSearch.addEventListener("input", filterNewsletterArchive);
}

newsletterFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeNewsletterFilter = button.dataset.newsletterFilter;

    newsletterFilterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    filterNewsletterArchive();
  });
});

/* =========================================================
   NEWSLETTER-ISSUE.HTML - SIDEBAR ACTIVE SECTION
   Used on: community-wing/newsletter-issue.html
   Purpose: Highlights sidebar link while scrolling
   ========================================================= */

const newsletterIssueSections = document.querySelectorAll(".newsletter-issue-content .atlas-card");
const newsletterIssueLinks = document.querySelectorAll(".newsletter-issue-sidebar a");

function highlightNewsletterIssueSection() {
  let currentSectionId = "";

  newsletterIssueSections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  newsletterIssueLinks.forEach((link) => {
    link.classList.remove("active-sidebar-link");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active-sidebar-link");
    }
  });
}

if (newsletterIssueSections.length && newsletterIssueLinks.length) {
  window.addEventListener("scroll", highlightNewsletterIssueSection);
}

/* =========================================================
   BLOG.HTML
   Used on: community-wing/blog.html
   Purpose: Search and filter blog posts
   ========================================================= */

const blogSearch = document.getElementById("blogSearch");
const blogCards = document.querySelectorAll(".blog-card");
const blogFilterButtons = document.querySelectorAll("[data-blog-filter]");

let activeBlogFilter = "all";

function filterBlogPosts() {
  const searchValue = blogSearch ? blogSearch.value.toLowerCase() : "";

  blogCards.forEach((card) => {
    const category = card.dataset.blogCategory;
    const searchText = card.dataset.search.toLowerCase();

    const matchesFilter =
      activeBlogFilter === "all" || category === activeBlogFilter;

    const matchesSearch = searchText.includes(searchValue);

    if (matchesFilter && matchesSearch) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}

if (blogSearch) {
  blogSearch.addEventListener("input", filterBlogPosts);
}

blogFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeBlogFilter = button.dataset.blogFilter;

    blogFilterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    filterBlogPosts();
  });
});

/* =========================================================
   BLOG-POST.HTML - SIDEBAR ACTIVE SECTION
   Used on: community-wing/blog-post.html
   Purpose: Highlights sidebar link while scrolling
   ========================================================= */

const blogPostSections = document.querySelectorAll(".blog-post-content .atlas-card");
const blogPostLinks = document.querySelectorAll(".blog-post-sidebar a");

function highlightBlogPostSection() {
  let currentSectionId = "";

  blogPostSections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  blogPostLinks.forEach((link) => {
    link.classList.remove("active-sidebar-link");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active-sidebar-link");
    }
  });
}

if (blogPostSections.length && blogPostLinks.length) {
  window.addEventListener("scroll", highlightBlogPostSection);
}

/* =========================================================
   MEMBERSHIP.HTML
   Used on: business/membership.html
   Purpose: Membership button demo
   ========================================================= */

const membershipButtons = document.querySelectorAll(".membership-btn");

membershipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.tagName.toLowerCase() === "button") {
      button.textContent = "Selected ✓";
    }
  });
});

/* =========================================================
   CONTACT.HTML
   Used on: business/contact.html
   Purpose: Contact form demo
   ========================================================= */

const contactForm = document.getElementById("contactForm");
const contactMessageStatus = document.getElementById("contactMessageStatus");

if (contactForm && contactMessageStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    contactMessageStatus.textContent =
      "Message sent in demo mode ✓";

    contactForm.reset();
  });
}


/* =========================================================
   SUBMIT-SOURCE.HTML
   Used on: business/submit-source.html
   Purpose: Source submission demo
   ========================================================= */

const sourceSubmitForm = document.getElementById("sourceSubmitForm");
const sourceSubmitMessage = document.getElementById("sourceSubmitMessage");

if (sourceSubmitForm && sourceSubmitMessage) {
  sourceSubmitForm.addEventListener("submit", (event) => {
    event.preventDefault();

    sourceSubmitMessage.textContent =
      "Source submitted in demo mode ✓";

    sourceSubmitForm.reset();
  });
}

/* =========================================================
   EDITORIAL-STANDARDS.HTML
   Used on: legal/editorial-standards.html
   Purpose: Highlight standards as user reads
   ========================================================= */

const editorialCards =
  document.querySelectorAll(".editorial-layout .atlas-card");

if (editorialCards.length) {

  const editorialObserver =
    new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.style.borderColor =
            "rgba(97,214,162,.55)";

        }

      });

    }, {
      threshold: 0.5
    });

  editorialCards.forEach((card) => {
    editorialObserver.observe(card);
  });

}

/* =========================================================
   PRIVACY-POLICY.HTML
   Used on: legal/privacy-policy.html
   Purpose: Animate policy cards on scroll
   ========================================================= */

const privacyCards =
  document.querySelectorAll(".privacy-layout .atlas-card");

if (privacyCards.length) {

  const privacyObserver =
    new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.style.transform =
            "translateY(0px)";

          entry.target.style.opacity = "1";

        }

      });

    }, {
      threshold: 0.15
    });

  privacyCards.forEach((card) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(25px)";
    card.style.transition =
      "all .5s ease";

    privacyObserver.observe(card);

  });

}


/* =========================================================
   TERMS-OF-SERVICE.HTML
   Used on: legal/terms-of-service.html
   Purpose: Animate terms cards on scroll
   ========================================================= */

const termsCards =
  document.querySelectorAll(".terms-layout .atlas-card");

if (termsCards.length) {
  const termsObserver =
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transform = "translateY(0px)";
          entry.target.style.opacity = "1";
        }
      });
    }, {
      threshold: 0.15
    });

  termsCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(25px)";
    card.style.transition = "all .5s ease";

    termsObserver.observe(card);
  });
}

