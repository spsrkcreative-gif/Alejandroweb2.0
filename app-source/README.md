# Alejandro Hernández — Portafolio (Marketing Lab)

Portafolio personal completo migrado a **React + TypeScript + Vite +
Tailwind CSS v4 + lucide-react**, con un hero 3D inmersivo ("5 Dimensions of
My Profile") como pieza central.

## Cómo correrlo

```bash
npm install
npm run dev       # desarrollo, http://localhost:5173
npm run build     # build de producción -> /dist
npm run preview   # sirve el build de /dist localmente
```

Requiere Node 18+.

## Estructura

```
src/
  data/images.ts                 # las 5 fotos del hero + textos + colores
  hooks/useIsMobile.ts
  hooks/useReducedMotion.ts
  components/
    IdentityCarousel.tsx         # hero 3D "5 dimensiones"
    Reveal.tsx                   # wrapper de scroll-reveal reutilizable
    ScrollProgress.tsx
    Nav.tsx                      # navegación fija + menú móvil
    About.tsx                    # Sobre mí
    Services.tsx                 # Lo que hago
    Projects.tsx                 # Proyectos destacados (con tilt de mouse)
    Process.tsx                  # Mi proceso
    MarketingIA.tsx              # Marketing + IA (orbit de herramientas)
    Experience.tsx                # Trayectoria profesional
    MoreThanMarketing.tsx        # Más que marketing
    CTAContact.tsx               # CTA final + Contacto
    Footer.tsx
  lab.css                        # estilos de las secciones portadas
                                  # (envuelto en @layer components para
                                  # no chocar con las utilidades de Tailwind)
  index.css                      # Tailwind + estilos propios del hero 3D
public/
  images/                        # fotos del hero (profile-01..05.jpg)
  lab/                           # imágenes de los proyectos + favicon
```

## Editar contenido

- **Hero (5 dimensiones):** `src/data/images.ts`
- **Resto de secciones:** cada componente en `src/components/` tiene su
  contenido como arrays/JSX simples al inicio del archivo — no hace falta
  tocar HTML/CSS suelto.

## Nota técnica importante (por si se sigue editando)

Tailwind v4 usa **CSS Cascade Layers**. Cualquier CSS que se agregue por
fuera de un `@layer` tiene prioridad automática sobre TODO el CSS de
Tailwind, sin importar especificidad — por eso `lab.css` está envuelto en
`@layer components { ... }`. Si en el futuro se agrega más CSS plano, debe
envolverse igual (o usar clases de Tailwind directamente) para evitar que
rompa las utilidades del hero.

## Despliegue

Este repo (`Alejandroweb2.0`) está publicado con GitHub Pages sirviendo
`main` desde la raíz. El contenido publicado es el **build de producción**
(`npm run build` → carpeta `dist/`), no el código fuente — los navegadores
no pueden ejecutar `.tsx` directamente. El código fuente completo vive en
`app-source/` dentro del repo para poder seguir editando el sitio.
