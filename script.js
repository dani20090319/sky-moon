const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");

/* =========================================================
   MOBIL MENÜ
========================================================= */

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");

  toggle.setAttribute(
    "aria-expanded",
    String(open)
  );
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");

    toggle?.setAttribute(
      "aria-expanded",
      "false"
    );
  });
});


/* =========================================================
   SKY MOON LIVE DISCORD API
========================================================= */

/*
  PUBLIKUS API

  Fontos:
  A Cloudflare Quick Tunnel ideiglenes.
  Ha új tunnel URL-t kapsz, ezt az egy sort kell
  majd átírni.
*/

const API_URL =
  "https://notre-visit-gospel-true.trycloudflare.com/api/server";


/* =========================================================
   DISCORD ADATOK LEKÉRÉSE
========================================================= */

async function loadDiscordData() {

  try {

    const response = await fetch(API_URL, {
      cache: "no-store"
    });


    if (!response.ok) {

      throw new Error(
        `HTTP ${response.status}`
      );

    }


    const data =
      await response.json();


    if (!data.ok) {

      throw new Error(
        data.error || "API hiba"
      );

    }


    updateDiscordUI(data);


  } catch (error) {

    console.error(
      "❌ Discord API hiba:",
      error
    );

    showOfflineState();

  }

}


/* =========================================================
   DISCORD ADATOK MEGJELENÍTÉSE
========================================================= */

function updateDiscordUI(data) {

  const server =
    data.server;

  const bot =
    data.bot;


  if (!server) {
    return;
  }


  /* =====================================================
     FELSŐ HERO STATISZTIKÁK
  ===================================================== */

  const memberCount =
    document.querySelector(
      "#memberCount"
    );


  const onlineCount =
    document.querySelector(
      "#onlineCount"
    );


  if (memberCount) {

    memberCount.textContent =
      server.members;

  }


  if (onlineCount) {

    onlineCount.textContent =
      server.online;

  }


  /* =====================================================
     LIVE PANEL
  ===================================================== */

  let panel =
    document.querySelector(
      "#discord-live-panel"
    );


  if (!panel) {

    panel =
      createLivePanel();

  }


  /* =====================================================
     LIVE PANEL ELEMEK
  ===================================================== */

  const serverName =
    panel.querySelector(
      "[data-server-name]"
    );


  const serverIcon =
    panel.querySelector(
      "[data-server-icon]"
    );


  const members =
    panel.querySelector(
      "[data-members]"
    );


  const online =
    panel.querySelector(
      "[data-online]"
    );


  const channels =
    panel.querySelector(
      "[data-channels]"
    );


  const roles =
    panel.querySelector(
      "[data-roles]"
    );


  const botName =
    panel.querySelector(
      "[data-bot-name]"
    );


  const botStatus =
    panel.querySelector(
      "[data-bot-status]"
    );


  /* =====================================================
     SZERVER NÉV
  ===================================================== */

  if (serverName) {

    serverName.textContent =
      server.name;

  }


  /* =====================================================
     SZERVER IKON
  ===================================================== */

  if (
    serverIcon &&
    server.icon
  ) {

    serverIcon.src =
      server.icon;

  }


  /* =====================================================
     TAGOK
  ===================================================== */

  if (members) {

    members.textContent =
      server.members;

  }


  /* =====================================================
     ONLINE
  ===================================================== */

  if (online) {

    online.textContent =
      server.online;

  }


  /* =====================================================
     CSATORNÁK
  ===================================================== */

  if (channels) {

    channels.textContent =
      server.channels;

  }


  /* =====================================================
     RANGOK
  ===================================================== */

  if (roles) {

    roles.textContent =
      server.roles;

  }


  /* =====================================================
     BOT
  ===================================================== */

  if (bot) {

    if (botName) {

      botName.textContent =
        bot.username;

    }


    if (botStatus) {

      botStatus.textContent =
        "● ONLINE";

      botStatus.classList.remove(
        "offline"
      );

    }

  }

}


/* =========================================================
   LIVE PANEL LÉTREHOZÁSA
========================================================= */

function createLivePanel() {

  const panel =
    document.createElement(
      "section"
    );


  panel.id =
    "discord-live-panel";


  panel.className =
    "discord-live-panel";


  panel.innerHTML = `

    <div class="live-panel-inner">

      <div class="live-header">

        <div class="live-server">

          <img
            data-server-icon
            class="live-server-icon"
            src=""
            alt="Sky Moon"
          >

          <div>

            <span class="live-label">
              🔴 LIVE DISCORD
            </span>

            <h2 data-server-name>
              Sky Moon
            </h2>

          </div>

        </div>


        <div
          class="live-status"
          data-bot-status
        >
          ● ONLINE
        </div>

      </div>


      <div class="live-stats">

        <div class="live-stat">

          <span>👥</span>

          <strong data-members>
            —
          </strong>

          <small>
            TAG
          </small>

        </div>


        <div class="live-stat">

          <span>🟢</span>

          <strong data-online>
            —
          </strong>

          <small>
            ONLINE
          </small>

        </div>


        <div class="live-stat">

          <span>💬</span>

          <strong data-channels>
            —
          </strong>

          <small>
            CSATORNA
          </small>

        </div>


        <div class="live-stat">

          <span>🛡️</span>

          <strong data-roles>
            —
          </strong>

          <small>
            RANG
          </small>

        </div>

      </div>


      <div class="live-bot">

        <div class="bot-icon">
          🤖
        </div>


        <div>

          <span>
            SKY MOON BOT
          </span>

          <strong data-bot-name>
            Sky Moon Bot
          </strong>

        </div>


        <div class="bot-online">
          🟢
        </div>

      </div>


      <a
        class="live-join"
        href="https://discord.gg/NUKqszMKup"
        target="_blank"
        rel="noopener"
      >
        💬 CSATLAKOZÁS A DISCORDHOZ
      </a>

    </div>

  `;


  /*
    A Live panelt a CTA elé helyezzük.
  */

  const cta =
    document.querySelector(
      ".cta"
    );


  if (cta) {

    cta.parentNode.insertBefore(
      panel,
      cta
    );

  } else {

    document
      .querySelector("main")
      ?.appendChild(panel);

  }


  return panel;

}


/* =========================================================
   OFFLINE ÁLLAPOT
========================================================= */

function showOfflineState() {

  const panel =
    document.querySelector(
      "#discord-live-panel"
    );


  /*
    Ha még nincs panel,
    nincs mit frissíteni.
  */

  if (!panel) {
    return;
  }


  const status =
    panel.querySelector(
      "[data-bot-status]"
    );


  if (status) {

    status.textContent =
      "● OFFLINE";

    status.classList.add(
      "offline"
    );

  }

}


/* =========================================================
   INDÍTÁS
========================================================= */

loadDiscordData();


/* =========================================================
   AUTOMATIKUS FRISSÍTÉS
========================================================= */

/*
  10 másodpercenként frissítjük
  a Discord adatokat.
*/

setInterval(
  loadDiscordData,
  10000
);
