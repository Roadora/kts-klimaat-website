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
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/info@kts-klimaat.nl';

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : '';
    const data = new FormData(form);

    const payload = {};
    data.forEach((value, key) => {
      payload[key] = value;
    });

    // Zorg dat antwoorden op de aanvraag direct naar het e-mailadres
    // van de aanvrager kunnen worden gestuurd.
    payload._replyto = payload.email || '';
    // Geef FormSubmit altijd de exacte live formulier-URL mee.
    // Dit helpt zowel tijdens GitHub Pages-tests als na koppeling van kts-klimaat.nl.
    payload._url = window.location.href.split('#')[0].split('?')[0];

    if (status) {
      status.className = 'form-status is-loading';
      status.textContent = 'Aanvraag wordt veilig verstuurd…';
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Bezig met versturen…';
    }

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === 'false' || result.success === false) {
        throw new Error(result.message || 'Formulier kon niet worden verstuurd');
      }

      form.reset();
      if (status) {
        status.className = 'form-status is-success';
        status.textContent = 'Bedankt. Je aanvraag is verzonden naar KTS-Klimaat. We nemen zo snel mogelijk contact met je op.';
      }
    } catch (error) {
      if (status) {
        status.className = 'form-status is-error';
        status.textContent = 'Versturen is niet gelukt. Bel 06 19 89 86 19 of mail naar info@kts-klimaat.nl.';
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}
