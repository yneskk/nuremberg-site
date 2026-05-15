const zones = document.querySelectorAll(".zone");
const infoCard = document.getElementById("infoCard");

const introScreen = document.getElementById("introScreen");
const startButton = document.getElementById("startButton");

const factLayer = document.getElementById("factLayer");
const factPanel = document.getElementById("factPanel");
const factTitle = document.getElementById("factTitle");
const factIntro = document.getElementById("factIntro");
const factOptions = document.getElementById("factOptions");

const collectedNotes = new Set();
const maxNotes = 6;

const articleButton = document.getElementById("articleButton");
const articleModal = document.getElementById("articleModal");
const closeArticle = document.getElementById("closeArticle");
const articleText = document.getElementById("articleText");

startButton.addEventListener("click", () => {
  introScreen.classList.add("hidden");
});

function updateProgress() {
  const progressText = document.getElementById("progressText");
  const notebookCount = document.getElementById("notebookCount");

  if (progressText) {
    progressText.textContent = `Записано: ${collectedNotes.size}/${maxNotes}`;
  }

  if (notebookCount) {
    notebookCount.textContent = collectedNotes.size;
  }
}

function updateNotebook() {
  const notesList = document.getElementById("notesList");

  if (collectedNotes.size === 0) {
    notesList.innerHTML = "<li>Пока заметок нет.</li>";
  } else {
    notesList.innerHTML = "";

    collectedNotes.forEach((note) => {
      const li = document.createElement("li");
      li.textContent = note;
      notesList.appendChild(li);
    });
  }

  if (articleButton) {
    if (collectedNotes.size >= maxNotes) {
      articleButton.disabled = false;
      articleButton.textContent = "Собрать статью";
    } else {
      articleButton.disabled = true;
      articleButton.textContent = `Собрать статью (${collectedNotes.size}/${maxNotes})`;
    }
  }
}

function showFacts(zone) {
  factLayer.classList.add("open");

  factTitle.textContent = zone.dataset.title;
  factIntro.textContent = "Выберите факт, который хотите записать в блокнот.";

  const facts = [
    zone.dataset.fact1,
    zone.dataset.fact2,
    zone.dataset.fact3
  ];

  factOptions.innerHTML = "";

  facts.forEach((fact) => {
    const button = document.createElement("button");
    button.className = "fact-button";
    button.textContent = fact;

    if (collectedNotes.has(fact)) {
      button.classList.add("used");
      button.textContent = "✓ " + fact;
    }

    button.addEventListener("click", () => {
      if (collectedNotes.has(fact)) return;

      if (collectedNotes.size >= maxNotes) {
        alert("В блокноте больше нет места. Вы уже записали 6 заметок.");
        return;
      }

      collectedNotes.add(fact);

      button.classList.add("used");
      button.textContent = "✓ " + fact;

      updateProgress();
      updateNotebook();

      setTimeout(() => {
        factLayer.classList.remove("open");
      }, 250);
    });

    factOptions.appendChild(button);
  });
}

zones.forEach((zone) => {
  zone.addEventListener("click", () => {
    const title = zone.dataset.title;
    const text = zone.dataset.text;

    infoCard.style.opacity = "0";
    infoCard.style.transform = "translateY(10px)";

    setTimeout(() => {
      infoCard.innerHTML = `
        <p class="small-title">Зона исследования</p>
        <h1>${title}</h1>
        <p>${text}</p>
        <p class="progress-text" id="progressText">Записано: ${collectedNotes.size}/${maxNotes}</p>
      `;

      infoCard.style.opacity = "1";
      infoCard.style.transform = "translateY(0)";
    }, 150);

    showFacts(zone);
  });
});

factLayer.addEventListener("click", (event) => {
  if (event.target === factLayer) {
    factLayer.classList.remove("open");
  }
});

factPanel.addEventListener("click", (event) => {
  event.stopPropagation();
});

