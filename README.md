# code_mints-css

Framework CSS nativo, modulare e leggero. **Less configuration. More creation.** Il progetto non richiede dipendenze runtime e non scarica font o risorse esterne.

## Installazione e utilizzo

Collega il foglio principale direttamente nella pagina. La versione modulare carica i moduli CSS tramite `@import`; la build compatta per distribuzione sarà preparata nella MILESTONE 5.

```html
<link rel="stylesheet" href="css/mint.css">
```

Apri [examples/foundation.html](examples/foundation.html) per vedere la Foundation in uso. Il package si chiama `code_mints-css` ed è alla versione `0.2.0`; non è pubblicato su npm.

## Foundation (0.1.0)

### Tema e token

Light è il tema predefinito. Imposta `data-theme="dark"` sull'elemento `<html>` per il tema scuro, oppure `data-theme="light"` per esplicitarlo. Il tema può essere applicato anche a un sottoalbero. I token del brand restano invariati mentre i token semantici si adattano al tema.

Colori brand: `--mint-navy`, `--mint-slate`, `--mint-green`, `--mint-ivory`, `--mint-gray`, `--mint-coral`. Token semantici: `--mint-bg`, `--mint-surface`, `--mint-text`, `--mint-text-muted`, `--mint-border`, `--mint-focus`, `--mint-success`, `--mint-warning`, `--mint-danger`, `--mint-info`, `--mint-primary`, `--mint-secondary`. Sono disponibili anche token per font, pesi, radius, shadows, gutter, container e spacing.

Il font usa Manrope e JetBrains Mono se installati, poi fallback locali. Non viene richiesto un download esterno.

### Container e breakpoints

`.container` ha larghezza responsiva e max-width 540, 720, 960, 1140 e 1320px ai breakpoint 576, 768, 992, 1200 e 1400px. `.container-fluid` resta a larghezza piena. Entrambi hanno padding laterale da 12px; il gutter della griglia è 24px.

| Sigla | Min-width | Container |
|---|---:|---:|
| xs | 0 | 100% |
| sm | 576px | 540px |
| md | 768px | 720px |
| lg | 992px | 960px |
| xl | 1200px | 1140px |
| xxl | 1400px | 1320px |

### Grid a 12 colonne

`.row` crea una griglia CSS Grid di dodici tracce con gutter 24px. `.col` divide automaticamente lo spazio tra elementi nelle righe composte da sole colonne auto (minimo 15rem, su mobile impilato); `.col-1` … `.col-12` impostano l'ampiezza. Le versioni responsive sono `.col-sm`, `.col-sm-1` … `.col-sm-12` e analoghe per `md`, `lg`, `xl`, `xxl`. Le colonne responsive senza larghezza di base occupano tutta la riga sotto il proprio breakpoint; le griglie annidate iniziano una nuova griglia.

`.offset-0` … `.offset-11` e le varianti `.offset-{sm|md|lg|xl|xxl}-0` … `-11` impostano la traccia iniziale. `.order-first`, `.order-last`, `.order-0` … `.order-12` e le varianti responsive controllano l'ordine visivo.

```html
<div class="container"><div class="row">
  <div class="col-12 col-md-6 col-lg-4">Colonna</div>
  <div class="col-12 col-md-6 col-lg-4">Colonna</div>
  <div class="col-md-6 offset-md-3">Centrata da md</div>
</div></div>
```

### Tipografia e spaziatura

Base 1rem con line-height 1.5. Heading h1–h6 e classi `.h1`–`.h6` seguono la scala definita; `.small` e `<small>` usano .875rem.

La scala spacing `0`–`5` corrisponde a 0, .25rem, .5rem, 1rem, 1.5rem e 3rem. Sono disponibili `.m-*`, `.mt-*`, `.mb-*`, `.ms-*`, `.me-*`, `.mx-*`, `.my-*`, `.p-*`, `.pt-*`, `.pb-*`, `.ps-*`, `.pe-*`, `.px-*`, `.py-*` e `.mx-auto`.

## Utilities (0.2.0)

