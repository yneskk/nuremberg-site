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
const maxNotes = 7;

const notebookButton = document.querySelector(".notebook-button");
const notebookModal = document.getElementById("notebookModal");
const closeNotebook = document.getElementById("closeNotebook");

const notesList = document.getElementById("notesList");
const progressText = document.getElementById("progressText");
const notebookCount = document.getElementById("notebookCount");

const articleButton = document.getElementById("articleButton");
const articleModal = document.getElementById("articleModal");
const closeArticle = document.getElementById("closeArticle");
const articleText = document.getElementById("articleText");

const helpButton = document.querySelector(".help-button");
const helpModal = document.getElementById("helpModal");
const closeHelp = document.getElementById("closeHelp");

const aboutButton = document.querySelector(".about-button");
const aboutModal = document.getElementById("aboutModal");
const closeModal = document.getElementById("closeModal");

startButton.addEventListener("click", () => {
  introScreen.classList.add("hidden");
});

function updateProgress() {
  progressText.textContent = `Записано: ${collectedNotes.size}/${maxNotes}`;
  notebookCount.textContent = collectedNotes.size;
}

function updateNotebook() {
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

  if (collectedNotes.size >= maxNotes) {
    articleButton.disabled = false;
    articleButton.textContent = "Собрать статью";
  } else {
    articleButton.disabled = true;
    articleButton.textContent = `Собрать статью (${collectedNotes.size}/${maxNotes})`;
  }
}

function addFactToNotebook(fact, button) {
  if (collectedNotes.has(fact)) return false;

  if (collectedNotes.size >= maxNotes) {
    alert("Блокнот заполнен.");
    return false;
  }

  collectedNotes.add(fact);

  button.classList.add("used");
  button.textContent = "✓ " + fact;

  updateProgress();
  updateNotebook();

  return true;
}

function showFacts(zone) {
  factLayer.classList.add("open");

  factTitle.textContent = zone.dataset.title;
  factOptions.innerHTML = "";

  if (zone.classList.contains("prosecutors")) {
    factIntro.textContent =
      "Выберите один факт про США и один факт про СССР.";

    const usaTitle = document.createElement("h3");
    usaTitle.textContent = "США";
    factOptions.appendChild(usaTitle);

    const usaFacts = [
      zone.dataset.fact1,
      zone.dataset.fact2,
      zone.dataset.fact3,
    ];

    const ussrTitle = document.createElement("h3");
    ussrTitle.textContent = "СССР";

    const ussrFacts = [
      zone.dataset.fact4,
      zone.dataset.fact5,
      zone.dataset.fact6,
    ];

    let usaChosen = usaFacts.some((fact) =>
      collectedNotes.has(fact)
    );

    let ussrChosen = ussrFacts.some((fact) =>
      collectedNotes.has(fact)
    );

    usaFacts.forEach((fact) => {
      const button = document.createElement("button");

      button.className = "fact-button";
      button.textContent = fact;

      if (collectedNotes.has(fact)) {
        button.classList.add("used");
        button.textContent = "✓ " + fact;
      }

      button.addEventListener("click", () => {
        if (usaChosen && !collectedNotes.has(fact)) {
          alert("Можно выбрать только один факт про США.");
          return;
        }

        const added = addFactToNotebook(fact, button);

        if (added) {
          usaChosen = true;
        }

        if (usaChosen && ussrChosen) {
          setTimeout(() => {
            factLayer.classList.remove("open");
          }, 300);
        }
      });

      factOptions.appendChild(button);
    });

    factOptions.appendChild(ussrTitle);

    ussrFacts.forEach((fact) => {
      const button = document.createElement("button");

      button.className = "fact-button";
      button.textContent = fact;

      if (collectedNotes.has(fact)) {
        button.classList.add("used");
        button.textContent = "✓ " + fact;
      }

      button.addEventListener("click", () => {
        if (ussrChosen && !collectedNotes.has(fact)) {
          alert("Можно выбрать только один факт про СССР.");
          return;
        }

        const added = addFactToNotebook(fact, button);

        if (added) {
          ussrChosen = true;
        }

        if (usaChosen && ussrChosen) {
          setTimeout(() => {
            factLayer.classList.remove("open");
          }, 300);
        }
      });

      factOptions.appendChild(button);
    });

    return;
  }

  factIntro.textContent =
    "Выберите факт, который хотите записать в блокнот.";

  const facts = [
    zone.dataset.fact1,
    zone.dataset.fact2,
    zone.dataset.fact3,
  ];

  facts.forEach((fact) => {
    const button = document.createElement("button");

    button.className = "fact-button";
    button.textContent = fact;

    if (collectedNotes.has(fact)) {
      button.classList.add("used");
      button.textContent = "✓ " + fact;
    }

    button.addEventListener("click", () => {
      const added = addFactToNotebook(fact, button);

      if (added) {
        setTimeout(() => {
          factLayer.classList.remove("open");
        }, 300);
      }
    });

    factOptions.appendChild(button);
  });
}

