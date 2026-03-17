// script.js

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  // Check if data exists
  if (typeof WEDDING_DATA === "undefined") {
    app.innerHTML =
      '<div class="p-8 text-center text-red-500">Error: WEDDING_DATA is not defined. Please ensure data.js is loaded correctly.</div>';
    return;
  }

  // ── Set up the global fixed map button ──────────────────────────────────
  const globalMapBtns = document.querySelectorAll("#global-map-btn");
  const globalMapBtn = globalMapBtns[0] ?? null;
  if (globalMapBtns.length > 1) {
    globalMapBtns.forEach((el, idx) => {
      if (idx !== 0) el.remove();
    });
  }
  if (globalMapBtn) globalMapBtn.href = WEDDING_DATA.venueMapUrl;

  const bgWatermarkUrl =
    "https://img.freepik.com/free-vector/botanical-leaves-background-vector-design_53876-140220.jpg";

  const escapeAttr = (v) =>
    String(v ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  const buildGoogleCalendarLink = ({
    title,
    startIso,
    durationMinutes = 120,
    details = "",
    location = "",
  }) => {
    const start = new Date(startIso);
    if (Number.isNaN(start.getTime())) return "#";
    const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
    const fmt = (d) =>
      d
        .toISOString()
        .replaceAll("-", "")
        .replaceAll(":", "")
        .replace(/\.\d{3}Z$/, "Z");
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates: `${fmt(start)}/${fmt(end)}`,
      details,
      location,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const roseOrnamentSvg = encodeURIComponent(
    `
        <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140" fill="none">
          <path d="M86 24c-9 0-15 7-16 16-1-9-7-16-16-16-11 0-20 9-20 20 0 18 20 34 36 46 16-12 36-28 36-46 0-11-9-20-20-20Z" fill="#8B1538"/>
          <path d="M70 90c-18 13-34 22-48 23 10 10 26 16 48 16s38-6 48-16c-14-1-30-10-48-23Z" fill="#C77B8F"/>
          <path d="M42 56c2 7 8 15 16 22-2-9 0-18 6-26-9-1-18 0-22 4Z" fill="#D4AF37" opacity="0.85"/>
        </svg>
    `.trim(),
  );

  const separatorHtml = `
        <div class="flex items-center justify-center gap-3" aria-hidden="true">
            <div class="h-px w-14 bg-gray-800/20"></div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" class="text-wedding-gold drop-shadow-sm">
                <path d="M12 21s-7-4.6-7-10a7 7 0 0 1 14 0c0 5.4-7 10-7 10Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 7.8c1.2-1.5 3.4-1.4 4.6.1 1.2 1.5.7 3.6-1 4.6-1 .6-2.2.7-3.2.2-1 .5-2.2.4-3.2-.2-1.7-1-2.2-3.1-1-4.6 1.2-1.5 3.4-1.6 4.6-.1Z" fill="currentColor" opacity="0.38"/>
            </svg>
            <div class="h-px w-14 bg-gray-800/20"></div>
        </div>
    `;

  // 1. Hero Section
  const renderHero = () => `
        <section class="section-animate min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-12 sm:pt-16 pb-20 sm:pb-24 relative overflow-hidden bg-wedding-bg">
            <div class="bg-blobs" aria-hidden="true">
                <div class="blob blob-1"></div>
                <div class="blob blob-2"></div>
                <div class="blob blob-3"></div>
            </div>

            <img class="corner-ornament tl" alt="" src="data:image/svg+xml,${roseOrnamentSvg}">
            <img class="corner-ornament br" alt="" src="data:image/svg+xml,${roseOrnamentSvg}">

            <img src="${bgWatermarkUrl}" class="watermark watermark-top mix-blend-multiply" alt="">
            <img src="${bgWatermarkUrl}" class="watermark watermark-bottom mix-blend-multiply" alt="">

            <div class="relative z-10 w-full flex flex-col items-center">
                <div class="fade-up d1 text-[11px] tracking-[0.32em] uppercase text-gray-600/80 font-semibold mb-4">
                    Wedding invitation
                </div>

                <div class="fade-up d2 arch-image-wrapper mx-auto mb-7 sm:mb-8 shadow-lg lift">
                    <img src="${WEDDING_DATA.couplePhoto}" class="arch-image" alt="Couple Photo" onerror="this.src='https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
                </div>

                <div class="text-center w-full flex flex-col items-center">
                    <h1 class="fade-up d3 font-script text-5xl sm:text-6xl text-wedding-red tracking-wide leading-tight">${WEDDING_DATA.groom.name}</h1>

                    <div class="fade-up d4 my-3 sm:my-4">${separatorHtml}</div>

                    <h1 class="fade-up d4 font-script text-5xl sm:text-6xl text-wedding-red tracking-wide leading-tight">${WEDDING_DATA.bride.name}</h1>

                    <div class="fade-up d5 mt-5 sm:mt-6 text-wedding-rose font-serif font-semibold tracking-[0.18em] sm:tracking-widest text-[11px] sm:text-[12px]">
                        ${WEDDING_DATA.weddingDateDisplay}
                    </div>

                    <div class="fade-up d5 mt-6 sm:mt-7 flex gap-3">
                        <a href="${escapeAttr(
                          buildGoogleCalendarLink({
                            title: `${WEDDING_DATA.groom.name} & ${WEDDING_DATA.bride.name} Wedding`,
                            startIso: WEDDING_DATA.weddingDate,
                            durationMinutes: 180,
                            details: "Wedding Invitation",
                          }),
                        )}" target="_blank"
                           class="px-5 py-3 rounded-full bg-wedding-red text-white font-semibold shadow-lg shadow-black/10 active:scale-[0.98] transition text-[14px]">
                           Save Google Calendar
                        </a>
                    </div>
                </div>
            </div>

            <div class="scroll-cue" aria-hidden="true">
                <div>Scroll Down</div>
                <div class="mouse"></div>
            </div>
        </section>
    `;

  // 2. Date & Count Down
  const renderCountdown = () => `
        <section id="big-day" class="section-animate min-h-[92vh] flex flex-col items-center justify-center py-14 sm:py-16 px-4 sm:px-6 bg-wedding-bg relative overflow-hidden">
            <img src="${bgWatermarkUrl}" class="watermark watermark-top mix-blend-multiply" alt="">
            <img src="${bgWatermarkUrl}" class="watermark watermark-bottom mix-blend-multiply" alt="">

            <div class="relative z-10 text-center reveal" data-reveal style="transition-delay: 0ms;">
                <div class="text-[11px] tracking-[0.32em] uppercase text-gray-600/80 font-semibold mb-3">
                    The big day
                </div>
                <h2 class="font-script text-4xl sm:text-5xl text-wedding-red mb-2">Count Down</h2>
                <p class="text-gray-600 max-w-[320px] mx-auto">
                    We can’t wait to celebrate with you.
                </p>
            </div>

            <div class="mt-9 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[340px] z-10">
                <div class="reveal bg-white/70 backdrop-blur border border-black/10 rounded-2xl p-5 shadow-sm" data-reveal style="transition-delay: 40ms;">
                    <div class="text-4xl sm:text-5xl font-extrabold tracking-tight text-wedding-red" style="font-variant-numeric: tabular-nums;" id="days">00</div>
                    <div class="mt-2 text-[10px] tracking-[0.28em] uppercase text-gray-600 font-semibold">Days</div>
                </div>
                <div class="reveal bg-white/70 backdrop-blur border border-black/10 rounded-2xl p-5 shadow-sm" data-reveal style="transition-delay: 90ms;">
                    <div class="text-4xl sm:text-5xl font-extrabold tracking-tight text-wedding-red" style="font-variant-numeric: tabular-nums;" id="hours">00</div>
                    <div class="mt-2 text-[10px] tracking-[0.28em] uppercase text-gray-600 font-semibold">Hours</div>
                </div>
                <div class="reveal bg-white/70 backdrop-blur border border-black/10 rounded-2xl p-5 shadow-sm" data-reveal style="transition-delay: 140ms;">
                    <div class="text-4xl sm:text-5xl font-extrabold tracking-tight text-wedding-red" style="font-variant-numeric: tabular-nums;" id="minutes">00</div>
                    <div class="mt-2 text-[10px] tracking-[0.28em] uppercase text-gray-600 font-semibold">Mins</div>
                </div>
                <div class="reveal bg-white/70 backdrop-blur border border-black/10 rounded-2xl p-5 shadow-sm" data-reveal style="transition-delay: 190ms;">
                    <div class="text-4xl sm:text-5xl font-extrabold tracking-tight text-wedding-red" style="font-variant-numeric: tabular-nums;" id="seconds">00</div>
                    <div class="mt-2 text-[10px] tracking-[0.28em] uppercase text-gray-600 font-semibold">Secs</div>
                </div>
            </div>
        </section>
    `;

  // 3. Couple section (single section, both profiles)
  const renderTextWithBreaks = (text) =>
    String(text ?? "")
      .split("\n")
      .map((line) => escapeAttr(line))
      .join("<br>");

  const renderPersonCard = (person) => `
        <div class="w-full flex flex-col items-center">
            <div class="rotated-borders-container z-10 reveal" data-reveal>
                <div class="rotated-border-1"></div>
                <div class="rotated-border-2"></div>
                <div class="photo-inner bg-white shadow-xl">
                    <img src="${person.photo}" alt="${person.name}" onerror="this.src='https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
                </div>
            </div>

            <div class="text-center mt-10 px-2 z-10 w-full reveal" data-reveal>
                <h3 class="font-script text-6xl text-wedding-red mb-2">${person.name}</h3>
                <p class="text-wedding-rose text-base font-medium leading-relaxed max-w-[320px] mx-auto text-center">
                    ${renderTextWithBreaks(person.details)}
                </p>
            </div>
        </div>
    `;

  const renderCouple = () => `
        <section class="section-animate min-h-screen flex flex-col items-center justify-center py-14 sm:py-16 px-4 sm:px-6 bg-wedding-bg relative overflow-hidden">
            <div class="text-center mb-10 z-10">
                <div class="text-[11px] tracking-[0.32em] uppercase text-gray-600/80 font-semibold mb-3">
                    With immense joy
                </div>
                <h2 class="font-serif font-bold text-3xl text-wedding-red tracking-widest uppercase">
                    We are inviting you
                </h2>
            </div>

            <div class="w-full flex flex-col gap-8 sm:gap-10">
                ${renderPersonCard(WEDDING_DATA.groom)}
                <div class="my-1">${separatorHtml}</div>
                ${renderPersonCard(WEDDING_DATA.bride)}
            </div>
        </section>
    `;

  // 4. Wedding Events section
  const renderEvents = () => {
    let eventsHtml = "";
    WEDDING_DATA.events.forEach((event) => {
      const eventCalLink = buildGoogleCalendarLink({
        title: `${event.name || "Wedding"} — ${WEDDING_DATA.groom.name} & ${WEDDING_DATA.bride.name}`,
        startIso: WEDDING_DATA.weddingDate,
        durationMinutes: 180,
        details: event.subtitle || "Wedding Invitation",
      });
      eventsHtml += `
            <section class="section-animate w-full min-h-[92vh] flex items-center justify-center py-16 px-5 bg-wedding-bg relative overflow-hidden">
                <div class="w-full max-w-[420px] relative z-10">
                    <div class="text-center mb-7">
                        <div class="text-[11px] tracking-[0.32em] uppercase text-gray-600/80 font-semibold mb-3">${event.title}</div>
                        <h3 class="font-serif font-bold text-3xl text-wedding-red tracking-widest uppercase">${event.name}</h3>
                        <p class="mt-3 text-gray-600">${renderTextWithBreaks(event.subtitle)}</p>
                    </div>

                    <div class="reveal rounded-[22px] overflow-hidden border border-black/10 shadow-lg shadow-black/10 bg-white" data-reveal>
                        <div class="aspect-[4/3] w-full overflow-hidden">
                            <img src="${event.photo}" alt="${event.title}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
                        </div>
                        <div class="p-5">
                            <div class="flex flex-col gap-3">
                                <a href="${escapeAttr(event.mapUrl || WEDDING_DATA.venueMapUrl || "#")}" target="_blank"
                                   class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-wedding-red text-white font-semibold shadow-sm active:scale-[0.98] transition">
                                   View on Google Maps
                                </a>
                                <a href="${escapeAttr(eventCalLink)}" target="_blank"
                                   class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white border border-black/10 text-gray-800 font-semibold shadow-sm active:scale-[0.98] transition">
                                   Save Google Calendar
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            `;
    });

    return eventsHtml;
  };

  // 5. Gallery Section
  const renderGallery = () => {
    if (!WEDDING_DATA.gallery || WEDDING_DATA.gallery.length === 0) return "";

    let galleryHtml =
      '<div class="grid grid-cols-2 gap-4 p-4 z-10 w-full max-w-[400px] mx-auto">';
    WEDDING_DATA.gallery.forEach((img, idx) => {
      galleryHtml += `
                <button type="button" class="reveal aspect-square rounded-2xl overflow-hidden shadow-md border border-black/10 bg-gray-100 active:scale-[0.99] transition"
                        data-reveal style="transition-delay: ${idx * 40}ms;"
                        data-gallery-open="${idx}" aria-label="Open photo ${idx + 1}">
                    <img src="${img}" alt="Gallery Photo" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" onerror="this.src='https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'">
                </button>
            `;
    });
    galleryHtml += "</div>";

    return `
        <section class="section-animate min-h-screen py-16 px-4 bg-wedding-bg relative overflow-hidden flex flex-col items-center">
            <h2 class="font-serif font-bold text-3xl text-wedding-red mb-8 z-10 tracking-widest uppercase">Gallery</h2>
            ${galleryHtml}
        </section>
        `;
  };

  // ── Render the entire app ─────────────────────────────────────────────
  app.classList.add("pb-10");

  app.innerHTML = `
        ${renderHero()}
        ${renderCountdown()}
        ${renderCouple()}
        ${renderEvents()}
        ${renderGallery()}
    `;

  // No heavy canvas/particles — keep it clean & fast

  // ── Gallery lightbox (minimal) ─────────────────────────────────────────
  const galleryImgs = Array.isArray(WEDDING_DATA.gallery)
    ? WEDDING_DATA.gallery
    : [];
  if (galleryImgs.length) {
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.className =
      "fixed inset-0 hidden items-center justify-center bg-black/90 z-[6000] p-6";
    lightbox.innerHTML = `
            <button type="button" data-lb-close class="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 border border-white/25 text-white text-2xl leading-none flex items-center justify-center">×</button>
            <button type="button" data-lb-prev class="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/25 text-white text-xl flex items-center justify-center">‹</button>
            <button type="button" data-lb-next class="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/25 text-white text-xl flex items-center justify-center">›</button>
            <img data-lb-img alt="Gallery" class="max-w-full max-h-full rounded-2xl shadow-2xl shadow-black/40 select-none" />
        `;
    document.body.appendChild(lightbox);

    const imgEl = lightbox.querySelector("[data-lb-img]");
    const open = (i) => {
      idx = Math.max(0, Math.min(galleryImgs.length - 1, i));
      imgEl.src = galleryImgs[idx];
      lightbox.classList.remove("hidden");
      lightbox.classList.add("flex");
      document.body.style.overflow = "hidden";
    };
    const close = () => {
      lightbox.classList.add("hidden");
      lightbox.classList.remove("flex");
      document.body.style.overflow = "";
    };
    const step = (dir) =>
      open((idx + dir + galleryImgs.length) % galleryImgs.length);

    let idx = 0;
    app.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-gallery-open]");
      if (!btn) return;
      const i = Number(btn.getAttribute("data-gallery-open"));
      if (!Number.isFinite(i)) return;
      open(i);
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    lightbox.querySelector("[data-lb-close]").addEventListener("click", close);
    lightbox
      .querySelector("[data-lb-prev]")
      .addEventListener("click", () => step(-1));
    lightbox
      .querySelector("[data-lb-next]")
      .addEventListener("click", () => step(1));

    window.addEventListener("keydown", (e) => {
      if (lightbox.classList.contains("hidden")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  // ── Section entrance animations via IntersectionObserver ──────────────
  // The first section starts visible immediately
  const sections = app.querySelectorAll(".section-animate");
  const markVisible = () => {
    sections.forEach((section, i) => {
      if (i === 0) section.classList.add("visible");
      else section.classList.add("visible");
    });
  };

  if (!("IntersectionObserver" in window)) {
    markVisible();
  } else {
    sections.forEach((section, i) => {
      if (i === 0) {
        section.classList.add("visible");
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target); // animate only once
            }
          });
        },
        { threshold: 0.12 },
      );
      observer.observe(section);
    });
  }

  // ── Element-level scroll reveals (staggered) ──────────────────────────
  const revealEls = app.querySelectorAll("[data-reveal]");
  if (!revealEls.length) {
    // nothing
  } else if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          revealObs.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    revealEls.forEach((el) => revealObs.observe(el));
  }

  // ── Countdown Timer ───────────────────────────────────────────────────
  function updateCountdown() {
    const weddingDate = new Date(WEDDING_DATA.weddingDate).getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      ["days", "hours", "minutes", "seconds"].forEach((id) => {
        document.getElementById(id).textContent = "00";
      });
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(
      2,
      "0",
    );
    document.getElementById("minutes").textContent = String(minutes).padStart(
      2,
      "0",
    );
    document.getElementById("seconds").textContent = String(seconds).padStart(
      2,
      "0",
    );
  }

  if (document.getElementById("days")) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
});
