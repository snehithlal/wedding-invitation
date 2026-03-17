// script.js
// Powered by data.js

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    
    // Check if data exists
    if (typeof WEDDING_DATA === 'undefined') {
        app.innerHTML = '<div class="p-8 text-center text-red-500">Error: WEDDING_DATA is not defined. Please ensure data.js is loaded correctly.</div>';
        return;
    }

    // ── Set up the global fixed map button ──────────────────────────────────
    const globalMapBtns = document.querySelectorAll('#global-map-btn');
    const globalMapBtn = globalMapBtns[0] ?? null;
    if (globalMapBtns.length > 1) {
        globalMapBtns.forEach((el, idx) => {
            if (idx !== 0) el.remove();
        });
    }
    if (globalMapBtn) globalMapBtn.href = WEDDING_DATA.venueMapUrl;
    
    const flowerVector = 'https://cdn-icons-png.flaticon.com/512/8202/8202479.png';
    const bgWatermarkUrl = 'https://img.freepik.com/free-vector/botanical-leaves-background-vector-design_53876-140220.jpg';

    const escapeAttr = (v) =>
        String(v ?? '')
            .replaceAll('&', '&amp;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;');

    const buildGoogleCalendarLink = ({ title, startIso, durationMinutes = 120, details = '', location = '' }) => {
        const start = new Date(startIso);
        if (Number.isNaN(start.getTime())) return '#';
        const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
        const fmt = (d) =>
            d.toISOString().replaceAll('-', '').replaceAll(':', '').replace(/\.\d{3}Z$/, 'Z');
        const params = new URLSearchParams({
            action: 'TEMPLATE',
            text: title,
            dates: `${fmt(start)}/${fmt(end)}`,
            details,
            location,
        });
        return `https://calendar.google.com/calendar/render?${params.toString()}`;
    };

    // 1. Hero Section
    const renderHero = () => `
        <section class="section-animate min-h-[92vh] flex flex-col items-center justify-center px-6 pt-16 pb-24 relative overflow-hidden bg-wedding-bg">
            <div class="bg-blobs" aria-hidden="true">
                <div class="blob blob-1"></div>
                <div class="blob blob-2"></div>
                <div class="blob blob-3"></div>
            </div>

            <img src="${bgWatermarkUrl}" class="watermark watermark-top mix-blend-multiply" alt="">
            <img src="${bgWatermarkUrl}" class="watermark watermark-bottom mix-blend-multiply" alt="">

            <div class="relative z-10 w-full flex flex-col items-center">
                <div class="text-[11px] tracking-[0.32em] uppercase text-gray-600/80 font-semibold mb-4">
                    Wedding invitation
                </div>

                <div class="arch-image-wrapper mx-auto mb-8 shadow-lg">
                    <img src="${WEDDING_DATA.couplePhoto}" class="arch-image" alt="Couple Photo" onerror="this.src='https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
                </div>

                <div class="text-center w-full flex flex-col items-center">
                    <h1 class="font-script text-6xl text-wedding-green tracking-wide leading-tight">${WEDDING_DATA.groom.name}</h1>
                    <div class="flex items-center gap-3 my-3">
                        <div class="h-px w-12 bg-gray-800/30"></div>
                        <div class="font-serif text-xl text-wedding-pink">&</div>
                        <div class="h-px w-12 bg-gray-800/30"></div>
                    </div>
                    <h1 class="font-script text-6xl text-wedding-green tracking-wide leading-tight">${WEDDING_DATA.bride.name}</h1>

                    <div class="mt-5 text-wedding-pink font-serif font-semibold tracking-widest">
                        ${WEDDING_DATA.weddingDateDisplay}
                    </div>

                    <div class="mt-7 flex gap-3">
                        <a href="${escapeAttr(buildGoogleCalendarLink({
                            title: `${WEDDING_DATA.groom.name} & ${WEDDING_DATA.bride.name} Wedding`,
                            startIso: WEDDING_DATA.weddingDate,
                            durationMinutes: 180,
                            details: 'Wedding Invitation',
                        }))}" target="_blank"
                           class="px-5 py-3 rounded-full bg-wedding-green text-white font-semibold shadow-lg shadow-black/10 active:scale-[0.98] transition">
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
        <section id="big-day" class="section-animate min-h-[92vh] flex flex-col items-center justify-center py-16 px-6 bg-wedding-bg relative overflow-hidden">
            <img src="${bgWatermarkUrl}" class="watermark watermark-top mix-blend-multiply" alt="">
            <img src="${bgWatermarkUrl}" class="watermark watermark-bottom mix-blend-multiply" alt="">

            <div class="relative z-10 text-center">
                <div class="text-[11px] tracking-[0.32em] uppercase text-gray-600/80 font-semibold mb-3">
                    The big day
                </div>
                <h2 class="font-script text-5xl text-wedding-green mb-2">Count Down</h2>
                <p class="text-gray-600 max-w-[320px] mx-auto">
                    We can’t wait to celebrate with you.
                </p>
            </div>

            <div class="mt-10 grid grid-cols-2 gap-4 w-full max-w-[340px] z-10">
                <div class="bg-white/70 backdrop-blur border border-black/10 rounded-2xl p-5 shadow-sm">
                    <div class="text-5xl font-extrabold tracking-tight text-wedding-green" style="font-variant-numeric: tabular-nums;" id="days">00</div>
                    <div class="mt-2 text-[10px] tracking-[0.28em] uppercase text-gray-600 font-semibold">Days</div>
                </div>
                <div class="bg-white/70 backdrop-blur border border-black/10 rounded-2xl p-5 shadow-sm">
                    <div class="text-5xl font-extrabold tracking-tight text-wedding-green" style="font-variant-numeric: tabular-nums;" id="hours">00</div>
                    <div class="mt-2 text-[10px] tracking-[0.28em] uppercase text-gray-600 font-semibold">Hours</div>
                </div>
                <div class="bg-white/70 backdrop-blur border border-black/10 rounded-2xl p-5 shadow-sm">
                    <div class="text-5xl font-extrabold tracking-tight text-wedding-green" style="font-variant-numeric: tabular-nums;" id="minutes">00</div>
                    <div class="mt-2 text-[10px] tracking-[0.28em] uppercase text-gray-600 font-semibold">Mins</div>
                </div>
                <div class="bg-white/70 backdrop-blur border border-black/10 rounded-2xl p-5 shadow-sm">
                    <div class="text-5xl font-extrabold tracking-tight text-wedding-green" style="font-variant-numeric: tabular-nums;" id="seconds">00</div>
                    <div class="mt-2 text-[10px] tracking-[0.28em] uppercase text-gray-600 font-semibold">Secs</div>
                </div>
            </div>
        </section>
    `;

    // 3. Couple section (single section, both profiles)
    const renderPersonCard = (person) => `
        <div class="w-full flex flex-col items-center">
            <div class="rotated-borders-container z-10">
                <div class="rotated-border-1"></div>
                <div class="rotated-border-2"></div>
                <div class="photo-inner bg-white shadow-xl">
                    <img src="${person.photo}" alt="${person.name}" onerror="this.src='https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
                </div>
            </div>

            <div class="text-center mt-10 px-2 z-10 w-full">
                <h3 class="font-script text-6xl text-wedding-green mb-3">${person.name}</h3>
                <p class="text-wedding-pink text-base font-medium leading-relaxed max-w-[320px] mx-auto text-center">
                    ${person.details}
                </p>
            </div>
        </div>
    `;

    const renderCouple = () => `
        <section class="section-animate min-h-screen flex flex-col items-center justify-center py-16 px-6 bg-white relative overflow-hidden">
            <div class="text-center mb-10 z-10">
                <div class="text-[11px] tracking-[0.32em] uppercase text-gray-600/80 font-semibold mb-3">
                    With immense joy
                </div>
                <h2 class="font-serif font-bold text-3xl text-wedding-green tracking-widest uppercase">
                    We are inviting you
                </h2>
            </div>

            <div class="w-full flex flex-col gap-10">
                ${renderPersonCard(WEDDING_DATA.groom)}
                <div class="flex items-center justify-center gap-3">
                    <div class="h-px w-16 bg-gray-800/25"></div>
                    <div class="font-serif text-wedding-pink font-semibold">&</div>
                    <div class="h-px w-16 bg-gray-800/25"></div>
                </div>
                ${renderPersonCard(WEDDING_DATA.bride)}
            </div>
        </section>
    `;

    // 4. Wedding Events section
    const renderEvents = () => {
        let eventsHtml = '';
        WEDDING_DATA.events.forEach(event => {
            const eventCalLink = buildGoogleCalendarLink({
                title: `${event.name || 'Wedding'} — ${WEDDING_DATA.groom.name} & ${WEDDING_DATA.bride.name}`,
                startIso: WEDDING_DATA.weddingDate,
                durationMinutes: 180,
                details: event.subtitle || 'Wedding Invitation',
            });
            eventsHtml += `
            <section class="section-animate w-full min-h-[92vh] flex items-center justify-center py-16 px-5 bg-white relative overflow-hidden">
                <div class="w-full max-w-[420px] relative z-10">
                    <div class="text-center mb-7">
                        <div class="text-[11px] tracking-[0.32em] uppercase text-gray-600/80 font-semibold mb-3">${event.title}</div>
                        <h3 class="font-serif font-bold text-3xl text-wedding-green tracking-widest uppercase">${event.name}</h3>
                        <p class="mt-3 text-gray-600">${event.subtitle}</p>
                    </div>

                    <div class="rounded-[22px] overflow-hidden border border-black/10 shadow-lg shadow-black/10 bg-white">
                        <div class="aspect-[4/3] w-full overflow-hidden">
                            <img src="${event.photo}" alt="${event.title}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
                        </div>
                        <div class="p-5">
                            <div class="flex flex-col gap-3">
                                <a href="${escapeAttr(event.mapUrl || WEDDING_DATA.venueMapUrl || '#')}" target="_blank"
                                   class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-wedding-green text-white font-semibold shadow-sm active:scale-[0.98] transition">
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
        if (!WEDDING_DATA.gallery || WEDDING_DATA.gallery.length === 0) return '';
        
        let galleryHtml = '<div class="grid grid-cols-2 gap-4 p-4 z-10 w-full max-w-[400px] mx-auto">';
        WEDDING_DATA.gallery.forEach((img, idx) => {
            galleryHtml += `
                <button type="button" class="aspect-square rounded-2xl overflow-hidden shadow-md border border-black/10 bg-gray-100 active:scale-[0.99] transition"
                        data-gallery-open="${idx}" aria-label="Open photo ${idx + 1}">
                    <img src="${img}" alt="Gallery Photo" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" onerror="this.src='https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'">
                </button>
            `;
        });
        galleryHtml += '</div>';

        return `
        <section class="section-animate min-h-screen py-16 px-4 bg-wedding-bg relative overflow-hidden flex flex-col items-center">
            <h2 class="font-serif font-bold text-3xl text-wedding-green mb-8 z-10 tracking-widest uppercase">Gallery</h2>
            ${galleryHtml}
        </section>
        `;
    };

    // ── Render the entire app ─────────────────────────────────────────────
    app.classList.add('pb-10');
    
    app.innerHTML = `
        ${renderHero()}
        ${renderCountdown()}
        ${renderCouple()}
        ${renderEvents()}
        ${renderGallery()}
    `;

    // ── Gallery lightbox (minimal) ─────────────────────────────────────────
    const galleryImgs = Array.isArray(WEDDING_DATA.gallery) ? WEDDING_DATA.gallery : [];
    if (galleryImgs.length) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'fixed inset-0 hidden items-center justify-center bg-black/90 z-[6000] p-6';
        lightbox.innerHTML = `
            <button type="button" data-lb-close class="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 border border-white/25 text-white text-2xl leading-none flex items-center justify-center">×</button>
            <button type="button" data-lb-prev class="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/25 text-white text-xl flex items-center justify-center">‹</button>
            <button type="button" data-lb-next class="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/25 text-white text-xl flex items-center justify-center">›</button>
            <img data-lb-img alt="Gallery" class="max-w-full max-h-full rounded-2xl shadow-2xl shadow-black/40 select-none" />
        `;
        document.body.appendChild(lightbox);

        const imgEl = lightbox.querySelector('[data-lb-img]');
        const open = (i) => {
            idx = Math.max(0, Math.min(galleryImgs.length - 1, i));
            imgEl.src = galleryImgs[idx];
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
            document.body.style.overflow = 'hidden';
        };
        const close = () => {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            document.body.style.overflow = '';
        };
        const step = (dir) => open((idx + dir + galleryImgs.length) % galleryImgs.length);

        let idx = 0;
        app.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-gallery-open]');
            if (!btn) return;
            const i = Number(btn.getAttribute('data-gallery-open'));
            if (!Number.isFinite(i)) return;
            open(i);
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) close();
        });
        lightbox.querySelector('[data-lb-close]').addEventListener('click', close);
        lightbox.querySelector('[data-lb-prev]').addEventListener('click', () => step(-1));
        lightbox.querySelector('[data-lb-next]').addEventListener('click', () => step(1));

        window.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('hidden')) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') step(-1);
            if (e.key === 'ArrowRight') step(1);
        });
    }

    // ── Section entrance animations via IntersectionObserver ──────────────
    // The first section starts visible immediately
    const sections = app.querySelectorAll('.section-animate');
    sections.forEach((section, i) => {
        if (i === 0) {
            // Hero is immediately visible
            section.classList.add('visible');
        } else {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target); // animate only once
                    }
                });
            }, { threshold: 0.12 });
            observer.observe(section);
        }
    });

    // ── Countdown Timer ───────────────────────────────────────────────────
    function updateCountdown() {
        const weddingDate = new Date(WEDDING_DATA.weddingDate).getTime();
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            ['days','hours','minutes','seconds'].forEach(id => {
                document.getElementById(id).textContent = '00';
            });
            return;
        }

        const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent    = String(days).padStart(2, '0');
        document.getElementById('hours').textContent   = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    if (document.getElementById('days')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
});