zones.forEach((zone) => {
  zone.addEventListener("click", () => {
    const title = zone.dataset.title;
    const text = zone.dataset.text;

    infoCard.style.opacity = "0";

    setTimeout(() => {
      infoCard.innerHTML = `
        <span>Зона исследования</span>
        <h2>${title}</h2>
        <p>${text}</p>
        <p class="small-note">Записано: ${collectedNotes.size}/${maxNotes}</p>
      `;

      infoCard.style.opacity = "1";
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

notebookButton.addEventListener("click", () => {
  updateNotebook();
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

articleButton.addEventListener("click", () => {
  if (collectedNotes.size < maxNotes) return;

  const notesArray = Array.from(collectedNotes);

  const usaNote = notesArray.find(note => note.startsWith("США:"));
  const ussrNote = notesArray.find(note => note.startsWith("СССР:"));

  const otherNotes = notesArray.filter(note =>
    !note.startsWith("США:") && !note.startsWith("СССР:")
  );

  articleText.innerHTML = `
    <h2>Репортаж из Зала №600</h2>

    <p>
      Нюрнберг, 1946 год. В Зале №600 проходит процесс, который уже сейчас
      можно назвать не просто судом над побеждёнными, а попыткой всего мира
      дать юридическую и моральную оценку преступлениям нацизма.
    </p>

    <p>
      Международный военный трибунал стал новым явлением в истории права.
      ${otherNotes[0] || ""} Это показывает, что союзники стремились не к быстрой
      расправе, а к открытому процессу, где каждое обвинение должно было быть
      подтверждено доказательствами.
    </p>

    <p>
      Особую роль в суде сыграла сторона обвинения. Американский обвинитель
      Роберт Джексон видел в процессе будущий правовой прецедент.
      ${usaNote || ""} Советская сторона во главе с Романом Руденко, в свою
      очередь, настаивала на ответственности руководителей Рейха за преступления
      против СССР и мирного населения. ${ussrNote || ""}
    </p>

    <p>
      На скамье подсудимых особенно выделялся Герман Геринг. Его прошлое и
      поведение в суде показывали, насколько тесно личная власть нацистских
      лидеров была связана с преступной системой режима. ${otherNotes[1] || ""}
    </p>

    <p>
      Но сухих документов оказалось недостаточно, чтобы зал по-настоящему
      почувствовал масштаб трагедии. Свидетели разрушили главную линию защиты
      подсудимых — утверждение, будто они ничего не знали и лишь выполняли
      приказы. ${otherNotes[2] || ""}
    </p>

    <p>
      Работа журналистов в Нюрнберге тоже стала частью истории процесса.
      Через прессу мир узнавал не только о юридических спорах, но и о страшных
      доказательствах, которые звучали в зале суда. ${otherNotes[3] || ""}
    </p>

    <p>
      Собранные материалы показывают: Нюрнбергский процесс был не актом мести,
      а попыткой документально доказать преступления нацистского режима и
      создать новый принцип международной ответственности.
    </p>

    <p>
      ${otherNotes[4] || ""} Поэтому Зал №600 стал не просто местом суда,
      а символом того, что преступления против человечности не могут быть
      оправданы приказами, должностями или военной необходимостью.
    </p>

    <p>
      <strong>
        Материал подготовлен на основе заметок журналиста из Зала №600.
      </strong>
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

updateProgress();
updateNotebook();const zones = document.querySelectorAll(".zone");
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

function addFactToNotebook(fact, button) {
  if (collectedNotes.has(fact)) return false;

  if (collectedNotes.size >= maxNotes) {
    alert("В блокноте больше нет места.\nВы уже записали 6 заметок.");
    return false;
  }

  collectedNotes.add(fact);
  button.classList.add("used");
  button.textContent = "✓ " + fact;

  updateProgress();
  updateNotebook();

  return true;
}

function showFacts(zone) {
  factLayer.classList.add("open");
  factTitle.textContent = zone.dataset.title;
  factOptions.innerHTML = "";

  if (zone.classList.contains("prosecutors")) {
    factIntro.textContent = "Выберите один факт про США и один факт про СССР.";

    const usaTitle = document.createElement("h3");
    usaTitle.textContent = "США";
    factOptions.appendChild(usaTitle);

    const usaFacts = [
      zone.dataset.fact1,
      zone.dataset.fact2,
      zone.dataset.fact3
    ];

    const ussrTitle = document.createElement("h3");
    ussrTitle.textContent = "СССР";

    const ussrFacts = [
      zone.dataset.fact4,
      zone.dataset.fact5,
      zone.dataset.fact6
    ];

    let usaChosen = usaFacts.some((fact) => collectedNotes.has(fact));
    let ussrChosen = ussrFacts.some((fact) => collectedNotes.has(fact));

    usaFacts.forEach((fact) => {
      const button = document.createElement("button");
      button.className = "fact-button";
      button.textContent = fact;

      if (collectedNotes.has(fact)) {
        button.classList.add("used");
        button.textContent = "✓ " + fact;
      }

      button.addEventListener("click", () => {
        if (usaChosen && !collectedNotes.has(fact)) {
          alert("Про США можно выбрать только один факт.");
          return;
        }

        const added = addFactToNotebook(fact, button);

        if (added) {
          usaChosen = true;
        }

        if (usaChosen && ussrChosen) {
          setTimeout(() => {
            factLayer.classList.remove("open");
          }, 250);
        }
      });

      factOptions.appendChild(button);
    });

    factOptions.appendChild(ussrTitle);

    ussrFacts.forEach((fact) => {
      const button = document.createElement("button");
      button.className = "fact-button";
      button.textContent = fact;

      if (collectedNotes.has(fact)) {
        button.classList.add("used");
        button.textContent = "✓ " + fact;
      }

      button.addEventListener("click", () => {
        if (ussrChosen && !collectedNotes.has(fact)) {
          alert("Про СССР можно выбрать только один факт.");
          return;
        }

        const added = addFactToNotebook(fact, button);

        if (added) {
          ussrChosen = true;
        }

        if (usaChosen && ussrChosen) {
          setTimeout(() => {
            factLayer.classList.remove("open");
          }, 250);
        }
      });

      factOptions.appendChild(button);
    });

    return;
  }

  factIntro.textContent = "Выберите факт, который хотите записать в блокнот.";

  const facts = [
    zone.dataset.fact1,
    zone.dataset.fact2,
    zone.dataset.fact3
  ];

  facts.forEach((fact) => {
    const button = document.createElement("button");
    button.className = "fact-button";
    button.textContent = fact;

    if (collectedNotes.has(fact)) {
      button.classList.add("used");
      button.textContent = "✓ " + fact;
    }

    button.addEventListener("click", () => {
      const added = addFactToNotebook(fact, button);

      if (added) {
        setTimeout(() => {
          factLayer.classList.remove("open");
        }, 250);
      }
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
        <span>Зона исследования</span>
        <h2>${title}</h2>
        <p>${text}</p>
        <p class="small-note">Записано: ${collectedNotes.size}/${maxNotes}</p>
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
        <span>Ход процесса</span>
        <h2>${point.dataset.title}</h2>
        <p>${point.dataset.text}</p>
        <p class="small-note">Записано: ${collectedNotes.size}/${maxNotes}</p>
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
    <p><strong>Нюрнберг, Зал №600.</strong> Международный военный трибунал стал местом, где впервые в таком масштабе рассматривалась ответственность руководителей государства за преступления войны.</p>

    <p>Работая в зале как корреспондент, я отметил ключевые элементы процесса: сам трибунал, сторону обвинения, скамью подсудимых, свидетелей и представителей прессы.</p>

    <blockquote>${notesArray[0]} ${notesArray[1]} ${notesArray[2]}</blockquote>

    <p>Эти наблюдения показывают, что процесс был не только судом над отдельными людьми, но и попыткой документально зафиксировать преступления нацистского режима.</p>

    <blockquote>${notesArray[3]} ${notesArray[4]} ${notesArray[5]}</blockquote>

    <p>Зал №600 стал пространством, где юридические доказательства, свидетельские показания и внимание мировой прессы превратили судебное заседание в событие исторического масштаба.</p>

    <p><strong>Материал подготовлен.</strong> Собранные заметки легли в основу репортажа о Нюрнбергском процессе.</p>
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
