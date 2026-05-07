/* =============================================
   DevHub - script.js
   File JavaScript principale
   
   NOTA: alcune parti di questo file sono state
   scritte con l'aiuto di ChatGPT / Claude perché
   non sapevamo come farle. Le abbiamo indicate
   con il commento [AIUTO IA] e abbiamo cercato
   di capire come funzionano.
   
   Matteo ha fatto: navbar attiva, hamburger, torna-su
   Lorenzo ha fatto: ricerca card, FAQ, contatore
   ============================================= */


/* aspettiamo che tutta la pagina sia caricata prima di eseguire il codice
   senza questo, a volte JavaScript cercava gli elementi HTML che non esistevano ancora
   e dava errore nella console (ci abbiamo messo un po' a capire perché) */
document.addEventListener('DOMContentLoaded', function() {

  // ===========================================
  // NAVBAR HAMBURGER MENU (mobile)
  // fatto da Matteo
  // ===========================================

  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');

  // solo se esiste l'hamburger (su desktop non c'è)
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      // toggle aggiunge la classe se non c'è, la toglie se c'è
      // è come un interruttore on/off
      navLinks.classList.toggle('aperta');
    });
  }


  // ===========================================
  // LINK NAVBAR ATTIVO
  // Matteo: questa parte la sapevo fare già,
  // si aggiunge la classe "attiva" al link che corrisponde alla pagina
  // ===========================================

  // prendo il nome del file dalla URL (es. "imparare.html")
  var paginaCorrente = window.location.pathname.split('/').pop();

  // seleziono tutti i link della navbar
  var linkNavbar = document.querySelectorAll('.nav-links a');

  linkNavbar.forEach(function(link) {
    // prendo il nome del file dal href del link
    var hrefLink = link.getAttribute('href').split('/').pop();

    // se corrisponde alla pagina corrente, aggiungo la classe attiva
    if (hrefLink === paginaCorrente) {
      link.classList.add('attiva');
    }

    // se siamo sull'index e il link è index.html lo segno come attivo
    if (paginaCorrente === '' && hrefLink === 'index.html') {
      link.classList.add('attiva');
    }
  });


  // ===========================================
  // BOTTONE TORNA SU
  // fatto da Matteo - abbastanza semplice
  // ===========================================

  var btnTornaSu = document.getElementById('torna-su');

  if (btnTornaSu) {
    // window.onscroll si attiva ogni volta che l'utente scrolla
    window.addEventListener('scroll', function() {
      // se ha scrollato più di 300px, mostra il bottone
      if (window.scrollY > 300) {
        btnTornaSu.style.display = 'block';
      } else {
        btnTornaSu.style.display = 'none';
      }
    });

    // quando si clicca, torna in cima con un'animazione fluida
    btnTornaSu.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'  // senza questo va subito su senza animazione
      });
    });
  }


  // ===========================================
  // RICERCA / FILTRO CARD
  // [AIUTO IA] - Lorenzo: non sapevo come filtrare gli elementi HTML
  // ho chiesto all'IA e mi ha spiegato come funziona.
  // 
  // BUG CHE AVEVO: all'inizio la ricerca non funzionava perché confrontavo
  // "Figma" con "figma" e non corrispondevano (JavaScript è case-sensitive).
  // L'IA mi ha detto di usare .toLowerCase() su entrambi i valori.
  //
  // COME FUNZIONA:
  // 1. Prendo il testo scritto nella casella di ricerca
  // 2. Per ogni card, guardo se il suo testo contiene quello cercato
  // 3. Se sì la mostro, se no la nascondo con display:none
  // ===========================================

  var inputRicerca = document.getElementById('ricerca');
  var msgNessunRisultato = document.querySelector('.nessun-risultato');

  if (inputRicerca) {

    // 'input' si attiva a ogni tasto premuto (non solo quando si preme invio)
    inputRicerca.addEventListener('input', function() {

      // prendo il testo e lo metto tutto minuscolo per il confronto
      var testo = inputRicerca.value.toLowerCase().trim();

      // seleziono tutte le card presenti nella pagina
      var tutteLeCard = document.querySelectorAll('.card');

      var cardVisibili = 0;  // contatore per sapere quante card sono visibili

      tutteLeCard.forEach(function(card) {

        // prendo tutto il testo della card (titolo + descrizione + link)
        // textContent prende solo il testo senza tag HTML
        var testoCard = card.textContent.toLowerCase();

        // verifico se il testo cercato è contenuto nel testo della card
        if (testoCard.includes(testo) || testo === '') {
          // la mostro (togliendo il display none)
          card.style.display = 'block';
          cardVisibili++;
        } else {
          // la nascondo
          card.style.display = 'none';
        }
      });

      // se nessuna card è visibile, mostro il messaggio
      if (msgNessunRisultato) {
        if (cardVisibili === 0 && testo !== '') {
          msgNessunRisultato.style.display = 'block';
        } else {
          msgNessunRisultato.style.display = 'none';
        }
      }

    });
  }


  // ===========================================
  // FAQ ACCORDION
  // Lorenzo: questa l'ho fatta quasi da solo guardando un tutorial su YouTube
  // L'accordion apre/chiude le risposte quando si clicca sulla domanda
  // ===========================================

  var domandeFaq = document.querySelectorAll('.faq-domanda');

  domandeFaq.forEach(function(domanda) {

    domanda.addEventListener('click', function() {

      // il genitore della domanda è il .faq-item
      var item = domanda.parentElement;

      // [AIUTO IA] - Lorenzo: non sapevo come chiudere le altre FAQ quando se ne apre una
      // l'IA mi ha suggerito di selezionare tutte le .faq-item aperte e chiuderle

      // chiudo tutte le FAQ aperte tranne quella cliccata
      var tutteLeFaq = document.querySelectorAll('.faq-item');
      tutteLeFaq.forEach(function(altraFaq) {
        if (altraFaq !== item) {
          altraFaq.classList.remove('aperta');
        }
      });

      // apro/chiudo quella cliccata
      item.classList.toggle('aperta');
    });
  });


  // ===========================================
  // CONTATORE ANIMATO (solo homepage)
  // [AIUTO IA] - Lorenzo: questa è la parte più complessa del sito
  //
  // SPIEGAZIONE: i numeri nelle statistiche (40+, 5, 100%) partono da 0
  // e salgono fino al valore finale con un'animazione.
  //
  // COME FUNZIONA:
  // - setInterval esegue una funzione ripetutamente ogni X millisecondi
  // - ad ogni esecuzione aumentiamo il numero corrente
  // - quando arriviamo al target, fermiamo l'intervallo con clearInterval
  //
  // BUG CHE AVEVO: il "100%" non funzionava perché parseInt("100%") toglie
  // solo i numeri e dava 100, ma poi aggiungevo "+" invece di "%".
  // Ho risolto salvando il simbolo finale separatamente.
  // ===========================================

  var elementiStat = document.querySelectorAll('.stat b');

  if (elementiStat.length > 0) {

    // [AIUTO IA] - usiamo IntersectionObserver per far partire l'animazione
    // solo quando l'utente scrolla fino alle statistiche
    // (senza questo partiva subito e non si vedeva l'animazione)
    //
    // IntersectionObserver "osserva" un elemento e avvisa quando
    // entra nel viewport (la parte visibile della pagina)

    var opzioniObserver = {
      threshold: 0.5  // si attiva quando almeno il 50% dell'elemento è visibile
    };

    var observer = new IntersectionObserver(function(voci) {

      voci.forEach(function(voce) {

        // se l'elemento è entrato nel viewport
        if (voce.isIntersecting) {

          // faccio partire l'animazione per ogni statistica
          elementiStat.forEach(function(statElement) {

            var testoOriginale = statElement.textContent;  // es. "40+"

            // separo il numero dal simbolo finale (+ oppure %)
            var numero = parseInt(testoOriginale);   // parseInt prende solo la parte numerica
            var simbolo = testoOriginale.replace(numero, '');  // prendo quello che rimane

            var corrente = 0;
            var durata = 1200;   // millisecondi totali dell'animazione
            var passi = 40;      // quante volte aggiorniamo il numero
            var intervallo = durata / passi;

            // ogni quanto aumentare il numero
            var incremento = numero / passi;

            var timer = setInterval(function() {
              corrente += incremento;

              // se abbiamo superato il target, ci fermiamo al target esatto
              if (corrente >= numero) {
                corrente = numero;
                clearInterval(timer);  // ferma l'intervallo
              }

              // aggiorno il testo con il numero arrotondato + il simbolo
              statElement.textContent = Math.round(corrente) + simbolo;

            }, intervallo);

          });

          // smettiamo di osservare dopo che l'animazione è partita
          observer.unobserve(voce.target);
        }
      });

    }, opzioniObserver);

    // iniziamo a osservare il contenitore delle statistiche
    var contenitoreStats = document.querySelector('.stats');
    if (contenitoreStats) {
      observer.observe(contenitoreStats);
    }
  }


  // ===========================================
  // TEMA SCURO/CHIARO - Toggle
  // [AIUTO IA] - Matteo: questa l'abbiamo aggiunta quasi alla fine
  // localStorage serve a "ricordare" la preferenza dell'utente anche se chiude la pagina
  // (senza non funzionava: ogni volta che ricaricavi la pagina tornava al tema chiaro)
  // ===========================================

  var btnTema = document.getElementById('toggle-tema');

  if (btnTema) {

    // controlliamo se l'utente aveva già scelto il tema scuro in precedenza
    var temaPreferito = localStorage.getItem('tema');
    if (temaPreferito === 'scuro') {
      document.body.classList.add('tema-scuro');
      btnTema.textContent = '☀️';
    }

    btnTema.addEventListener('click', function() {
      document.body.classList.toggle('tema-scuro');

      // salviamo la preferenza in localStorage
      if (document.body.classList.contains('tema-scuro')) {
        localStorage.setItem('tema', 'scuro');
        btnTema.textContent = '☀️';
      } else {
        localStorage.setItem('tema', 'chiaro');
        btnTema.textContent = '🌙';
      }
    });
  }


  // ===========================================
  // SMOOTH SCROLL per i link interni (#ancora)
  // Matteo: questa è semplice, previene il comportamento di default
  // del browser e usa scrollIntoView con behavior smooth
  // ===========================================

  var linkInterni = document.querySelectorAll('a[href^="#"]');

  linkInterni.forEach(function(link) {
    link.addEventListener('click', function(e) {

      var target = link.getAttribute('href');

      // solo se il href non è solo "#" (link vuoti)
      if (target !== '#') {
        e.preventDefault();  // blocca il salto brusco predefinito del browser
        var elemento = document.querySelector(target);
        if (elemento) {
          elemento.scrollIntoView({ behavior: 'smooth' });  // scrollata fluida
        }
      }
    });
  });


}); // fine DOMContentLoaded
