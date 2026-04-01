// script.js

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app-inner");

  // Check if data exists
  if (typeof WEDDING_DATA === "undefined") {
    const appEl = document.getElementById('app-inner') || document.getElementById('app');
    if (appEl) appEl.innerHTML =
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

  const separatorHtml = `
        <div class="flex items-center justify-center gap-3" aria-hidden="true">
            <div class="h-px w-14" style="background:rgba(91,45,142,0.22)"></div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style="color:#D4AF37" class="drop-shadow-sm">
                <path d="M12 21s-7-4.6-7-10a7 7 0 0 1 14 0c0 5.4-7 10-7 10Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 7.8c1.2-1.5 3.4-1.4 4.6.1 1.2 1.5.7 3.6-1 4.6-1 .6-2.2.7-3.2.2-1 .5-2.2.4-3.2-.2-1.7-1-2.2-3.1-1-4.6 1.2-1.5 3.4-1.6 4.6-.1Z" fill="currentColor" opacity="0.45"/>
            </svg>
            <div class="h-px w-14" style="background:rgba(91,45,142,0.22)"></div>
        </div>
    `;

  const getWeddingTimeDisplay = () => {
    if (WEDDING_DATA.weddingTimeDisplay) return WEDDING_DATA.weddingTimeDisplay;
    const weddingDate = new Date(WEDDING_DATA.weddingDate);
    if (Number.isNaN(weddingDate.getTime())) return "";
    return weddingDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };


  // 1. Hero Section
  const renderHero = () => `
        <section class="section-animate flex flex-col items-center justify-center px-4 sm:px-6 py-12 relative min-h-[100dvh]">
            <div class="bg-blobs" aria-hidden="true">
                <div class="blob blob-1"></div>
                <div class="blob blob-2"></div>
                <div class="blob blob-3"></div>
            </div>

            <div class="relative z-10 w-full flex flex-col items-center">
                <div class="fade-up d1 text-[11px] tracking-[0.32em] uppercase text-gray-600/80 font-semibold mb-5">
                    Wedding invitation
                </div>

                <div class="fade-up d2 arch-image-wrapper mx-auto mb-6 shadow-lg lift">
                    <img src="${WEDDING_DATA.couplePhoto}" class="arch-image" alt="Couple Photo" onerror="this.src='https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
                </div>

                <div class="text-center w-full flex flex-col items-center">
                    <h1 class="fade-up d3 font-script text-5xl sm:text-6xl text-wedding-red tracking-wide leading-tight">${WEDDING_DATA.groom.name}</h1>

                    <div class="fade-up d4 my-3">${separatorHtml}</div>

                    <h1 class="fade-up d4 font-script text-5xl sm:text-6xl text-wedding-red tracking-wide leading-tight">${WEDDING_DATA.bride.name}</h1>

                    <div class="fade-up d5 mt-4 text-wedding-rose font-sans font-medium tracking-[0.25em] text-[10px] sm:text-[11px] uppercase">
                        ${WEDDING_DATA.weddingDateDisplay}
                    </div>

                    <div class="fade-up d5 mt-2 text-wedding-rose font-sans font-semibold tracking-[0.2em] text-[10px] sm:text-[11px] uppercase opacity-90">
                      ${getWeddingTimeDisplay()}
                    </div>

                    <div class="fade-up d5 mt-5 flex gap-3">
                        <a href="${escapeAttr(
                          buildGoogleCalendarLink({
                            title: `${WEDDING_DATA.groom.name} & ${WEDDING_DATA.bride.name} Wedding`,
                            startIso: WEDDING_DATA.weddingDate,
                            durationMinutes: 180,
                            location: (WEDDING_DATA.events[0]?.subtitle || '').split('\n')[0].replace(/^At\s*/i, ''),
                            details: `You are cordially invited to celebrate the wedding of ${WEDDING_DATA.groom.name} & ${WEDDING_DATA.bride.name}.\n\n📍 Venue: ${(WEDDING_DATA.events[0]?.subtitle || '').split('\n')[0].replace(/^At\s*/i, '')}\n🗺️ Directions: ${WEDDING_DATA.venueMapUrl}\n⏰ Time: ${WEDDING_DATA.weddingTimeDisplay}\n\n💌 Digital Invitation: https://snehith-weds-krishnapriya.online`,
                          }),
                        )}" target="_blank"
                           class="px-5 py-3 rounded-full text-white font-semibold shadow-lg shadow-black/10 active:scale-[0.98] transition text-[14px]" style="background:#5B2D8E;">
                           Save Google Calendar
                        </a>
                    </div>
                </div>
            </div>
        </section>
    `;

  // 2. Date & Count Down
  const renderCountdown = () => `
        <section id="big-day" class="section-animate min-h-[92vh] flex flex-col items-center justify-center py-14 sm:py-16 px-4 sm:px-6 bg-wedding-bg relative overflow-hidden">
            <div class="relative z-10 text-center reveal" data-reveal style="transition-delay: 0ms;">
                <div class="text-[11px] tracking-[0.32em] uppercase text-gray-600/80 font-semibold mb-3">
                    The big day
                </div>
                <h2 class="font-script text-4xl sm:text-5xl text-wedding-red mb-2">Count Down</h2>
                <p class="text-gray-600 max-w-[320px] mx-auto">
                    We can't wait to celebrate with you.
                </p>
            </div>

            <div class="mt-9 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[340px] z-10">
                <div class="reveal bg-white/70 backdrop-blur border border-black/10 rounded-2xl p-5 shadow-sm" data-reveal style="transition-delay: 40ms;">
                    <div class="text-4xl sm:text-5xl font-extrabold tracking-tight" style="color:#5B2D8E;font-variant-numeric:tabular-nums;" id="days">00</div>
                    <div class="mt-2 text-[10px] tracking-[0.28em] uppercase text-gray-600 font-semibold">Days</div>
                </div>
                <div class="reveal bg-white/70 backdrop-blur border border-black/10 rounded-2xl p-5 shadow-sm" data-reveal style="transition-delay: 90ms;">
                    <div class="text-4xl sm:text-5xl font-extrabold tracking-tight" style="color:#5B2D8E;font-variant-numeric:tabular-nums;" id="hours">00</div>
                    <div class="mt-2 text-[10px] tracking-[0.28em] uppercase text-gray-600 font-semibold">Hours</div>
                </div>
                <div class="reveal bg-white/70 backdrop-blur border border-black/10 rounded-2xl p-5 shadow-sm" data-reveal style="transition-delay: 140ms;">
                    <div class="text-4xl sm:text-5xl font-extrabold tracking-tight" style="color:#5B2D8E;font-variant-numeric:tabular-nums;" id="minutes">00</div>
                    <div class="mt-2 text-[10px] tracking-[0.28em] uppercase text-gray-600 font-semibold">Mins</div>
                </div>
                <div class="reveal bg-white/70 backdrop-blur border border-black/10 rounded-2xl p-5 shadow-sm" data-reveal style="transition-delay: 190ms;">
                    <div class="text-4xl sm:text-5xl font-extrabold tracking-tight" style="color:#5B2D8E;font-variant-numeric:tabular-nums;" id="seconds">00</div>
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
                <h3 class="font-script text-6xl text-wedding-red mb-4">${person.name}</h3>
                <p class="text-wedding-rose text-[13px] font-normal leading-loose tracking-[0.05em] max-w-[320px] mx-auto text-center">
                    ${renderTextWithBreaks(person.details)}
                </p>
                ${person.mapUrl ? `
                <div class="mt-6 flex justify-center">
                    <a href="${escapeAttr(person.mapUrl)}" target="_blank" class="flex flex-col items-center gap-2 group">
                        <span class="w-14 h-14 rounded-full bg-white shadow-md border border-[rgba(91,45,142,0.15)] flex items-center justify-center text-[#5B2D8E] group-hover:bg-[#5B2D8E] group-hover:text-white transition-all duration-300">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        </span>
                        <span class="text-[9px] tracking-[0.2em] uppercase text-[#3d1a6e] font-semibold opacity-80">Location Map</span>
                    </a>
                </div>
                ` : ''}
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

  // 4. Wedding Events section — visual detail cards + action buttons
  const renderEvents = () => {
    let eventsHtml = "";
    WEDDING_DATA.events.forEach((event) => {
      const subtitleLines = (event.subtitle || '').split('\n');
      const venueLine = subtitleLines[0]?.replace(/^At\s*/i, '') || '';
      const timeLine  = subtitleLines[1] || '';
      const eventCalLink = buildGoogleCalendarLink({
        title: `${event.name || "Wedding"} — ${WEDDING_DATA.groom.name} & ${WEDDING_DATA.bride.name}`,
        startIso: WEDDING_DATA.weddingDate,
        durationMinutes: 180,
        location: venueLine,
        details: `You are cordially invited to celebrate the wedding of ${WEDDING_DATA.groom.name} & ${WEDDING_DATA.bride.name}.\n\n📍 Venue: ${venueLine}\n🗺️ Directions: ${WEDDING_DATA.venueMapUrl}\n⏰ Time: ${WEDDING_DATA.weddingTimeDisplay}\n\n💌 Digital Invitation: https://snehith-weds-krishnapriya.online`,
      });

      eventsHtml += `
            <section class="section-animate w-full flex flex-col items-center justify-center py-12 px-5 bg-wedding-bg relative overflow-hidden">
                <!-- Decorative rings SVG -->
                <div class="reveal mb-6" data-reveal>
                    <svg width="72" height="44" viewBox="0 0 72 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <circle cx="26" cy="22" r="18" stroke="#5B2D8E" stroke-width="2.5" fill="none" opacity="0.85"/>
                        <circle cx="46" cy="22" r="18" stroke="#5B2D8E" stroke-width="2.5" fill="none" opacity="0.85"/>
                        <circle cx="26" cy="22" r="12" stroke="#D4AF37" stroke-width="1.2" fill="none" opacity="0.55"/>
                        <circle cx="46" cy="22" r="12" stroke="#D4AF37" stroke-width="1.2" fill="none" opacity="0.55"/>
                    </svg>
                </div>

                <div class="w-full max-w-[420px] relative z-10">
                    <!-- Title -->
                    <div class="text-center mb-6 reveal" data-reveal>
                        <div class="text-[11px] tracking-[0.32em] uppercase text-gray-600/80 font-semibold mb-2">${event.title}</div>
                        <h3 class="font-serif font-bold text-3xl text-wedding-red tracking-widest uppercase">${event.name}</h3>
                    </div>

                    <!-- Venue + Time info cards -->
                    <div class="flex flex-col gap-3 mb-6">
                        ${venueLine ? `
                        <div class="reveal flex items-start gap-3 bg-white/72 backdrop-blur-sm border border-black/08 rounded-2xl px-4 py-4 shadow-sm" data-reveal>
                            <span class="mt-0.5 shrink-0 w-8 h-8 rounded-full bg-wedding-red/10 flex items-center justify-center">
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B2D8E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                            </span>
                            <div>
                                <div class="text-[9px] tracking-[0.35em] uppercase text-gray-500 font-semibold mb-1">Venue</div>
                                <div class="text-[13px] font-medium text-gray-800 leading-relaxed tracking-[0.02em]">${escapeAttr(venueLine)}</div>
                            </div>
                        </div>` : ""}

                        ${timeLine ? `
                        <div class="reveal flex items-start gap-3 bg-white/72 backdrop-blur-sm border border-black/08 rounded-2xl px-4 py-4 shadow-sm" data-reveal>
                            <span class="mt-0.5 shrink-0 w-8 h-8 rounded-full bg-wedding-red/10 flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B2D8E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <polyline points="12 6 12 12 16 14"/>
                                </svg>
                            </span>
                            <div>
                                <div class="text-[9px] tracking-[0.35em] uppercase text-gray-500 font-semibold mb-1">Time</div>
                                <div class="text-[13px] font-medium text-gray-800 leading-relaxed tracking-[0.02em]">${timeLine}</div>
                            </div>
                        </div>` : ""}

                        <div class="reveal flex items-start gap-3 bg-white/72 backdrop-blur-sm border border-black/08 rounded-2xl px-4 py-4 shadow-sm" data-reveal>
                            <span class="mt-0.5 shrink-0 w-8 h-8 rounded-full bg-wedding-red/10 flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B2D8E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg>
                            </span>
                            <div>
                                <div class="text-[9px] tracking-[0.35em] uppercase text-gray-500 font-semibold mb-1">Date</div>
                                <div class="text-[13px] font-medium text-gray-800 leading-relaxed tracking-[0.02em]">${WEDDING_DATA.weddingDateDisplay}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Action buttons -->
                    <div class="reveal mt-8 flex justify-center gap-6" data-reveal>
                        <a href="${escapeAttr(event.mapUrl || WEDDING_DATA.venueMapUrl || "#")}" target="_blank"
                           class="flex flex-col items-center gap-2 group">
                           <span class="w-14 h-14 rounded-full bg-white shadow-md border border-[rgba(91,45,142,0.15)] flex items-center justify-center text-[#5B2D8E] group-hover:bg-[#5B2D8E] group-hover:text-white transition-all duration-300">
                               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                           </span>
                           <span class="text-[9px] tracking-[0.2em] uppercase text-[#3d1a6e] font-semibold opacity-80">View Map</span>
                        </a>
                        <a href="${escapeAttr(eventCalLink)}" target="_blank"
                           class="flex flex-col items-center gap-2 group">
                           <span class="w-14 h-14 rounded-full bg-white shadow-md border border-[rgba(91,45,142,0.15)] flex items-center justify-center text-[#5B2D8E] group-hover:bg-[#5B2D8E] group-hover:text-white transition-all duration-300">
                               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                           </span>
                           <span class="text-[9px] tracking-[0.2em] uppercase text-[#3d1a6e] font-semibold opacity-80 whitespace-nowrap">Add to Calendar</span>
                        </a>
                    </div>
                </div>
            </section>
            `;
    });

    return eventsHtml;
  };

  // 5. Gallery Section — hidden temporarily (no photos yet)
  // const renderGallery = () => { ... };

  // ── Render the entire app ─────────────────────────────────────────────
  app.classList.add("pb-10");

  app.innerHTML = `
        ${renderHero()}
        ${renderCountdown()}
        ${renderCouple()}
        ${renderEvents()}
    `;

  // ── Populate envelope cover with dynamic data ──────────────────────────
  const envNames = document.getElementById('env-names-display');
  if (envNames) {
    envNames.innerHTML = `${WEDDING_DATA.groom.name}<br>
        <span style="display:block; font-size:0.65em; line-height:1; margin:8px 0; color:#4a1e88; opacity:0.85;">&amp;</span>
        ${WEDDING_DATA.bride.name}`;
  }
  const envDate = document.getElementById('env-date-display');
  if (envDate) {
    envDate.textContent = WEDDING_DATA.weddingDateDisplay
      .split(',').map(s => s.trim()).join(', ');
  }
  const envTime = document.getElementById('env-time-display');
  if (envTime) {
    envTime.textContent = getWeddingTimeDisplay();
  }



  // ── Section entrance animations via IntersectionObserver ──────────────
  const sections = app.querySelectorAll(".section-animate");
  const revealRoot = document.getElementById('invitation-reveal');

  if (!("IntersectionObserver" in window)) {
    sections.forEach((s) => s.classList.add("visible"));
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
              observer.unobserve(entry.target);
            }
          });
        },
        { root: revealRoot, threshold: 0.08 },
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
      { root: revealRoot, threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
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
