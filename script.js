const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const form = document.querySelector('#quote-form');
const status = document.querySelector('#form-status');

// Vul hier later de URL van de gekozen formulierdienst/API in.
// Zolang deze leeg is, gebruikt de site een mailto-fallback.
const FORM_ENDPOINT = '';

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);

    if (FORM_ENDPOINT) {
      if (status) status.textContent = 'Aanvraag wordt verstuurd…';
      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) throw new Error('Formulier kon niet worden verstuurd');
        form.reset();
        if (status) status.textContent = 'Bedankt. Je aanvraag is verzonden naar KTS-Klimaat.';
      } catch (error) {
        if (status) status.textContent = 'Versturen is niet gelukt. Bel 06 19 89 86 19 of mail naar info@kts-klimaat.nl.';
      }
      return;
    }

    const subject = encodeURIComponent('Offerteaanvraag via kts-klimaat.nl');
    const body = encodeURIComponent([
      `Naam: ${data.get('naam') || ''}`,
      `Telefoon: ${data.get('telefoon') || ''}`,
      `E-mail: ${data.get('email') || ''}`,
      `Woonplaats: ${data.get('woonplaats') || ''}`,
      '',
      'Vraag / situatie:',
      `${data.get('bericht') || ''}`
    ].join('\n'));

    if (status) status.textContent = 'Je e-mailprogramma wordt geopend. Liever direct contact? Bel 06 19 89 86 19.';
    window.location.href = `mailto:info@kts-klimaat.nl?subject=${subject}&body=${body}`;
  });
}
