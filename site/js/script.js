// ===========================
// Hamburger meniu, formos validacija, galerijos filtravimas
// ===========================

// --- hamburger meniu ---
document.addEventListener('DOMContentLoaded', function () {
    // Randam meniu mygtuka ir navigacijos juosta
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    // Paspaudus mygtuka perjungiama i open klase
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', function () {
            navbar.classList.toggle('open');
            // keiciama ikona (☰ arba ✕)
            this.textContent = navbar.classList.contains('open') ? '✕' : '☰';
        });
    }

    // --- Rezervacijos forma (kontaktai.html) - siunčia POST į ND3 backend ---
    const form = document.querySelector('.reservation-form');
    if (form) {
        // API endpoint (Render backend)
        const API_URL = 'https://baras-nd3.onrender.com/api/reservations';

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const alertBox = document.getElementById('form-alert');
            const vardas = document.getElementById('vardas').value.trim();
            const elPastas = document.getElementById('elPastas').value.trim();
            const data = document.getElementById('data').value;
            const zmoniuSk = Number(document.getElementById('zmoniuSk').value);

            // kliento validacija
            if (vardas.length < 2) {
                showAlert(alertBox, 'Vardas turi būti bent 2 simbolių.', 'error');
                return;
            }
            const pasirinkta = new Date(data);
            const siandien = new Date(); siandien.setHours(0, 0, 0, 0);
            if (pasirinkta < siandien) {
                showAlert(alertBox, 'Pasirinkite būsimą datą.', 'error');
                return;
            }

            // siunčiame į API
            try {
                const res = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ vardas, elPastas, data, zmoniuSk }),
                });
                if (!res.ok) {
                    const err = await res.json().catch(() => ({}));
                    throw new Error(err.error || 'Serverio klaida');
                }
                showAlert(alertBox, `Ačiū, ${vardas}! Rezervacija patvirtinta ${data}.`, 'success');
                form.reset();
            } catch (err) {
                showAlert(alertBox, `Klaida: ${err.message}. Patikrinkite, ar serveris veikia.`, 'error');
            }
        });
    }

    // --- Galerijos filtravimas (galerija.html) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            // pasalina active nuo mygtuku
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            // active klase paspaudimui
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Filtruojamos korteles pagal kategorija
            galleryCards.forEach(function (card) {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- "I virsu" mygtukas kai nuscrolinta zemyn ---
    const topBtn = document.getElementById('btn-top');
    if (topBtn) {
        window.addEventListener('scroll', function () {
            topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
        });

        topBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- rezimo perjungimas ---
    const themeBtn = document.getElementById('btn-theme');
    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            document.body.classList.toggle('light-theme');
            // Pakeičiame mygtuko tekstą
            this.textContent = document.body.classList.contains('light-theme')
                ? '🌙 Tamsus režimas'
                : '☀️ Šviesus režimas';
        });
    }
});

/**
 * Parodo pranesima alert boxe, paslepia po 5 sek
 * @param {HTMLElement} box
 * @param {string} message
 * @param {string} type
 */
function showAlert(box, message, type) {
    if (!box) return;
    box.textContent = message;
    box.className = 'alert-box ' + type;
    box.style.display = 'block';

    setTimeout(function () {
        box.style.display = 'none';
    }, 5000);
}