Le utility sono globali e non hanno varianti responsive automatiche. Usa le colonne Grid per i layout responsive; i prefissi responsive delle utility sono previsti per la milestone Advanced.

- **Display:** `.d-none`, `.d-inline`, `.d-inline-block`, `.d-block`, `.d-grid`, `.d-flex`, `.d-inline-flex`.
- **Flexbox:** `.flex-row`, `.flex-column`, `.flex-row-reverse`, `.flex-column-reverse`, `.flex-wrap`, `.flex-nowrap`, `.flex-wrap-reverse`, `.flex-fill`, `.flex-grow-0`, `.flex-grow-1`, `.flex-shrink-0`, `.flex-shrink-1`.
- **Allineamento e spazi:** `.justify-content-start|end|center|between|around|evenly`; `.align-items-start|end|center|baseline|stretch`; `.align-content-start|end|center|between|around|stretch`; `.align-self-auto|start|end|center|baseline|stretch`; `.gap-0` … `.gap-5`, `.row-gap-0` … `.row-gap-5`, `.column-gap-0` … `.column-gap-5`.
- **Colori:** testi `.text-body`, `.text-muted`, `.text-success`, `.text-warning`, `.text-danger`, `.text-info`, `.text-navy`, `.text-slate`, `.text-mint`, `.text-ivory`, `.text-coral`; sfondi `.bg-body`, `.bg-surface`, `.bg-primary`, `.bg-secondary`, `.bg-navy`, `.bg-slate`, `.bg-mint`, `.bg-ivory`, `.bg-coral`. Il testo Mint diretto è decorativo e non ha contrasto AA su Ivory.
- **Dimensioni:** `.w-25`, `.w-50`, `.w-75`, `.w-100`, `.w-auto`, `.h-25`, `.h-50`, `.h-75`, `.h-100`, `.h-auto`, `.mw-100`, `.mh-100`, `.min-vw-100`, `.min-vh-100`, `.vw-100`, `.vh-100`.
- **Bordi e ombre:** `.border`, `.border-0`, `.border-top`, `.border-end`, `.border-bottom`, `.border-start`; `.border-primary|secondary|success|warning|danger|info`; `.rounded-0`, `.rounded-sm`, `.rounded`, `.rounded-lg`, `.rounded-xl`, `.rounded-pill`, `.rounded-circle`; `.shadow-none`, `.shadow-sm`, `.shadow`.
- **Testo:** `.text-start`, `.text-center`, `.text-end`, `.text-lowercase`, `.text-uppercase`, `.text-capitalize`, `.text-wrap`, `.text-nowrap`, `.text-break`, `.text-decoration-none`, `.text-decoration-underline`, `.fw-normal`, `.fw-medium`, `.fw-semibold`, `.fw-bold`, `.fw-extrabold`, `.font-monospace`, `.font-sans`, `.lh-1`, `.lh-sm`, `.lh-base`, `.lh-lg`, `.fs-1` … `.fs-6`, `.fs-small`.
- **Posizione:** `.position-static`, `.position-relative`, `.position-absolute`, `.position-fixed`, `.position-sticky`, `.top-0`, `.end-0`, `.bottom-0`, `.start-0`, `.translate-middle`, `.translate-middle-x`, `.translate-middle-y`, `.z-n1`, `.z-0`, `.z-1`, `.z-2`, `.z-3`.
- **Visibilità:** `.visible`, `.invisible`, `.visually-hidden`, `.visually-hidden-focusable` (visibile al focus o quando un discendente riceve focus).

```html
<div class="d-flex align-items-center justify-content-between gap-3 p-3 bg-surface rounded shadow-sm">
  <h2 class="h5 mb-0">Titolo</h2>
  <span class="text-success fw-semibold">Pronto</span>
</div>
```

## UI Components (0.3.0)

