/* =============================================
   DevHub - script.js
   
   TUTTO IL CODICE JAVASCRIPT DI QUESTO FILE
   E' STATO SCRITTO CON L'AIUTO DELL'IA.
   Noi abbiamo spiegato cosa volevamo fare
   e l'IA ha scritto il codice e ce lo ha spiegato.
   ============================================= */


/* aspettiamo che la pagina sia completamente caricata
   prima di eseguire qualsiasi cosa (ce lo ha detto l'IA,
   senza questo il codice non trovava gli elementi HTML) */
document.addEventListener('DOMContentLoaded', function () {


  /* =============================================
     [IA] ANIMAZIONE NUMERI HOMEPAGE
     
     Quello che volevamo: i numeri delle statistiche
     (40+, 5, 100%) partono da zero e salgono fino
     al valore finale quando l'utente li vede.
     
     Come funziona (ce lo ha spiegato l'IA):
     - setInterval esegue una funzione tante volte al secondo
     - ogni volta aumenta il numero di un po'
     - quando arriva al numero giusto si ferma con clearInterval
     - IntersectionObserver capisce quando l'elemento
       e' visibile sullo schermo e fa partire l'animazione
     ============================================= */

  var elementiStat = document.querySelectorAll('.stat b');

  if (elementiStat.length > 0) {

    var observer = new IntersectionObserver(function (voci) {
      voci.forEach(function (voce) {
        if (voce.isIntersecting) {

          elementiStat.forEach(function (el) {
            var testoOriginale = el.textContent;
            var numero = parseInt(testoOriginale);
            var simbolo = testoOriginale.replace(numero, '');
            var corrente = 0;
            var passi = 40;
            var incremento = numero / passi;

            var timer = setInterval(function () {
              corrente += incremento;
              if (corrente >= numero) {
                corrente = numero;
                clearInterval(timer);
              }
              el.textContent = Math.round(corrente) + simbolo;
            }, 1200 / passi);
          });

          observer.unobserve(voce.target);
        }
      });
    }, {
      threshold: 0.5
    });

    var stats = document.querySelector('.stats');
    if (stats) observer.observe(stats);
  }


  /* =============================================
     [IA] BOTTONE "TORNA SU"
     
     Quello che volevamo: un bottone fisso in basso
     a destra che appare dopo aver scrollato un po'
     e riporta in cima alla pagina con un'animazione.
     
     Come funziona:
     - window.addEventListener('scroll') si attiva
       ogni volta che l'utente scrolla
     - window.scrollY dice quanti pixel ha scrollato
     - window.scrollTo con behavior smooth fa la
       scrollata animata invece di saltare su di botto
     ============================================= */

  var btnTornaSu = document.getElementById('torna-su');

  if (btnTornaSu) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        btnTornaSu.style.display = 'block';
      } else {
        btnTornaSu.style.display = 'none';
      }
    });

    btnTornaSu.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* =============================================
     [IA] ACCORDION FAQ (pagina "Chi siamo")
     
     Quello che volevamo: cliccare su una domanda
     apre la risposta, e chiude quella aperta prima.
     
     Come funziona:
     - forEach scorre tutte le domande
     - classList.toggle aggiunge/toglie la classe "aperta"
     - il CSS fa comparire la risposta quando c'e' la classe aperta
     - prima di aprire una FAQ, chiudiamo tutte le altre
     ============================================= */

  var domandeFaq = document.querySelectorAll('.faq-domanda');

  domandeFaq.forEach(function (domanda) {
    domanda.addEventListener('click', function () {
      var item = domanda.parentElement;

      document.querySelectorAll('.faq-item').forEach(function (altra) {
        if (altra !== item) altra.classList.remove('aperta');
      });

      item.classList.toggle('aperta');
    });
  });


}); // fine DOMContentLoaded