const notebookButton = document.querySelector(".notebook-button");
const notebookModal = document.getElementById("notebookModal");
const closeNotebook = document.getElementById("closeNotebook");

notebookButton.addEventListener("click", () => {
  updateNotebook();
  updateProgress();
  notebookModal.classList.add("open");
});

closeNotebook.addEventListener("click", () => {
  notebookModal.classList.remove("open");
});

notebookModal.addEventListener("click", (event) => {
  if (event.target === notebookModal) {
    notebookModal.classList.remove("open");
  }
});

const helpButton = document.querySelector(".help-button");
const helpModal = document.getElementById("helpModal");
const closeHelp = document.getElementById("closeHelp");

helpButton.addEventListener("click", () => {
  helpModal.classList.add("open");
});

closeHelp.addEventListener("click", () => {
  helpModal.classList.remove("open");
});

helpModal.addEventListener("click", (event) => {
  if (event.target === helpModal) {
    helpModal.classList.remove("open");
  }
});

const aboutButton = document.querySelector(".about-button");
const aboutModal = document.getElementById("aboutModal");
const closeModal = document.getElementById("closeModal");

aboutButton.addEventListener("click", () => {
  aboutModal.classList.add("open");
});

closeModal.addEventListener("click", () => {
  aboutModal.classList.remove("open");
});

aboutModal.addEventListener("click", (event) => {
  if (event.target === aboutModal) {
    aboutModal.classList.remove("open");
  }
});

const timePoints = document.querySelectorAll(".time-point");

timePoints.forEach((point) => {
  point.addEventListener("click", () => {
    timePoints.forEach((item) => item.classList.remove("active"));
    point.classList.add("active");

    infoCard.style.opacity = "0";
    infoCard.style.transform = "translateY(10px)";

    setTimeout(() => {
      infoCard.innerHTML = `
        <p class="small-title">Ход процесса</p>
        <h1>${point.dataset.title}</h1>
        <p>${point.dataset.text}</p>
        <p class="progress-text" id="progressText">Записано: ${collectedNotes.size}/${maxNotes}</p>
      `;

      infoCard.style.opacity = "1";
      infoCard.style.transform = "translateY(0)";
    }, 150);
  });
});

articleButton.addEventListener("click", () => {
  if (collectedNotes.size < maxNotes) return;

  const notesArray = Array.from(collectedNotes);

  articleText.innerHTML = `
    <p>
      <strong>Нюрнберг, Зал №600.</strong>
      Международный военный трибунал стал местом,
      где впервые в таком масштабе рассматривалась
      ответственность руководителей государства
      за преступления войны.
    </p>

    <p>
      Работая в зале как корреспондент,
      я отметил ключевые элементы процесса:
      судейскую коллегию, сторону обвинения,
      скамью подсудимых, свидетелей,
      переводчиков и представителей прессы.
    </p>

    <blockquote>
      ${notesArray[0]}
      ${notesArray[1]}
      ${notesArray[2]}
    </blockquote>

    <p>
      Эти наблюдения показывают,
      что процесс был не только судом
      над отдельными людьми,
      но и попыткой документально
      зафиксировать преступления
      нацистского режима.
    </p>

    <blockquote>
      ${notesArray[3]}
      ${notesArray[4]}
      ${notesArray[5]}
    </blockquote>

    <p>
      Зал №600 стал пространством,
      где юридические доказательства,
      свидетельские показания,
      работа переводчиков
      и внимание мировой прессы
      превратили судебное заседание
      в событие исторического масштаба.
    </p>

    <p>
      <strong>Материал подготовлен.</strong>
      Собранные заметки легли
      в основу репортажа
      о Нюрнбергском процессе.
    </p>
  `;

  notebookModal.classList.remove("open");
  articleModal.classList.add("open");
});

closeArticle.addEventListener("click", () => {
  articleModal.classList.remove("open");
});

articleModal.addEventListener("click", (event) => {
  if (event.target === articleModal) {
    articleModal.classList.remove("open");
  }
});