I componenti sono classi CSS senza dipendenze. Varianti semantiche usano token Light/Dark; controlli nativi mantengono il comportamento browser. Dropdown e accordion usano `<details>/<summary>` e funzionano senza JavaScript. Il modal è stilizzato come `<dialog>` e va aperto tramite il metodo nativo `showModal()` (l'integrazione helper è prevista nel JavaScript Engine). Tabs e toast sono presentazionali in questa milestone; la gestione delle interazioni arriva nella milestone 4.

- **Buttons:** `.btn`, `.btn-secondary`, `.btn-outline`, `.btn-ghost`, `.btn-danger`, `.btn-sm`, `.btn-lg`, `.btn-block`, `.btn-loading`.
- **Cards:** `.card`, `.card-body`, `.card-header`, `.card-footer`, `.card-title`, `.card-text`, `.card-hover`.
- **Forms:** `.form-label`, `.form-control`, `.form-select`, `.form-text`, `.form-error`, `.form-check`, `.form-check-input`, `.form-check-label`, `.input-group`, `.is-invalid` (oppure `aria-invalid="true"`).
- **Navbar:** `.navbar`, `.navbar-brand`, `.navbar-nav`, `.navbar-link` (con `aria-current="page"` per la pagina attiva), `.navbar-toggler`, `.navbar-spacer`.
- **Badges:** `.badge`, `.badge-primary`, `.badge-success`, `.badge-warning`, `.badge-danger`, `.badge-info`.
- **Alerts:** `.alert`, `.alert-title`, `.alert-success`, `.alert-warning`, `.alert-danger`, `.alert-info`, `.alert-dismissible`, `.alert-close`.
- **Dropdown:** `<details class="dropdown">`, `<summary class="dropdown-toggle">` e `<ul class="dropdown-menu">` con `.dropdown-item`.
- **Modal:** `<dialog class="modal">` con `.modal-header`, `.modal-title`, `.modal-body`, `.modal-footer`. `dialog::backdrop` offre lo sfondo attenuato.
- **Tables:** `.table`, `.table-striped`, `.table-hover`, `.table-responsive` (aggiungi `caption`, `thead` e `th scope` per l'accessibilità).
- **Pagination:** `.pagination`, `.page-item`, `.page-link`; marca la pagina corrente con `aria-current="page"` e i link non attivi con `aria-disabled="true"`.
- **Progress:** `<progress class="progress" max="100" value="60">60%</progress>`, `.progress-sm`, `.progress-lg`, `.progress-label`.
- **Accordion:** `<details class="accordion-item">` dentro `.accordion`, con `<summary class="accordion-trigger">` e pannello `.accordion-panel`.
- **Tabs:** `.tabs`, `.tabs-list`, `.tab`, `.tab-panel`; usa ruoli ARIA `tablist`, `tab`, `tabpanel` e `aria-selected`. Le interazioni da tastiera arriveranno con il JavaScript Engine.
- **Toast:** `.toast-container`, `.toast`, `.toast-content`, `.toast-title`, `.toast-message`, `.toast-close`, `.toast-success|warning|danger|info`; per gli annunci usa un contenitore `aria-live="polite"`.

Esempi completi: [examples/components.html](examples/components.html). Questa milestone fornisce gli stili: i pulsanti di chiusura di alert e toast e i tab non modificano da soli il DOM. La chiusura toast/alert e la gestione tastiera dei tab arriveranno con il JavaScript Engine. Tutti i controlli devono mantenere un nome accessibile; il framework non aggiunge automaticamente label o ruoli ARIA.

## Accessibilità

Il reset conserva le funzionalità native; immagini e media sono responsive e i controlli ereditano il font. `:focus-visible` applica un contorno evidente. Verifica sempre le label associate ai controlli nel markup applicativo. I colori semantici usati come testo e lo stato focus hanno contrasto AA sul tema Light; Mint diretto è riservato agli accenti.

## Sviluppo e verifica

Richiede Node.js 18 o superiore e non installa pacchetti. Esegui `npm test` per verificare token, breakpoints, griglia, temi, spacing e utility; `npm run check:structure` per controllare i file richiesti.

## Versionamento e roadmap

Si usa Semantic Versioning. Nessuna pubblicazione npm è stata eseguita.

- [x] 0.1.0 Foundation, temi, griglia e spacing essenziale
- [x] 0.2.0 Utilities
- [x] 0.3.0 UI Components
- [ ] 0.4.0 Advanced e JavaScript
- [ ] 1.0.0 Release stabile, build e documentazione finale
