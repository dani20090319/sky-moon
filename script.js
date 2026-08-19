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
   SKY MOON LIVE DISCORD
========================================================= */

const API_URL = "http://127.0.0.1:3002/api/server";

/*
  Ha később a weboldalt Cloudflare Tunnelön vagy más
  publikus címen használjuk, ezt az URL-t át kell majd
  írni a publikus API címére.
*/

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

    const data = await response.json();

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
   ADATOK MEGJELENÍTÉSE
========================================================= */

function updateDiscordUI(data) {
  const server = data.server;
  const bot = data.bot;

  /*
    Ha még nincs Live panel az index.html-ben,
    automatikusan létrehozzuk.
  */

  let panel =
    document.querySelector(
      "#discord-live-panel"
    );

  if (!panel) {
    panel = createLivePanel();
  }

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

  if (serverName) {
    serverName.textContent =
      server.name;
  }

  if (serverIcon && server.icon) {
    serverIcon.src =
      server.icon;
  }

  if (members) {
    members.textContent =
      server.members;
  }

  if (online) {
    online.textContent =
      server.online;
  }

  if (channels) {
    channels.textContent =
      server.channels;
  }

  if (roles) {
    roles.textContent =
      server.roles;
  }

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

/* =========================================================
   LIVE PANEL LÉTREHOZÁSA
========================================================= */

function createLivePanel() {
  const panel =
    document.createElement("section");

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
    A CTA elé rakjuk, így nem kell kézzel
    átalakítanunk az index.html-t.
  */

  const cta =
    document.querySelector(".cta");

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

  if (!panel) return;

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

/*
  10 másodpercenként frissítjük
  az élő Discord adatokat.
*/

setInterval(
  loadDiscordData,
  10000
);
