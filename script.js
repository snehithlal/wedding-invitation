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

    // 1. Hero Section
    const renderHero = () => `
        <section class="section-animate min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-wedding-bg">
            <img src="${bgWatermarkUrl}" class="watermark watermark-top mix-blend-multiply" alt="">
            <img src="${bgWatermarkUrl}" class="watermark watermark-bottom mix-blend-multiply" alt="">
            
            <img src="${flowerVector}" class="absolute top-0 right-0 w-32 opacity-80" style="transform: rotate(90deg) translate(20px, 20px)" alt="floral" onerror="this.style.display='none'">
            <img src="${flowerVector}" class="absolute top-0 left-0 w-32 opacity-80" style="transform: translate(-20px, -20px)" alt="floral" onerror="this.style.display='none'">
            
            <div class="arch-image-wrapper mx-auto mt-4 mb-8 shadow-lg z-10">
                <img src="${WEDDING_DATA.couplePhoto}" class="arch-image" alt="Couple Photo" onerror="this.src='https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
            </div>
            
            <div class="text-center mt-2 z-10 w-full flex flex-col items-center">
                <h1 class="font-script text-6xl text-wedding-green tracking-wide">${WEDDING_DATA.groom.name}</h1>
                <div class="my-4 text-wedding-pink text-3xl animate-pulse">❤️</div>
                <h1 class="font-script text-6xl text-wedding-green tracking-wide">${WEDDING_DATA.bride.name}</h1>
            </div>
        </section>
    `;

    // 2. Date & Count Down
    const renderCountdown = () => `
        <section class="section-animate min-h-screen flex flex-col items-center justify-center py-16 px-6 bg-wedding-bg relative overflow-hidden">
            <img src="${bgWatermarkUrl}" class="watermark watermark-top mix-blend-multiply" alt="">
            <img src="${bgWatermarkUrl}" class="watermark watermark-bottom mix-blend-multiply" alt="">

            <h2 class="font-serif font-bold text-3xl text-wedding-pink mb-10 tracking-widest z-10">${WEDDING_DATA.weddingDateDisplay}</h2>
            
            <h1 class="font-script text-5xl text-wedding-green mb-10 z-10">Count Down</h1>
            
            <div class="flex flex-wrap justify-center gap-4 max-w-[320px] z-10">
                <!-- Days -->
                <div class="bg-wedding-box text-white rounded-xl w-[5.5rem] h-28 flex flex-col items-center justify-center shadow-lg">
                    <span class="text-4xl font-extrabold font-sans tracking-tight leading-none mb-1" style="font-variant-numeric: tabular-nums;" id="days">00</span>
                    <div class="w-10 border-b-2 border-white opacity-50 my-1"></div>
                    <span class="text-[10px] tracking-[0.2em] font-semibold uppercase">Days</span>
                </div>
                <!-- Hours -->
                <div class="bg-wedding-box text-white rounded-xl w-[5.5rem] h-28 flex flex-col items-center justify-center shadow-lg">
                    <span class="text-4xl font-extrabold font-sans tracking-tight leading-none mb-1" style="font-variant-numeric: tabular-nums;" id="hours">00</span>
                    <div class="w-10 border-b-2 border-white opacity-50 my-1"></div>
                    <span class="text-[10px] tracking-[0.2em] font-semibold uppercase">Hours</span>
                </div>
                <!-- Minutes -->
                <div class="bg-wedding-box text-white rounded-xl w-[5.5rem] h-28 flex flex-col items-center justify-center shadow-lg">
                    <span class="text-4xl font-extrabold font-sans tracking-tight leading-none mb-1" style="font-variant-numeric: tabular-nums;" id="minutes">00</span>
                    <div class="w-10 border-b-2 border-white opacity-50 my-1"></div>
                    <span class="text-[10px] tracking-[0.2em] font-semibold uppercase">Mins</span>
                </div>
                <!-- Seconds -->
                <div class="bg-wedding-box text-white rounded-xl w-[5.5rem] h-28 flex flex-col items-center justify-center shadow-lg">
                    <span class="text-4xl font-extrabold font-sans tracking-tight leading-none mb-1" style="font-variant-numeric: tabular-nums;" id="seconds">00</span>
                    <div class="w-10 border-b-2 border-white opacity-50 my-1"></div>
                    <span class="text-[10px] tracking-[0.2em] font-semibold uppercase">Secs</span>
                </div>
            </div>
        </section>
    `;

    // 3. About Us section
    const renderAboutUs = (person) => `
        <section class="section-animate min-h-screen flex flex-col items-center justify-center py-16 px-6 bg-white relative overflow-hidden">
            <h2 class="font-serif font-bold text-3xl text-wedding-green tracking-widest uppercase mb-6 z-10">About Us</h2>
            
            <div class="rotated-borders-container z-10">
                <div class="rotated-border-1"></div>
                <div class="rotated-border-2"></div>
                <div class="photo-inner bg-white shadow-xl">
                    <img src="${person.photo}" alt="${person.name}" onerror="this.src='https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
                </div>
            </div>
            
            <div class="text-center mt-12 px-2 z-10 w-full">
                <h3 class="font-script text-6xl text-wedding-green mb-4">${person.name}</h3>
                <p class="text-wedding-pink text-base font-medium leading-relaxed max-w-[280px] mx-auto text-center">
                    ${person.details}
                </p>
            </div>
        </section>
    `;

    // 4. Wedding Events section
    const renderEvents = () => {
        let eventsHtml = '';
        WEDDING_DATA.events.forEach(event => {
            eventsHtml += `
            <section class="section-animate flex flex-col items-center text-center w-full min-h-screen justify-center py-12 px-4 bg-white relative overflow-hidden">
                <div class="text-center w-full mb-8 z-10">
                    <h2 class="font-serif font-bold text-3xl text-wedding-green tracking-widest uppercase mb-4">${event.title}</h2>
                    <div class="flex justify-center items-center gap-2 mb-2">
                        <div class="h-[2px] w-8 bg-gray-800"></div>
                        <div class="h-6 w-[2px] bg-red-400 rotate-12"></div>
                        <div class="h-[2px] w-8 bg-gray-800"></div>
                    </div>
                </div>
                
                <div class="w-[88%] aspect-square mb-10 shadow-2xl overflow-hidden rounded-sm border-4 border-white z-10">
                    <img src="${event.photo}" alt="${event.title}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
                </div>
                
                <p class="font-script text-[2.5rem] leading-[2.8rem] text-wedding-green mb-4 z-10">${event.subtitle}</p>
                <h3 class="font-serif font-bold text-[2.5rem] text-black tracking-wide z-10">${event.name}</h3>
            </section>
            `;
        });
        
        return eventsHtml;
    };

    // 5. Gallery Section
    const renderGallery = () => {
        if (!WEDDING_DATA.gallery || WEDDING_DATA.gallery.length === 0) return '';
        
        let galleryHtml = '<div class="grid grid-cols-2 gap-4 p-4 z-10 w-full max-w-[400px] mx-auto">';
        WEDDING_DATA.gallery.forEach(img => {
            galleryHtml += `
                <div class="aspect-square rounded-lg overflow-hidden shadow-md border-4 border-white bg-gray-100">
                    <img src="${img}" alt="Gallery Photo" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" onerror="this.src='https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'">
                </div>
            `;
        });
        galleryHtml += '</div>';

        return `
        <section class="section-animate min-h-screen py-16 px-4 bg-wedding-bg relative overflow-hidden flex flex-col items-center">
            <h2 class="font-serif font-bold text-3xl text-wedding-green mb-8 z-10 tracking-widest uppercase">Gallery</h2>
            ${galleryHtml}
            <p class="text-wedding-pink text-center mt-8 z-10 font-medium">Captured moments</p>
        </section>
        `;
    };

    // ── Render the entire app ─────────────────────────────────────────────
    app.classList.add('pb-10');
    
    app.innerHTML = `
        ${renderHero()}
        ${renderCountdown()}
        ${renderAboutUs(WEDDING_DATA.groom)}
        ${renderAboutUs(WEDDING_DATA.bride)}
        ${renderEvents()}
        ${renderGallery()}
    `;

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
