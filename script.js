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

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
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

    if (status) status.textContent = 'Je e-mailprogramma wordt geopend om de aanvraag te versturen.';
    window.location.href = `mailto:info@kts-klimaat.nl?subject=${subject}&body=${body}`;
  });
}
