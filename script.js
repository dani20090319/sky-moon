/* =========================================================
   SKY MOON 2.0 — MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MOBILE MENU
  ======================================================== */

  const menuToggle = document.querySelector("#menuToggle");
  const nav = document.querySelector("#nav");

  if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });


    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================== */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const navLinks = document.querySelectorAll(
    ".nav a"
  );


  const updateActiveNavigation = () => {

    let currentSection = "home";

    const scrollPosition =
      window.scrollY + 180;


    sections.forEach(section => {

      const sectionTop =
        section.offsetTop;

      if (scrollPosition >= sectionTop) {
        currentSection = section.id;
      }

    });


    navLinks.forEach(link => {

      const target =
        link.getAttribute("href");

      link.classList.toggle(
        "active",
        target === `#${currentSection}`
      );

    });

  };


  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );

  updateActiveNavigation();


  /* =======================================================
     REVEAL ANIMATIONS
  ======================================================== */

  const revealElements = document.querySelectorAll(
    ".section-header, .info-card, .feature-card, .rule, .staff-card, .discord-panel, .final-content"
  );


  revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
      "translateY(25px)";

    element.style.transition =
      "opacity .7s ease, transform .7s ease";

  });


  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.style.opacity = "1";

          entry.target.style.transform =
            "translateY(0)";

          revealObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* =======================================================
     MOUSE PARALLAX
  ======================================================== */

  const heroVisual =
    document.querySelector(".hero-visual");

  const moon =
    document.querySelector(".moon");

  const orbits =
    document.querySelectorAll(".orbit");


  if (
    heroVisual &&
    moon &&
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {

    heroVisual.addEventListener(
      "mousemove",
      event => {

        const rect =
          heroVisual.getBoundingClientRect();

        const x =
          (event.clientX - rect.left)
          / rect.width
          - 0.5;

        const y =
          (event.clientY - rect.top)
          / rect.height
          - 0.5;


        moon.style.transform =
          `translate(${x * 10}px, ${y * 10}px)`;


        orbits.forEach(
          (orbit, index) => {

            const amount =
              index === 0
                ? 8
                : -6;

            orbit.style.marginLeft =
              `${x * amount}px`;

            orbit.style.marginTop =
              `${y * amount}px`;

          }
        );

      }
    );


    heroVisual.addEventListener(
      "mouseleave",
      () => {

        moon.style.transform = "";

        orbits.forEach(orbit => {

          orbit.style.marginLeft = "";
          orbit.style.marginTop = "";

        });

      }
    );

  }


  /* =======================================================
     CARD TILT
  ======================================================== */

  const cards =
    document.querySelectorAll(
      ".info-card, .feature-card, .staff-card"
    );


  if (
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {

    cards.forEach(card => {

      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;


          const rotateY =
            ((x / rect.width) - 0.5) * 5;

          const rotateX =
            ((y / rect.height) - 0.5) * -5;


          card.style.transform =
            `perspective(700px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform = "";

        }
      );

    });

  }


  /* =======================================================
     COUNTER ANIMATION
  ======================================================== */

  const animateCounter = (
    element,
    target,
    duration = 1200
  ) => {

    if (!element) {
      return;
    }


    const startTime =
      performance.now();


    const update = currentTime => {

      const progress =
        Math.min(
          (currentTime - startTime)
          / duration,
          1
        );


      const eased =
        1 - Math.pow(1 - progress, 3);


      const value =
        Math.floor(target * eased);


      element.textContent =
        value.toLocaleString("hu-HU");


      if (progress < 1) {

        requestAnimationFrame(update);

      }

    };


    requestAnimationFrame(update);

  };


  /* =======================================================
     DEMO STATS
     
     Ezeket később a Discord API adataira
     cseréljük.
  ======================================================== */

  const memberCount =
    document.querySelector("#memberCount");

  const onlineCount =
    document.querySelector("#onlineCount");


  const statsObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }


          animateCounter(
            memberCount,
            0
          );


          animateCounter(
            onlineCount,
            0
          );


          statsObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: .5
      }
    );


  if (memberCount) {
    statsObserver.observe(memberCount);
  }


  /* =======================================================
     HEADER SCROLL EFFECT
  ======================================================== */

  const header =
    document.querySelector(".site-header");


  const updateHeader =
    () => {

      if (!header) {
        return;
      }


      if (window.scrollY > 20) {

        header.style.background =
          "rgba(3,4,13,.88)";

      } else {

        header.style.background =
          "rgba(3,4,13,.72)";

      }

    };


  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  updateHeader();


  /* =======================================================
     SMOOTH ANCHOR FALLBACK
  ======================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const id =
            link.getAttribute("href");

          if (!id || id === "#") {
            return;
          }


          const target =
            document.querySelector(id);

          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  console.log(
    "%c🌙 SKY MOON",
    "font-size:24px;font-weight:900;color:#8b9cff"
  );

  console.log(
    "%cSky Moon Web 2.0 elindult.",
    "font-size:13px;color:#aab4d3"
  );

});
