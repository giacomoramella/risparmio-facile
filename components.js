/* ================================================================
   RisparmioFacile — Shared Components
   Sticky bar · WhatsApp button · Exit intent popup
   ================================================================ */

/* ── STICKY BAR ── */
(function () {
  if (sessionStorage.getItem('rfStickyDismissed')) return;

  const path = location.pathname;
  let href = 'piano-pensione.html', label = 'Scopri i vantaggi →';
  if (path.includes('polizza-auto'))   { href = 'polizza-auto.html#preventivo';   label = 'Calcola ora →'; }
  else if (path.includes('polizza-casa')){ href = 'polizza-casa.html#preventivo'; label = 'Calcola ora →'; }
  else if (path.includes('piano-pensione') || path.includes('landing-pensione')){ href = '#simulatore'; label = 'Calcola il mio piano →'; }

  const bar = document.createElement('div');
  bar.id = 'rf-sticky-bar';
  bar.className = 'sticky-bar';
  bar.innerHTML =
    '🎁 Consulenza gratuita disponibile oggi &nbsp;·&nbsp; Risparmio medio €261/anno &nbsp;·&nbsp;' +
    '<a href="' + href + '">' + label + '</a>' +
    '<button class="sticky-bar-close" onclick="rfDismissSticky()" aria-label="Chiudi">✕</button>';
  document.body.prepend(bar);
  document.body.classList.add('has-sticky');
})();

function rfDismissSticky() {
  const bar = document.getElementById('rf-sticky-bar');
  if (bar) bar.remove();
  document.body.classList.remove('has-sticky');
  sessionStorage.setItem('rfStickyDismissed', '1');
}

/* ── WHATSAPP BUTTON ── */
(function () {
  const a = document.createElement('a');
  a.className = 'wa-btn';
  a.href = 'https://wa.me/3900000000';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.setAttribute('aria-label', 'Parla con un consulente su WhatsApp');
  a.innerHTML =
    '<svg viewBox="0 0 24 24" width="26" height="26" fill="#fff" aria-hidden="true">' +
    '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>' +
    '</svg>' +
    '<span class="wa-tooltip">Parla con un consulente</span>';
  document.body.appendChild(a);
})();

/* ── EXIT INTENT POPUP ── */
(function () {
  if (sessionStorage.getItem('rfExitShown')) return;

  const overlay = document.createElement('div');
  overlay.className = 'ei-overlay';
  overlay.id = 'rf-ei-overlay';
  overlay.innerHTML =
    '<div class="ei-box">' +
      '<button class="ei-close" onclick="rfCloseExit()" aria-label="Chiudi">✕</button>' +
      '<p class="ei-tag">Prima di andare…</p>' +
      '<h2 class="ei-title">Scopri quanto risparmieresti sull\'IRPEF con un piano pensione</h2>' +
      '<p class="ei-sub">In 30 secondi calcoliamo il tuo risparmio fiscale potenziale. Te lo inviamo gratis.</p>' +
      '<input type="email" class="ei-input" id="rf-ei-email" placeholder="La tua email">' +
      '<button class="ei-btn" onclick="rfSubmitExit()">Inviami il calcolo gratuito →</button>' +
      '<p class="ei-skip" onclick="rfCloseExit()">No grazie, rinuncio al risparmio fiscale</p>' +
    '</div>';
  document.body.appendChild(overlay);

  let fired = false;
  document.addEventListener('mouseleave', function (e) {
    if (e.clientY < 10 && !fired) {
      fired = true;
      overlay.classList.add('show');
      sessionStorage.setItem('rfExitShown', '1');
    }
  });
})();

function rfCloseExit() {
  const o = document.getElementById('rf-ei-overlay');
  if (o) o.classList.remove('show');
}

function rfSubmitExit() {
  const emailEl = document.getElementById('rf-ei-email');
  const email = emailEl.value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailEl.style.borderColor = '#d43a2f';
    emailEl.focus();
    return;
  }
  const box = document.querySelector('#rf-ei-overlay .ei-box');
  box.innerHTML =
    '<div style="text-align:center;padding:1.5rem 0">' +
      '<div style="font-size:2.5rem;margin-bottom:1rem">✅</div>' +
      '<h3 style="font-family:\'Syne\',sans-serif;font-size:1.2rem;color:var(--text);margin-bottom:.5rem">Ricevuto!</h3>' +
      '<p style="color:var(--text-muted);font-size:.875rem;line-height:1.6">Abbiamo inviato il calcolo del risparmio fiscale a <strong>' + email + '</strong>.</p>' +
      '<a href="piano-pensione.html" style="display:inline-block;margin-top:1.25rem;background:var(--green-dark);color:#fff;padding:.8rem 1.75rem;border-radius:12px;text-decoration:none;font-family:\'Syne\',sans-serif;font-weight:700;font-size:.9rem">Calcola subito il mio piano →</a>' +
      '<p style="margin-top:1rem;font-size:.75rem;color:var(--text-muted);cursor:pointer" onclick="rfCloseExit()">Chiudi</p>' +
    '</div>';
  setTimeout(rfCloseExit, 6000);
}
