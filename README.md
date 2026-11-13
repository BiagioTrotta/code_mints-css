# code_mints-css

Framework CSS nativo, modulare e leggero. La MILESTONE 1 consegna Foundation, temi, griglia CSS Grid e utility di spaziatura essenziali. Nessuna dipendenza runtime.

## Foundation (0.1.0)

Collega `css/mint.css` direttamente con un tag `<link>`. Il file aggrega i moduli usando `@import`, quindi è pratico per sviluppo e anteprima. La build di distribuzione e i file `dist/` sono previsti nella MILESTONE 5.

```html
<link rel="stylesheet" href="css/mint.css">
```

Apri [examples/foundation.html](examples/foundation.html) per una pagina dimostrativa. Usa HTML semantico e includi il meta viewport.

### Tema e token

Il tema predefinito è Light. Imposta `data-theme="dark"` sull'elemento `<html>` per il tema scuro, oppure `data-theme="light"` per esplicitarlo. Il tema può essere applicato anche a un sottoalbero.

Token del brand: `--mint-navy`, `--mint-slate`, `--mint-green`, `--mint-ivory`, `--mint-gray`, `--mint-coral`. Token semantici: `--mint-bg`, `--mint-surface`, `--mint-text`, `--mint-text-muted`, `--mint-border`, `--mint-focus`, `--mint-success`, `--mint-warning`, `--mint-danger`, `--mint-info`, `--mint-primary`, `--mint-secondary`. Sono disponibili token per font, peso, raggio, ombra, gutter, container e spaziatura nei CSS Foundation.

Il font usa Manrope e JetBrains Mono se installati, poi fallback locali. Non viene richiesto un download esterno.

### Container e breakpoints

`.container` ha larghezza responsiva e max-width 540, 720, 960, 1140 e 1320px da 576, 768, 992, 1200 e 1400px. `.container-fluid` resta a larghezza piena. Entrambi hanno padding laterale da 12px; il gutter della griglia è 24px.

| Sigla | Min-width | Container |
|---|---:|---:|
| xs | 0 | 100% |
| sm | 576px | 540px |
| md | 768px | 720px |
| lg | 992px | 960px |
| xl | 1200px | 1140px |
| xxl | 1400px | 1320px |

### Grid a 12 colonne

`.row` crea una griglia CSS Grid di dodici tracce con gutter 24px. `.col` divide automaticamente lo spazio tra elementi; `.col-1` … `.col-12` impostano l'ampiezza. Le versioni responsive sono `.col-sm`, `.col-sm-1` … `.col-sm-12` e analoghe per `md`, `lg`, `xl`, `xxl`. Le colonne si impilano come una colonna singola sotto il primo breakpoint esplicito. Le righe annidate iniziano una nuova griglia.

`.offset-0` … `.offset-11` e le varianti `.offset-{sm|md|lg|xl|xxl}-0` … `-11` impostano la traccia iniziale. `.order-first`, `.order-last`, `.order-0` … `.order-12` e le varianti responsive controllano l'ordine visivo.

```html
<div class="container"><div class="row">
  <div class="col-12 col-md-6 col-lg-4">Colonna</div>
  <div class="col-12 col-md-6 col-lg-4">Colonna</div>
  <div class="col-md-6 offset-md-3">Centrata da md</div>
</div></div>
```

### Tipografia e spaziatura

Base 1rem con line-height 1.5. Heading h1–h6 e classi `.h1`–`.h6` seguono la scala prevista; `.small` e `<small>` usano .875rem.

La scala spacing `0`–`5` corrisponde a 0, .25rem, .5rem, 1rem, 1.5rem e 3rem. Sono disponibili `.m-*`, `.mt-*`, `.mb-*`, `.ms-*`, `.me-*`, `.mx-*`, `.my-*`, `.p-*`, `.pt-*`, `.pb-*`, `.ps-*`, `.pe-*`, `.px-*`, `.py-*` e `.mx-auto`.

### Accessibilità

Il reset conserva le funzionalità native; immagini e media sono responsive, i controlli ereditano il font. `:focus-visible` applica un contorno evidente e `prefers-reduced-motion` sarà rispettato nelle animazioni aggiunte nelle milestone successive. Verificare sempre le label associate ai controlli nei markup applicativi. Il colore Mint è mantenuto per il brand e non viene usato come testo su sfondo chiaro.

## Sviluppo e verifica

Richiede Node.js 18 o superiore e non installa pacchetti. Esegui `npm test` per verificare token, breakpoints, griglia, temi e spacing; `npm run check:structure` per il controllo dei file Foundation.

## Versionamento

Il progetto segue Semantic Versioning. `0.1.0` corrisponde alla Foundation iniziale. Nessuna pubblicazione npm è prevista in questa milestone.

## Roadmap

- [x] 0.1.0 Foundation, temi, griglia e spacing essenziale
- [ ] 0.2.0 Utilities
- [ ] 0.3.0 UI Components
- [ ] 0.4.0 Advanced e JavaScript
- [ ] 1.0.0 Release stabile, build e documentazione finale

