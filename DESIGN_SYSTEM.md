# Design System - Mole Venture

## Colori (Palette)
I colori sono stati standardizzati nel file `src/app/globals.css` per Tailwind CSS v4 e sono pronti da utilizzare con le classiche utility (es. `bg-blue-deep`, `text-blue-kinetic`).

- **Deep Trust Blue**: `#05155E` -> in Tailwind usare `blue-deep`
- **Kinetic Blue**: `#062EB5` -> in Tailwind usare `blue-kinetic`
- **Soft Blue**: `#4CACF8` -> in Tailwind usare `blue-soft`

## Font (Tipografia)
In base alla moodboard e alle references, è stato impostato come font principale **Montserrat**. È un font sans-serif geometrico e pulito che rispecchia la brand identity di "Mole Venture". È importato nativamente e ottimizzato tramite `next/font/google` nel file `src/app/layout.tsx`.
Il font è impostato come predefinito per tutto il body (configurato in `globals.css` sotto la variabile `--font-sans` e in `layout.tsx` tramite `.variable`).

## Componenti Globali
- **Navbar**: Presente nel file `src/components/Navbar.tsx`, implementa il logo e le 4 voci di menu (Home, Approccio, Aree di intervento, Citazioni) con routing sui rispettivi path. È posizionata in absolute per permettere allo sfondo della pagina di "scorrere" dietro, come nelle immagini.
- **Footer**: Presente in `src/components/Footer.tsx`, inserito come footer globale standard con i parametri richiesti.

Le pagine relative alle singole rotte (`/approccio`, `/aree-di-intervento`, `/citazioni`) sono state generate come scheletri iniziali, pronte per essere sviluppate.
