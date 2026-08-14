KTS-KLIMAAT WEBSITE
===================

Bestanden:
- index.html                hoofdpagina
- styles.css                volledige styling + responsive layout
- script.js                 mobiel menu + offerteformulier
- privacy.html              eenvoudige privacyverklaring
- assets/                   afbeeldingen en favicon

Openen:
Dubbelklik op index.html om de site lokaal te bekijken.

Publiceren:
Deze map kan direct worden geupload naar vrijwel iedere statische webhost, bijvoorbeeld Vercel, Netlify of gewone webhosting.

Belangrijk vóór livegang:
1. Vul eventueel een echt telefoonnummer toe in header/footer als dat gewenst is.
2. Controleer de definitieve bedrijfsgegevens en privacytekst.
3. Het offerteformulier gebruikt momenteel mailto: en opent dus het e-mailprogramma van de bezoeker. Voor een volledig webformulier zonder mailclient moet later een formulierdienst of backend worden gekoppeld.
4. De huidige beelden zijn lokaal opgenomen in /assets, dus de site is niet afhankelijk van externe stockfoto-links.


FASE 2 - DIENSTPAGINA'S
========================
Toegevoegd:
- /airco-installeren/
- /airco-vervangen/
- /airco-onderhoud/
- /airco-storing/

De homepage-kaarten linken nu naar deze pagina's. Iedere pagina heeft een unieke title, meta description, H1, inhoud, stappenplan en FAQ.
Nog bewust NIET toegevoegd: plaatsnamen, certificeringen, merken, garanties, telefoonnummer en LocalBusiness-schema zolang de echte bedrijfsgegevens niet definitief zijn bevestigd.


FASE 1 BEDRIJFSGEGEVENS
========================
Telefoon: 06 19 89 86 19
E-mail: info@kts-klimaat.nl
Werkgebied: heel Nederland

CONTACTFORMULIER
================
De frontend is voorbereid op een echte formulier-endpoint via FORM_ENDPOINT in script.js.
Zolang FORM_ENDPOINT leeg is, opent de website de e-mailclient van de bezoeker als fallback.
Voor echte verzending rechtstreeks vanaf de website moet een formulierdienst/API of backend worden gekoppeld.
